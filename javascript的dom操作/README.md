## DOM

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。

## 节点

节点的类型有七种。

- `Document`：整个文档树的顶层节点
- `DocumentType`：`doctype`标签（比如``）
- `Element`：网页的各种HTML标签（比如``、``等）
- `Attr`：网页元素的属性（比如`class="right"`）
- `Text`：标签之间或标签包含的文本
- `Comment`：注释
- `DocumentFragment`：文档的片段

## 节点树

浏览器原生提供`document`节点，代表整个文档。

文档的第一层有两个节点，第一个是文档类型节点（``），第二个是 HTML 网页的顶层容器标签``

# Node 接口

## 属性

### Node.prototype.nodeType

- **文档节点（document）：9，对应常量`Node.DOCUMENT_NODE`**
- **元素节点（element）：1，对应常量`Node.ELEMENT_NODE`**
- **属性节点（attr）：2，对应常量`Node.ATTRIBUTE_NODE`**
- **文本节点（text）：3，对应常量`Node.TEXT_NODE`**
- 文档片断节点（DocumentFragment）：11，对应常量`Node.DOCUMENT_FRAGMENT_NODE`
- 文档类型节点（DocumentType）：10，对应常量`Node.DOCUMENT_TYPE_NODE`
- 注释节点（Comment）：8，对应常量`Node.COMMENT_NODE`

### Node.prototype.nodeName

- 文档节点（document）：`#document`
- 元素节点（element）：大写的标签名
- 属性节点（attr）：属性的名称
- 文本节点（text）：`#text`

注释节点（Comment）：`#comment`

### Node.prototype.nodeValue

`nodeValue`属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的`nodeValue`可以返回结果，其他类型的节点一律返回`null`

### Node.prototype.textContent

### Node.prototype.baseURI

`baseURI`属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读

### Node.prototype.parentNode

`parentNode`属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。

### Node.prototype.parentElement

`parentElement`属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回`null`。

### Node.prototype.firstChild，Node.prototype.lastChild

`firstChild`属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回`null`。

### Node.prototype.childNodes

`childNodes`属性返回一个类似数组的对象（`NodeList`集合），成员包括当前节点的所有子节点

## 方法

### Node.prototype.appendChild()

`appendChild()`方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。

### Node.prototype.cloneNode()

`cloneNode`方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点

### Node.prototype.replaceChild()

`replaceChild`方法用于将一个新的节点，替换当前节点的某一个子节点。

```
var replacedNode = parentNode.replaceChild(newChild, oldChild)
```

## NodeList 接口

`NodeList`实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到`NodeList`实例。

- `Node.childNodes`
- `document.querySelectorAll()`等节点搜索方法

# ParentNode 接口，ChildNode 接口

网道（WangDoc.com），互联网文档计划

节点对象除了继承 Node 接口以外，还拥有其他接口。`ParentNode`接口表示当前节点是一个父节点，提供一些处理子节点的方法。`ChildNode`接口表示当前节点是一个子节点，提供一些相关方法。

# Document 节点

## 方法

### document.querySelector()，document.querySelectorAll() 

`document.querySelector`方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回`null`。

### document.getElementsByTagName()

### document.getElementsByClassName()

### document.getElementsByName()

### document.getElementById()

### document.createElement()

### document.createTextNode()

### document.createAttribute()

### document.createEvent()

# Element 节点

### Element.innerHTML

`Element.innerHTML`属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括``和``元素。

### Element.outerHTML

`Element.outerHTML`属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。

等等等