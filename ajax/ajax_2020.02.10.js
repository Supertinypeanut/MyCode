function ajax({
    type = 'get',
    url = void 0,
    data = {},
    async = true,
    dataType = 'json',
    jsonp = 'callback',
    jsonpCallBack =  `JQuery_111_${Date.now()}${Math.random().toString().replace('.','')}`,
    success = data=>{ console.log(data)}
}){
    // 处理请求参数对象
    let requestParams = ''
    for (const key in data) {
        if (Object.hasOwnProperty.call(data,key)) {
            requestParams += `${key}=${data[key]}&`
        }
    }
    requestParams = requestParams.slice(0,-1)

    // 判断是否是jsonp跨域
    if(type === 'jsonp'){
        // 挂载调用函数
        window[jsonpCallBack] = function (data){
            success(data)
        }
        const headNode = document.querySelector('head')
        const scriptNode = document.createElement('script')
        scriptNode.src = `${url}?${jsonp}=${jsonpCallBack}&${requestParams}`
        headNode.appendChild(scriptNode)
    }
    // 使用XMLHttpRequest对象
    else{
        // 创建
        const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
        //  xhr.readyState ===0

        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res =  xhr.responseText
                dataType === 'json' ? success(JSON.parse(res)) : success(res)
            }
        }

        if (type === 'get') {
            url += '?' + requestParams 
        }
        xhr.open(type, encodeURI(url), async)

        let temp = null
        if (type === 'post') {
            temp = requestParams
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencode')
        }
        xhr.send(temp)
    }
}

