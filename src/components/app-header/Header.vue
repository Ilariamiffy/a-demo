<template>
  <el-header class="header">
    <h1>会员管理系统demo</h1>

    <!-- <input type="text" :value="value" @change="$emit('input', $event.target.value)">
    {{ value }} -->
    <!-- <el-tabs :name="value" @change="$emit('tab-click', $event.target.name)">
      <el-tab-pane label="回到主页" name="zero"></el-tab-pane>
      <el-tab-pane label="测试管理" name="first"></el-tab-pane>
      <el-tab-pane label="你好管理" name="second"></el-tab-pane>
    </el-tabs> -->

  </el-header>
</template>

<script>
export default {
  props: ['tab', 'value'],
  // props: {
  //   checked: Boolean,
  // },
  //   return {
  //     activeName: '',
  //   }
  // },
  // methods: {
  //   handleClick(tab, event) {
  //     if (tab.name == 'zero') this.$router.push('/hello')
  //     else if (tab.name == 'first') this.$router.push('/test')
  //     else if (tab.name == 'second') this.$router.push('/helloworld')
  //   }
  // }
}
</script>

<style scoped>
@import url('@/assets/share.css');
@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
</style>
