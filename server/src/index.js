require('./setup')
const { join, extname } = require('path')
const fs = require('fs-extra')
const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')
const helmet = require('koa-helmet')
const Router = require('koa-router')
const httpError = require('http-errors')
const execa = require('execa')
const _ = require('lodash')
const { md5, KoaAPI, KoaJSON } = require('./utils')
const { siteDir, storyDir, outputDir, storyList } = require('../config')

const port = process.env.SERVER_PORT || process.env.PORT || 7890
const app = new Koa()
const appRouter = new Router()
const apiRouter = new Router({ prefix: '/api' })

app.on('error', err => {
  console.error('app on error', err)
})

app.use(helmet())

app.use(async (ctx, next) => {
  await next()
  const ctxError = ctx.state.error
  if (ctxError) {
    console.error('ctx state error', ctxError)
  }
})

// 便于本地调试 非production 直接开启cors供site调用
if (process.env.NODE_ENV !== 'production') {
  const cors = require('@koa/cors')
  app.use(cors())
}

// appRouter.use('/', serve(siteDir)) // not works
app.use(serve(siteDir))
appRouter.use('/output', serve(outputDir))

apiRouter.use(KoaAPI())
apiRouter.use(KoaJSON())

apiRouter.get('/random', async ctx => {
  let { count } = ctx.query
  count = count || 0
  count = Math.min(count, 3) // 隐私/安全问题 初步限最大
  const allList = await fs.readdir(outputDir)
  const imgList = allList.filter(filename => {
    return extname(filename) === '.gif'
  })
  const randomList = _.sampleSize(imgList, count)
  ctx.body = { randomList }
})

apiRouter.post('/make', async ctx => {
  const { story, textList } = ctx.request.body
  const valid = storyList.includes(story)
  if (!valid) {
    throw httpError(400, 'No such story.')
  }
  const rawAssFile = join(storyDir, 'story.ass.tmpl')
  const rawAssContent = await fs.readFile(rawAssFile, 'utf8')
  const assContentFn = _.template(rawAssContent)

  const metaFile = join(storyDir, 'meta.js')
  const Meta = require(metaFile)
  const sentences = Meta.map[story].sentences
    .map((str, i) => {
      const chunks = str.split(Meta.delimiter) // 将默认字幕替换为用户输入
      chunks.length = 3
      chunks[2] = textList[i]
      return chunks.join(Meta.delimiter)
    })
  const assContent = assContentFn({ sentences })
    .replace(/\n+$/, '\n')
    .replace(/^\n(Dialogue:)/gm, '$1')

  const outputMd5 = md5(assContent, 'hex')
  const outputFileName = `${story}-${outputMd5}.gif`
  const outputFile = join(outputDir, outputFileName)
  const assFile = join(outputDir, `${story}-${outputMd5}.ass`)
  await fs.writeFile(assFile, assContent)

  const inputFile = join(storyDir, `${story}.gif`)
  const args = ['-i', inputFile, '-vf', `ass=${assFile}`, '-y', outputFile]
  await execa('ffmpeg', args, { stdio: 'inherit' })
  ctx.body = { outputFileName }
})

app.use(mount('/output', serve(outputDir)))
app.use(apiRouter.routes())

app.listen(port, () => {
  console.log('Listening at port', port)
})
