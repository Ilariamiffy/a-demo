<template>
    <el-main>
        <!-- <h1>你好 我是Main</h1> "$route.path"-->
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/welcome' }" v-show="$route.meta != '首页'">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="$route.path"><b class="bread-list">{{ $route.meta }}</b> </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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
.bread {
    height: 30px;
}

/* 光标变成小手指 */
.bread-list {
    cursor: pointer;
}
</style>
