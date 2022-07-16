<template>
  <!-- 父组件 -->
  <div id="app2">
    <h1> {{ msg }}</h1>
    <span v-text="'展示一些数据'"></span>
    <br />
    {{ msg }}
    <br />
    <br />
    <!-- <my-blog title="first blog"></my-blog> -->
    <!-- enlarge-texts是父组件的方法，在子组件$emit了这个方法名，致使该方法可以生效 这是子传父，监听子组件事件-->

    <div :style="{ fontSize: blogSize + 'em', color: blogColor, }">
      <!-- <my-blog :title="myTitle"></my-blog> -->
      <!-- 父组件接受子组件的参数，写法一用$event接收 -->
      <!-- <my-blog v-for="blog in blogs" :key="blog.id" :blog="blog" @enlarge-text='blogSize += $event'>

      </my-blog> -->
      <!-- 父组件接受子组件的参数，写法二用函数参数接收 -->
      <my-blog v-for="blog in blogs" :key="blog.id" :blog="blog" @enlarge-text='enlargeSize'>

      </my-blog>

    </div>
    <alert-box class="red">我想插入这条内容</alert-box>

  </div>
</template>

<script>
import { setBlockTracking } from '@vue/runtime-core'
import Vue from 'vue'

// 注册的，被使用的，是子组件
Vue.component('my-blog', {
  props: ['blog', 'title'],//定义为新组件的属性，属性可以赋值，为了父传子
  template: `
  <div class="my-blog">

      <h3>{{blog.title}}</h3>
        <button v-on:click="$emit('enlarge-text',0.1)">
          Enlarge text
        </button>
      <div v-html="blog.content"></div>
    </div>
  `
  // $emit第一个字符串是事件名，后面的都是参数
  // template: '<h3>{{title}}</h3>',
})
Vue.component('alert-box', {
  template: `
  <div class="demo-alert">
     <strong>Error!</strong>
     <slot></slot>
  </div>
`
})
export default {
  name: 'ATest',
  data() {
    return {
      msg: 'Hello World!我是test页面',
      blog: {
        title: 'woshibiaoti',
        content: '<h4>neirouzaizheer</h4>'
      },
      blogs: [
        { id: 1, title: "one tree" },
        { id: 2, title: "two rabbits" },
        { id: 3, title: "three tigers" },
      ],
      blogSize: 1,
      blogColor: "black",
      myTitle: '我是显示的而标题'
    }
  },
  methods: {
    enlargeSize(step) {
      this.blogSize += step
      // this.blogColor = color
    }
  },
}
</script>

<style scoped>
</style>
 




