// 执行脚本命令：

babel-node main.js

// 注：

// 不要在同一个模块中使用不同模块语法（CommonJS模块 和 ES6模块）

// export暴露对外接口，可以使用as关键字，重命名了函数的对外接口

// 在一个目录下建立index.js文件，将其他文件在这个文件中输入再输出，其他模块可直接加载使用该文件夹下的模块集合（index.js模块继承文件）

//require是动态加载（运行时），有缓存，是对值的拷贝，import语句是静态加载（编译时），动态引用，对值的引用，无缓存，import()函数可动态、按需、条件加载

// 模块之中，顶层的this关键字返回undefined，利用此特性判断是否处于ES6模块中

export {
    v1 as streamV1,
    v2 as streamV2,
    v2 as streamLatestVersion
  };
  
  // export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。不能重新赋值，可添加属性
  export var foo = 'bar';
  setTimeout(() => foo = 'baz', 500);
  
  
  export default // 默认输出变量、类、匿名或非匿名函数，import时可自定义模块名字，后面不能跟变量声明语句。
  
  // 错误
  export default var a = 1;   //export default本质是将该命令后面的值，赋给default变量以后再默认，所以直接将一个值写在export default之后
  // 正确
  export default 42;
  
  export // 正常输出，import时无法自定义模块名字
  
  
  
  // 逐一指定要加载的方法，同时输入默认方法和其他接口，输出类要实例化后才能使用：
  import _, { each, each as forEach } from 'lodash';
  
  // 整体加载：
  import * as circle from './circle'; //import *命令会忽略模块的default方法,则模块的default方法需另外单独输出
  
  //模块整体加载所在的那个对象（左例是circle），应该是可以静态分析的，所以不允许运行时改变，
  // 下面两行都是不允许的
  circle.foo = 'hello';
  circle.area = function () {};
  
  
  // export 与 import 的复合写法：在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
  export { foo, bar } from 'my_module';
  // 接口改名
  export { foo as myFoo } from 'my_module';
  
  // 整体输出
  export * from 'my_module';  //export *命令会忽略模块的default方法,则模块的default方法需另外单独输出
  
  // 默认接口写法
  export { default } from 'foo';
  
  // 具名接口改为默认接口的写法
  export { es6 as default } from './someModule';
  
  // 默认接口也可以改名为具名接口
  export { default as es6 } from './someModule';
  
  

  // 函数表达式(可写出立即执行函数)、声明函数、类表达式（可写出立即执行类）、声明类

  //call、apply、bind  都会改变this指向
  // call、apply会立即执行，bind返回的是一个新函数，不会立即执行，立即执行写法：
  xw.say.bind(xh)();

  // 传参
  xw.say.call(xh,"实验小学","六年级");
  xw.say.apply(xh,["实验小学","六年级郑州牛皮癣医院"]);
  xw.say.bind(xh,"实验小学","六年级")();
  xw.say.bind(xh)("实验小学","六年级");