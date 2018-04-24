const { join } = require('path')

const storyDir = join(__dirname, 'story')
const Meta = require(join(storyDir, 'meta.json'))
const storyList = Object.keys(Meta)

exports.storyDir = storyDir
exports.storyList = storyList
exports.outputDir = join(__dirname, 'output')
exports.siteDir = join(__dirname, '../site/dist')
