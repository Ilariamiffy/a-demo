<template>
    <div id="app">
        <el-container class="outer-container">
            <app-header />
            <el-container class="inner-container">
                <!--  :isCollapse='isCollapse'  -->
                <app-aside />
                <!-- <app-bread /> -->
                <app-main />
            </el-container>
        </el-container>
    </div>
</template>

<script>
//因为这里导出的名字是AppHeader,所以使用时是app-header
import AppHeader from '@/components/common/Header';
import AppAside from '@/components/common/Aside';
import AppMain from '@/components/common/Main';

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
    /* background-color: pink; */
    background-color: rgb(99, 200, 251);
}

.el-main {
    background-color: #ecf5ff;
}
</style>

