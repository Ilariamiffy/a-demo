import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/Layout';
import Goods from '@/views/Goods';
import Member from '@/views/Member';
import Supplier from '@/views/Supplier';
import Worker from '@/views/Worker';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/layout' },
        {
            path: '/layout', component: Layout,
            //设置子路由，可以让以下界面展示在main部分
            children: [
                { path: '/goods', component: Goods },
                { path: '/member', component: Member },
                { path: '/supplier', component: Supplier },
                { path: '/worker', component: Worker },
            ]
        },

    ]
})

export default router
