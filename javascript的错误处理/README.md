# 错误处理机制（部分）

参考资料  https://wangdoc.com/javascript

1 原生错误类型

### SyntaxError 对象

`SyntaxError`对象是解析代码时发生的语法错误。

### ReferenceError 对象

`ReferenceError`对象是引用一个不存在的变量时发生的错误。

```
// 使用一个不存在的变量
unknownVariable
// Uncaught ReferenceError: unknownVariable is not defined
```

另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果赋值。

```
// 等号左侧不是变量
console.log() = 1
// Uncaught ReferenceError: Invalid left-hand side in assignment
```

### RangeError 对象

一是数组长度为负数，二是`Number`对象的方法参数超出范围，以及函数堆栈超过最大值。

### TypeError 对象

`TypeError`对象是变量或参数不是预期类型时发生的错误。



### URIError 对象

`URIError`对象是 URI 相关函数的参数不正确时抛出的错误，

## throw 语句

## try...catch 结构

一旦发生错误，程序就中止执行了。JavaScript 提供了`try...catch`结构，允许对错误进行处理，选择是否往下执行

## finally 代码块

`try...catch`结构允许在最后添加一个`finally`代码块，表示不管是否出现错误，都必需在最后运行的语句



## debugger 语句

`debugger`语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到`debugger`语句时会自动停下。如果没有除错工具，`debugger`语句不会产生任何结果，JavaScript 引擎自动跳过这一句。

Chrome 浏览器中，当代码运行到`debugger`语句时，就会暂停运行，自动打开脚本源码界面。