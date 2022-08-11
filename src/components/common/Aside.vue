<template>
    <el-aside :width="collapseWidth">
        <div class="aside">
            <!-- <h1>你好 我是asider</h1> -->
            <!-- 意为在父组件的使用中，将a的href属性变为url-->
            <!-- <a v-bind:href="url"></a> -->
            <div class="fold-div" @click="ifCollapse = !ifCollapse">
                <i :class="{
                    'el-icon-s-fold': !ifCollapse,
                    'el-icon-s-unfold': ifCollapse,
                    'fold-icon': true,
                }"></i>
            </div>
            <el-menu router :collapse="ifCollapse" unique-opened>
                <!-- 基础路由部分 -->
                <el-menu-item index="/welcome">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <!-- <el-menu-item index="/test">
                    <i class="el-icon-eleme"></i>
                    <span slot="title">测试管理</span>
                </el-menu-item> -->
                <!-- 动态路由部分 -->
                <el-submenu :index="menu.path" v-for="menu in menus" :key="menu.path">
                    <template slot="title">
                        <i :class="menu.icon1"></i>
                        <span slot="title">{{ menu.title1 }}</span>
                    </template>
                    <el-menu-item :index="menu.path">
                        <i :class="menu.icon2"></i>
                        <span slot="title">{{ menu.title2 }}</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </el-aside>
</template>     

<script>
export default {
    name:'app-aside',
    data() {
        return {
            role: '',
            ifCollapse: false,
            collapseWidth: '200px',
            foldIconClass: 'el-icon-s-fold',
            menus: [
                {
                    path: '/member',
                    icon1: 'el-icon-user-solid',
                    icon2: 'el-icon-user',
                    title1: '会员管理',
                    title2: '会员列表',
                },
            ],
        }
    },
    watch: {
        ifCollapse: function (val) {
            // val是 "是否折叠"的新值
            if (val == true) this.collapseWidth = '60px'
            else if (val == false) this.collapseWidth = '200px'
        },
    },
    created() {
        this.getList()
    },
    methods: {
        //动态获取菜单
        getList() {
            this.role = window.localStorage.getItem('role')
            this.$axios.get('user/getMenu/' + this.role).then(res => {
                if (res.status == 200) {
                    this.menus = res.data;
                }
            }).catch(err => {
                console.log(err.message)
            })
        },
    },
}
</script>

<style scoped>
/* 重新命名侧边栏 侧边栏包裹的里面那个div*/
.aside {
    /* width: 180px; */
    height: 100%;
    background-color: rgb(212, 240, 156);
}

/* el-aside组件 */
.el-aside {
    width: "auto";
    /* width: 180px; */
    /* background-color: rgb(212, 240, 156); */
}

/* 菜单hover和focus颜色 */
.el-menu-item:focus,
.el-menu-item:hover {
    background-color: #ecf5ff;
}

.el-menu {
    background-color: rgb(212, 240, 156);
}

.fold-div {
    /* position: relative; */
    width: 100%;
    height: 25px;
    line-height: 30px;
    background-color: yellow;
}

.fold-icon {
    font-size: 20px;
}
</style>
