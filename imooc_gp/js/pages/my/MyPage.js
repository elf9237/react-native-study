import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableHighlight,
    Image,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import { MORE_MENU } from '../../common/MoreMenu';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import ViewUtils from '../../util/ViewUtils';
import AboutPage from '../about/AboutPage';


export default class MyPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    onClick = (tab) => {
        let TargetComponent, params ={...this.props, menuType: tab };
        switch(tab) {
        case MORE_MENU.Custom_Language:
            TargetComponent = CustomKeyPage;
            params.flag = FLAG_LANGUAGE.flag_langage;
            break;
        case MORE_MENU.Custom_Key:
            TargetComponent = CustomKeyPage;
            params.flag = FLAG_LANGUAGE.flag_key;
            break;
        case MORE_MENU.Remove_Key:
            TargetComponent = CustomKeyPage;
            params.flag = FLAG_LANGUAGE.flag_key;
            params.isRemoveKey = true;
            break;
        case MORE_MENU.Sort_Key:
            TargetComponent = SortKeyPage;
            params.flag = FLAG_LANGUAGE.flag_key;
            break;
        case MORE_MENU.Sort_Language:
            TargetComponent = SortKeyPage;
            params.flag = FLAG_LANGUAGE.flag_langage;
            break;
        case MORE_MENU.Custom_Theme:
            break;
        case MORE_MENU.About:
            TargetComponent = AboutPage;
            break;
        }
        if(TargetComponent){
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    getItem = (tag, icon, text) => {
        return ViewUtils.getSettingItem(()=>this.onClick(tag), icon, text, {tintColor: '#2196F3'}, null);
    }
    render(){
        var navigationBar = <NavigationBar
            title={'我的'}
            statusBar={{
                backgroundColor:'#2196F3'
            }}
            style={{
                backgroundColor:'#EE6363'
            }}
        />;
        return (<View style={GlobalStyles.root_container}>
            {navigationBar}
            <ScrollView>
                <TouchableHighlight 
                    onPress={()=>this.onClick(MORE_MENU.About)}
                >
                    <View style={[styles.item,{height: 90}]}>
                        <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                            <Image source={require('../../../res/images/ic_trending.png')} 
                                style={[{width: 40,height: 40, marginRight: 10}, {tintColor: '#2196F3'}]}
                            />
                            <Text>Github Popular</Text>
                        </View>
                        <Image source={require('../../../res/images/ic_tiaozhuan.png')} style={[{
                            marginRight: 10,
                            height: 22,
                            width: 22},
                        {tintColor: '#2196F3'}]}/>
                    </View>
                </TouchableHighlight>
                <View style={GlobalStyles.line}></View>
                {/*趋势管理*/}
                <Text style={styles.groupTitle}>趋势管理</Text>
                <View style={GlobalStyles.line}></View>
                {/*自定义语言*/}
                {this.getItem(MORE_MENU.Custom_Language, require('./images/ic_custom_language.png'), '自定义语言')}
                <View style={GlobalStyles.line}></View>
                {/*语言排序*/}
                {this.getItem(MORE_MENU.Sort_Language, require('./images/ic_swap_vert.png'), '语言排序')}
                <View style={GlobalStyles.line}></View>
                {/*标签管理*/}
                <Text style={styles.groupTitle}>标签管理</Text>
                <View style={GlobalStyles.line}></View>
                {/*自定义标签*/}
                {this.getItem(MORE_MENU.Custom_Key, require('./images/ic_custom_language.png'), '自定义标签')}
                <View style={GlobalStyles.line}></View>
                {/*标签排序*/}
                {this.getItem(MORE_MENU.Sort_Key, require('./images/ic_swap_vert.png'), '标签排序')}
                <View style={GlobalStyles.line}></View>
                {/*标签移除*/}
                {this.getItem(MORE_MENU.Remove_Key, require('./images/ic_remove.png'), '标签移除')}
                <View style={GlobalStyles.line}></View>
                {/*设置*/}
                <Text style={styles.groupTitle}>设置</Text>
                <View style={GlobalStyles.line}></View>
                {/*自定义主题*/}
                {this.getItem(MORE_MENU.Custom_Theme, require('./images/ic_view_quilt.png'), '自定义主题')}
                <View style={GlobalStyles.line}></View>
                {/*关于作者*/}
                {this.getItem(MORE_MENU.About_Auther, require('./images/ic_insert_emoticon.png'), '关于作者')}
                <View style={GlobalStyles.line}></View>
            </ScrollView>
        </View>);
    }
}
const styles=StyleSheet.create({
    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 60,
        backgroundColor: '#fff',
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
});
