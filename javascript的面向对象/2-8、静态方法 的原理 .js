"use strict";
//

class Person {
  constructor(title) {
    this.title = title;
  }
  show() {
    console.log();
  }
  // show2方法定义在User对象上了 这就是静态方法
  static show2() {
    console.log("Class show2");
  }
  //class中定义静态方法
  static get() {}
}

//User 既是对象也是函数 对象对应的原型是__proto__ 构造函数的原型是prototype
//new user 自动指向他的原型
function User() {
  this.show = function () {};
}
// show2方法定义在User对象上了 这就是静态方法
User.show2 = function () {};
let user = new User();
console.dir(user);

Person.show2();
//demo

class Member {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static create(...args) {
    return new this(...args);
  }
}
