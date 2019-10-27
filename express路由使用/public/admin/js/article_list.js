$(function() {
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
        $('#selCategory').html(opt);
      }
    }
  });
  // 首次页面信息渲染
  loadDate();

  // --------------------------------------------筛选类别按钮逻辑-----------------
  // 注册筛选按钮点击事件
  $('#btnSearch').click(function(event) {
    // 阻止默认事件
    event.preventDefault();
    // 创建请求参数对象,获取按钮值
    // var obj = {
    //   type: $(this).siblings('#selCategory').val(),
    //   state: $(this).siblings('#selStatus').val()
    // };

    loadDate();
    // console.log(type, state);

  });



  // ----------------------------删除列表逻辑------------------------
  $('tbody').on('click', '.btn.btn-danger.btn-xs.delete', function(event) {
    event.preventDefault();
    // 删除提示处理
    if (confirm('真的要删除吗！！！')) {
      //  获取删除id
      const id = $(this).data('id');
      // console.log(id);
      $.ajax({
        type: 'post',
        url: BigNew.article_delete,
        data: { id: id },
        success: (data) => {
          // console.log(data);
          if (data.code == 204) {
            alert(data.msg);
            // 渲染页面
            loadDate();
          }
        }
      });
    }
  });

  // **********************************************渲染列表数据************
  // 默认每页十条消息展示
  function loadDate(obj) {
    // 默认请求配置
    var objDefault = {
      perpage: 10,
      type: $('#selCategory').val(),
      state: $('#selStatus').val()
    };

    // 遍历传入的对象，更新默认配置
    for (const key in obj) {
      objDefault[key] = obj[key];
    };
    // 调用接口请求数据
    $.ajax({
      type: 'get',
      url: BigNew.article_query,
      data: objDefault,
      success: function(data) {
        // console.log(data);
        if (data.code == 200) {
          // ----------------调用渲染函数-----------
          listData(data);
          // ---------------调用分页函数---------------
          pages(data);
        }
      }
    });
  };


  // **********************************************调用模版引擎的渲染函数**************
  function listData(data) {
    // 调用模版引擎
    var lts = template("listData", data.data);
    // 渲染页面
    $('tbody').html(lts);
  };


  // *************************************************自封装调用分页插件函数**************
  function pages(data) {
    // 调用分页插件
    $('#pagination-demo').twbsPagination({
      // 总页数
      totalPages: data.data.totalPage,
      // 展示7格
      visiblePages: 7,
      // first的内容
      first: "首页",
      prev: "上一页",
      next: "下一页",
      last: "尾页",
      // 点击页码之后出发的事件
      onPageClick: function(event, page) {
        // console.log(event);
        // console.log(page);
        // page就是 当前的页码

        // console.log(data);
        // 调用渲染函数
        // 因为设置了默认参数，所以只需传入更改的页数即可

        // 默认请求配置
        var objDefault = {
          perpage: 10,
          page: page,
          type: $('#selCategory').val(),
          state: $('#selStatus').val()
        };
        // 调用接口请求数据
        $.ajax({
          type: 'get',
          url: BigNew.article_query,
          data: objDefault,
          success: function(data) {
            // console.log(data);
            if (data.code == 200) {
              // ----------------调用渲染函数-----------
              listData(data);
            }
          }
        });
      }
    });
    // 重置分页插件的页数与页数按钮个数
    $('#pagination-demo').twbsPagination('changeTotalPages', data.data.totalPage, 1);
  }




})