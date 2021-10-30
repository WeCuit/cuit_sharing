const path = require('path');
const fs = require('fs');
// 获取指定路径 path 下的，默认深度为 3 的目录 JSON
function getIndexByPath(dir, ignoreName = [], deep = 3) {
    let dirDivide = dir.split('/');
    let preDir = dirDivide.splice(0, dirDivide.length - 1).join('/');
    let index = [];
    getIndexOfPathByDeep(index, path.join(__dirname, preDir), dirDivide[0], ignoreName, deep + 1);
    return index;
}
// 开始对指定 path 递归查找深度为 deep 深度
function getIndexOfPathByDeep(obj, dir, curDir, ignoreName, deep) {
    let curPath = path.join(dir, curDir);
    if(ignoreName.indexOf(curDir) != -1)return;
    let curEle = {};
    // 达到搜索深度，停止
    if(deep) {
        curEle.name = curDir;
        obj.push(curEle)
        if(fs.statSync(curPath).isDirectory()) {
            // 目录
            curEle.type = "directory"
            curEle.list = []
            let lists = fs.readdirSync(curPath);
            lists.forEach(name => getIndexOfPathByDeep(curEle.list, curPath, name, ignoreName, deep - 1))
        }else{
            // 文件
            curEle.type = "file"
        }
    }
 
}
let index = getIndexByPath("./../../", [".git", ".github"], 5)
let file = path.resolve(__dirname, './../../dist/result.json')
fs.writeFileSync(file, JSON.stringify(index))
console.log(JSON.stringify(index))