const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ask user for the anme input
rl.question('输入字典名称 ', (name) => {
  // 生成文件目录
  const url = path.resolve(process.cwd(), `./dictionaries/${name}`);
  fs.mkdir(url, { recursive: false }, (err) => {
    if (err) {
      console.log('目录已存在!请前往修改', path.resolve(process.cwd(), `./dictionaries/${name}/index.js`));
      process.exit();
    } else {
      const jsText = `export default  [
      ]`;
      fs.writeFile(path.resolve(process.cwd(), `./dictionaries/${name}/index.js`), jsText, () => {});
      const mdText = `###### ${name}`;
      fs.writeFile(path.resolve(process.cwd(), `./dictionaries/${name}/readme.md`), mdText, () => { });
      updataIndex(name);
    }
  });
});

/** 更新入口文件
 *\dictionaries\index.js 文件
 */
const updataIndex = (name) => {
  // 更新index文件入口
  fs.readdir(path.resolve(process.cwd(), './dictionaries'), (err, files) => {
    if (err) {
      return console.log('目录不存在');
    }
    console.log(files);
    // 剔除index.js
    const folderNames = files.filter((v) => !(v.indexOf('index.js') > -1));
    let t1 = '';
    let t2 = '';
    folderNames.map((folderName) => {
      t1 += `import ${folderName} from './${folderName}/index';\n`;
      t2 += `${folderName},\n`;
    });
    const newFile = `
      ${t1}
      export default {
        ${t2}
      };
    `;
    console.log('folderName', folderNames);
    // 生成webpack配置
    fs.writeFile(path.resolve(process.cwd(), './dictionaries/index.js'), newFile, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      toEditFile(name);
      process.exit();
    });
  });
};

// 快捷方式-前往文件
const toEditFile = (name) => {
  console.log('请前往编辑词典', path.resolve(process.cwd(), `./dictionaries/${name}/index.js`));
};
