<template>
  <div class="back-board">
    <!-- 咕咕咕 -->
    <div class="info">
      <p>小欣喜 2442 超级管理员</p>
      <p>小哦莫 2442 高级管理员</p>
      <p>小小 2442 低级管理员</p>
    </div>
    <div class="login">
      <h2>No.2442会员管理系统</h2>
      <div class="login-form">
        <el-form :model="formData" class="form" size="medium">
          <el-form-item prop="name">
            <div class="login-row">
              <i class="el-icon-user-solid login-icon"></i>
              <el-input v-model="formData.name" placeholder="请输入用户名">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="login-row">
              <i class="el-icon-location login-icon"></i>
              <el-input
                v-model="formData.password"
                type="password"
                placeholder="请输入密码"
              >
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" class="login-btn" @click="login()">
              登录
            </el-button>
            <el-button type="primary" @click="reset()"> 重置 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-login",
  data() {
    return {
      formData: {
        name: "小欣喜",
        password: "2442",
      },
    };
  },
  methods: {
    login() {
      this.$axios
        .post("user/login", {
          loginData: this.formData,
        })
        .then((res) => {
          if (res.status == 200 && res.data.code == 1) {
            window.localStorage.setItem("name", this.formData.name);
            window.localStorage.setItem("password", this.formData.password);
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("role", res.data.role);
            window.localStorage.setItem("roleOper", res.data.roleOper);
            this.$message.success("登录成功");
            this.$router.push("/layout");
          } else if (res.data.code !== 1) this.$message.error(res.data.msg);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    reset() {
      this.formData = "";
    },
  },
};
</script>

<style scoped>
.back-board {
  /* 解决子盒子脱离标准流，父盒子塌陷问题*/
  /* 设置为auto时 超出高宽加滚动条 未超出则不加 */
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgb(241, 243, 243);
}

.info {
  float: left;
  margin-top: 100px;
  margin-left:100px;
  color:lightgray;
}

.login {
  position: relative;
  margin: 150px auto;
  width: 500px;
  height: 350px;
  border-radius: 50px;
  background-color: white;
}

h2 {
  position: absolute;
  top: 30px;
  left: 50%;
  margin-left: -150px;
  width: 300px;
  font-size: 30px;
  color: rgb(10, 141, 206);
  /* background-color: pink; */
}

.login-form {
  position: absolute;
  top: 100px;
  left: 50%;
  margin-left: -125px;
  width: 250px;
  /* background-color: pink; */
}

.login-row {
  display: flex;
  flex-direction: row;
}

.login-icon {
  line-height: 37px;
  margin-right: 10px;
  font-size: large;
  color: rgb(22, 171, 246);
  /* background-color: yellow; */
}

.login-btn {
  margin-top: 20px;
  margin-right: 40px;
}

.el-button {
  width: 100px;
  letter-spacing: 10px;
  font-size: 15px;
}
</style>
