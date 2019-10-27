$(function() {
  // 创建富文本
  var E = window.wangEditor;
  var editor = new E('#editText');
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create();



  // ---------------------------------------------获取类别---------------
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function(data) {
      // console.log(data);
      if (data.code == 200) {
        // 调用模版引擎
        var opt = template("cateTem", data);
        // 渲染页面
        $('.form-control.category').html(opt);
      }
    }
  });

  // ----------------------------------封面预览--------------------
  $('#inputCover').change(function() {
    // 创建临时路径
    var imgURL = URL.createObjectURL(this.files[0]);
    // 替换图片
    $('.article_cover').prop('src', imgURL);


  });

  console.log(9999);
  // --------------------------------保存修改或草稿--- 因为业务逻辑基本相同--------------
  // 点击保存按钮或者草稿按钮
  $('.btn.btn-success.btn-release,.btn.btn-default.btn-draft').click(function(event) {



    let state = '已发布';
    // 阻止默认事件
    event.preventDefault();
    // 获取表单对象formdata
    var FD = new FormData($('form')[0]);
    // 获取富文本内容
    var txt = editor.txt.html();

    FD.append('content', txt);
    // 判断是修改按钮还是草稿按钮，是修改按钮
    if (this == $('.btn.btn-default.btn-draft')[0]) {
      // 改变状态
      state = '';
    }
    // 发布状态
    FD.append('state', state);
    $.ajax({
      type: 'post',
      url: BigNew.article_publish,
      data: FD,
      contentType: false,
      processData: false,
      success: function(data) {
        console.log(data);
        if (data.code == 200) {
          alert(data.msg);
          // 修改成功返回
          location.href = './article_list.html';
        }
      }
    })
  });
})