const express = require('express')

// 使用 Mock
const Mock = require('mockjs')

// 导入mysql
const mysql = require('mysql');
// 导入mysql-ithm
const hm = require('mysql-ithm');


// //2.连接数据库
// //如果数据库存在则连接，不存在则会自动创建数据库
// hm.connect({
//     host: '127.0.0.1', //数据库地址
//     port: '3306',
//     user: 'root', //用户名，没有可不填
//     password: 'root', //密码，没有可不填
//     database: 'herodb' //数据库名称
//   });

//   //3.创建Model(表格模型：负责增删改查)
//   //如果table表格存在则连接，不存在则自动创建
//   const heroModel = hm.model('hero', {
//     // 名字 字符串
//     name: String,
//     // 技能 字符串
//     skill: String,
//     // 头像 路径 用字符串存
//     icon: String
//   });

// console.log(data);
for (let i = 0; i < 10000; i++) {
  // console.log(Mock.Random.date())
  // console.log(Mock.Random.cparagraph(5,20));

  // 随机的名字
  const name = Mock.Random.cname();
  // 随机的技能名
  const skill = Mock.Random.cparagraph(3, 10);
  // 随机的图片
  const icon = Mock.Random.image('200x200', Mock.Random.color(), name);

  var template = {
    'key|1-10': '$'
  }

  console.log(Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
  }));

  // 写入数据库
  // heroModel.insert({name,skill,icon},(err,result)=>{
  //     if(!err){
  //         console.log('success');
  //     }
  // })


  // 模块 fs
  const fs = require("fs");
  // 模块 path
  const path = require("path");
  // 模块 express
  const express = require("express");
}