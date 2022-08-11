<template>
  <el-main class="main-content">
    <!-- 顶部操作表单 -->
    <el-form :inline="true" :model="formData" class="form" size="mini">
      <el-form-item prop="name">
        <!-- <el-input v-model="formData.name" placeholder="商品名称"></el-input> -->
        <el-autocomplete
          class="inline-input"
          v-model="formData.name"
          :fetch-suggestions="querySearch"
          placeholder="商品名称"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getId()">
          <i class="el-icon-search"></i>
        </el-button>
        <el-button type="primary" @click="dialogAddVisible = true">
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button type="primary" @click="refresh()">
          <i class="el-icon-refresh"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <!-- name: "日用品",
        price: "￥320",
        quantity: "200万",
    goods: "红旗",-->
    <!-- 增加表单对话框 -->
    <el-dialog title="增加商品" :visible.sync="dialogAddVisible" center width="400px">
      <el-form :model="addForm" ref="addForm" :rules="formRules">
        <el-form-item label="商品名称" prop="name" :label-width="labelWidth">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" :label-width="labelWidth">
          <el-input v-model="addForm.price" type='Number'>
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现有库存" prop="quantity" :label-width="labelWidth">
          <el-input v-model="addForm.quantity" type='Number'>
            <template slot="append">万</template>
          </el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier" :label-width="labelWidth">
          <el-input v-model="addForm.supplier"></el-input>
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
    <!-- 商品卡号，名称，出生日期，现有库存，可用积分，可用金额，支付类型，供应商，操作 -->
    <el-table
      :data="transArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      <el-table-column fixed type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
      <el-table-column prop="quantity" label="现有库存" width="120"></el-table-column>
      <el-table-column prop="supplier" label="供应商" width="300"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small">删除</el-button>
          <!--@click="dialogAddVisible = true"  -->
          <el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑表单对话框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogEditVisible" center width="400px">
      <el-form :model="editForm" ref="editForm" :rules="formRules">
        <el-form-item label="商品名称" prop="name" :label-width="labelWidth">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" :label-width="labelWidth">
          <el-input v-model="editForm.price">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现有库存" prop="quantity" :label-width="labelWidth">
          <el-input v-model="editForm.quantity">
            <template slot="append">万</template>
          </el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier" :label-width="labelWidth">
          <el-input v-model="editForm.supplier"></el-input>
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
  name: "app-goods",
  data() {
    return {
      // 顶部表单数据
      formData: {
        name: ""
      },
      //表格数据
      transArr: [],
      //输入建议
      tableData: [],
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
      //表单验证
      formRules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true,message: "请输入商品价格", trigger: "blur" }],
        quantity: [
          { required: true, message: "请输入现有库存", trigger: "blur" }
        ],
        supplier: [{ required: true, message: "请输入供应商", trigger: "blur" }]
      }
    };
  },
  methods: {
    //单个查
    getId() {
      let id = this.formData.name;
      this.$axios
        .get("/goods/getId/" + id)
        .then(res => {
          if (res.status == "200") {
            this.transArr = res.data;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    // 添加
    add() {
    this.addForm.price='￥'+this.addForm.price
    this.addForm.quantity=this.addForm.quantity+'万'
      this.$refs["addForm"].validate(valid => {
        if (!valid) return false;
        this.$axios
          .post("/goods/add", {
            addForm: this.addForm
          })
          .then(res => {
            // console.log(res)
            if (res.status == "200") {
              this.$message.success("增加成功");
              this.transArr = res.data;
              this.dialogAddVisible = false;
            }
          })
          .catch(err => {
            this.$message.error("增加失败");
            console.log(err.message);
            this.dialogAddVisible = false;
          });
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
          type: "warning"
        }
      ).catch(err => err);
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      this.$axios
        .delete("/member/delete", {
          params: { id: row.id }
        })
        .then(res => {
          if (res.status == "200") {
            this.$message.success("删除成功");
            this.transArr = res.data;
          }
        })
        .catch(err => {
          console.log(err.message);
          this.$message.error("删除失败");
        });
    },
    //展示修改
    showEdit(row) {
      this.editForm = row;
      this.editForm.price=this.editForm.price.split('￥')[1]
      this.editForm.quantity=this.editForm.quantity.split('万')[0]
      this.dialogEditVisible = true;
    },
    //修改
    edit() {
    this.editForm.price='￥'+this.editForm.price
    this.editForm.quantity=this.editForm.quantity+'万'
      this.$axios
        .post("goods/update/" + this.editForm.id, {
          editForm: this.editForm
        })
        .then(res => {
          if (res.status == 200) this.transArr = res.data;
          this.$message.success("修改成功");
          this.dialogEditVisible = false;
        })
        .catch(err => {
          this.$message.error("修改失败");
          console.log(err.message);
          this.dialogEditVisible = false;
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
      var back = arr.filter(item => {
        return item.name.indexOf(queryString) === 0;
      });
      cb(back);
    },
    // 选中商品名称
    handleSelect(item) {
      // 选中一个输入建议是整个json
      this.formData.name = item.name;
    },
    //查所有
    getList() {
      this.$axios
        .get("goods/getAll")
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data;
            this.transArr = res.data;
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style scoped>
@import url("@/assets/share.css");

.main-content {
  padding: 0;
}
</style>