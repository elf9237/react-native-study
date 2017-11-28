//参考网址
/**
 * https://reactnavigation.org/docs/intro/quick-start
 */
/**
 * index.js入口文件
 */

import { AppRegistry } from 'react-native';
import App, {SimpleApp} from './App';  //app.js默认(default)引入和其他引入

AppRegistry.registerComponent('testNavigation', () => SimpleApp);

/**
 * app.js启动入口文件
 */

import React from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ChatScreen from './pages/ChatScreen';

export default class App extends React.Component {
    static navigationOptions = {
        title: 'Welcome', //导航栏默认标题，不显示导航栏置为null
    };
    render() {
        const { navigate } = this.props.navigation;
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
    HomeScreen: { screen: App },  //将启动入口文件作为react-navigation的路由路口
    Chat: { screen: ChatScreen },
});


/**
 * 小技巧
 */

// NO.01

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({ //跟随路由 从父页面传递过来的参数,在标题设置中可直接根据传递过来的参数对象来获取
        const { state, setParams } = navigation;  //state传递父页面的参数，setParams是子页面修改父页面参数方法
        const isInfo = state.params.mode === 'info';
        const { user } = state.params;
        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
            headerRight: (
                <Button
                    title={isInfo ? 'Done' : `${user}'s info`}
                    onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
                />
            ),
        };
    });
...
}

// NO.02

const { params } = this.props.navigation.state; //子页面接收跟随路由 从父页面传递过来的参数
// 子页面向父页面传递参数，可以将父页面传递的参数对象设成一个函数，通过子页面调用父页面的函数传递参数给父页面

回调传参

navigate('Detail',{
    // 跳转的时候携带一个参数去下个页面
    callback: (data)=>{
        console.log(data); // 打印值为：'回调参数'
    }
});
const {navigate,goBack,state} = this.props.navigation;
// 在第二个页面,在goBack之前,将上个页面的方法取到,并回传参数,这样回传的参数会重走render方法
state.params.callback('回调参数');
goBack();


//NO.03 让安卓实现push动画
// 先引入这个方法
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

// 在StackNavigator配置headerMode的地方，使用transitionConfig添加
{
    headerMode: 'screen',
        transitionConfig:()=>({
    screenInterpolator:CardStackStyleInterpolator.forHorizontal,
})
}

//NO.04 goBack返回指定页面的修改完善版

if (action.type === NavigationActions.BACK) {
    let backRouteIndex = null;
    if (action.key) {

        const backRoute = state.routes.find(
            /* $FlowFixMe */
            /* 修改源码 */
            route => route.routeName === action.key
            /* (route: *) => route.key === action.key */
        );
        /* $FlowFixMe */
        console.log('backRoute =====',backRoute);
        backRouteIndex = state.routes.indexOf(backRoute);
        console.log('backRoute =====',backRouteIndex);
    }
    if (backRouteIndex == null) {
        return StateUtils.pop(state);
    }
    if (backRouteIndex >= 0) {
        return {
            ...state,
            routes: state.routes.slice(0, backRouteIndex+1),
            index: backRouteIndex - 1 + 1,
        };
    }
}


