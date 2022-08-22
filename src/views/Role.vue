<template>
  <el-main class="main-content">
    <!-- 左边 -->
    <el-card class="left" shadow="never">
      <div slot="header"><b>角色列表</b></div>
      <el-menu v-for="(role, index) in roleList" :key="index">
        <el-menu-item class="left-role" @click="changeRole(role)">
          <i class="el-icon-s-custom left-role-icon"></i>
          <span class="left-role-name">{{ role.name }}</span>
          <el-tooltip
            :content="'共有' + role.operation.length + '种权限'"
            placement="top"
          >
            <el-tag class="left-role-opers">{{ role.operation.length }}</el-tag>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
      <div class="left-footer">
        <el-button type="text" size="mini" @click="showAddRole()"
          >添加角色</el-button
        >
      </div>
    </el-card>
    <!-- 右边 -->
    <div class="right">
      <!-- 右上--添加角色输入框 -->
      <div class="right-up" v-show="ifAdd">
        <i class="el-icon-s-custom right-up-icon"></i>
        <el-input
          type="text"
          v-model="addForm.name"
          placeholder="请输入角色名称"
        ></el-input>
        <el-button
          class="right-up-btn"
          type="text"
          :disabled="addForm.name == ''"
          @click="defaultProps.disabled = ''"
          >编辑</el-button
        >
        <el-button
          class="right-up-btn"
          type="text"
          :disabled="ifAdd === false"
          @click="ifAdd = false"
          >取消</el-button
        >
      </div>
      <!-- 右上--编辑角色展示框 -->
      <div class="right-up" v-show="!ifAdd">
        <i class="el-icon-s-custom right-up-icon"></i>
        <span class="right-up-role"
          ><b>{{ nowName }}</b></span
        >
        <el-button
          class="right-up-btn"
          type="text"
          :disabled="nowName == '暂未选择角色'"
          @click="defaultProps.disabled = ''"
          >编辑</el-button
        >
      </div>
      <!-- 右下 -->
      <el-card class="right-down" shadow="never">
        <!--default-expanded-keys 展开即选择 事件绑定不加括号-->
        <el-tree
          show-checkbox
          node-key="value"
          :props="defaultProps"
          :check-on-click-node="true"
          :data="nowTree"
          :default-checked-keys="nowOper"
          @check-change="chooseOper"
        ></el-tree>
        <div class="right-down-footer" v-show="defaultProps.disabled === ''">
          <el-button @click="defaultProps.disabled = 'gray'">取消</el-button>
          <el-button type="primary" @click="changeOper()">确定</el-button>
        </div>
      </el-card>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "app-role",
  data() {
    return {
      //角色列表
      roleList: [],
      //登录角色
      role: "",
      //是否添加角色
      ifAdd: false,
      addForm: {
        name: "",
        operation: [],
      },
      //当前角色树
      nowRole: "",
      nowId: "",
      nowName: "暂未选择角色",
      nowTree: [],
      nowOper: [], //现在的权限
      midOper: [], //用来传递的权限
      // 使用v-if重新加载树
      ifOpen: true,
      //树属性对应的属性名
      defaultProps: {
        children: "children",
        label: "label",
        disabled: "gray",
      },
    };
  },
  created() {
    this.role = window.localStorage.getItem("role");
    this.getList();
  },
  methods: {
    //查所有
    getList() {
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
    },
    //根据角色列表菜单栏切换角色
    async changeRole(role) {
      this.ifAdd = false;
      this.nowRole = role;
      this.nowId = role.id;
      this.nowName = role.name;
      this.nowOper = role.operation;
      //重新加载一遍树才可以重新赋值被选中节点
      await this.getTree();
      // await this.getA(role); 直接内部再赋值一次不可以
      //让disabled的属性对应显示数据的gray属性
      this.defaultProps.disabled = "gray";
      //初始化已有的权限 也是再次选择的清零处理
      this.midOper = this.nowOper;
    },
    //查初始权限树结构
    getTree() {
      this.$axios
        .get("/role/getTree")
        .then((res) => {
          if (res.status == "200") {
            this.nowTree = res.data;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    //选中树某节点
    chooseOper(data, ifCheck) {
      if (this.defaultProps.disabled === "" && data.children) {
        // 若选中父节点 则全选
        // if和else都会循环 则选择先循环后判断
        data.children.forEach((item) => {
          // ifCheck是点击节点之后的选中状态
          if (ifCheck) this.midOper.unshift(item.value);
          else {
            let index = this.midOper.indexOf(item.value);
            this.midOper.splice(index, 1);
          }
        });
      } else if (this.defaultProps.disabled === "" && !data.children) {
        //若选中叶子节点则单选单处理
        if (this.midOper.includes(data.value)) {
          let index = this.midOper.indexOf(data.value);
          this.midOper.splice(index, 1);
        } else {
          this.midOper.unshift(data.value);
        }
      }
    },
    //修改权限
    changeOper() {
      this.defaultProps.disabled = "gray";
      if (this.ifAdd) {
        this.addRole();
        return;
      }
      this.nowRole.operation = this.midOper;
      this.$axios
        .post("/role/update/" + this.nowId, {
          editForm: this.nowRole,
        })
        .then((res) => {
          if (res.status == "200") {
            this.$message.success("修改角色权限成功");
            // 清零处理
            this.defaultProps.disabled = "gray";
            //改变了当前角色的权限
            if (this.role === this.nowName) {
              this.midOper.unshift("role-menu");
              window.localStorage.setItem("roleOper", this.midOper);
              this.$router.push("/welcome");
              window.location.reload(true); //刷新这一页
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    //展示添加角色输入框
    async showAddRole() {
      this.ifAdd = true;
      await this.getTree();
    },
    //添加角色
    addRole() {
      this.defaultProps.disabled = "gray";
      this.$axios
        .post("/role/add", {
          addForm: {
            name: this.addForm.name,
            operation: this.midOper,
          },
        })
        .then((res) => {
          if (res.status == "200") {
            this.roleList = res.data;
            this.$message.success("添加角色成功");
            this.ifAdd = false;
            this.defaultProps.disabled = "gray";
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      this.getTree();
    },
  },
};
</script>
<style lang="less" scoped>
// 左边
.left {
  float: left;
  width: 280px;
  height: 780px;
  &-role {
    height: 50px;
    line-height: 50px;
    &-icon {
      float: left;
      line-height: 50px;
      color: #1890ff;
    }
    &-name {
      float: left;
      // 文字的行高受父级控制
    }
    &-opers {
      float: right;
      margin-top: 10px;
      color: #1890ff;
    }
    :hover {
      color: #1890ff;
    }
  }
  &-footer {
    margin-top: 20px;
    border-top: 1px solid rgb(230, 230, 230);
    .el-button {
      margin-top: 10px;
    }
  }
}

//去掉菜单右边框
.el-menu {
  border-right: 0;
}

// 右边
.right {
  float: left;
  width: 700px;
  height: 710px;
  margin-left: 20px;
  &-up {
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    &-icon {
      float: left;
      line-height: 60px;
      margin: 0 5px 0 20px;
      color: orange;
      font-size: 18px;
    }
    .el-input {
      width: 400px;
      float: left;
    }
    &-role {
      float: left;
    }
    &-btn {
      float: right;
      padding: 20px 10px;
    }
  }
  &-down {
    margin-top: 10px;
    height: 100%;
    &-footer {
      margin-top: 30px;
      border-top: 1px solid rgb(230, 230, 230);
      .el-button {
        margin-top: 20px;
      }
    }
  }
}

//
</style>
