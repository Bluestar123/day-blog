const copydir = require('node-copydir')
const removeDir = require('./clearDist')

const dir = 'docs/.vitepress/dist'

copydir(dir,'dist')
removeDir(dir)