interface AjaxConfig{
    url: string,  // 请求地址
    type?: 'get' | 'head' | 'delete' | 'option' | 'post' | 'patch' | 'put' , // 请求方式
    dataType?: 'json' | 'jsonp' | 'text' | 'xml', // 返回数据格式
    data?: object, // 请求参数
    jsonp?: string, // 后端获取回调函数名的键
    jsonpCallBack?: string, // 回调函数名
    async?: boolean, // 是否异步请求
    success?: Function, // 请求成功回调
}

class Ajax {
    private requestParams: string = ''
    private requestSetting: AjaxConfig = {
        url: '',
        type: 'get',
        data: {},
        dataType: 'json',
        jsonp: 'callBack',
        jsonpCallBack: `Peanut_Ajax_${Date.now()}_${Math.random().toString().replace('.','')}`,
        async: true,
        success(data: any){console.log('请求成功:',data)}
    }
    // 初始化数据
    constructor(agrObj?: AjaxConfig) {
        for (const key in agrObj) {
            if (Object.prototype.hasOwnProperty.call(agrObj, key)) {
                this.requestSetting[key] = agrObj[key];
            }
        }
    }
    // 请求方法
    private request(agrObj?: AjaxConfig) {
        for (const key in agrObj) {
            if (Object.prototype.hasOwnProperty.call(agrObj, key)) {
                this.requestSetting[key] = agrObj[key];
            }
        }

        if (!this.requestSetting.url) {
            throw new Error("没有URL")
            return
        }

        // 是否是jsonp请求
        this.requestSetting.dataType === 'jsonp' 
            ? this.jsonpRequest()
            : this.defaultRequest() 
    }

    // 请求参数处理
    private requestParamsTransform(obj: object): string  {
        let result: string = ''
        for (const key in obj) {
            result += `${key}=${obj[key]}&`
        }
        return result.slice(0, -1)
    }

    // 普通请求
    private defaultRequest() {
        let { url, type, dataType, success, data, async } = this.requestSetting
        let sendParams = null

        const xhr: XMLHttpRequest = XMLHttpRequest 
            ? new XMLHttpRequest() 
            : new ActiveXObject('Microsoft.XMLHTTP')
        
        xhr.onreadystatechange = () => {
            console.log(xhr.readyState, 'onreadystatechange')
            if(xhr.readyState === 4 && xhr.status === 200) {
                const res = dataType === 'json' 
                    ? JSON.parse(xhr.responseText) 
                    : xhr.responseText
                
                success(res)
            }
        }

        if(type === 'get') {
            const urlParams = encodeURI(this.requestParamsTransform(data))
            url += '?' + urlParams
        }
        xhr.open(type, url, async)

        if(type === 'post') {
            sendParams = this.requestParamsTransform(data)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode')
        }
        xhr.send(sendParams)
    }

    // jsonp请求
    private jsonpRequest() {
        const { jsonp, jsonpCallBack, url, success, data } = this.requestSetting
        // 挂载成功回调
        window[jsonpCallBack] = success
        const request: string = this.requestParamsTransform(data)

        const scriptNode: HTMLScriptElement = document.createElement('script')
        scriptNode.src = `${url}?${jsonp}=${jsonpCallBack}&${request}`

        // 将script标签添加到头部
        const head: HTMLHeadElement = document.getElementsByTagName('head')[0]
        head.appendChild(scriptNode)
    }
}