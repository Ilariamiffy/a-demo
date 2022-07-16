<template>
    <div id="app1">

        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="回到主页" name="zero">回到主页</el-tab-pane>
            <el-tab-pane label="用户管理" name="first">测试管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">你好管理</el-tab-pane>
        </el-tabs> -->
        <h1>{{ msg }}</h1>
        <ul>
            <li>
                <router-link to="/layout">
                    <button class="btn green">跳转到layout </button>
                </router-link>
            </li>
            <li>
                <router-link to="/helloworld">
                    <button class="btn green">跳转到helloworld </button>
                </router-link>
            </li>
            <li>
                <router-link to="/test">
                    <button class="btn yellow">跳转到test</button>
                </router-link>
            </li>
            <!-- <li>
                <router-link to="/hello">
                    <button class="btn green">跳转到hello</button>
                </router-link>
            </li> -->
        </ul>
    </div>
</template>

<script>
//不能写成对象形式 ?
export default {
    data() {
        return {
            msg: '',
            // msg: '我是hello主页',
            activeName: '',
        }
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab.name, event);
            if (tab.name == 'zero') this.$router.push('/hello')
            else if (tab.name == 'first') this.$router.push('/test')
            else if (tab.name == 'second') this.$router.push('/helloworld')
        }
    }
}
</script>

<style scoped>
@import url('@/assets/share.css');
@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
</style>
