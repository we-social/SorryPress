const fs = require('fs-extra')
const { siteDir, sitePreDir, storyDir, outputDir } = require('../config')

fs.ensureDirSync(storyDir)
fs.ensureDirSync(outputDir)
fs.ensureDirSync(sitePreDir)
fs.ensureDirSync(siteDir)

fs.emptyDirSync(siteDir)
fs.copySync(sitePreDir, siteDir)
