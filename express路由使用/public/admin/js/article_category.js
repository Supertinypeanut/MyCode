$(function() {
  // ------------------------------- 首次加载数据---------------------------------------
  loadData();

  // ---------------------------------新增类别-------------------------------------------
  // 点击新增按钮已经由bootstrap写好，直接调用
  $(".btn.btn-success").on("click", function() {
    // 清空输入框值
    $("#kindName").val(''),
      $("#kindSlug").val('')
      // 内容模态文本内容，公用一个模态框
    $("#myModalLabel").html('新增分类');
    $("#addKind").html('新增');
  })

  // --------------------------为模态框保存按钮注册点击事件----新增或修改----------


  $("#addKind").click(function(event) {
    // 阻止a的默认事件
    event.preventDefault();

    // 因为公用一个模态框，所以只判断下按钮内容即可
    if ($(this).text() == "新增") { //-----新增请求------
      // 获取表单数据，并提交到服务器
      $.ajax({
        type: 'post',
        url: BigNew.category_add,
        data: {
          name: $("#kindName").val().trim(),
          slug: $("#kindSlug").val().trim(),
        },
        success: function(data) {
          //   console.log(data);
          //创建成功返回状态码为201
          if (data.code == 201) {
            alert(data.msg);
            // 隐藏模态框
            $('#myModal').modal('hide');
            // 刷新页面
            loadData();
          }
        }
      });
    } else { //---------------------修改请求---------
      $.ajax({
        type: "post",
        url: BigNew.category_edit,
        data: {
          id: $(this).data("id"),
          name: $("#kindName").val().trim(),
          slug: $("#kindSlug").val().trim(),
        },
        success: function(data) {
          // console.log(data);
          if (data.code == 200) {
            // 更新页面、
            loadData();
            // 关闭模态框
            $('#myModal').modal('hide');
          }
          alert(data.msg)
        }
      })
    }


  });

  // ------------------删除类别 ---------------------
  // 应为我们的类别信息是由后面渲染出来，原本的HTML中没由相对应节点，所以需要用事件委托
  $('tbody').on("click", ".btn.btn-danger.btn-xs", function() {
    //   event.preventDefault();
    // 获取当前点击类别id
    var id = $(this).data('id');
    //   console.log(id);

    // 请求之前，询问是否要删除
    if (confirm('真的要删我吗！！')) {
      $.ajax({
        type: "post",
        url: BigNew.category_delete,
        async: true,
        data: {
          id: id
        },
        dataType: 'json',
        success: function(data) {
          //   console.log(data);
          if (data.code == 204) {
            alert(data.msg);
            // 加载页面
            loadData();
          }
        }
      });
    };
  });

  // ------------------------------编辑逻辑-----------------------------------
  $('tbody').on("click", ".btn.btn-info.btn-xs", function() {
    //   console.log(window.parent.location);

    // 修改内容模态文本内容，公用一个模态框
    $("#myModalLabel").text('修改分类');

    //   console.log($(this).next().data('id'));
    //   添加一个修改id
    $("#addKind").text('修改').attr("data-id", $(this).next().data('id'));
    // 获取点击的名称与Slug，将其渲染到模态框
    var name = $(this).parent().siblings().eq(0).text();
    var slug = $(this).parent().siblings().eq(1).text();
    //   console.log(name, slug);
    $('#kindName').val(name);
    $('#kindSlug').val(slug);

  });

  // ****************因为每次增删改都需要刷新页面，所以将其封装为加载数据函数**********************
  function loadData() {
    $.ajax({
      type: 'get',
      url: window.BigNew.category_list,
      dataType: "json",
      success: function(data) {
        //   console.log(data);
        // 判断是否请求成功
        if (data.code == 200) {
          //   返回类别模版
          var html = template("content", data);
          //   console.log(html);
          // 添加到tbody
          $("tbody").html(html);
        }
      }
    });
  }
})