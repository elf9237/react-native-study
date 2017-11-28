import React from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';

export default class ChatScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Chat with Lucy',
    // };
    static navigationOptions = ({ navigation, screenProps }) => {
        const { state, setParams } = navigation;
        const isInfo = state.params.mode === 'info';
        const { user } = state.params;
        console.log('---screenProps---');
        console.log(screenProps);
        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
            headerRight: (
                <Button
                    title={isInfo ? 'Done' : `${user}'s info`}
                    onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
                />
            ),
            headerStyle:{backgroundColor:screenProps?
                screenProps.themeColor:
                '#4ECBFC'},
        };
    };
    render() {
        const { navigate } = this.props.navigation;   //第一步传入navigate对象
        const { params } = this.props.navigation.state; //接收跟随路由 从父页面传递过来的参数
        return (
            <View>
                <Text>{params.user}</Text>
                <Button
                    onPress={() => navigate('EditInfo')}   //导航跳转与App.js中StackNavigator中自定义命名的Screen对象
                    title="Screen with Lucy"
                />
            </View>
        );
    }
}