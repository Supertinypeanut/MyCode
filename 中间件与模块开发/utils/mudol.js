let obj = {
    name: 'jin',
    sex: 'man',
    fa() {
      console.log('my name is' + this.name);
    }
  }
  // 只能暴露一个对象，在引用时接收变量便是该对象，点便是该对象属性或方法
  // module.exports = obj;

// 可以暴露多个对象，在引用时需要接收变量.该暴露名
exports.obj = obj;