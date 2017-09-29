import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    WebView,
    DeviceEventEmitter,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import GlobalStyles from '../../res/styles/GlobalStyles';
import ViewUtils from '../util/ViewUtils';

export default class WebViewPage extends Component{
    // 初始化构造函数
    constructor(props){
        super(props);
        this.state={
            url:this.props.url,
            title: this.props.title,
            canGoBack: false,
        };
    }
    onBackPress=()=>{
        if(this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }
    go=()=>{
        this.setState({
            url: this.text,
        })
    }
    onNavigationStateChange = (e) => {
        console.log(e);
        this.setState({
            canGoBack: e.canGoBack,
            // title: e.title,
        });
    }
    render(){
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar title={this.state.title}
                    statusBar={{
                        backgroundColor:'#2196F3'
                    }}
                    style={{
                        backgroundColor:'#2196F3'
                    }}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBackPress())}
                />
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                />
            </View>
        );
    }
}
