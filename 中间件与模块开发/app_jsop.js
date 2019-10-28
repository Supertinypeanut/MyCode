// 导包
const express = require('express')
const bodyParser = require('body-parser')

// 创建服务
const app = express()


// ---------parse application/x-www-form-urlencoded-------
app.use(bodyParser.urlencoded({ extended: false }))
  // 设置可以跨域
app.use((request, response, next) => {
  // 设置允许跨域
  response.header('Access-Control-Allow-Origin', '*');
  next()
})

// 注册get路由
app.get('/get', (request, response) => {
  // 打印请求参数
  console.log(request);
  // 使用jsonp响应请求
  response.jsonp({ method: 'GET' });
});
// 注册post路由
app.post('/post', (request, response) => {
  // 打印请求参数
  console.log(request.query);
  //   打印body-parser请求参数
  console.log(request.body);
  // 使用jsonp响应请求
  response.jsonp({ method: 'POST' });
});

// 开启服务，监听端口
app.listen(10086, err => {
  if (!err) {
    console.log('10086端口服务开启成功！！！');
  } else {
    console.log('Sorry，10086端口开启失败' + err);
  }
});