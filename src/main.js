import Vue from 'vue'
import App from './App.vue'
// import '@/assets/share.css'/*引入公共样式*/
import router from '@/router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import '@/mock';//单引入mock就好
import store from '@/store/vuex';
import echarts from '@/plugins/echarts-plugin'

Vue.config.productionTip = false
//elementui组件
Vue.use(ElementUI);
// 挂在到Vue实例，后面可通过this调用 即this.$axios=axios
Vue.prototype.$axios = axios;
//挂载echarts
Vue.prototype.$echarts=echarts;

//配置请求基础地址
// axios.defaults.baseURL = 'http://localhost:8080/api/';
// 配置mock请求地址
axios.defaults.baseURL = 'http://localhost:8080/mock/';

//请求拦截器
axios.interceptors.request.use(config => {
  // console.log("进入请求拦截器")
  config.headers.token = window.localStorage.getItem('token')
  return config;
}, err => {
  return Promise.reject(err);
})

//响应拦截器
axios.interceptors.response.use(res => {
  // console.log("进入响应拦截器")
  if (res.status == '200') return res;
  else console.log("响应返回代码不是200")
}, err => {
  return Promise.reject(err);
})


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


