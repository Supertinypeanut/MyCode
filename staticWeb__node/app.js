// **************导入模块*********
// 文件模块
const fs = require('fs');
// 路径模块
const path = require('path');
// http服务模块
const http = require('http');

const url = require('url');


// 创建http服务对象
const server = http.createServer((request, response) => {
  // 获取浏览器端请求资源的资源路径，因为但发生get请求时可能有中文，在发送给服务器时，都有进行encodeURI转码，所以我们需要进行decodeURI解码
  let URL = path.join(__dirname, './public', decodeURI(request.url));
  // 读取路径内容，因为我们的HTML文档有声明utf-8，基本的静态资源浏览器都可以识别
  fs.readFile(URL, (error, data) => {
    //   判断是否存在该请求资源
    if (error == null) {
      //   响应静态资源
      response.end(data);
    } else {
      // 如果页面没有设置编码，直接返回数据，需要设置响应内容头部content-type
      // response.setHeader('content-type','text/html;charset=utf-8');
      //   获取404页面路径
      URL = path.join(__dirname, './public/404.html');
      fs.readFile(URL, (error, data) => {
        //   返回404页面
        response.end(data);
      });
    }
  });


});

// 监听服务对象，开启端口10086
server.listen(10086, error => {
  if (error == null) {
    console.log('10086端口，服务开启成功了！！！');
  } else {
    console.log('Sorry,服务开启失败');
  }
});


// *****************使用第三方模块*******************

// const express = require('express')
// const app = express()

// app.get('/', (request, response) => {
//   res.send('Hello World')
// })

// app.listen(10086);