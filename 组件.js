
// 下载依赖
npm install --save-dev react-native-calendars
// 下载指定版本依赖
npm install --save-dev react-router@2.8.1

// 卸载组件及第三方依赖包
react-native unlink react-native-calendar
npm uninstall react-native-calendar --save


//语法规则和代码风格的检查工具 Eslint
npm i -D eslint babel-eslint eslint-plugin-react

// 第三方类型检查
prop-types

// 用法：
Greeting.propTypes = {
    name: PropTypes.string
};


//路由导航
react-navigation
react-redux

react-router

npm install --save redux react-redux redux-thunk
npm install --save-dev redux-logger

// 底部导航菜单
react-native-tab-navigator

// 弹出框提示组件
react-native-easy-toast
react-native-root-toast

// tab切换组件
react-native-scrollable-tab-view

// 启动屏
react-native-splash-screen

// html渲染
react-native-htmlview

// 列表排序
react-native-sortable-listview

// 复选框
react-native-check-box

// 单选框
react-native-flexi-radio-button



// 提示框 popover必须放在视图根目录下
react-native-popover   

//时间选择组件
react-native-datepicker
react-native-calendar

react-native-parallax-scroll-view

react-native-display




// react-native
AsyncStorage // 本地数据存储
StatusBar   // 状态栏
Platform  // 判断运行平台
RefreshControl // 下拉刷新功能，用在ScrollView或ListView内部
WebView   //内嵌网页，自带loading效果
Clipboard  //剪贴板
Linking  //链接到邮箱，打电话

// 展示多数据源的几个组件对比

ScrollView 
// 会把所有子元素一次性全部渲染出来
// 使用上最简单
// 但是如果你有一个特别长的列表需要显示,可能会需要好几屏的高度
// 这时就会占用很大的内存去创建和渲染那些屏幕以外的JS组件和原生视图,性能上也会有所拖累
ListView 
// 更适用于长列表数据,它会惰性渲染子元素,并不会立即渲染所有元素
// 而是优先渲染屏幕上可见的元素
FlatList 
//  0.43版本开始新出的改进版的ListView,性能更优
// 但是官方说现在可能不够稳定,尚待时间考验,但是它不能够分组/类/区(section)
SectionList
// 0.43版本推出的,高性能的分组列表组件
// 但是它不支持头部吸顶悬浮的效果,但是也不要伤心,官方在下一个版本开始就可以支持悬浮的section头部啦




Note
// 循环数据都要加key
// 做数据处理时候，没有数据返回null

// 生成数据调用方式
// 1、利用json数据
// 2、通过构造函数传入参数，通过对象属性调用
// 3、生成一个对象，形成键值对（常用于做标识）

// 数据重新封装
// 建立对象
export default function ProjectModel(item, isFavorite) {
  this.item = item;
  this.isFavorite = isFavorite;
}

// 调用
let projectModels = [];
let items = this.items;
for(var i =0, len = items.length; i< len; i++) {
    projectModels.push(new ProjectModel(items[i], false));
}


// 遍历方法
map
forEach

JSON.stringify()  // 将对象解析成字符串
JSON.parse()  // 将字符串解析成对象
Response.JSON()

// 滚动监听高度
_contentViewScroll = (e) => {
  var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
  var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
  var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
  if (offsetY + oriageScrollHeight >= contentSizeHeight){
      console.log('上传滑动到底部事件')
  }
}

// setState 方法重写 
_updateState= (dic) => {
  if(!this)return;   // 如果组件不存在，返回
  this.setState({dic});
}

// 封装相同类型数据方法
// 在构造函数中传入参数做标识符


// 代码复用
// 1、继承   继承都是单继承
// 2、组装   将公共代码抽离出来创建一个类，通过实例化来调用这个类

getNowDate() {
  var date = new Date();
  var seperator1 = '';
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

getNowTime() {
  var date = new Date();
  var seperator2 = ":";
  var currentdate = date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
  return currentdate;
}


// 取出一个对象里面的所有键值对用扩展符解构赋值
{...object}



// Note:

// 1、TextInput的组件在Android上输入文字被遮挡住，直接在TextInput的样式上加padding:0
// 2、TextInput失去焦点后键盘会隐藏起来
//3、组件中this指当前组件
//4、组件被卸载之后要取消定时器，否则会报异常
//5、导入某个文件夹下的入口文件index.js,导入路径只要写到这个文件夹，会默认导入index.js这个入口文件

this.timer=setTimeout(()=>{
    // 使用resetTo重置路由，将第一个组件重置为首页
    this.props.navigator.resetTo({
        component:HomePage
    });
},2000);

componentWillUnmount(){
    this.timer&&clearTimeout(this.timer);
}

// 5、使用非字符串做法
// ${非字符串}或者{非字符串语句}


// 闪退后查询错误
react-native log-android