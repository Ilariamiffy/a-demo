<template>
  <div id="app">
    <!-- 这是展示link跳转到的页面内容 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  mounted() {
  }
}
</script>

<style>
/* 引用公共样式 */
@import url('@/assets/css/base.css');/* 初始化css */
@import url('@/assets/css/common.css');/* pink-web的公共样式 */
@import url('@/assets/css/share.css');/* member-ms的公共样式 */

/* 侧边栏撑满 */
html,
body,
#app,
.el-container {
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
