// ---------------------导包
const express = require('express')
  // 数据库
const mysql = require('mysql')
const hm = require('mysql-ithm')


// -------------------创建服务
const app = express()


// -------------------创建数据库
//2.连接数据库
//如果数据库存在则连接，不存在则会自动创建数据库
hm.connect({
  host: 'localhost', //数据库地址
  port: '3306',
  user: 'root', //用户名，没有可不填
  password: 'root', //密码，没有可不填
  database: 'herodb' //数据库名称
});

//3.创建Model(表格模型：负责增删改查)
//如果table表格存在则连接，不存在则自动创建
let studentModel = hm.model('student', {
  // 名字叫
  name: String,
  // 技能
  skill: String,
  //    头像路径
  icon: String
});

// //4.调用API：添加数据
// studentModel.insert({ name: '张三10', age: 30 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });



// 创建路由
// 数据增加 insert
app.get('/hero/insert', (request, response) => {
  response.send('insert');
});
// 数据删除 delete
app.get('/hero/delete', (request, response) => {
  response.send('delete');
});
// 数据更改 updata
app.get('/hero/updata', (request, response) => {
  response.send('updata');
});
// 数据查询 select
app.get('/hero/select', (request, response) => {
  response.send('select');
});



// 开启服务，监听端口3000
app.listen(3000, err => {
  if (!err) {
    console.log('端口3000开启成功！！！');

  } else {
    console.log("开启服务失败");
  }
});