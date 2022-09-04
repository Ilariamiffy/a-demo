import Vue from "vue";
import VueRouter from "vue-router";
// 登录
import Login from "@/views/Login";
// 会员管理系统member-ms
import Layout from "@/components/Layout";
import Goods from "@/views/member-ms/Goods";
import Member from "@/views/member-ms/Member";
import Supplier from "@/views/member-ms/Supplier";
import Worker from "@/views/member-ms/Worker";
import Welcome from "@/views/member-ms/Welcome";
import Role from "@/views/member-ms/Role";
// pink的wb
import Home from "@/views/pink-wb/Home";
// 前端improve练习
import Drag from "@/views/improve/drag/Drag";
import WaterFall from "@/views/improve/waterFall/WaterFall";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // 公用路由
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    // 会员管理路由
    {
      path: "/layout",
      component: Layout,
      redirect: "/welcome",
      //设置子路由，可以让以下界面展示在main部分
      children: [
        //设置meta可传给面包屑
        { name: "welcome", path: "/welcome", component: Welcome, meta: "首页" },
        { name: "goods", path: "/goods", component: Goods, meta: "商品列表" },
        {
          name: "member",
          path: "/member",
          component: Member,
          meta: "会员列表",
        },
        {
          name: "supplier",
          path: "/supplier",
          component: Supplier,
          meta: "供应商列表",
        },
        {
          name: "worker",
          path: "/worker",
          component: Worker,
          meta: "员工列表",
        },
        { name: "role", path: "/role", component: Role, meta: "角色管理" },
      ],
    },
    // pink-wb路由
    { path: "/home", component: Home },
    // 前端improve练习路由
    { path: "/drag", component: Drag },
    { path: "/waterFall", component: WaterFall },
  ],
});

export default router;
