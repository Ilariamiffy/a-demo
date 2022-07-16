<template>
    <div id="app">
        <el-container class="outer-container">
            <app-header />
            <el-container class="inner-container">
                <app-aside />
                <app-main />
            </el-container>
        </el-container>
    </div>
</template>

<script>
//因为这里导出的名字是AppHeader,所以使用时是app-header
import AppHeader from '@/components/app-header/Header';
import AppAside from '@/components/app-aside/Aside';
import AppMain from '@/components/app-main/Main';

export default {
    components: {
        AppHeader, AppAside, AppMain
    },
    data() {
        return {
            activeName: '',
        }
    },
    methods: {
        handleClick(tab) {
            console.log("进来了")
            if (tab.name == 'zero') this.$router.push('/hello')
            else if (tab.name == 'first') this.$router.push('/test')
            else if (tab.name == 'second') this.$router.push('/helloworld')
        }
    }
}
</script>

<style scoped>
.outer-container {
    flex-direction: column;
}

.inner-container {
    height: 100%;
    background-color: aliceblue;
}

.el-header {
    width: 100%;
    /* height: 600px;//header没有这个属性 */
    background-color: pink;
}

.el-aside {
    background-color: rgb(212, 240, 156);
}

.el-main {
    background-color: #ecf5ff;
}
</style>

