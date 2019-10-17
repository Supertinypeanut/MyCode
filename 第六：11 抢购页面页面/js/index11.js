$(function() {
  // 初始化本地数据---localStorage
  // updata(); //初始化一次即可

  // 模拟获取后台数据
  var str = localStorage.getItem("obj");
  var obj = JSON.parse(str);


  //  页面数据加载
  loadData();

  // -----------------------搜索逻辑---------------------------
  // 点击放大镜，搜索框出现，再次点击则消失
  $(".search").on("click", function() {
    // event.path[0] 便是事件源，要是点子元素便是子元素，而this只指定放大镜，不包括子元素
    // 所以这里判断的就是当前点击元素就是放大镜才生效
    if (event.path[0] == this) {
      // 无则添加，有则删除
      $(this).children(".input").toggleClass("souSuo");
    }

  });
  // 整个页面监听
  $(document).on("click", function() {
    // 不能在形参填event，填了便是jq的event
    //  假设未点击到搜索框或者放大镜
    // 遍历path数组  path是扑获路径
    var flag = event.path.some(item => {
      return item == $(".search")[0];
    });

    if (!flag) {
      $(".search").children(".input").removeClass("souSuo");
    };

  })



  // ---------------------------点击抢购时间逻辑（tab栏，排他思想）-------------------
  // 因为是js创建DOM，所以使用事件委托，否则不会生效
  $(".time").on("click", "li", function(event) {
    // 控制时间栏样式，当前点击li高亮
    $(this).addClass("active").siblings().removeClass("active");
    // 通过遍历，判断，找到对应下标
    $(".time li").each(function(index, item) {
      if (this == item) {
        // 使其对应内容显示
        $($(".content.w")[index]).addClass("active").siblings().removeClass("active");
      }
    }.bind(this));

  });

  // -----------------------点击抢购按钮逻辑----------------------
  // 1、给按钮注册点击事件

  $(".content.w").on("click", ".btn", function() {
    //判断是否已抢购过，未抢购执行里面代码
    if (!$(this).hasClass("checked")) {
      // 更该按钮内容，并获取该条内容id
      var id = $(this).text("已抢购").addClass("checked").parents(".element").prop("id");
      // 遍历对象obj对象数组，并更改其数据，将其再次存储到localStorage中（键为obj）
      obj.forEach(function(item) {
        // 当获取到该对象时，修改对应内容
        if (item.id == id) {
          // 是否抢购标记为true
          item.checked = true;

          // 2、当点击时，按钮变为已抢购，进度条根据也随之变化  原理是更新类名bar-*
          $(this).parent().siblings(".jinDu")
            .find(".pro-bar.color-carrot") //找到变化进度条
            .toggleClass(`bar-${parseInt(item.numSale / item.stock * 100)} bar-${parseInt(++item.numSale / item.stock * 100)}`); //删除有的类名，创建新的类名
          console.log(item.numSale);

          // 更改百分比
          $(this).parent().siblings(".jinDu")
            .find(".num")
            .text(parseInt(item.numSale / item.stock * 100) + "%");
          return;
        }
      }.bind(this));
      // 更新localStorage
      str = JSON.stringify(obj);
      localStorage.setItem("obj", str);

    }
  });

  // **************************数据加载 页面渲染函数*************************
  function loadData() {
    // 各个抢购列表字符串
    var [firstStr, towStr, threeStr, fourStr] = ['', '', '', ''];

    // 遍历对象数组 
    obj.forEach(element => {
      // 判断是哪个时间点的抢购列表
      if (element.content == "first") {
        // 调用模版字符串进行拼接
        firstStr = model(firstStr, element);
      } else if (element.content == "tow") {
        towStr = model(towStr, element);
      } else if (element.content == "three") {
        threeStr = model(threeStr, element);
      } else {
        fourStr = model(fourStr, element);
      }
    });
    // 页面DOM渲染
    $("#first").html(firstStr);
    $("#tow").html(towStr);
    $("#three").html(threeStr);
    $("#four").html(fourStr);
  }



  // **************************单个数据对象字符串拼接 函数********************
  function model(str, element) {
    // 字符串说明：进度条样式是根据地类名进行动的，而其类名bar-*  是由出售数与库存比产生，抢购按钮则是根据 element.checked控制样式和按钮文字
    return str += `<div id="${element.id}" class="element">
      <span class="picture">
              <img src="${element.url}" >
            </span>
      <div class="inner">
        <span class="biaoTi">${element.title}</span>
        <span class="miaoSu">${element.boi.join(" ")}</span>
        <div class="jinDu">
          <div class="progress">
            <div class="pro-bar-container color-pumpkin">
              <div class="pro-bar bar-${parseInt(element.numSale/element.stock*100)} color-carrot"></div>
            </div>
          </div>
          <span class="num">${parseInt(element.numSale/element.stock*100)}%</span>
        </div>
        <div class="qiangGou">
          <span class="jiage">¥<i>${element.price}</i></span>
          <span class="btn ${element.checked?'checked':''}">${element.checked?'已抢购':'马上抢购'}</span>
        </div>
      </div>
    </div>`;
  }
});


// **************************初始化本地数据存储 函数********************

function updata() {
  // 先将数据存储在本地数据localStorage
  var obj = [{
    id: Math.random() * 100000000000000000000 + Date.now(), //通过随机数加时间戳模拟id唯一
    content: "first",
    url: "./imgs/img1_11.png",
    title: "1地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "first",
    url: "./imgs/img1_11.png",
    title: "1地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "first",
    url: "./imgs/img1_11.png",
    title: "1地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "first",
    url: "./imgs/img1_11.png",
    title: "1地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "first",
    url: "./imgs/img1_11.png",
    title: "1地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "first",
    url: "./imgs/img1_11.png",
    title: "1地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "first",
    url: "./imgs/img1_11.png",
    title: "1地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "tow",
    url: "./imgs/img1_11.png",
    title: "2地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "three",
    url: "./imgs/img1_11.png",
    title: "3地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "four",
    url: "./imgs/img1_11.png",
    title: "4地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "four",
    url: "./imgs/img1_11.png",
    title: "4地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "four",
    url: "./imgs/img1_11.png",
    title: "4地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "four",
    url: "./imgs/img1_11.png",
    title: "4地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "four",
    url: "./imgs/img1_11.png",
    title: "4地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "four",
    url: "./imgs/img1_11.png",
    title: "4地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "four",
    url: "./imgs/img1_11.png",
    title: "4地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, {
    id: Math.random() * 100000000000000000000 + Date.now(),
    content: "four",
    url: "./imgs/img1_11.png",
    title: "4地中海风格餐桌餐椅套餐",
    boi: ['粉色', '蓝色', '咖色', '白色'],
    stock: 100,
    numSale: 35,
    price: 569.56,
    checked: false,
    btn: "马上抢购"
  }, ];

  // 将对象转化为json
  var str = JSON.stringify(obj);
  // 存储到本地localStorage
  localStorage.setItem("obj", str);
}