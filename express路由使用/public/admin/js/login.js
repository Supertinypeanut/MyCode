$(function() {
  $(".input_sub").click(function(event) {
    // 阻止submit默认跳转事件
    event.preventDefault();
    // 判断输入框是否为空
    if ($('.input_txt').val().trim() != '' && $('.input_pass').val().trim() != '') {
      // 调用接口
      $.ajax({
        type: 'post',
        url: window.BigNew.user_login,
        dataType: "json",
        data: {
          username: $('.input_txt').val().trim(),
          password: $('.input_pass').val().trim(),
        },
        success: function(data) {
          alert(data.msg);
          if (data.code == 200) {
            //将服务器返回的token存储在用户本地，供打开管理后台页面进行验证
            localStorage.setItem("token", data.token);
            // 跳转页面
            window.location.href = "./index.html";
          }
        }
      });
    } else {
      alert("输入内容不能为空");
    }
  });
})