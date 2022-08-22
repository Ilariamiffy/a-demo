import Mock from 'mockjs';

Mock.mock({
    "byear|2000-2020": 1,
    "bmonth|01-12": 1,
})

const list = [];
// for (let i = 0; i < 100; i++) {
//     list.push({
//         id: i,
//         num: "2022050" + i,
//         "name|1": ["王小虎", '李大刀', "林小红", "张希", "小欣喜", "三省姑娘"],
//         "birthyear": '@date("yyyy年MM月")',
//         // birthyear: byear + "年" + bmonth + "月",
//         tel: /^1[34578]\d{9}$/,
//         'marks|100-120': 1,
//         'money|5000-10000': 1,
//         "paytype|1": ["支付宝", "微信", "现金"],
//         address: "上海市普陀区金沙江路 " + i + "弄",
//     })
// }
list.push(
        {
            num: "20220511",
            name: "王小虎",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220512",
            name: "李大来",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "微信",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220513",
            name: "张一",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "现金",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220514",
            name: "林小红",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "现金",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220515",
            name: "小明",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220516",
            name: "大力",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220517",
            name: "黄三",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "微信",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220518",
            name: "王麻子",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220519",
            name: "张三",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220520",
            name: "李四",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220521",
            name: "周人",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220522",
            name: "刘六",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            num: "20220523",
            name: "李刚",
            birthyear: "2000年08月",
            tel: "18090521084",
            marks: "100",
            money: "5000",
            paytype: "支付宝",
            address: "上海市普陀区金沙江路 1518 弄",
        },
)

//会员管理

//查所有
Mock.mock('http://localhost:8080/mock/member/getAll', 'get', () => {
    return Mock.mock(list);
})

//查一个
Mock.mock(RegExp('http://localhost:8080/mock/member/getId' + '*'), 'get', (option) => {
    var id = option.url.split("getId/")[1]
    id = parseInt(option.url.split("getId/")[1])
    // ===必须类型相等 ==只需值相等
    var back = list.filter((item) => {
        return (item.id === id);
    })
    return back;
})

var cnt = 0;//增加的个数
//增加
Mock.mock('http://localhost:8080/mock/member/add', 'post', (option) => {
    // JSON.parse将json转换为对象
    const { addForm } = JSON.parse(option.body);
    addForm.num = "2022070" + cnt++;
    list.unshift(addForm);
    return Mock.mock(list);
})

//删除
Mock.mock(RegExp('http://localhost:8080/mock/member/delete' + '*'), 'delete', (option) => {
    var id = option.url.split('?id=')[1]
    list.splice(id, 1)//返回值是删除的那条数据
    return Mock.mock(list);
})

//修改
Mock.mock(RegExp('http://localhost:8080/mock/member/update' + '*'), 'post', (option) => {
    var id = option.url.split('update/')[1]//id存的索引
    const { editForm } = JSON.parse(option.body);
    // list.splice(id, 1)//删除修改数据
    // list.unshift(editForm);//在头头加一条
    list.splice(id, 1, editForm)//从索引id开始删一条数据，用editForm值替换，即可正常实现修改
    return Mock.mock(list);
})


