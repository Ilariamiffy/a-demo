<template>
  <el-main class="content">
    <div class="price">
      <span class="now"
        >1600
        <i></i>
      </span>
      <span class="origin">5600</span>
    </div>
    <form action="">
      <input type="tel" />
      <button type="submit" value="tijiao">提交</button>
    </form>

    <!-- <div class="left-rect"></div>
    <div class="trangile"></div>
    <div class="right-rect"></div> -->
  </el-main>
</template>

<script>
export default {
  name: "app-test",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
.content {
  /* width: 400px; */
  padding: 0;
  margin: 20px auto;
  /* background-color: palegoldenrod; */
}
.content .left-rect,
.content .right-rect {
  display: inline-block;
  width: 200px;
  height: 100px;
  vertical-align: middle;
  background-color: palegreen;
}
.content .right-rect {
  background-color: white;
}
.content .trangile {
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  border-top: 100px solid palegreen;
  border-right: 50px solid white;
  /* border-bottom:50px solid pink; */
  /* border-left:50px solid deeppink; */
}

.price {
  width: 500px;
  height: 100px;
  margin: 0 auto;
  line-height: 100px;
  background-color: #fff;
  // border: 1px solid gray;
}

.price .now {
  position: relative;
  display: inline-block;
  float: left;
  width: 300px;
  height: 100px;
  background-color: pink;
}

.price .now i {
  position: absolute;
  width: 0;
  height: 0;
  right: 0;
  border-color: transparent white transparent transparent;
  border-style: solid;
  border-width: 100px 50px 0 0;
}
</style>
