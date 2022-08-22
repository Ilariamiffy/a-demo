<template>
  <div id="welcome">
    <el-card class="card">
      <div slot="header"><b>系统角色的菜单访问权限散点图</b></div>
      <!-- <img src="@/assets/sheep.jpg" alt="出错了" /> -->
      <!-- <div id="pieChart" style="width: 400px; height: 400px"></div> -->
      <div id="scatterChart" style="width: 90%; height: 400px"></div>
      <!-- <div class="info">注：绿色为当前角色</div> -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-welcome",
  data() {
    return {
      role: "",
      roleList: [],
      roleName: [],
      showAxis: [],
      nowAxis: [],
    };
  },
  created() {
    // this.getList();
    this.role = window.localStorage.getItem("role");
  },
  mounted() {
    // this.drawPie();
    this.drawScatter();
  },
  methods: {
    //绘制散点图
    async drawScatter() {
      var scatterChart = this.$echarts.init(
        document.getElementById("scatterChart")
      );
      await this.getList();
      scatterChart.setOption({
        yAxis: {
          name: "菜单访问权限",
          data: ["角色管理", "会员管理", "供应商管理", "商品管理"],
        },
        xAxis: {
          name: "角色",
          data: this.roleName,
        },
        legend: {
          data: [
            {
              name: "当前角色",
              icon: "rect",
            },
            {
              name: "其它角色",
              icon: "rect",
            },
          ],
          orient: "vertical",
          x: "right",
          y: "top",
        },
        series: [
          {
            name: "当前角色",
            type: "scatter",
            data: this.nowAxis,
            symbolSize: 25,
            symbol: "triangle",
            itemStyle: {
              color: "green",
            },
          },
          {
            name: "其它角色",
            type: "scatter",
            data: this.showAxis,
            symbolSize: 25,
            symbol: "triangle",
            itemStyle: {
              color: "gray",
            },
          },
        ],
      });
    },
    //查所有角色
    async getList() {
      await this.$axios
        .get("/role/getAll")
        .then((res) => {
          if (res.status == "200") {
            this.roleList = res.data;
            var _this = this; //箭头函数里不能用this
            this.roleList.forEach((item) => {
              _this.roleName.push(item.name);
              if (item.name == _this.role) {
                if (item.operation.includes("member-menu"))
                  _this.nowAxis.push([item.name, "会员管理"]);
                if (item.operation.includes("supplier-menu"))
                  _this.nowAxis.push([item.name, "供应商管理"]);
                if (item.operation.includes("goods-menu"))
                  _this.nowAxis.push([item.name, "商品管理"]);
                if (item.operation.includes("role-menu"))
                  _this.nowAxis.push([item.name, "角色管理"]);
              } else {
                if (item.operation.includes("member-menu"))
                  _this.showAxis.push([item.name, "会员管理"]);
                if (item.operation.includes("supplier-menu"))
                  _this.showAxis.push([item.name, "供应商管理"]);
                if (item.operation.includes("goods-menu"))
                  _this.showAxis.push([item.name, "商品管理"]);
                if (item.operation.includes("role-menu"))
                  _this.showAxis.push([item.name, "角色管理"]);
              }
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      console.log(this.showAxis);
    },
    getVuex() {
      // console.log("vuex的面包屑-" + this.$store.state.breadCrumb.name)
      // this.$store.commit('')
    },
  },
};
</script>

<style scoped>
img {
  width: 400px;
  height: 400px;
}
.card {
  width: 100%;
  height: 500px;
}
</style>
