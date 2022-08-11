import Vue from 'vue';
import Vuex from 'vuex';

//先call，再创建仓库
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // return {
        count: 0,
        breadCrumb: {
            name: '原组件的',
            path: '原路径',
        },
        //菜单
        menus: [],

        // }
    },
    // 同步修改state数据
    mutations: {
        changeBread(state,name, path) {
            state.breadCrumb.name = name;
            state.breadCrumb.path = path;
        },
        //动态获取菜单
        getMenu(role) {
            // var role = window.localStorage.getItem('role')
            this.$axios.get('user/getMenu/' + role).then(res => {
                if (res.status == 200) {
                    this.menus = res.data;
                    // return this.menus;
                }
            }).catch(err => {
                console.log(err.message)
            })
        },
        getText(role) {
            console.log("能接受参数：" + role)
        },
    },
    //异步执行mutations中方法
    actions: {
        getMenuFun(context, role) {
            context.commit('getText', role)
        }
    }
})

// 因在main.js里需引入，所以要先在这里导出
export default store;