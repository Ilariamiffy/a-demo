<template>
  <el-main class="main-content">
    <!-- 顶部操作表单 -->
    <el-form :inline="true" :model="formData" class="form" size="mini">
      <el-form-item prop="num">
        <el-input v-model="formData.num" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <!-- <el-input v-model="formData.name" placeholder="会员姓名"></el-input> -->
        <el-autocomplete
          class="inline-input"
          v-model="formData.name"
          :fetch-suggestions="querySearch"
          placeholder="会员姓名"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item prop="paytype">
        <el-select v-model="formData.paytype" placeholder="支付类型" clearable>
          <el-option label="微信支付" value="微信"></el-option>
          <el-option label="支付宝支付" value="支付宝"></el-option>
          <el-option label="现金支付" value="现金"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthyear">
        <el-date-picker
          v-model="formData.birthyear"
          type="month"
          placeholder="请选择出生年月"
          format="yyyy年MM月"
          value-format="yyyy年MM月"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="!roleOper.includes('member-getId')"
          @click="search()"
        >
          <i class="el-icon-search"></i>
        </el-button>
        <el-button
          type="primary"
          :disabled="!roleOper.includes('member-add')"
          @click="dialogAddVisible = true"
        >
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button type="primary" @click="refresh()">
          <i class="el-icon-refresh"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 增加表单对话框 -->
    <el-dialog
      title="增加会员"
      :visible.sync="dialogAddVisible"
      center
      width="400px"
    >
      <el-form :model="addForm" ref="addForm" :rules="formRules">
        <el-form-item label="会员姓名" prop="name" :label-width="labelWidth">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="出生年月"
          prop="birthyear"
          :label-width="labelWidth"
        >
          <el-date-picker
            v-model="addForm.birthyear"
            type="month"
            placeholder="请选择出生年月"
            format="yyyy年MM月"
            value-format="yyyy年MM月"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel" :label-width="labelWidth">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="marks" :label-width="labelWidth">
          <el-input type="number" v-model="addForm.marks"></el-input>
        </el-form-item>
        <el-form-item label="可用金额" prop="money" :label-width="labelWidth">
          <el-input v-model="addForm.money"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="paytype" :label-width="labelWidth">
          <el-select
            v-model="addForm.paytype"
            placeholder="请选择支付类型"
            clearable
          >
            <el-option label="微信支付" value="微信"></el-option>
            <el-option label="支付宝支付" value="支付宝"></el-option>
            <el-option label="现金支付" value="现金"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address" :label-width="labelWidth">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格内容 -->
    <!-- :data="tableData" -->
    <!-- 改变data的表达式以连接分页 -->
    <!-- 会员卡号，姓名，出生日期，联系电话，可用积分，可用金额，支付类型，地址，操作 -->
    <el-table
      :data="
        transArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column
        fixed
        type="index"
        label="#"
        width="50"
      ></el-table-column>
      <el-table-column
        fixed
        prop="num"
        label="会员卡号"
        width="150"
      ></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column
        prop="birthyear"
        label="出生年月"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="tel"
        label="联系电话"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="marks"
        label="可用积分"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="money"
        label="可用金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="paytype"
        label="支付类型"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            :disabled="!roleOper.includes('member-delete')"
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
          <!--@click="dialogAddVisible = true"  -->
          <el-button
            :disabled="!roleOper.includes('member-update')"
            @click="showEdit(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑表单对话框 -->
    <el-dialog
      title="编辑会员"
      :visible.sync="dialogEditVisible"
      center
      width="400px"
    >
      <el-form :model="editForm" ref="editForm" :rules="formRules">
        <el-form-item label="会员卡号" :label-width="labelWidth">
          <el-input v-model="editForm.num" disabled></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name" :label-width="labelWidth">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <!--format显示格式 value-format存储值格式  -->
        <el-form-item
          label="出生年月"
          prop="birthyear"
          :label-width="labelWidth"
        >
          <el-date-picker
            v-model="editForm.birthyear"
            type="month"
            placeholder="请选择出生年月"
            format="yyyy年MM月"
            value-format="yyyy年MM月"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel" :label-width="labelWidth">
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="marks" :label-width="labelWidth">
          <el-input type="number" v-model="editForm.marks"></el-input>
        </el-form-item>
        <el-form-item label="可用金额" prop="money" :label-width="labelWidth">
          <el-input v-model="editForm.money"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="paytype" :label-width="labelWidth">
          <el-select
            v-model="editForm.paytype"
            placeholder="请选择支付类型"
            clearable
          >
            <el-option label="微信支付" value="微信"></el-option>
            <el-option label="支付宝支付" value="支付宝"></el-option>
            <el-option label="现金支付" value="现金"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address" :label-width="labelWidth">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页部分 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :pager-count="5"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="transArr.length"
      ></el-pagination>
    </div>
  </el-main>
</template>

<script>
export default {
  props: [],
  name: "app-member",
  data() {
    // 自定义手机号规则
    // var checkTel = (formRules, value, callback) => {
    //     const regMobile = /^1[34578]\d{9}$/
    //     regMobile.test(value) == true ? callback() : callback(new Error('请输入合法的手机号码'))
    // };
    return {
      //角色权限
      roleOper: [],
      // 顶部表单数据
      formData: {
        num: "",
        name: "",
        paytype: "",
        birthyear: "",
      },
      //增加表单
      addForm: {
        name: "",
        birthyear: "",
        tel: "",
        marks: "",
        money: "",
        paytype: "",
        address: "",
      },
      dialogAddVisible: false,
      labelWidth: "80px",
      //编辑表单
      editForm: {},
      dialogEditVisible: false,
      // 分页
      currentPage: 1,
      pageSize: 5,
      //输入建议
      tableData: [],
      transArr: [],
      flag: 0,
      // 表单验证
      formRules: {
        name: [{ required: true, message: "请输入会员姓名", trigger: "blur" }],
        birthyear: [
          { required: true, message: "请选择出生年月", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的联系电话",
            trigger: "blur",
          },
          //pattern是正则表达式的方式，validator是定义函数的方式
          // { validator: checkTel, trigger: 'blur' }
        ],
        marks: [
          { required: true, message: "请输入可用积分", trigger: "blur" },
          {
            type: "number",
            min: 3,
            message: "可用积分至少100",
            trigger: "blur",
          }, //min是至少的长度
        ],
        money: [{ required: true, message: "请输入可用金额", trigger: "blur" }],
        paytype: [
          { required: true, message: "请选择支付类型", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入会员地址", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.roleOper = window.localStorage.getItem("roleOper");
  },
  methods: {
    // 搜索
    search() {
      //   修正日期格式
      let a =
        this.formData.birthyear.split("-")[0] +
        "年" +
        this.formData.birthyear.split("-")[1] +
        "月";
      this.transArr = this.tableData;
      let Curarr = this.transArr.filter((item) => {
        return (
          (item.num.indexOf(this.formData.num) != -1 ||
            this.formData.num == "") &&
          (item.name.indexOf(this.formData.name) != -1 ||
            this.formData.name == "") &&
          (item.paytype.indexOf(this.formData.paytype) != -1 ||
            this.formData.paytype == "") &&
          (item.birthyear.indexOf(a) != -1 || this.formData.birthyear == "")
        );
      });
      this.transArr = Curarr;
    },
    getId() {
      let id = 3;
      this.$axios
        .get("/member/getId/" + id)
        .then((res) => {
          console.log(res);
          if (res.status == "200") {
            this.transArr = res.data;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    // 添加
    add() {
      this.$refs["addForm"].validate((valid) => {
        if (!valid) return false;
        this.$axios
          .post("/member/add", {
            addForm: this.addForm,
          })
          .then((res) => {
            if (res.status == "200") {
              this.$message.success("增加成功");
              this.transArr = res.data;
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
        this.dialogAddVisible = false;
      });
    },
    // 删除
    async deleteRow(row) {
      // rows.splice(index, 1);
      // console.log("删除的" + row.num)
      const confirmResult = await this.$confirm(
        "此操作将永久删除该条数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      this.$axios
        .delete("/member/delete", {
          params: { id: row.id },
        })
        .then((res) => {
          if (res.status == "200") {
            this.$message.success("删除成功");
            this.transArr = res.data;
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.$message.error("删除失败");
        });
    },
    //展示修改
    showEdit(row) {
      this.editForm = row;
      this.dialogEditVisible = true;
    },
    //修改
    edit() {
      this.$refs["editForm"].validate((valid) => {
        if (!valid) return false;
        this.$axios
          .post("member/update/" + this.editForm.id, {
            editForm: this.editForm,
          })
          .then((res) => {
            if (res.status == 200) this.transArr = res.data;
            this.$message.success("修改成功");
            this.dialogEditVisible = false;
          })
          .catch((err) => {
            this.$message.error("修改失败");
            console.log(err.message);
          });
      });
    },
    //刷新
    refresh() {
      this.formData = {};
      this.getList();
    },
    // 分页
    handleCurrentChange(val) {
      // this.$message.success(`当前页: ${val}`)
      this.currentPage = val;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    // 输入建议
    querySearch(queryString, cb) {
      var arr = this.tableData;
      var back = arr.filter((item) => {
        return item.name.indexOf(queryString) === 0;
      });
      cb(back);
    },
    // 选中会员姓名
    handleSelect(item) {
      // 选中一个输入建议是整个json
      this.formData.name = item.name;
    },
    //查所有
    getList() {
      this.$axios
        .get("member/getAll")
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.data;
            this.transArr = res.data;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },

  mounted() {
    this.getList();
  },
};
</script>
<style scoped>

/* .main-content {
    padding: 0;
} */

/*让搜索form靠左*/
/* 相当于默认加了一句flex-direction:row*/
/* .el-form--inline {
    display: flex;
} */
</style>
