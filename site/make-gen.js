const { join } = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const Meta = require('../server/story/meta')
const storyMap = Meta.map

;(async () => {
  const makeDir = join(__dirname, 'make')
  const rawStoryFile = join(makeDir, 'story.md.tmpl')
  const rawStoryContent = await fs.readFile(rawStoryFile, 'utf8')
  const storyContentFn = _.template(rawStoryContent)

  const storyTasks = Object.keys(storyMap).map(async key => {
    const storyContent = storyContentFn({
      ...storyMap[key],
      key
    })
    const storyFile = join(makeDir, `${key}.md`)
    await fs.writeFile(storyFile, storyContent)
  })

  const indexTask = (async () => {
    const rawIndexFile = join(makeDir, 'index.md.tmpl')
    const rawIndexContent = await fs.readFile(rawIndexFile, 'utf8')
    const indexContentFn = _.template(rawIndexContent)
    const indexContent = indexContentFn({ storyMap })
    const indexFile = join(makeDir, 'index.md')
    await fs.writeFile(indexFile, indexContent)
  })()

  await Promise.all([
    ...storyTasks,
    indexTask
  ])
})()
