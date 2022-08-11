const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 在项目运行时不进行eslint检测
  runtimeCompiler: true,//运行时版本也编译模板
  configureWebpack: () => {
    const plugins = []
    plugins.push(new NodePolyfillPlugin())
  },
})
