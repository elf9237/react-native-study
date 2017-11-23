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
import SecondScreen from './pages/SecondScreen';

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
    HomeScreen: { screen: App },  //将启动入口文件作为react-navigation的路由路口
    Chat: { screen: ChatScreen },  //将对象导入路由中（路由名字自定义供其他页面调用）
    Second: { screen: SecondScreen }
});

