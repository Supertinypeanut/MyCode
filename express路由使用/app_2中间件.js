// 导入express 模块，相与替换了http模块
const express = require('express')
  // fs模块
const fs = require('fs')
  // path模块
const path = require('path')

// ************************导入中间件**************
// 解析post请求体内容---》body对象
const bodyParser = require('body-parser')
  // 文件上传模块
const fileUpload = require('express-fileupload');



// ---------------------------创建服务----------------
const app = express()


// ---------parse application/x-www-form-urlencoded-------
app.use(bodyParser.urlencoded({ extended: false }))
  // 使用中间件，上传文件
app.use(fileUpload());

/*
请求方式：post
接口地址：/getSomeJoke
请求参数：num
返回信息：{
    num:请求个数
    msg:获取成功/失败
    jokeArr:随机笑话数组
}
*/


//**************************通过 随机获取一些笑话***********************
app.post('/getSomeJoke', (request, response) => {
  //   response.send(request.body.num);
  // 获取请求笑话数  -->num
  const num = request.body.num;
  // 笑话json路径
  const URL = path.join(__dirname, './port/post/jokes.json');
  console.log(URL);

  // 获取笑话文本
  const jokeStr = fs.readFile(URL, 'utf-8', (err, data) => {
    if (err == null) {
      // 返回的数据为文本，所以转化为对象
      const jokes = JSON.parse(data);
      //   声明随机笑话数组
      const jokeArr = [];
      // 获取相应num条随机笑话
      for (let index = 0; index < num; index++) {
        // 获取随机下标
        let jokeIndex = parseInt(Math.random() * jokes.length);
        // 添加到随机笑话数组
        jokeArr.push(jokes[jokeIndex]);
        // 删除原有数组笑话，比避免重复
        jokes.splice(jokeIndex, 1);
      }
      //   返回数据对象
      response.send({
        num,
        msg: '获取成功',
        jokeArr
      });

    } else {
      // 
      response.send('sorry，服务器没有数据！！');
    }
  });
  //   console.log(request);
});


/*
请求方式：post
接口地址：/uploadFiles
请求参数：
返回信息：{
    msg:上传成功
}
*/
// ****************************上传文件或者表单***************************
app.post('/uploadFiles', (request, response) => {
  //   console.log(request);
  // 获取需要存储的路径
  const URL = path.join(__dirname, './port/post/', request.files.Myfile.name);
  // 调用移动方法
  request.files.Myfile.mv(URL, err => {
    if (err == null) {
      response.send({ msg: '上传成功' });
    } else {
      response.send({ msg: '上传失败' });
    }
  });
});


//*********************开启服务端口*******************
app.listen(10086, error => {
  if (error == null) {
    console.log('服务开启成功,端口10086');
  } else {
    console.log('开启失败' + error);
  }
});