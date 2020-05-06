# 浏览器环境概述

JavaScript 是浏览器的内置脚本语言。也就是说，浏览器内置了 JavaScript 引擎，并且提供各种接口，让 JavaScript 脚本可以控制浏览器的各种功能。一旦网页内嵌了 JavaScript 脚本，浏览器加载网页，就会去执行脚本，从而达到操作浏览器的目的，实现网页的各种动态效果。

## 代码嵌入网页的方法

网页中嵌入 JavaScript 代码，主要有三种方法。

- `<script>`元素直接嵌入代码。
- `<script>`标签加载外部脚本
- 事件属性
- URL 协议

### 工作原理

浏览器加载 JavaScript 脚本，主要通过``元素完成。正常的网页加载流程是这样的。

1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
2. 解析过程中，浏览器发现``元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
3. 如果``元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
4. JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。

为了避免这种情况，**较好的做法是将`<script>`标签都放在页面底部**，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间。



### defer 属性

为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对``元素加入`defer`属性。它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。





### async 属性

解决“阻塞效应”的另一个方法是对``元素加入`async`属性。

```
<script src="a.js" async></script>
<script src="b.js" async></script>
```

`async`属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。



### 渲染引擎

渲染引擎处理网页，通常分成四个阶段。

1. 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
2. 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
3. 布局：计算出渲染树的布局（layout）。
4. 绘制：将渲染树绘制到屏幕。

以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。

### 重流和重绘

渲染树转换为网页布局，称为“布局流”（flow）；布局显示到页面的这个过程，称为“绘制”（paint）。它们都具有阻塞效应，并且会耗费很多时间和计算资源。



页面生成以后，脚本操作和样式表操作，都会触发“重流”（reflow）和“重绘”（repaint）。

作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；再比如，重绘`table`布局和`flex`布局，开销都会比较大。

**下面是一些优化技巧**。

****

## window 对象

浏览器里面，`window`对象（注意，`w`为小写）指当前的浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属。

### window.alert()，window.prompt()，window.confirm()

等等等https://wangdoc.com/javascript/bom/window.html

## 事件

`load`事件发生在文档在浏览器窗口加载完毕时。`window.onload`属性可以指定这个事件的回调函数。

# Navigator 对象

https://wangdoc.com/javascript/bom/navigator.html

`window.navigator`属性指向一个包含浏览器和系统信息的 Navigator 对象。脚本通过这个属性了解用户的环境信息。



# Cookie

Cookie 是服务器保存在浏览器的一小段文本信息，一般大小不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。

Cookie 主要保存状态信息，以下是一些主要用途。

- 对话（session）管理：保存登录、购物车等需要记录的信息。
- 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。
- 追踪用户：记录和分析用户行为。

## Cookie 的属性 [#](https://wangdoc.com/javascript/bom/cookie.html#cookie-的属性)

### Expires，Max-Age

如果同时指定了`Expires`和`Max-Age`，那么`Max-Age`的值将优先生效。

# XMLHttpRequest 对象

具体来说，AJAX 包括以下几个步骤。

1. 创建 XMLHttpRequest 实例
2. 发出 HTTP 请求
3. 接收服务器传回的数据
4. 更新网页数据

概括起来，就是一句话，AJAX 通过原生的`XMLHttpRequest`对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。现在，服务器返回的都是 JSON 格式的数据，XML 格式已经过时了，但是 AJAX 这个名字已经成了一个通用名词，字面含义已经消失了。

下面是`XMLHttpRequest`对象简单用法的完整例子。

```
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
  // 通信成功时，状态值为4
  if (xhr.readyState === 4){
    if (xhr.status === 200){
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

xhr.open('GET', '/endpoint', true);
xhr.send(null);
```

## XMLHttpRequest 的实例属性 [#](https://wangdoc.com/javascript/bom/xmlhttprequest.html#xmlhttprequest-的实例属性) 

### XMLHttpRequest.readyState

- 0，表示 XMLHttpRequest 实例已经生成，但是实例的`open()`方法还没有被调用。

- 1，表示`open()`方法已经调用，但是实例的`send()`方法还没有调用，仍然可以使用实例的`setRequestHeader()`方法，设定 HTTP 请求的头信息。

- 2，表示实例的`send()`方法已经调用，并且服务器返回的头信息和状态码已经收到。

- 3，表示正在接收服务器传来的数据体（body 部分）。这时，如果实例的`responseType`属性等于`text`或者空字符串，`responseText`属性就会包含已经收到的部分信息。

- 4，表示服务器返回的数据已经完全接收，或者本次接收已经失败。

- ### XMLHttpRequest.status，XMLHttpRequest.statusText 

- `XMLHttpRequest.status`属性返回一个整数，表示服务器回应的 HTTP 状态码。一般来说，如果通信成功的话，这个状态码是200；

```
if (xhr.readyState === 4) {
  if ( (xhr.status >= 200 && xhr.status < 300)
    || (xhr.status === 304) ) {
    // 处理服务器的返回数据
  } else {
    // 出错
  }
}
```

- [XMLHttpRequest.open()](https://wangdoc.com/javascript/bom/xmlhttprequest.html#xmlhttprequestopen)
- [XMLHttpRequest.send()](https://wangdoc.com/javascript/bom/xmlhttprequest.html#xmlhttprequestsend)

# 同源限制

浏览器安全的基石是“同源政策”（[same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy)）。很多开发者都知道这一点，但了解得不全面。

最初，它的含义是指，A 网页设置的 Cookie，B 网页不能打开，除非这两个网页“同源”。所谓“同源”指的是“三个相同”。

> - 协议相同
> - 域名相同
> - 端口相同

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

1） 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。

（2） 无法接触非同源网页的 DOM。

（3） 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。

## AJAX规避同源限制

- JSONP
- WebSocket
- CORS
- 反向代理

JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单易用，没有兼容性问题，老式浏览器全部支持，服务端改造非常小。

它的做法如下。

第一步，网页添加一个``元素，向服务器请求一个脚本，这不受同源政策限制，可以跨域请求。

```
<script src="http://api.foo.com?callback=bar"></script>
```

注意，请求的脚本网址有一个`callback`参数（`?callback=bar`），用来告诉服务器，客户端的回调函数名称（`bar`）。

第二步，服务器收到请求后，拼接一个字符串，将 JSON 数据放在函数名里面，作为字符串返回（`bar({...})`）。

第三步，客户端会将服务器返回的字符串，作为代码解析，因为浏览器认为，这是``标签请求的脚本内容。这时，客户端只要定义了`bar()`函数，就能在该函数体内，拿到服务器返回的 JSON 数据。

Cross-origin resource sharing

# Storage 接口

Storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：`window.sessionStorage`和`window.localStorage`。

https://wangdoc.com/javascript/bom/storage.html