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
import AppHeader from '@/components/Header';
import AppAside from '@/components/Aside';
import AppMain from '@/components/Main';

export default {
name:'app-layout',
    components: {
        AppHeader, AppAside, AppMain
    },
    data() {
        return {
            activeName: '',
            isCollapse: false,
        }
    },
    methods: {
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
    /* background-color: pink; */
    background-color: rgb(99, 200, 251);
}

.el-main {
    background-color: #ecf5ff;
}
</style>

