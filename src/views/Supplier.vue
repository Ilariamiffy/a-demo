<template>
  <div id="app3">
    <!-- <h1>{{ msg }}</h1> -->
    <h2>1.常用指令</h2>
    <h3 v-bind:style="mystyle">&lt;&lt;书橱里的书&gt;&gt;</h3>
    <h4 class="info">这里用到v-bind,v-on,v-once,v-for,v-if,v-show</h4>
    <ul v-for="(book, index) in books" :key="book.name">
      <li>{{ index + 1 }}.书名为：&lt;&lt;{{ book.name }}&gt;&gt;的书
        初始库存为
        <span v-once>{{ book.num }}本</span>
        还剩{{ book.num }}本
        <button class="btn yellow" @click="book.num--">卖掉一本</button>
        <button class="btn green" @click="addbook(index)">进货一本</button>
        <el-tag v-show="book.num < 10" type="primary">这本书卖的很好</el-tag>
        <el-tag v-if="book.num >= 100" type="success">这本书库存充足</el-tag>
      </li>
    </ul>
    <div>
      <h4>以下是v-text绑定的数据</h4>
      <span v-text="msg" class="info"></span>
      <h4>以下是动态参数绑定的数据</h4>
      <a :[myatrr]="url" target="_blank">百度一下</a>
    </div>

    <h2>2.计算属性</h2>
    <div class="computed">
      <p>原始数据：{{ example }}</p>
      <p>计算属性计算后：{{ adda }}</p>
      <P>时间：{{ now }}</P>
      <p class="info">以下姓and名可通过输入框改变，同时大名会跟着改变</p>
      <p>我的姓是：{{ firstName }}</p>
      <input v-model="firstName" placeholder="改变我的姓" />
      <p>我的名是：{{ lastName }}</p>
      <input v-model="lastName" placeholder="改变我的名" />
      <p>那么我的大名是：{{ fullName }}</p>
      <p class="info">原数据不改变不会再次计算</p>
      <p>{{ indexstr }}</p>
    </div>
    <!-- 绑定html class -->
    <div class="bindclass">
      <span class="big" v-bind:class="myclass">我是绑定class的大号红色字体</span>
    </div>
    <!-- 绑定内联样式v-bind:style -->
    <!--  -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      // msg: '',
      myclass: {
        red: true,
      },
      msg: '我是helloworld页',
      books: [
        { name: '猫和老鼠', num: 9 },
        { name: '谁动了我的奶酪', num: 12 },
        { name: '认知天性', num: 100 },
      ],
      mystyle: 'color:deeppink;text-align:left',
      myatrr: 'href',
      url: 'https://www.baidu.com',
      example: '今天也是元气满满的一天噢！',
      firstName: '王',
      lastName: '大明',
      str: 'cat,bat,sat,fat',
      pat: /.at/,//正则表达式
    }
  },
  methods: {
    addbook(index) {
      this.books[index].num++;
    },
  },
  computed: {
    adda() {
      return this.example.split('').join('啊')
    },
    now() {
      return Date.now()
    },
    fullName() {
      return this.firstName + this.lastName;
    },
    indexstr() {
      let matches = this.str.match(this.pat)
      return matches[0];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app3 {
  margin: 0 auto;
  text-align: left;
}

h2 {
  text-align: center;
  color: red;
}

.btn {
  width: 100px;
}

.info {
  text-align: left;
  color: lightgrey;
}

a {
  color: gold;
}

a:hover {
  color: deeppink;
}

.big {
  font-size: 20px;
}
</style>
