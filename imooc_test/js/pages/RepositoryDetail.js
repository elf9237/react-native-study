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
import ViewUtils from '../util/ViewUtils';
const URL = 'http://www.imooc.com';
const TRENDING_URL = 'https://github.com/';
export default class RepositoryDetail extends Component{
    // 初始化构造函数
    constructor(props){
        super(props);
        this.url = this.props.item.html_url ? this.props.item.html_url : TRENDING_URL + this.props.item.fullName;
        const title = this.props.item.full_name ? this.props.item.full_name : this.props.item.fullName;
        console.log(this.props.item);
        this.state={
            url:this.url,
            title,
            canGoBack: false,
        };
    }
    onBack = ()=>{
        if(this.state.canGoBack) {
            this.webView.goBack();
        } else {
            // DeviceEventEmitter.emit('showToast', '到顶了');
            this.props.navigator.pop();
        }
    }
    go=()=>{
        this.setState({
            url: this.text,
        })
    }
    onNavigationStateChange = (e) => {
        // console.log(e);
        this.setState({
            canGoBack: e.canGoBack,
            // title: e.title,
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar 
                    title={this.state.title}
                    statusBar={{
                        backgroundColor:'#EE6363'
                    }}
                    style={{
                        backgroundColor:'#EE6363'
                    }}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                />
                {/* <View style={styles.row}>
                    <Text 
                    style={styles.tips}
                    onPress={() => {
                        this.goBack();
                    }}>返回</Text>
                    <TextInput 
                        style={styles.TextInput}
                        defaultValue={URL}
                        onChangeText={text => this.text=text}
                    />
                    <Text
                    style={styles.tips}
                    onPress={() => {
                        this.go();
                    }}>前往</Text>
                </View> */}
                <WebView
                    ref={webView => this.webView = webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    startInLoadingState={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    text:{
        fontSize:20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    tips: {
        fontSize: 20,
    },
    TextInput: {
       height: 40,
       flex: 1,
       borderWidth: 1,
       margin: 2, 
    }
});
