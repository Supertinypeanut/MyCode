function ajax(obj) {
  const defaults = {
    type: "get",
    url: "javascipt:;",
    async: true,
    data: null,
    jsonp: 'callback',
    jsonpCallBack: `jQuery${('Supertinypeanut'+Math.random()).replace(/\D/g,'')}${Date.now()}`,
    dataType: "json",
    success(data) {
      console.log(data);
    }
  }

  // 更新默认项
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      defaults[key] = obj[key];
    }
  }

  //   判断是否是jsonp跨域请求
  defaults.dataType == "jsonp" ? ajaxJsonp(defaults) : ajaxXHL(defaults);
}

/********** 使用XHLHttpRequest或者ActiveXObject的请求函数********/
function ajaxXHL(obj) {

  // 创建xhr对象
  const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  //   监听数据对象状态 --> xhr.readyState
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        let data = xhr.responseText;
        if (obj.dataType == "json") {
          data = JSON.parse(data);
        }
        obj.success(data);
      }
    }
  });

  //处理请求参数对象
  const parma = objectScale(obj.data);
  //存储send的发送参数
  let body = null;

  //   判断是否是get请求
  obj.type == "get" ? obj.url += `?${encodeURI(parma)}` : body = parma;

  // 与服务器建立链接
  xhr.open(obj.type, obj.url, obj.async);

  // 判断是否是get请求
  if (obj.type == 'post') {
    //设置请求头
    xhr.setRequestHeader("Content-Type", "x-www-form-urlencoded");
  }
  //  发送请求
  xhr.send(body);

}

/***********jsonp跨域请求函数*******************/
function ajaxJsonp(obj) {
  // 挂载回调函数
  window[obj.jsonpCallBack] = (data) => {
    obj.success(data);
  }

  //  处理请求参数对象
  const parma = objectScale(obj.data);
  obj.url += `?${obj.jsonp}=${obj.jsonpCallBack}&${encodeURI(parma)}`

  //   创建script标签
  const script = document.createElement('script');
  script['src'] = obj.url;

  //获取head标签
  const head = document.querySelector("head");
  head.appendChild(script);

}

/************处理对象转化为key=value&key=value...***********/
function objectScale(data) {
  let parma = '';
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      parma += `${key}=${data[key]}&`;
    }
  }
  return parma = parma.slice(0, parma.length - 1);
}