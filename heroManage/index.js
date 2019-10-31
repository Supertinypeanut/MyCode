// ------------内置模块
const path = require('path');
// ---------------------导包
const express = require('express')
  // 数据库
const mysql = require('mysql')
const hm = require('mysql-ithm')
  // 验证码
var svgCaptcha = require('svg-captcha');

// 中间件
//  可以解析post数据
const bodyParser = require('body-parser')
  // 解析上传文件
const fileUpload = require('express-fileupload');


// -------------------创建服务
const app = express()

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
  // default options
app.use(fileUpload());

// 静态托管
app.use(express.static('./upload'))
app.use(express.static('./web'))



// ---------------------创建数据库
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
// 后台英雄表格
let heroModel = hm.model('hero', {
  // 名字叫
  name: String,
  // 技能
  skill: String,
  //    头像路径
  icon: String
});
// 
let userModel = hm.model('user', {
  // 用户名
  name: String,
  // 密码
  password: String,
});





// 创建路由
// ---------------------查询英雄列表 list
app.get('/hero/list', (request, response) => {
  //   response.send('list');
  //查询所有数据
  heroModel.find((err, results) => {
    if (!err) {
      response.send({
        heros: results,
        msg: '查询成功',
        code: 201
      });
    } else {
      response.send({
          code: 500,
          msg: '服务器内部错误'
        })
        //   console.log(err);
    }
  });
});

// ********************后台接口**************
// ---------------------查询英雄详情 info
app.get('/hero/info', (request, response) => {
  //   response.send('info');
  // 根据id查询数据
  heroModel.find(`id=${request.query.id}`, (err, results) => {
    if (!err) {
      // 判断id是否有数据
      if (results.length == 0) {
        response.send({ msg: 'id不存在，请查看代码' });
      } else {
        response.send({
          // 因为返回结果是数组，但是我们id是精确查询，只需要一个，所以将其获取第一个
          data: results[0]
        });
      }
    } else {
      if (!request.query.id) {
        response.send({
          msg: '没传参数id'
        });
      } else {
        response.send({
          code: 500,
          msg: '服务器内部错误'
        });
      }

    }

  });

});


// -----------------------------数据增加 insert
app.post('/hero/insert', (request, response) => {
  // 可以获取请求体信息
  //   console.log(request.body);
  //   获取上传文件信息
  //   console.log(request.files);

  //   文件名
  const icon = request.files.icon.name;
  // 存放路径
  const url = path.join(__dirname, './upload/', icon);
  //获取名字和技能
  const { name, skill } = request.body;
  request.files.icon.mv(url, err => {
    if (!err) {
      console.log('上传成功');
      heroModel.insert({ name, skill, icon }, (err, results) => {
        if (!err) {
          response.send({
            code: 200,
            msg: '增加成功'
          });
        } else {
          response.send({
            code: 500,
            msg: '服务器内部错误，数据库错误'
          });
        }
      });

    } else {
      console.log('上传失败');
      response.send({
        code: 500,
        msg: '服务器内部错误，文件移动错误'
      });
    }
  })

});
// -------------------------------数据删除 delete
app.post('/hero/delete', (request, response) => {
  if (request.body.id) {
    //4.1 删除 数据
    heroModel.delete(`id=${request.body.id}`, (err, results) => {
      if (!err) {
        response.send({
          msg: '删除成功'
        });
      } else {
        response.send({
          code: 500,
          msg: '服务器内部错误，数据库错误'
        });
      }
    });
  } else {
    response.send({
      msg: '参数错误，请写id参数'
    });
  }
});
// ------------------------------数据更改 updata
app.post('/hero/updata', (request, response) => {
  // 获取获取参数
  const { id, name, skill } = request.body;
  // 获取路径
  const icon = request.files.icon.name;
  const url = path.join(__dirname, './upload/', icon);
  request.files.icon.mv(url, err => {
    if (!err) {
      //数据修改
      heroModel.update(`id=${id}`, { name, skill, icon }, (err, results) => {
        if (!err) {
          response.send({
            msg: '更新成功'
          });
        } else {
          response.send({
            msg: '参数错误，请写id参数'
          });
        }
      });
    } else {
      response.send({
        code: 500,
        msg: '服务器内部错误'
      });
    }
  })
});

// ********************前台接口**********
// -------------------注册接口
app.post('/user/register', (request, response) => {
  const { name, password } = request.body;
  userModel.find(`name=${name}`, (err, results) => {
    if (!err) {
      if (results.length === 0) {
        // 给数据库增加数据
        userModel.insert({ name, password }, (err, results) => {
          if (!err) {
            response.send({
              msg: '注册成功',
              code: 200
            })
          } else {
            response.send({
              code: 500,
              msg: '服务器内部错误，数据库添加数据失败'
            });
          }
        });
      } else {
        response.send({
          msg: '该用户名已被注册'
        })
      }
    } else {
      response.send({
        code: 500,
        msg: '服务器内部错误，查找数据库失败'
      });
    }
  });
});


let captchaCode = '';
// 验证码接口
app.get('/user/captcha', function(req, res) {
  const captcha = svgCaptcha.create();
  // req.session.captcha = captcha.text;
  captchaCode = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
  console.log(captchaCode);

});


// 登入接口
app.post('/user/login', (request, response) => {
  const { name, password, captcha } = request.body;
  //通过正则判断是否一致，忽略大小写  也可以使用toLocaleLowerCase()，toLocaleUpperCase()
  if (!RegExp(`^${captchaCode}$`, 'i').test(captcha)) {
    response.send({
      msg: '验证码错误'
    });
    return;
  }
  userModel.find(`name=${name}`, (err, results) => {
    if (!err) {
      if (results.length === 0) {
        response.send({
          code: 201,
          msg: '没有该用户，请新注册'
        });
        return;
      }
      if (results[0].password == password) {
        response.send({
          code: 200,
          msg: '密码正确，登入成功'
        });
      } else {
        response.send({
          code: 202,
          msg: '密码错误'
        });
      }

    } else {
      response.send({
        code: 500,
        msg: '服务器内部错误，查找数据库失败'
      });
    }
  });
})



// 开启服务，监听端口3000
app.listen(3000, err => {
  if (!err) {
    console.log('端口3000开启成功！！！');

  } else {
    console.log("开启服务失败");
  }
});