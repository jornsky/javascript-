let arr = ["xjf"];
console.log(arr.concat("xjf"));

//打印结果中有一个__proto__属性 它就是原型

let obj1 = {};

let obj2 = {};

console.log(Object.getPrototypeOf(obj1) == Object.getPrototypeOf(obj2));
