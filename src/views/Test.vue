<template>
  <el-main class="main-content">
    <div>
      <p class="content">{{ content }}</p>
      <br />
      <div class="sum">
        文章共有
        <u>{{ sum }}</u>个单词
      </div>
      <div class="freq-box">
        <div class="freq">单词频次：</div>
        <div class="freq-list">
          <!-- 渲染map -->
          <!-- <ul v-for="(word, index) in wordMap" :key="index">
                        <li>{{ word[0] }}: {{ word[1] }}次</li>
          </ul>-->
          <!-- 先传给数组，再渲染数组 -->
          <ul v-for="word in words" :key="word.id">
            <li>{{ word.name }}: {{ word.num }}次</li>
          </ul>
        </div>
        <el-button class="test-btn" :type="btnType" @click="sortFreq()">{{ btnText }}</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      content:
        "Globally,we have moved we a a a on a television,cable,AM and FM radio and telephone into a digital society with mass media,streaming information,intelligent computer.To shift to a digital economy,best demonstrated by the explosive growth of the Internet,is transforming everyday products and practices.Ideas expressed in soft wares,chips,communication systems,financial institutions and mass media have enormous leverage worldwide.Beyond emails and online shopping,the Internet promises to change dramatically huge spectrum activities.Its benefits can be well illustrated in the following aspects.",
      sum: 0,
      words: [],
      btnType: "success",
      btnText: "正序",
      wordMap: []
    };
  },
  created() {
    this.count();
  },
  methods: {
    // 计算总数和频次
    count() {
      //trim()去除前后空格
      // 正则表达式//表示""
      // 将.用中括号括起来表示普通的点不是任意字符串
      var arr = this.content.trim().split(/,|[.]| /);
      arr.pop(); //去除原字符串最后一个结束符
      this.sum = arr.length;
      var mid = new Map(); //用map存次数
      arr.forEach(item => {
        if (mid.has(item) == false) {
          mid.set(item, 1);
        } else {
          var num = mid.get(item);
          mid.set(item, ++num);
        }
      });
      var cnt = 0;
      this.wordMap = mid;
      // for of是遍历map的新语法
      for (let item of mid) {
        // map的每一项是一个数组
        // console.log(item)
        this.words.push({
          id: cnt++,
          name: item[0],
          num: item[1]
        });
      }
      // console.log(this.words[0])
      //为啥前面有个空白项 因为你初始化的时候写入的，后续加新值是在初始化的值之后
      // this.words.shift()
    },
    // 排序
    sortSmall(a, b) {
      return a.num - b.num; //比较函数用减法不用大小符号
    },
    sortBig(a, b) {
      return b.num - a.num;
    },
    sortFreq() {
      if (this.btnText == "正序") {
        this.words.sort(this.sortSmall);
        this.btnText = "倒序";
        this.btnType = "primary";
      } else if (this.btnText == "倒序") {
        this.words.sort(this.sortBig);
        this.btnText = "正序";
        this.btnType = "success";
      }
    }
  }
};
</script>

<style scoped>
.main-content {
  padding: 0;
}

.content {
  text-align: left;
  text-indent: 2em;
  line-height: 30px;
  letter-spacing: 1px;
  /* background-color: aqua; */
}

.sum {
  text-align: left;
}

.freq-box {
  margin-top: 20px;
}

.freq,
.freq-list {
  float: left;
  /* background-color: pink; */
}

.test-btn {
  float: right;
}
</style>
