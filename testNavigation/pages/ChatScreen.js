import React from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';

export default class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };
    render() {
        const { navigate } = this.props.navigation;   //第一步传入navigate对象
        const { params } = this.props.navigation.state; //接收跟随路由 从父页面传递过来的参数
        return (
            <View>
                <Text>{params.user}</Text>
                {console.log(this.props.user)}
                <Button
                    onPress={() => navigate('Second')}   //导航跳转与App.js中StackNavigator中自定义命名的Screen对象
                    title="Screen with Lucy"
                />
            </View>
        );
    }
}