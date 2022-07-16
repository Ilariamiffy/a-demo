<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <Hello msg="app页传过来的数据" /> -->
    <!-- 这是展示link跳转到的页面内容 -->
    <router-view></router-view>

    <div class="content">
      <router-link to="/">
        <button class="btn blue">跳转到首页</button>
      </router-link>
    </div>



  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content {
  /* margin-top: 20px; */
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
