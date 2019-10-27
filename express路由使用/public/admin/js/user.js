$(function() {
  //   ---------------获取当前用户信息，进行页面渲然----------
  $.ajax({
    type: 'get',
    url: window.BigNew.user_detail,
    async: true,
    success: function(data) {
      // console.log(data);
      // 页面渲染
      // $('.form-control.username').val(data.data.nickname);
      // $('.form-control.nickname').val(data.data.username);
      // $('.form-control.email').val(data.data.email);
      // $('.form-control.password').val(data.data.password);

      //因为上面对象键与类名一样，所以遍历
      for (const key in data.data) {
        $('.form-control.' + key).val(data.data[key]);
      }

      // 单独设置照片
      $('.user_pic').prop("src", data.data.userPic)
    }
  });

  // --------------------用户信息修改----------------
  // 预览选择文件
  $("#exampleInputFile").change(function() {
    var objUrl = URL.createObjectURL(this.files[0]);
    //   改变链接
    $(this).siblings('label').children('img').prop('src', objUrl);
  });
  // 点击修改按钮
  $('.btn.btn-success.btn-edit').click(function(e) {
    e.preventDefault();
    // 由于是from表单对象，所以提交直接使用formData对象提交
    var FD = new FormData($('form')[0]);
    $.ajax({
      type: 'post',
      url: window.BigNew.user_edit,
      data: FD,
      // 不设置请求头，让liu ra
      contentType: false,
      processData: false,
      success: function(data) {
        if (data.code == 200) {
          alert(data.msg);
          //页面刷新，因为使用iframe嵌套，所以需要使用window.parent获取上一级window
          // window.parent.location.reload();
          // 如果修改后需要立即重新登入
          localStorage.clear();
          window.parent.location.href = './login.html';
        }
      }
    })

  });
})