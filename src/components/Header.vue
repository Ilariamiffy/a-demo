<template>
  <el-header class="header">
    <div class="head-img">
      <img src="@/assets/img/tianxian.png" alt="出错了" />
      <!-- <h1>No.2442会员管理系统</h1> -->
    </div>
    <h1>No.2442会员管理系统</h1>
    <!-- class="user-name" -->
    <div class="info">
      <span class="info1">{{ user.name }}: {{ user.role }}</span>
      <i class="el-icon-refresh" style="color: #2c5066; font-weight: bold"></i>
      <el-button
        class="info2"
        type="text"
        style="color: #2c5066; font-size: 16px"
        @click="showChangeRole()"
        >切换</el-button
      >
      <i
        class="el-icon-switch-button"
        style="color: #2c5066; font-weight: bold"
      ></i>
      <el-button
        class="info3"
        type="text"
        style="color: #2c5066; font-size: 16px"
        @click="logout()"
        >退出</el-button
      >
    </div>
    <!-- 切换角色对话框 -->
    <el-dialog
      title="切换角色"
      :visible.sync="dialogRoleVisible"
      center
      width="400px"
    >
      <el-form label-width="160px">
        <el-form-item label="请选择需要切换的角色">
          <el-select v-model="checkedRole" clearable>
            <el-option
              v-for="(role, index) in roleList"
              :key="index"
              :label="role.name"
              :value="role.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogRoleVisible = false"
            >取消</el-button
          >
          <el-button type="primary" @click="changeRole()">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-header>
</template>

<script>
export default {
  name: "app-header",
  data() {
    return {
      user: {},
      roleList: [], //可选择的role
      checkedRole: "",
      dialogRoleVisible: false,
    };
  },
  created() {
    this.user.name = window.localStorage.getItem("name");
    this.user.role = window.localStorage.getItem("role");
    this.checkedRole = this.user.role;
  },
  //引入vuex变量
  // computed: {
  // ...mapState([menus])
  // },
  //引入vuex方法
  // methods: {
  //   ...mapActions([
  //     "getMenuFun",
  //   ])
  // },
  methods: {
    logout() {
      window.localStorage.clear(); //清空localstorage
      this.$router.push("/");
    },
    showChangeRole() {
      // if (this.user.role == '超级管理员') this.roleList = ['超级管理员', '高级管理员', '低级管理员']
      // else if (this.user.role == '高级管理员') this.roleList = ['高级管理员', '低级管理员']
      //查所有角色
      this.$axios
        .get("/role/getAll")
        .then((res) => {
          if (res.status == "200") {
            this.roleList = res.data;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      this.dialogRoleVisible = true;
    },
    //切换权限
    async changeOper(role) {
      await this.$axios
        .get("/role/getOper/" + role)
        .then((res) => {
          if (res.status == "200") {
            window.localStorage.setItem("roleOper", res.data);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    //切换角色
   async changeRole() {
      //重置角色
      this.user.role = this.checkedRole;
      window.localStorage.setItem("role", this.user.role);
      //重置权限
      this.dialogRoleVisible = false;
      await this.changeOper(this.user.role);//大方法会等这个小方法先执行完
      //加载菜单
      this.$router.push("/welcome");
      window.location.reload(true); //页面重新加载就会把布局layout和welcome里的方法再做一遍
    },
  },
};
</script>

<style scoped>

.head-img {
  /* 一浮全浮 */
  float: left;
  width: 30px;
  height: 60px;
  /* background-color: pink; */
}

img {
  padding: 15px 0;
  /* vertical-align: middle; */
  width: 30px;
  height: 30px;
}

h1 {
  float: left;
  width: 240px;
  line-height: 60px;
}

.info {
  float: right;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  letter-spacing: 1px;
  /* background-color: #fff; */
}

.info1,
.info2,
.info3 {
  margin-right: 10px;
}
</style>
