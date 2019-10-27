// 导入path模块
const path = require('path')
  // 导入fs模块
const fs = require('fs')
  // 导入第三方express模块
const express = require('express')
  // 创建服务
const app = express()

// 相当于以上操作
// const http = require('http');
// const server = http.createServer((request,response)=>{

// });




// 开启静态资源服务器资源
app.use(express.static('public'));


// get路由
app.get('/port/get', (request, response) => {

  response.send('一条优雅风趣的笑话！！');
});

app.get('/randomJoke', (request, response) => {



  // 获取路径
  const URL = path.join(__dirname, './port/get/jokes.json');
  // 读取json数据,如果直接给浏览器可以不需要转码
  fs.readFile(URL, 'utf-8', (error, data) => {

    if (error == null) {

      console.log(data);

      // 笑话数组
      const jokeArr = JSON.parse(data);
      // 获取随机下标
      const jokeIndex = parseInt(Math.random() * jokeArr.length);
      // 返回消息
      response.send(jokeArr[jokeIndex]);
    } else {
      // console.log();
      response.send('出错了，回去写接口把');
    }


  });
});

// post路由

// app.get('/', function(req, res) {
//   // express框架已经解决
//   // res.setHeader('content-type','text/plain;charset=utf-8');
//   res.send('我是优雅的页面')
// })

app.listen(3000, err => {
  if (!err) {
    console.log('开启成功');

  }
})




// // *******************ajax
// function ajaxFa({ type = 'get', url = '', async = true, data = {}, dataType = 'json', success = data => console.log(data) }) {

//   // 兼容IE低版本
//   const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//   //  创建XMLHttpRequest成功，readyState == 0
//   //  当reasyState变化时便会触发onreadystatechange事件
//   xhr.onreadystatechange = () => {
//     //readyState == 1/2/3/4 至少触发四次  --》response当数据大时，会分段传输，会多次触发该事件  readyState==3 --》相当于onprogress（）事件
//     if (xhr.readyState == 4) { //-->相当于onload()
//       if (xhr.status == 200) {
//         let data = xhr.responseText;
//         if (dataType == 'json') {
//           data = JSON.parse(data);
//         }
//         success(data);
//       }
//     }
//   }

//   let str = '';
//   for (const key in data) {
//     str += key + '=' + data[key] + '&';
//   }
//   if (type == 'get') {
//     url += '?' + encodeURI(str.slice(0, str.length - 1))
//   }

//   open(type, url, async);
//   let parme = null;
//   if (type == 'post') {
//     xhr.setRequestHeader('Content-Type', 'applocation/x-www-form-urlencoded');
//     parme = str;
//   }
//   send(parme);

// }