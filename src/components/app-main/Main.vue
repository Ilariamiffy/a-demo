<template>
    <el-main>
        <h1>你好 我是Main</h1>
        <!-- 让菜单的路由跳转显示到这里 -->
        <router-view></router-view>
    </el-main>
</template>

<script>
export default {
    props: ['tab', 'value'],
}
</script>

<style scoped>
</style>
