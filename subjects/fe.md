# front-end interview

## HTML、DOM

* Doctype是用来干什么的？如果html中没有它会如何？
* 什么是DOM回流（reflow）和DOM重绘（repaint）？何时会发生？如果发生了，会有什么影响？
* 什么是语义化标签？为何要使用它们？
* 常用的块级元素和行内元素有哪些？它们有什么区别？
* DOM事件的三个阶段分别是什么？简述DOM事件模型
* HTML5之于HTML4有哪些改动？
* 一个url输入浏览器，浏览器做了哪些事情？
* quirks模式（混杂模式）和standards模式（标准模式）有哪些区别？

## CSS

* css有哪些引入形式？
* 描述一下css盒模型，box-sizing是什么？有哪几个值？分别是什么意思？
* css选择器有哪些？它们的优先级是什么？
* px、em、rem有什么区别？
* css中可以通过哪些属性定义，使得一个DOM元素不显示在可视范围内？
* display:none与visibility:hidden的区别是什么？
* css哪些属性可以继承？哪些不可以继承？
* word-break和word-wrap一般用它们来处理什么？
* css如何使一个div中溢出的文本显示成省略号？
* rgba()和opacity的透明效果有什么不同？
* inline-block造成的水平间隙如何解决？
* 浮动有什么坏处？常用的清楚浮动方法有哪些？
* 常用的伪类和伪元素有哪些？
* position有哪几个值？它们的定位原点是什么？是否脱离文档流？
* 如何垂直居中一个div（宽100px，高100px）？
* 列举几个css3添加的新属性？它们分别是用来做什么的？
* 如何用css实现一个下三角形？实现原理是什么？
* transform有哪几个属性？分别是什么含义？
* line-height可以有哪些值？

## JS

* 函数声明的两种方式 function func(){} 和 var func = function(){} 有什么区别？
* JS有哪几种数据类型？null、undefined、undeclared 的区别，如何检测它们？
* String操作常用的函数有哪些？substr和substring有什么区别？
* Array操作常用的函数有哪些？slice和splice有什么区别？如何检验一个数组？
* JS如何实现面向对象和继承？请写一个简单的实例代码
* 写一个手机号的正则表达式
* 用原生JS实现函数insertBefore(element, sourceNode)，把一个元素（节点）插入一个节点之前
* caller和callee的作用是什么？有什么区别？
* call和apply的作用是什么？有什么区别？
* 对闭包、原型链的理解
* 对作用域上下文和this指向的裂解
* promise是什么？实现原理是什么？
* JS语言有哪些缺陷？
* 以下代码输出是什么？
    ```
        for(var i=1; i<=3; i++) {
            setTimeout(function(){
                console.log(i);
            }, 0);
        }
    ```
* 以下代码输出是什么？
    ```
        var length = 10;
        var foo = function() {
            console.log(this.length);
        };
        var obj = {
            length: 5,
            method: function(foo) {
                foo();
                arguments[0]();
            }
        }
        obj.method(foo);
    ```
* 以下代码执行后，console 中会打印出什么？
    ```
        var name = 'Jack';
        (function() {
            var human = {
                name: 'Tom',
                say: function() {
                    return this.name;
                }
            }
            console.log(human.say());
            var foo = human.say;
            console.log(foo());
        })(name);
    ```
* 以下代码执行后，console 中会打印出什么？
    ```
        var scope = 'global';
        function print() {
            var args = Array.prototype.join.call(arguments, ', ');
            console.log(this.scope + ':' + args);
        }
        var dog = {
            scope: 'dog',
            yelp: function() {
                var scope = 'dog.yelp';
                print('wow');
            }
        }
        dog.yelp();
        dog.yelp.call(dog);
        print.call(dog, 'created');
    ```

## JS库

### jquery

* html、text、val方法的区别
* data方法的用法？一般用来做什么？
* attr和prop方法的区别？
* click、bind、delegate、live、on方法的区别？on方法的参数有几个？分别指什么？
* 常见的jquery优化方法有哪些？

## angularjs

* angularjs有哪些特点？
* ng-if和ng-show的区别？
* ng-options的写法
* provider、factory、service的区别？
* $watch如何使用？一般用来做什么？有什么坏处？

## AJAX、HTTP

* get和post有什么区别？
* get请求可能因为数据缓存而导致新数据无法加载，如何解决？ post请求是否有这样的问题？
* 什么是跨域？为什么会跨域？跨域的常用解决办法有哪些？
* 常见的http状态码有哪些？分别是什么含义？
* cookie和session有什么区别？

## Algorithm

* 一个数组 var array = [1, [2, [3, 4], [5, 6]], 7, 8]，请写一个方法 flatArray()，得到数组 [1, 2, 3, 4, 5, 6, 7, 8]
* 写一个函数，实现数组的去重
* 实现一个冒泡排序or快速排序
* 用js实现随机选取1–1000之间的10个数字，存入一个数组，并排序

## Advanced

* CommonJS、AMD、CMD
* sass、less
* requireJS、browserify、webpack
* git、gulp、grunt
* 前端优化方案
* 最近在看什么书？
* 自己做过最满意的项目是什么？






