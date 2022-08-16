<template>
  <el-main class="main-content">
    <el-card class="left">
      <div slot="header">选择员工</div>
      <el-tree
        :data="tree"
        :props="defaultProps"
        show-checkbox
        @check-change="handleCheckChange"
      ></el-tree>
    </el-card>
    <el-card class="right">
      <div slot="header">查看员工信息</div>
      <el-card>
        <div v-for="(label, index) in labels" :key="index">
          <el-button type="text" @click="showDrawer(label)"
            >{{ index + 1 }}- {{ label }}</el-button
          >
        </div>
      </el-card>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer
      class="drawer"
      :title="'这是' + drawerTitle + '的信息'"
      :visible.sync="drawer"
    >
      <span>我来啦!</span>
      <ul class="drawer-info">
        <li>姓名：{{ drawerInfo.name }}</li>
        <li>性别：{{ drawerInfo.sex }}</li>
        <li>年龄：{{ drawerInfo.age }}</li>
        <li>公司：{{ drawerInfo.company }}</li>
        <li>部门：{{ drawerInfo.department }}</li>
        <li>岗位：{{ drawerInfo.position }}</li>
      </ul>
    </el-drawer>
  </el-main>
</template>

<script>
export default {
  name: "app-worker",
  data() {
    return {
      //树原始数据
      tree: [
        {
          label: "A公司",
          children: [
            {
              label: "部门I",
              children: [
                {
                  label: "员工1",
                },
                {
                  label: "员工2",
                },
              ],
            },
          ],
        },
        {
          label: "B公司",
          children: [
            {
              label: "部门I",
              children: [
                {
                  label: "员工3",
                },
              ],
            },
            {
              label: "部门II",
              children: [
                {
                  label: "员工4",
                },
              ],
            },
          ],
        },
        {
          label: "C公司",
          children: [
            {
              label: "部门I",
              children: [
                {
                  label: "员工5",
                },
              ],
            },
            {
              label: "部门II",
              children: [
                {
                  label: "员工6",
                },
              ],
            },
            {
              label: "部门III",
              children: [
                {
                  label: "员工7",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      //需查看的员工名字
      labels: ["原始"],
      //drawer名字
      drawer: false,
      drawerTitle: "",
      drawerInfo: "",
      // 顶部表单数据
      formData: {
        name: "",
      },
      //增加表单
      addForm: {},
      dialogAddVisible: false,
      labelWidth: "80px",
      //编辑表单
      editForm: {},
      dialogEditVisible: false,
      // 分页
      currentPage: 1,
      pageSize: 5,
      // <!-- 员工卡号，姓名，出生日期，联系电话，可用积分，可用金额，支付类型，地址，操作 -->
      tableData: [],
      transArr: [],
      flag: 0,
      //表单验证
      formRules: {
        name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        birthyear: [
          { required: true, message: "请选择出生年月", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确联系电话",
            trigger: "blur",
          },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  methods: {
    //选中树某叶子节点
    handleCheckChange(data) {
      if (!data.children) {
        this.labels.push(data.label);
      }
    },
    //展示哪个label的抽屉
    showDrawer(label) {
      this.getId(label);
      this.drawerTitle = label;
      this.drawer = true;
    },
    //单个查
    getId(name) {
      let id = name;
      this.$axios
        .get("/worker/getId/" + id)
        .then((res) => {
          if (res.status == "200") {
            this.drawerInfo = res.status;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  mounted() {
    // this.getList();
  },
};
</script>
<style lang="less" scoped>
.main-content {
  padding: 0;
}

.left,
.right {
  width: 450px;
  height: 450px;
}
.left {
  float: left;
  margin-left: 40px;
}

.right {
  float: right;
  margin-right: 40px;
}

.drawer {
  &-item {
  margin-left: 20px;
  margin-top:20px;
  }
}
</style>
