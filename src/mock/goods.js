import Mock from 'mockjs';

const list = [];
for (let i = 0; i < 100; i++) {
    list.push({
        id: i,
        name: "日用品" + i + "号",
        price: "￥32" + i,
        quantity: "2" + i + "0万",
        goods: "红旗" + i + "号",
    })
}

//商品管理

//查所有
Mock.mock('http://localhost:8080/mock/goods/getAll', 'get', () => {
    return list;
})

//查一个
Mock.mock(RegExp('http://localhost:8080/mock/goods/getId' + '*'), 'get', (option) => {
    var id = option.url.split("getId/")[1]
    // ===必须类型相等 ==只需值相等
    var back = list.filter((item) => {
        return (item.name === id);
    })
    return back;
})

//增加
Mock.mock('http://localhost:8080/mock/goods/add', 'post', (option) => {
    const { addForm } = JSON.parse(option.body);
    list.unshift(addForm);
    return list;
})

//删除
Mock.mock(RegExp('http://localhost:8080/mock/goods/delete' + '*'), 'delete', (option) => {
    var id = option.url.split('?id=')[1]
    // console.log(id)
    list.splice(id, 1)//返回值是删除的那条数据
    return list;
})

//修改
Mock.mock(RegExp('http://localhost:8080/mock/goods/update' + '*'), 'post', (option) => {
    var id = option.url.split('update/')[1]//id存的索引
    const { editForm } = JSON.parse(option.body);
    // list.splice(id, 1)//删除修改数据
    // list.unshift(editForm);//在头头加一条
    list.splice(id, 1, editForm)//从索引id开始删一条数据，用editForm值替换，即可正常实现修改
    return list;
})

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
