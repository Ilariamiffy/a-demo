<template>
  <div>
    <!-- <h1 class="w">这是pink-wb主页</h1> -->
    <section class="shortcut">
      <div class="w">
        <div class="fl">
          <ul>
            <li>品优购欢迎你! &nbsp;</li>
            <li>
              <a href="#">请登录</a> &nbsp;
              <a href="#" class="text-red">免费注册</a>
            </li>
          </ul>
        </div>
        <div class="fr">
          <ul>
            <li>我的订单</li>
            <li></li>
            <li class="arrow-icon">我的品优购</li>
            <li></li>
            <li>品优购会员</li>
            <li></li>
            <li>企业采购</li>
            <li></li>
            <li class="arrow-icon">关注品优购</li>
            <li></li>
            <li class="arrow-icon">客户服务</li>
            <li></li>
            <li class="arrow-icon">网站导航</li>
          </ul>
        </div>
      </div>
    </section>
    <header class="header w">
      <div class="logo">
        <h1><a href="home.vue" title="pink网站"></a></h1>
      </div>
      <div class="search">
        <input type="search" name="search" id="" placeholder="语言学习" />
        <button>搜索</button>
      </div>
      <div class="hotwords">
        <a href="#" class="text-red">优惠购首发</a>
        <a href="#">亿元优惠</a>
        <a href="#">9.9元团购</a>
        <a href="#">每满99减30</a>
        <a href="#">办公用品</a>
        <a href="#">电脑</a>
        <a href="#">通信</a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "app-home",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
