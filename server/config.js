const { join } = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const storyDir = join(__dirname, 'story')
const metaFile = join(storyDir, 'meta.yml')
const Meta = yaml.safeLoad(fs.readFileSync(metaFile, 'utf8'))
const storyList = Object.keys(Meta.map)

exports.storyDir = storyDir
exports.storyList = storyList
exports.outputDir = join(__dirname, 'output')
exports.sitePreDir = join(__dirname, '../site/dist')
exports.siteDir = join(__dirname, '../site/dist-release')
