<template>
  <el-header class="header">
    <div class="head-img">
      <img src="@/assets/tianxian.png" alt="出错了">
    </div>
    <h1>No.2442会员管理系统</h1>
    <!-- class="user-name" -->
    <div class="info">
      <span class="info1">{{ user.name }}: {{ user.role }}</span>
      <i class="el-icon-refresh" style="color:#2c5066; font-weight: bold;" v-show="user.role != '低级管理员'"></i>
      <el-button class="info2" type="text" style='color:#2c5066;font-size: 16px;' @click="showChangeRole()"
        v-show="user.role != '低级管理员'">切换</el-button>
      <i class="el-icon-switch-button" style="color:#2c5066; font-weight: bold;"></i>
      <el-button class="info3" type="text" style='color:#2c5066;font-size: 16px;' @click="logout()">退出</el-button>
    </div>
    <!-- 切换角色对话框 -->
    <el-dialog title="切换角色" :visible.sync="dialogRoleVisible" center width="400px">
      <el-form label-width="160px">
        <el-form-item label="请选择需要切换的角色" prop="paytype">
          <el-select v-model="checkedRole" clearable>
            <el-option v-for="(role, index) in roleList" :key="index" :label="role" :value="role"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogRoleVisible = false">取消</el-button>
          <el-button type="primary" @click="changeRole()">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-header>
</template>

<script>
export default {
  name:'app-header',
  data() {
    return {
      user: {},
      roleList: [],//可选择的role
      checkedRole: '',
      dialogRoleVisible: false,
    }
  },
  created() {
    this.user.name = window.localStorage.getItem('name')
    this.user.role = window.localStorage.getItem('role')
    this.checkedRole = this.user.role
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
      // window.localStorage.removeItem('token')
      window.localStorage.clear()//清空localstorage
      this.$router.push('/')
    },
    showChangeRole() {
      if (this.user.role == '超级管理员') this.roleList = ['超级管理员', '高级管理员', '低级管理员']
      else if (this.user.role == '高级管理员') this.roleList = ['高级管理员', '低级管理员']
      this.dialogRoleVisible = true
    },
    changeRole() {
      this.user.role = this.checkedRole
      window.localStorage.setItem('role', this.checkedRole)
      if ('/welcome' !== this.$route.path) this.$router.push('/welcome')
      else window.location.reload(true)//页面重新加载就会把布局和welcome里的方法再做一遍
    },
  }
}
</script>

<style scoped>
@import url('@/assets/share.css');

.head-img {
  /* 一浮全浮 */
  float: left;
  width: 30px;
  height: 60px;
  /* background-color: pink; */
}

img {
  padding: 15px 0;
  /* float: left; */
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
