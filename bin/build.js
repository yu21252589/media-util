var fs = require('fs');
const path = require('path');
const webpack = require('webpack')
const delDir = require('../node-util/index');

//生成webpack配置
fs.readdir(path.resolve(process.cwd(), './dictionaries'), function (err, files) {
  if (err) {
    return console.log('目录不存在，请手动新建目录',path.resolve(process.cwd(), './dictionaries'));
  }

  
  //剔除index.js
  let folderNames = files.filter(v => !(v.indexOf('index.js') > -1));
  let text = '';
  folderNames.map(folderName => {
    text = text +  `\t${folderName}: path.resolve(process.cwd(), './dictionaries/${folderName}/index.js'),\n`
  });
  let entryFile = `
  const path = require('path');
  module.exports =  {
      ${text}
    }
  `
  //生成webpack配置
  fs.writeFile('./config/entry.js', entryFile, err => {
    if (err) {
      console.error('错误',err)
      return
    }
    console.log('生成webpack配置...');
    delDir(path.resolve(process.cwd(), './lib'));
    const config = require('../config/demo.config');
    webpack(config,() => {
      console.log('执行完毕');
    }) 
  })
});
