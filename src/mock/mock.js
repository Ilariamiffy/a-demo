import Mock from 'mockjs';
import './member';//引入会员管理但不使用
import './goods';//引入商品管理
import './supplier';//引入供应商管理
import './worker';//引入员工管理

var list = []
const member =
{
    path: '/member',
    icon1: 'el-icon-s-custom',
    icon2: 'el-icon-location',
    title1: '会员管理',
    title2: '会员列表',
}
const goods = {
    path: '/goods',
    icon1: 'el-icon-s-goods',
    icon2: 'el-icon-location',
    title1: '商品管理',
    title2: '商品列表',
}
const supplier = {
    path: '/supplier',
    icon1: 'el-icon-s-order',
    icon2: 'el-icon-location',
    title1: '供应商管理',
    title2: '供应商列表',
}
const worker = {
    path: '/worker',
    icon1: 'el-icon-s-opportunity',
    icon2: 'el-icon-location',
    title1: '员工管理',
    title2: '员工列表',
};
const roles = {
    path: '/role',
    icon1: 'el-icon-s-opportunity',
    icon2: 'el-icon-location',
    title1: '角色管理',
    title2: '角色列表',
};

// var back = { 'token|1': 'mock-woshitoken' + '@now' }

// 拦截登录
Mock.mock('http://localhost:8080/mock/user/login', 'post', (option) => {
    // {}解构赋值 接受的属性名 要和解构前一样
    let { loginData } = JSON.parse(option.body)
    if (loginData.name == "小欣喜" && loginData.password == "2442") {
        // 直接返回mock数据要用Mock.mock()包裹
        return Mock.mock({
            'token|1': 'mock-woshitoken' + '@now',
            role: '超级管理员'
        });
    } else if (loginData.name == "小哦莫" && loginData.password == "2442") {
        return Mock.mock({
            'token|1': 'mock-woshitoken' + '@now',
            role: '高级管理员'
        });
    } else if (loginData.name == "小小" && loginData.password == "2442") {
        return Mock.mock({
            'token|1': 'mock-woshitoken' + '@now',
            role: '低级管理员'
        });
    }
})

//动态路由 返回菜单
Mock.mock(RegExp('http://localhost:8080/mock/user/getMenu' + '*'), 'get', (option) => {
    var role = option.url.split('getMenu/')[1]
    if (role == '超级管理员') return list.concat(member, goods, supplier, worker,roles)
    else if (role == '高级管理员') return list.concat(goods, supplier, worker)
    else if (role == '低级管理员') return list.concat(goods, worker)
})


