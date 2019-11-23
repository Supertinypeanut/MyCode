/**
 * 模拟实现 new 关键字
*/

function mockNew() {
    // 创建一个空对象
    const resultObj = new Object()

    // 获取构造函数,并将构造函数剔出参数伪数组
    const constructor = [].shift.call(arguments)

    // 改变新对象的this指向，初始化属性
    constructor.apply(resultObj, arguments)

    // 获取构造函数的方法（因为构造函数的方法一般挂载在原型对象prototype上,所以将新创建对象的对象原型__proto__挂载在构造函数的原型对象prototype上）
    resultObj.__proto__ = constructor.prototype

    // 返回对象
    return resultObj
}

// 定义一个构造函数
function Person(name){
    this.name = name
}

Person.prototype = {
    show(){
        console.log('我是构造函数的方法')
    }
}

// console.log(Person);



const resultObj =  mockNew(Person,'我是mockNew的对象')

console.dir(resultObj)  //{ name: '我是mockNew的对象' }

resultObj.show()  //我是构造函数的方法