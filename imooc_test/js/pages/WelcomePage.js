import React,{Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';
export default class WelcomePage extends Component{
    componentDidMount(){
        this.timer=setTimeout(()=>{
        // 使用resetTo重置路由，将第一个组件重置为首页
            this.props.navigator.resetTo({
                component:HomePage
            });
        },2000);
    }                                  
    // 组件被卸载之后要取消定时器，否则会报异常
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
    render(){
        return (<View>
            <NavigationBar
                title={'欢迎'}
                style={{
                    backgroundColor:'#2196F3'
                }}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            />
            <Text>欢迎</Text>
        </View>);
    }
}
