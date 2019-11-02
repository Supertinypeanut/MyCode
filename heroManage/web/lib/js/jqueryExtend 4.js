

$.extend($, {
  ajaxWithCheck: function ({ url, data, type, contentType, processData, cache, success }) {
    //4.2 使用 jQery异步 提交
    $.ajax({
      url: url,
      type: type,
      cache: cache ? cache : false,
      data: data,
      contentType: contentType == undefined ? true : contentType,
      processData: processData == undefined ? true : processData,
      success: function (backData) {
        // 如果 登录验证失败
        if (backData.code == 501) {
          // 显示错误消息后，跳转到 指定的页面
          alert(backData.msg);
          top.location = backData.backUrl;
        } else {
          // 调用 用户 传入的 回调函数，并将 服务端发回的 响应报文体对象 作为参数传入
          success(backData);
        }
      }
    });
  }
});