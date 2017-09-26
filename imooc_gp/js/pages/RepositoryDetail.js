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

import FavoriteDao from '../expand/dao/FavoriteDao';

export default class RepositoryDetail extends Component{
    // 初始化构造函数
    constructor(props){
        super(props);
        //console.log(this.props.projectModel);
        this.url = this.props.projectModel.item.html_url ? this.props.projectModel.item.html_url : TRENDING_URL + this.props.projectModel.item.fullName;
        const title = this.props.projectModel.item.full_name ? this.props.projectModel.item.full_name : this.props.projectModel.item.fullName;
        this.favoriteDao = new FavoriteDao(this.props.flag);
        // console.log(this.props.projectModel);
        this.state={
            url:this.url,
            title,
            canGoBack: false,
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.props.projectModel.isFavorite ? 
                require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png')
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
        });
    }
    _setFavoriteState = (isFavorite) => {
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_star_navbar.png'),
        });
    }
    _onRightButonClick = () => {
        const projectModel = this.props.projectModel;
        this._setFavoriteState(projectModel.isFavorite = !projectModel.isFavorite);
        var key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if(projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        }else{
            this.favoriteDao.removeFavoriteItem(key);
        }
    }
    _renderRightButon = () => {
        return (
            <TouchableOpacity 
                onPress={()=>this._onRightButonClick()}
            >
                <Image 
                    style={{width: 20, height: 20, marginRight: 10}}
                    source={this.state.favoriteIcon}
                />
            </TouchableOpacity>
        );
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar 
                    title={this.state.title}
                    statusBar={{
                        backgroundColor:'#2196F3'
                    }}
                    style={{
                        backgroundColor:'#EE6363'
                    }}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    rightButton={this._renderRightButon()}
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
