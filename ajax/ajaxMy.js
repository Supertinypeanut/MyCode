$(function() {
  function ajax(obj) {
    defaults = {
        type: 'get',
        url: void 0,
        async: true,
        dataType: 'json',
        data: {},
        json: 'CallBake',
        jsonCallBake: ('jQuery' + Math.random()).replace(/D/g, '') + Date.now(), //随机生成回调函数名，避免get请求的缓存问题
        success(data) {
          console.log(data)
        }
      }
      // 处理传过来的参数对象，更新默认值
    for (const key in obj) {
      defaults[key] = obj[key]
    }

    // 由于发送给后台数据，是有 键=值&。。。。,所以遍历数据对象defaults.data
    let str = '';
    for (const key in defaults.data) {
      str += key + '=' + defaults.data[key] + '&';
    }
    // 剔出最后一个&
    str = str.slice(0, str.length - 1);

    //--------------------------------判断是否是jsonp数据类型，因为jsonp请求方式和普通的请求处理逻辑不同
    if (!defaults.dataType == 'jsonp') {
      ajaxFa();
    } else { //--------------------------jsonp请求主要是通过script的src属性·
      ajaxJsonp();
    }
  }
  //**********************普通同源请求****************
  function ajaxFa() {
    //创建XMLHttpRequest
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
      // 创建成功 xhr.readyState == 0    数据初始化成功

    // 为了以防背后xhr.send（）请求过快而为监听到事件，所以先注册  可以监听xhr.readyState状态变化 与当响应数据xhr.response（xhr.readyState==3）过大会分段传回，也会不断触发该函数，该阶段触发的情况 与单独的onpregress（）事件等价，  
    xhr.onreadystatechange = () => {
      // 等于4时，响应数据接收解析完毕   --》可以等同与onload（）事件
      if (xhr.readyState == 4) {
        // 等于200数据请求成功
        if (xhr.status == 200) {
          let data = xhr.responseText;
          // 判断是否是json数据类型
          if (defaults.dataType == 'json') {
            data = JSON.parse(data);
          }
          // 执行回调函数
          defaults.success(data);
        }
      }
    }

    if (defaults.type == 'get') {
      // 获取可能请求参数有中文，所以需要进行转码  
      defaults.url += encodeURI('?' + str);
    }
    // 与服务器建立链接
    xhr.open(defaults.type, defaults.url, defaults.async);
    // 此时 xhr.readtSate == 1


    // 判断请求类型是否为post
    let parme = null;
    if (defaults.type == 'post') {
      // 由于post请求，将参数是放到请求体中所以，转码方式与get有所不同，是设置请求头
      xhr.setRequestHeader('Content-Type', 'applocation/x-www-form-urlencoded');
      parme = str;
    }
    //   发送请求   
    xhr.send(parme);
    //   当转变为2时直接触发onreadystatechange
  }
  //**********************跨域请求jsonp****************
  function ajaxJsonp() {
    // 将回调函数挂载到window上
    window[defaults.jsonCallBake] = data => {
      defaults.success(data);
    }

    // 将回调函数与请求参数添加到请求路径背后
    defaults.url += '?' + defaults.json + '=' + defaults.jsonCallBake + '&' + str;
    // 应为服务器传回的数据是文本格式，但只要传回的文本格式是js解析的文本便会执行
    // 创建script标签
    const script = document.createElement('script');
    //  为script标签添加src属性
    script[src] = defaults.url;
    // 获取hend标签
    const head = document.querySelector('head');
    // 将script标签添加到head中
    head.appendChild(script);
  }
})