const fs = require('fs-extra')
const { storyDir, outputDir } = require('../config')

fs.ensureDirSync(storyDir)
fs.ensureDirSync(outputDir)
