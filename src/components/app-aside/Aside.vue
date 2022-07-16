<template>
    <el-aside>
        <h1>你好 我是asider</h1>
        <!-- 意为在父组件的使用中，将a的href属性变为url-->
        <!-- <a v-bind:href="url"></a> -->
        <div class="fold-div" @change="$emit(changeFold)">
            <i :class="foldIcon"></i>
        </div>
        <el-menu router :collapse="isCollapse" unique-opened>
            <el-menu-item index="/">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/member">
                <i class="el-icon-setting"></i>
                <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="/goods">
                <i class="el-icon-menu"></i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/supplier">
                <i class="el-icon-document"></i>
                <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="worker">
                <i class="el-icon-setting"></i>
                <span slot="title">员工管理</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    name: "AppAside",
    props: ['isCollapse', 'foldIcon'],
    // props: {
    //     value: String,
    //     collapse: { default: true }
    // },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        toRouter(path) {
            this.$router.push(path)
        },
    },
}
</script>

<style scoped>
.el-aside {
    width: 200px;
}

.el-menu {
    background-color: rgb(212, 240, 156);
}

.fold-div {
    width: 300px;
    height: 20px;
    background-color: yellow;
}
</style>
