// 进行打包 monerepo
const fs = require("fs");

const dirs = fs.readdirSync("packages").filter((p) => {
  if (!fs.statSync(`packages/${p}`).isDirectory()) {
    return false;
  }
  return true;
});

console.log(dirs);
