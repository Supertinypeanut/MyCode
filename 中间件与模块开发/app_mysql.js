//导包
const express = require('express')
var mysql = require('mysql');
// 导入中间件
const hm = require('mysql-ithm');

//2.连接数据库
//如果数据库存在则连接，不存在则会自动创建数据库
hm.connect({
  host: 'localhost', //数据库地址
  port: '3306',
  user: 'root', //用户名，没有可不填
  password: 'root', //密码，没有可不填
  database: 'db88' //数据库名称
});

//3.创建Model(表格模型：负责增删改查)
//如果table表格存在则连接，不存在则自动创建
let studentModel = hm.model('student', {
  name: String,
  age: Number
});

// //4.调用API：添加数据
// studentModel.insert({ name: '张三10', age: 10 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });
// studentModel.insert({ name: '张三10', age: 10 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });
// studentModel.insert({ name: '张三11', age: 11 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });
// studentModel.insert({ name: '张三12', age: 12 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });
// studentModel.insert({ name: '张三13', age: 14 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });
// studentModel.insert({ name: '张三14', age: 15 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });
// studentModel.insert({ name: '张三15', age: 16 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });
// studentModel.insert({ name: '张三16', age: 17 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });
// studentModel.insert({ name: '张三17', age: 18 }, (err, results) => {
//   console.log(err);
//   console.log(results);
//   if (!err) console.log('增加成功');
// });

// //2.1 查询所有数据
// studentModel.find((err, results) => {
//   console.log(results);
// });

//2.2 根据数据库字段查询部分数据
// ['name'] : 将要查询的字段放入数组中
// studentModel.find(['name'], (err, results) => {
//   console.log(results);
// });

//2.3 根据条件查询数据
// 'id=1' : 查询id为1的数据 (查询条件可以参考sql语句)
//例如 'age>10' : 查询age超过10的数据 
//例如 'name>"张三"' : 查询名字为张三的数据，注意字符串添加引号
// studentModel.find('age>21', (err, results) => {
//   console.log(results);
// });

//2.4 分页查询
//  第一个参数options对象有三个属性 {where:分页查询条件（可选）， number:页数 ， count：每页数量}
// studentModel.limit({ where: 'age>15', number: 1, count: 10 }, (err, results) => {
//   console.log(results);
// });


//3.3 将数据库中所有 age < 15 的数据，name修改为王五
// studentModel.update('age<15', { name: '王五' }, (err, results) => {
//   console.log(results);
// });

//4.1 删除所有 age>18 的数据
// studentModel.delete('age>18', (err, results) => {
//   console.log(results);
// });


// 删除表格（ 慎用
studentModel.drop((err, results) => {
  console.log(results);
});


// // 执行自定义SQL语句
// studentModel.sql('insert into student(name,age) values("andy",20)', (err, results) => {
//   console.log(results);
// });


// 链式语法支持
// studentModel.insert({ name: '张三22', age: 22 }, (err, results) => {
//     console.log(err);
//     console.log(results);
//   })
//   .find('name="张三22"', (err, results) => {
//     console.log(err);
//     console.log(results);
//   });


// studentModel.find((err, results) => {
//   console.log(results);
// });