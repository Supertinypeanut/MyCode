window.onload = function() {
  // 初始化数据调用一次即可
  locadData();


  //   获取消息模块节点
  var logistics = document.getElementById("logistics");
  var telephone = document.getElementById("telephone");
  var shop = document.getElementById("shop");
  // 获取更多按钮
  var gengDuo = document.querySelector(".gengDuo");
  var muen = document.querySelector(".muen");
  // 获取版心
  var w = document.querySelector(".w");


  // 更新渲染页面
  updateDOM();

  // 为更多节点添加点击事件
  gengDuo.addEventListener("touchstart", function() {
    muen.classList.add("active");
  }, false);
  // 为版心注册事件
  w.addEventListener("touchend", function(event) {
    var flag = false;
    for (const item of event.path) {
      if (item == gengDuo) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      muen.classList.remove("active");
    }
  }, false);




  // ------------页面更新渲染
  function updateDOM() {
    // 清空原来节点内容
    logistics.innerHTML = '';
    telephone.innerHTML = '';
    shop.innerHTML = '';


    // 获取本地数据，进行页面渲染
    var str = this.localStorage.getItem("msg");
    var obj = this.JSON.parse(str);
    var text, numsText;
    // 遍历对象渲染页面消息
    for (const item of obj) {
      // 判断nums是否为零，为0则有iNone类，否则则没有
      if (item.nums > 0) {
        numsText = `<i class="nums">${item.nums}</i>`;
      } else {
        numsText = `<i class="iNone nums">0</i>`
      }
      // 单条消息模版字符串
      text = `<div class="danTiao"><span class="picture"><img src="${item.imgURL}" >${numsText}</span><div class="inner"><div class="top"><span>${item.title}</span><i>${item.time}</i></div><div class="bottom">${item.content}</div></div></div>`;
      // 判断添加到哪个节点
      if (item.kind == "logistics") {
        // 每次添加到节点中最后一个节点
        logistics.insertAdjacentHTML("beforeend", text);
      } else if (item.kind == "telephone") {
        telephone.insertAdjacentHTML("beforeend", text);
      } else {
        shop.insertAdjacentHTML("beforeend", text);
      }
    }

    // 消息总数更新
    nowNumsZ();

  }


  //更新未读总消息
  function nowNumsZ() {
    // 获取消息总消息
    var numsZ = document.querySelector(".xiaoXi i");
    // 获取每个未读标签
    var nums = document.querySelectorAll(".nums");

    //   遍历所有未读标签
    var notNum = 0;
    nums.forEach(item => {
      if (!item.classList.contains("iNone")) {
        notNum += parseInt(item.innerHTML);
      }

    });
    // 改变页面总数
    numsZ.innerHTML = notNum;
  }

  // ********************加载数据到本地 函数*************
  function locadData() {
    //   模拟存储数据
    var obj = [{
        kind: "logistics",
        imgURL: "./imgs/组2@2x.png",
        nums: 3,
        title: "物流信息",
        time: "04-14 14:00",
        content: "派件中，您购买的麻辣火锅香料1*500G包"
      },
      {
        kind: "logistics",
        imgURL: "./imgs/组3@2x.png",
        nums: 1,
        title: "活动通知",
        time: "04-16 18:00",
        content: "您的200积分到账啦！积分悦好礼还可以瓜分现sefwe"
      },
      {
        kind: "telephone",
        imgURL: "./imgs/组4@2x.png",
        nums: 1,
        title: "活动通知",
        time: "04-16 18:00",
        content: "您的200积分到账啦！积分悦好礼还可以瓜分现sefwe"
      },
      {
        kind: "telephone",
        imgURL: "./imgs/组5@2x.png",
        nums: 1,
        title: "活动通知",
        time: "04-16 18:00",
        content: "您的200积分到账啦！积分悦好礼还可以瓜分现sefwe"
      },
      {
        kind: "telephone",
        imgURL: "./imgs/组6@2x.png",
        nums: 1,
        title: "活动通知",
        time: "04-16 18:00",
        content: "您的200积分到账啦！积分悦好礼还可以瓜分现sefwe"
      },
      {
        kind: "shop",
        imgURL: "./imgs/组7@2x.png",
        nums: 1,
        title: "活动通知",
        time: "04-16 18:00",
        content: "您的200积分到账啦！积分悦好礼还可以瓜分现sefwe"
      },
      {
        kind: "shop",
        imgURL: "./imgs/图层13@2x.png",
        nums: 1,
        title: "活动通知",
        time: "04-16 18:00",
        content: "您的200积分到账啦！积分悦好礼还可以瓜分现sefwe"
      },
      {
        kind: "shop",
        imgURL: "./imgs/图层14@2x.png",
        nums: 1,
        title: "活动通知",
        time: "04-16 18:00",
        content: "您的200积分到账啦！积分悦好礼还可以瓜分现sefwe"
      }
    ];
    // 将数据存储本地msg
    var str = JSON.stringify(obj);
    this.localStorage.setItem("msg", str);
  }
}