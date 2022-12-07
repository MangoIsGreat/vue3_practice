// 进行打包 monerepo
const execa = require("execa");

// 打包
// {stdio: "inherit"} -- 子进程的输出在父包中输出
// -cw c:执行 w:观察
async function build(target) {
  await execa("rollup", ["-cw", "--environment", `TARGET:${target}`], {
    stdio: "inherit",
  });
}

build("reactivity");
