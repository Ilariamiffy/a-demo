import Mock from "mockjs";
import "./member"; //引入会员管理但不使用
import "./goods"; //引入商品管理
import "./supplier"; //引入供应商管理
import "./worker"; //引入员工管理
import roleFac from "./role"; //引入角色管理

var menulist = [];
const member = {
  path: "/member",
  icon1: "el-icon-s-custom",
  icon2: "el-icon-location",
  title1: "会员管理",
  title2: "会员列表",
};
const supplier = {
  path: "/supplier",
  icon1: "el-icon-s-order",
  icon2: "el-icon-location",
  title1: "供应商管理",
  title2: "供应商列表",
};
const goods = {
  path: "/goods",
  icon1: "el-icon-s-goods",
  icon2: "el-icon-location",
  title1: "商品管理",
  title2: "商品列表",
};

const roles = {
  path: "/role",
  icon1: "el-icon-s-opportunity",
  icon2: "el-icon-location",
  title1: "角色管理",
  title2: "角色列表",
};

// 拦截登录
Mock.mock("http://localhost:8080/mock/user/login", "post", (option) => {
  // {}解构赋值 接受的属性名 要和解构前一样
  let { loginData } = JSON.parse(option.body);
  let { list, users } = roleFac;
  let user = users.filter((item) => {
    return item.name === loginData.name && item.password === loginData.password;
  });
  if (user == "") {
    let user1 = users.filter((item) => {
      return item.name === loginData.name;
    });
    if (user1 == "")
      return {
        code: "2",
        msg: "用户不存在",
      };
    else if (user1 != "")
      return {
        code: "3",
        msg: "密码错误",
      };
  }
  let role = list.filter((item) => {
    return item.name === user[0].role;
  });
  return Mock.mock({
    code: "1",
    "token|1": "mock-woshitoken" + "@now",
    role: user[0].role,
    roleOper: role[0].operation,
  });
});

//动态路由 返回菜单
Mock.mock(
  RegExp("http://localhost:8080/mock/user/getMenu" + "*"),
  "get",
  (option) => {
    let roleOper = option.url.split("getMenu/")[1];
    let newMenu = menulist;
    if (roleOper.includes("member-menu")) newMenu = newMenu.concat(member);
    if (roleOper.includes("supplier-menu")) newMenu = newMenu.concat(supplier);
    if (roleOper.includes("goods-menu")) newMenu = newMenu.concat(goods);
    if (roleOper.includes("role-menu")) newMenu = newMenu.concat(roles);
    return newMenu;
    // if (role == "超级管理员")
    //   return menulist.concat(member, supplier, goods, roles);
    // else if (role == "高级管理员") return menulist.concat(supplier, goods);
    // else if (role == "低级管理员") return menulist.concat(goods);
  }
);
