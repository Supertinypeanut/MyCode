$(function() {
  // 数据本地化，初始化一次即可注释
  // updata();

  // 渲染页面
  localData();
  // ***************数据本地化*************
  function updata() {
    var arr = [{
      num: '4234234T79H',
      modth: '银联支付',
      time: '2019.04.24'
    }];
    var str = JSON.stringify(arr);
    localStorage.setItem('trade', str);
  }

  // ***************数据获取与页面渲染************
  function localData() {
    var str = localStorage.getItem("trade");
    var arr = JSON.parse(str);

    var txt = '';
    arr.forEach(element => {
      txt += `<div><span class="left">交易编号</span><span id="num" class="right">${element.num}</span></div>
      <div><span class="left">交易方式</span><span id="modth" class="right">${element.modth}</span></div>
      <div><span class="left">交易时间</span><span id="time" class="right">${element.time}</span></div>`;
    });
    $(".mid").html(txt);

  }
})