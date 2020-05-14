let func = new Object();

Object.prototype.show = function () {
  console.log("show");
};

function User() {}
// User的Prototype（原型）的原型 的父级就是 Object的原型
// User的__proto__（原型）的原型 的父级就是 Object的原型
console.dir(User);

console.log(User.__proto__.__proto__ == User.prototype.__proto__); //true
console.log(Object.prototype.__proto__); //null
