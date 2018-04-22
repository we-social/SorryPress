const fs = require('fs-extra-promise')
const { storyDir, outputDir } = require('../config')

fs.ensureDirSync(storyDir)
fs.ensureDirSync(outputDir)
