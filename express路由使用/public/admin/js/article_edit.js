$(function() {
  // 文章原有状态
  let state;

  // 创建富文本
  var E = window.wangEditor;
  var editor = new E('#editText');
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create();


  // 获取数据ID
  var id = location.search.split('=')[1];
  // console.log(location.search);


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

  // -------------------------发送请求，获取编辑信息并渲染
  $.ajax({
    type: 'get',
    url: BigNew.article_search,
    data: {
      id: id
    },
    success: function(data) {
      console.log(data);
      if (data.code = 200) {
        // id
        $('.id').val(data.data.id);
        //标题
        $('#inputTitle').val(data.data.title);
        // 封面
        $('.article_cover').val(data.data.cover);
        // 类别
        $('.form-control.category').val(data.data.categoryId);
        // 时间
        $('#dateinput').val(data.data.date);
        // 文章状态
        state = data.data.state;

        // 富文本
        editor.txt.html(data.data.content);
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

  // --------------------------------保存修改或草稿--- 因为业务逻辑基本相同--------------
  // 点击保存按钮或者草稿按钮
  $('.btn.btn-success.btn-edit,.btn.btn-default.btn-draft').click(function(event) {
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
      url: BigNew.article_edit,
      data: FD,
      contentType: false,
      processData: false,
      success: function(data) {
        // console.log(data);
        if (data.code == 200) {
          alert(data.msg);
          // 修改成功返回
          location.href = './article_list.html';
        }
      }
    })
  });
});