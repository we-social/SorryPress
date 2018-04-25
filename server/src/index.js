require('./setup')
const { format } = require('util')
const { join } = require('path')
const fs = require('fs-extra-promise')
const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')
const Router = require('koa-router')
const httpError = require('http-errors')
const execa = require('execa')
const { md5, KoaAPI, KoaJSON } = require('./utils')
const { siteDir, storyDir, outputDir, storyList } = require('../config')

const port = process.env.PORT || 7890
const app = new Koa()
const appRouter = new Router()
const apiRouter = new Router({ prefix: '/api' })

app.on('error', err => {
  console.error('app on error', err)
})

app.use(async (ctx, next) => {
  await next()
  const ctxError = ctx.state.error
  if (ctxError) {
    console.error('ctx state error', ctxError)
  }
})

// appRouter.use('/', serve(siteDir)) // not works
app.use(serve(siteDir))
appRouter.use('/output', serve(outputDir))

apiRouter.use(KoaAPI())
apiRouter.use(KoaJSON())

apiRouter.post('/make', async ctx => {
  const { story, textList } = ctx.request.body
  const valid = storyList.includes(story)
  if (!valid) {
    throw httpError(400, 'No such story.')
  }
  const inputFile = join(storyDir, `${story}.gif`)
  const rawAssFile = join(storyDir, `${story}.ass`)
  const rawAssContent = await fs.readFileAsync(rawAssFile, 'utf8')
  const assContent = format(rawAssContent, ...textList)
  const outputMd5 = md5(assContent, 'hex')
  const outputFileName = `${story}-${outputMd5}.gif`
  const outputFile = join(outputDir, outputFileName)
  const assFile = join(outputDir, `${story}-${outputMd5}.ass`)
  await fs.writeFileAsync(assFile, assContent)
  const args = ['-i', inputFile, '-vf', `ass=${assFile}`, '-y', outputFile]
  await execa('ffmpeg', args, { stdio: 'inherit' })
  ctx.body = { outputFileName }
})

app.use(mount('/output', serve(outputDir)))
app.use(apiRouter.routes())

app.listen(port, () => {
  console.log('Listening at port', port)
})
