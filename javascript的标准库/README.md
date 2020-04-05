# js标准库

## Object

JavaScript 原生提供`Object`对象（注意起首的`O`是大写），本章介绍该对象原生的各种方法。

JavaScript 的所有其他对象都继承自`Object`对象，即那些对象都是`Object`的实例。

`Object`对象的原生方法分成两类：`Object`本身的方法与`Object`的实例方法。

**（1）`Object`对象本身的方法**

所谓“本身的方法”就是直接定义在`Object`对象的方法。

```
Object.print = function (o) { console.log(o) };
```

**（2）`Object`的实例方法**

所谓实例方法就是定义在`Object`原型对象`Object.prototype`上的方法。它可以被`Object`实例直接使用。

```
Object.prototype.print = function () {
  console.log(this);
};

var obj = new Object();
obj.print() // Object
```

## Object 构造函数

注意，通过`var obj = new Object()`的写法生成新对象，与字面量的写法`var obj = {}`是等价的。或者说，后者只是前者的一种简便写法。

对于一般的对象来说，`Object.keys()`和`Object.getOwnPropertyNames()`返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。



### Object.prototype.toString() 

toString() 的应用：判断数据类型



```
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
```

# 属性描述对象

每个属性都有自己对应的属性描述对象，保存该属性的一些元信息

```
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

属性描述对象提供6个元属性。

`Object.getOwnPropertyDescriptor()`方法可以获取属性描述对象。它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名

`Object.getOwnPropertyNames`方法返回一个数组，成员是参数对象自身的全部属性的属性名

```
Object.defineProperty(object, propertyName, attributesObject)
```

## 存取器

## 对象的拷贝（轻考呗 重度拷贝）

 有时，我们需要将一个对象的所有属性，拷贝到另一个对象，可以用下面的方法实现。

```
var extend = function (to, from) {
  for (var property in from) {
    to[property] = from[property];
  }

  return to;
}

extend({}, {
  a: 1
})
// {a: 1}
```

上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值。

```
extend({}, {
  get a() { return 1 }
})
// {a: 1}
```

为了解决这个问题，我们可以通过`Object.defineProperty`方法来拷贝属性。

```
var extend = function (to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
}

extend({}, { get a(){ return 1 } })
// { get a(){ return 1 } })
```

# Array 对象

push()，pop()

`push`方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会**改变原数组。**

`push`和`pop`结合使用，就构成了“后进先出”的栈结构（stack）。

### shift()，unshift()

`shift()`方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。

`push()`和`shift()`结合使用，就构成了“先进先出”的队列结构（queue）。

### join()

`join()`方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。

### concat()

`concat`方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变