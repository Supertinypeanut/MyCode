const express = require("express");
const path = require("path");
const fs = require("fs");
// 处理文件上传
const multer = require("multer");
const upload = multer({ dest: "homework_tmp/" });

const app = new express();

const students = require("./data/students.json");

// 部署静态文件
app.use(express.static("views"));

// 获取人员名单
app.get("/getList", (req, res) => {
  fs.readdir(path.join(__dirname, "./homework"), (err, files) => {
    const handedList = [];
    for (var i in files) {
      var stats = fs.statSync(path.join(__dirname, "./homework", files[i]));
      if (stats.isFile()) {
        var index = files[i].lastIndexOf(".");
        var name = files[i].substring(0, index);
        handedList.push(name);
      }
    }
    const unhandedList = [];
    for (var i = 0; i < students.length; i++) {
      if (handedList.indexOf(students[i]) === -1) {
        unhandedList.push(students[i]);
      }
    }
    res.json({
      handedList,
      unhandedList
    });
  });
});

// 文件上传
app.post("/upload", upload.any(), (req, res) => {
  var index,flag,suffix;
  for (var i = 0; i < students.length; i++) {
    flag = true;
    if ( req.files[0].originalname.indexOf(students[i]) > -1) {
      flag = false;
      index = req.files[0].originalname.lastIndexOf('.');
      suffix = req.files[0].originalname.substring(index)
      var fileName = "./homework/" + students[i]+suffix;
      fs.readFile(req.files[0].path, function(err, data) {
        fs.writeFile(fileName, data, function(err) {
          if (err) {
            res.json({
              code: 400,
              msg: "上传失败"
            });
          } else {
            res.json({
              code: 0,
              msg: "上传成功"
            });
          }
        });
      });
      break;
    }
  }
  if (flag) {
    res.json({
      code: 300,
      msg: "名字不对"
    });
    return;
  }
});

// 默认监听80端口
app.listen("80", () => {
  console.log("start");
});
