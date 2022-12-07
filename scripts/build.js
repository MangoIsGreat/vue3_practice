// 进行打包 monerepo
const fs = require("fs");
const execa = require("execa");

// 一、获取各模块
const dirs = fs.readdirSync("packages").filter((p) => {
  if (!fs.statSync(`packages/${p}`).isDirectory()) {
    return false;
  }
  return true;
});

console.log(dirs);

// 二、并行打包
async function build(target) {
  await execa("rollup", ["-c", "--environment", `TARGET:${target}`]);
}

async function runParaller(dirs, itemfn) {
  let result = [];
  for (let item of dirs) {
    result.push(itemfn(item));
  }
  return Promise.all(result);
}

runParaller(dirs, build).then(() => {
  console.log("成功");
});
