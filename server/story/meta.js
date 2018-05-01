const { join } = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const metaFile = join(__dirname, 'meta.yml')
const Meta = yaml.safeLoad(fs.readFileSync(metaFile, 'utf8'))

module.exports = Meta
