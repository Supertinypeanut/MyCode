$(function() {
  // 文章管理点击打开关闭逻辑
  $(".level01").eq(1).click(function() {
    $(this).find(".iconfont.icon-arrowdownl").toggleClass("rotate0");
    $('.level02').slideToggle();
  });
  // 当点击文章管理内层时，外层文章管理自动高亮，与自己高亮
  $('.level02').on('click', 'li', function() {
    $(".level01").eq(1).addClass("active").siblings().removeClass("active");
    $(this).addClass("active").siblings().removeClass("active");
  });


  // 点击按钮高亮
  $(".level01").on("click", function() {
    $(this).addClass("active").siblings().removeClass("active");
  })

  //   个人信息获取，和token验证
  $.ajax({
    type: "get",
    url: window.BigNew.user_info,
    dataType: 'json',
    success: function(data) {
      //   改变头像
      $('.user_info img').prop("src", data.data.userPic);
      // 改变名称
      $('.user_info span').text(`欢迎  ${data.data.nickname}`);
      // 顶部栏头像
      $('.user_center_link img').prop('src', data.data.userPic);
    }
  });
})