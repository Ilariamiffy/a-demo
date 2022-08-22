import Mock from "mockjs";

const list = [
  {
    id: 0,
    name: "超级管理员",
    operation: [
      "member-menu", 
      "member-add",
      "member-delete",
      "member-update",
      "member-getId",
      "supplier-menu", 
      "supplier-add",
      "supplier-delete",
      "supplier-update",
      "supplier-getId",
      "goods-menu", 
      "goods-add",
      "goods-delete",
      "goods-update",
      "goods-getId",
      "role-menu", 
      "role-add",
      "role-delete",
      "role-update",
      "role-getId",
    ],
  },
  {
    id: 1,
    name: "高级管理员",
    operation: [
      "supplier-menu", 
      "supplier-add",
      "supplier-delete",
      "supplier-update",
      "supplier-getId",
      "goods-menu", 
      "goods-add",
      "goods-delete",
      "goods-update",
      "goods-getId",
      "role-menu", 
    ],
  },
  {
    id: 2,
    name: "低级管理员",
    operation: ["goods-menu", "goods-add", "goods-delete", "goods-update", "goods-getId","role-menu",],
  },
];

const initTree= [
  {
    label: "会员管理",
    value: "member",
    gray: true,
    children: [
      {
        label: "会员列表-菜单",
        value: "member-menu",
        gray: true,
      },
      {
        label: "会员列表-增加",
        value: "member-add",
        gray: true,
      },
      {
        label: "会员列表-删除",
        value: "member-delete",
        gray: true,
      },
      {
        label: "会员列表-修改",
        value: "member-update",
        gray: true,
      },
      {
        label: "会员列表-单个查",
        value: "member-getId",
        gray: true,
      },
    ],
  },
  {
    label: "供应商管理",
    value: "supplier",
    gray: true,
    children: [
      {
        label: "供应商列表-菜单",
        value: "supplier-menu",
        gray: true,
      },
      {
        label: "供应商列表-增加",
        value: "supplier-add",
        gray: true,
      },
      {
        label: "供应商列表-删除",
        value: "supplier-delete",
        gray: true,
      },
      {
        label: "供应商列表-修改",
        value: "supplier-update",
        gray: true,
      },
      {
        label: "供应商列表-单个查",
        value: "supplier-getId",
        gray: true,
      },
    ],
  },
  {
    label: "商品管理",
    value: "goods",
    gray: true,
    children: [
      {
        label: "商品列表-菜单",
        value: "goods-menu",
        gray: true,
      },
      {
        label: "商品列表-增加",
        value: "goods-add",
        gray: true,
      },
      {
        label: "商品列表-删除",
        value: "goods-delete",
        gray: true,
      },
      {
        label: "商品列表-修改",
        value: "goods-update",
        gray: true,
      },
      {
        label: "商品列表-单个查",
        value: "goods-getId",
        gray: true,
      },
    ],
  },
  {
    label: "角色管理",
    value: "role",
    gray: true,
    children: [
      {
        label: "角色列表-增加",
        value: "role-add",
        gray: true,
      },
      {
        label: "角色列表-删除",
        value: "role-delete",
        gray: true,
      },
      {
        label: "角色列表-修改",
        value: "role-update",
        gray: true,
      },
      {
        label: "角色列表-单个查",
        value: "role-getId",
        gray: true,
      },
    ],
  },
]

const users=[
{
  name:'小欣喜',
  password:'2442',
  role:'超级管理员'
},
{
  name:'小哦莫',
  password:'2442',
  role:'高级管理员'
},
{
  name:'小小',
  password:'2442',
  role:'低级管理员'
},
]

//角色管理

//查所有
Mock.mock("http://localhost:8080/mock/role/getAll", "get", () => {
  return Mock.mock(list);
});

//查权限树
Mock.mock("http://localhost:8080/mock/role/getTree", "get", () => {
  return Mock.mock(initTree);
});

//查权限
Mock.mock(
  RegExp("http://localhost:8080/mock/role/getOper" + "*"),
  "get",
  (option) => {
    var role = option.url.split("getOper/")[1];
    // ===必须类型相等 ==只需值相等
    var back = list.filter((item) => {
      return item.name === role;
    });
    return back[0].operation;
  }
);

//查一个
Mock.mock(
  RegExp("http://localhost:8080/mock/role/getId" + "*"),
  "get",
  (option) => {
    var id = option.url.split("getId/")[1];
    // ===必须类型相等 ==只需值相等
    var back = list.filter((item) => {
      return item.name === id;
    });
    return back;
  }
);

//增加
Mock.mock("http://localhost:8080/mock/role/add", "post", (option) => {
  const { addForm } = JSON.parse(option.body);
  // addForm.id = new Date().getTime();
  addForm.id = list[list.length-1].id+1;
  list.push(addForm);
  return list;
});

//删除
Mock.mock(
  RegExp("http://localhost:8080/mock/role/delete" + "*"),
  "delete",
  (option) => {
    var id = option.url.split("?id=")[1];
    list.splice(id, 1); //返回值是删除的那条数据
    return list;
  }
);

//修改
Mock.mock(
  RegExp("http://localhost:8080/mock/role/update" + "*"),
  "post",
  (option) => {
    var id = option.url.split("update/")[1]; //id存的索引
    const { editForm } = JSON.parse(option.body);
    list.splice(id, 1, editForm); //从索引id开始删一条数据，用editForm值替换，即可正常实现修改
    return list;
  }
);

export default {list,users}

// export default {
//     list,
//     list2: [
//         {
//             num: "20220511",
//             name: "王小虎",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220512",
//             name: "李大来",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "微信",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220513",
//             name: "张一",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "现金",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220514",
//             name: "林小红",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "现金",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220515",
//             name: "小明",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220516",
//             name: "大力",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220517",
//             name: "黄三",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "微信",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220518",
//             name: "王麻子",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220519",
//             name: "张三",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220520",
//             name: "李四",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220521",
//             name: "周人",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220522",
//             name: "刘六",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//         {
//             num: "20220523",
//             name: "李刚",
//             birthyear: "2000年08月",
//             tel: "18090521084",
//             marks: "100",
//             money: "5000",
//             paytype: "支付宝",
//             address: "上海市普陀区金沙江路 1518 弄",
//         },
//     ],

// }
