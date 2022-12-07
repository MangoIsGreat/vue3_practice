// 通过rollup进行打包
// 一、引入相关依赖
import ts from "rollup-plugin-typescript2"; // 解析ts
import json from "@rollup/plugin-json"; // 解析json
import resolvePlugin from "@rollup/plugin-node-resolve"; // 解析第三方插件
import path from "path"; // 处理路径

// 二、获取要打包的包
// 获取文件路径
let packagesDir = path.resolve(__dirname, "packages");

// 获取需要打包的包
const packageDir = path.resolve(packagesDir, process.env.TARGET);
// 打包获取到每个包的项目配置
const resolve = (p) => path.resolve(packageDir, p);
const pkg = require(resolve(`package.json`)); // 获取json
const name = path.basename(packageDir);

// 创建一个表
const outputOpions = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: "iife",
  },
};

const options = pkg.buildOptions;

function createConfig(format, output) {
  // 进行打包
  output.name = options.name;
  output.sourcemap = true; // 开启sourcemap
  // 生成rollup配置
  return {
    input: resolve("src/index.ts"), // 导入
    output, // 导出配置
    plugins: [
      json(), // 解析json
      ts({
        // 解析ts
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
      }),
      resolvePlugin(), // 解析第三方插件
    ],
  };
}

// rullup需要导出一个配置
export default options.formats.map((format) =>
  createConfig(format, outputOpions[format])
);
