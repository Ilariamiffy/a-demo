const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 在项目运行时不进行eslint检测
  runtimeCompiler: true,//运行时版本也编译模板
})
