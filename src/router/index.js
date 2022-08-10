import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/Layout';
import Goods from '@/views/Goods';
import Member from '@/views/Member';
import Supplier from '@/views/Supplier';
import Worker from '@/views/Worker';
import Welcome from '@/views/Welcome';
import Login from '@/views/Login';
import Test from '@/views/Test';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: Login },
        {
            path: '/layout', component: Layout,
            redirect: 'welcome',
            //设置子路由，可以让以下界面展示在main部分
            children: [//设置meta可传给面包屑
                { path: '/welcome', component: Welcome, meta: '首页' },
                { path: '/test', component: Test, meta: '测试' },
                { path: '/goods', component: Goods, meta: '商品列表' },
                { path: '/member', component: Member, meta: '会员列表' },
                { path: '/supplier', component: Supplier, meta: '供应商列表' },
                { path: '/worker', component: Worker, meta: '员工列表' },
            ]
        },

    ]
})

export default router
