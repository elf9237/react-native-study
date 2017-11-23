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

const { params } = this.props.navigation.state; //子页面接收跟随路由 从父页面传递过来的参数
// 子页面向父页面传递参数，可以将父页面传递的参数对象设成一个函数，通过子页面调用父页面的函数传递参数给父页面