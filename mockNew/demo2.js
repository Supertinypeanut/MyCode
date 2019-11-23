/**
 * 进一步模拟 关键字 new的实现
 * 
 * 基本步骤：
 *      1、创建一个新对象
 *      2、改变构造函数的this指向，初始化新对象（初始化属性）
 *      3、将新对象的对象原型__proto__指向构造函数的原型对象prototype（获取方法）
 *      4、返回新对象
 * */ 


 function mockNew(){
    // 获取构造函数,并将伪数组arguments除去构造函数，留下参数
    const constructor = [].shift.call(arguments)

    //对传入的构造函数进行判断，是否为一个函数
    if (typeof constructor !== 'function') {
        throw new Error('首个参数为函数')
    } 
    
    // 创建构造函数的原型对象的新对象,直接可以获得构造函数的方法
   const resultObj = Object.create(constructor.prototype)

    //改变构造函数内部的this指向并调用，初始化新对象的属性，监视构造函数是否有返回值
    const watchObj= constructor.apply(resultObj,arguments)
    
    //返回新对象(watchObj判断构造函数是否有返回对象，有则返回则该构造函数return的对象，没有则返回新对象，new 关键字 ECMAScript规范)
    return typeof watchObj === 'object' && watchObj != null  ? watchObj : resultObj
 }

  //  构造函数，属性写在此处，new 该类时会自动执行
  function Person ( name ) {
     this.name = name
 }
 //该构造函数的方法，挂载到Person.prototype上
 Person.prototype = { 
     show(){
     console.log('我是构造函数的方法🥳')
    }
 }

 const mockObj = mockNew(Person,'我是你的名字')

 console.log(mockObj)  //{ name: '我是你的名字' }

 mockObj.show() //我是构造函数的方法🥳