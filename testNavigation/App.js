import React from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Button,
    Image,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ChatScreen from './pages/ChatScreen';
import SecondScreen from './pages/SecondScreen';
import EditInfoScreen from './pages/EditInfoScreen';
import Test1 from './pages/TabNavigator/Test1.js';
import Test2 from './pages/TabNavigator/Test2.js';
import Test3 from './pages/TabNavigator/Test3.js';


const ShiTuIcon = require('./resources/ShiTu.png');
const GankIcon = require('./resources/Gank.png');
const MainIcon = require('./resources/Main.png');

const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{height:35,width:35 }, {tintColor: tintColor}]}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:22,color:'white',alignSelf:'center'};
    // header的style
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};

/**
 * 1、Test1是通过普通的属性创建的Tabbar和导航
 * 2、Test2是在页面中通过属性创建Tabbar和导航
 * 3、Test3是通过封装navigationOptions实现Tabbar和导航的
 */

export default class App extends React.Component {
    static navigationOptions = {
        title: 'Welcome',  //导航栏默认标题，不显示导航栏置为null
    };
    render() {
        const { navigate } = this.props.navigation;   //第一步传入navigate对象
        return (
            <View>
              <Text>Hello, Chat App!</Text>
              <Button
                  onPress={() => navigate('Chat', { user: 'Lucy' })}   //导航跳转与StackNavigator中自定义命名的Chat对象，父页面到子页面传递参数以对象形式传递
                  title="Chat with Lucy"
              />
            </View>
        );
    }
}

export const SimpleApp = StackNavigator({
    HomeScreen: { screen: App },  //将启动入口文件作为react-navigation的路由路口,
    Chat: {
        screen: ChatScreen,  //将对象导入路由中（路由名字自定义供其他页面调用），对应界面名称，需要填入import之后的页面
        navigationOptions:({navigation,screenProps}) => ({ //配置StackNavigator的一些属性

            // StackNavigator 属性部分

            // title:'ChatScreen', 同步设置导航和tabbar文字,不推荐使用
            //headerTitle:'识兔', // 只会设置导航栏文字,
            // header:{}, // 可以自定义导航条内容，如果需要隐藏可以设置为null
            // headerBackTitle:null, // 设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
            // headerTruncatedBackTitle:'', // 设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。
            // headerRight:{}, // 设置导航条右侧。可以是按钮或者其他。
            // headerLeft:{}, // 设置导航条左侧。可以是按钮或者其他。
            headerStyle:{
                backgroundColor:'red'
            }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS下用shadowOpacity: 0。
            headerTitleStyle:{
                fontSize:20,
                color:'white'
            }, // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了,在安卓上会遇到，
            // 如果左边有返回箭头导致文字还是没有居中的问题，最简单的解决思路就是在右边也放置一个空的按钮。
            // headerBackTitleStyle:{}, // 设置导航条返回文字样式。
            // headerTintColor:'green', // 设置导航栏文字颜色。总感觉和上面重叠了。
            // headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0
            gesturesEnabled:true, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
            // gestureResponseDistance：对象覆盖触摸从屏幕边缘开始的距离，以识别手势。 它需要以下属性：
            // horizontal - number - 水平方向的距离 默认为25。
            // vertical - number - 垂直方向的距离 默认为135。
            // 设置滑动返回的距离
            gestureResponseDistance:{horizontal:300},
            // TabNavigator 属性部分

            // 导航视觉效果
            //
            // mode：定义跳转风格。
            //
            // card：使用iOS和安卓默认的风格。
            // modal：iOS独有的使屏幕从底部画出。类似iOS的present效果
            // headerMode：边缘滑动返回上级页面时动画效果。
            //
            // float：iOS默认的效果，可以看到一个明显的过渡动画。
            // screen：滑动过程中，整个页面都会返回。
            // none：没有动画。
            // cardStyle：自定义设置跳转效果。
            //
            // transitionConfig： 自定义设置滑动返回的配置。
            // onTransitionStart：当转换动画即将开始时被调用的功能。
            // onTransitionEnd：当转换动画完成，将被调用的功能。
            //
            // path：路由中设置的路径的覆盖映射配置。
            // initialRouteName：设置默认的页面组件，必须是上面已注册的页面组件。
            // initialRouteParams：初始路由的参数。
            //
            // path:path属性适用于其他app或浏览器使用url打开本app并进入指定页面。path属性用于声明一个界面路径，例如：【/pages/Home】。此时我们可以在手机浏览器中输入：app名称://pages/Home来启动该App，并进入Home界面。
        })
    },
    Second: { screen: SecondScreen },
    EditInfo: {screen: EditInfoScreen }
});


export const MyTab = TabNavigator({
    Test1: {
        screen: Test1,
        navigationOptions:({navigation,screenProps}) => ({

            // StackNavigator 属性部分

            // title:'Test1', 同步设置导航和tabbar文字,不推荐使用
            headerTitle:'识兔', // 只会设置导航栏文字,
            // header:{}, // 可以自定义导航条内容，如果需要隐藏可以设置为null
            // headerBackTitle:null, // 设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
            // headerTruncatedBackTitle:'', // 设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。
            // headerRight:{}, // 设置导航条右侧。可以是按钮或者其他。
            // headerLeft:{}, // 设置导航条左侧。可以是按钮或者其他。
            headerStyle:{
                backgroundColor:'#4ECBFC'
            }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
            headerTitleStyle:{
                fontSize:30,
                color:'white'
            }, // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
            // headerBackTitleStyle:{}, // 设置导航条返回文字样式。
            // headerTintColor:'green', // 设置导航栏文字颜色。总感觉和上面重叠了。
            gesturesEnabled:true, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭


            // TabNavigator 属性部分

            // title:'', 同上
            tabBarVisible:true, // 是否隐藏标签栏。默认不隐藏(true)
            tabBarIcon: (({tintColor,focused}) => {
                return(
                    <Image
                        source={!focused ? ShiTuIcon : ShiTuIcon}
                        style={[{height:35,width:35 }, {tintColor: tintColor}]}
                    />
                )
            }), // 设置标签栏的图标。需要单独设置。
            tabBarLabel:'识兔', // 设置标签栏的title。推荐这个方式。
        })
    },
    Test2: {
        screen:Test2,
    },
    Test3:{
        screen:Test3,
        navigationOptions: ()=> TabOptions('我的',MainIcon,MainIcon,'我的'),
    },
},{
    tabBarPosition:'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled:true, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy:true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName:'Test1', // 设置默认的页面组件
    backBehavior:'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions:{
        // iOS属性
        // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
        activeTintColor:'red', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor:'orange', // label和icon的前景色 不活跃状态下(未选中)。

        activeBackgroundColor:'blue', //label和icon的背景色 活跃状态下（选中） 。
        inactiveBackgroundColor:'green', // label和icon的背景色 不活跃状态下（未选中）。

        showLabel:true, // 是否显示label，默认开启。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, //label的样式。

        // 安卓属性

        // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
        // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
        showIcon:true, // 是否显示图标，默认关闭。
        // showLabel:true, //是否显示label，默认开启。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, // label的样式。
        upperCaseLabel:false, // 是否使标签大写，默认为true。
        // pressColor:'', // material涟漪效果的颜色（安卓版本需要大于5.0）。
        // pressOpacity:'', // 按压标签的透明度变化（安卓版本需要小于5.0）。
        // scrollEnabled:false, // 是否启用可滚动选项卡。
        // tabStyle:{}, // tab的样式。
        // indicatorStyle:{}, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
        // labelStyle:{}, // label的样式。
        // iconStyle:{}, // 图标的样式。
    }

});

