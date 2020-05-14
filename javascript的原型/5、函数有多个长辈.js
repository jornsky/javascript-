//函数也是对象
// 函数既是对象 也是构造函数
//函数作为对象直接找__proto__
//函数作为构造函数找prototpe

function Func() {}

console.dir(Func);

let func = new Func();
// new 指令会把func对象的原型指向构造函数Func的prototype原型
console.log(Func.prototype == func.__proto__);
