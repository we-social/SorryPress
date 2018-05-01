const { join } = require('path')
const fs = require('fs')

const storyDir = join(__dirname, 'story')
const metaFile = join(storyDir, 'meta.js')
const Meta = require(metaFile)
const storyList = Object.keys(Meta.map)

exports.storyDir = storyDir
exports.storyList = storyList
exports.outputDir = join(__dirname, 'output')
exports.sitePreDir = join(__dirname, '../site/dist')
exports.siteDir = join(__dirname, '../site/dist-release')
