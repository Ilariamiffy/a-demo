<template>
    <div id="welcome">
        <h1>主要模块是会员管理</h1>
        <img src="@/assets/sheep.jpg" alt="出错了">
    </div>

</template>

<script>
export default {
    name:'app-welcome',
    data() {
        return {
            name: '新组件的',
            path: '新路径',
        }
    },
    methods: {
        getVuex() {
            // console.log("vuex的面包屑-" + this.$store.state.breadCrumb.name)
            // this.$store.commit('')
        },

    }
}
</script>

<style scoped>
img {
    width: 400px;
    height: 400px;
}
</style>