import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ListView,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Platform,
    Linking,
    Clipboard,
} from 'react-native';

import ViewUtils from '../../util/ViewUtils';
import { MORE_MENU } from '../../common/MoreMenu';
import Toast, {DURATION} from 'react-native-easy-toast';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import WebViewPage from '../WebViewPage';
import config from '../../../res/data/config.json';

const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'http://jiapenghui.com',
            },
            CSDN: {
                title: 'CSDN',
                url: 'http://blog.csdn.net/fengyuzhengfan',
            },
            JIANSHU: {
                title: '简书',
                url: 'http://www.jianshu.com/users/ca3943a4172a/latest_articles',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/crazycodeboy',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1586866509',
            },
            Email: {
                title: 'Email',
                account: 'crazycodeboy@gmail.com',
            },
        }
    },
    QQ: {
        name: '技术交流群',
        items: {
            MD: {
                title: '移动开发者技术分享群',
                account: '335939197',
            },
            RN: {
                title: 'React Native学习交流群',
                account: '165774887',
            }
        },
    },
};

export default class AboutMePage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic) => this.setState(dic), FLAG_ABOUT.flag_about_me, config);
        this.state={
            projectModels: [],
            showRespository: false,
            showBlog: false,
            showQQ: false,
            showContact: false,
            auther: {
                'name':'Github Popular',
                'description': '这是一个用来查看GitHub最受欢迎与最热项目的App,它基于React Native支持Android和iOS双平台。',
                'avatar': 'https://avatars2.githubusercontent.com/u/8716595?v=4&s=460',
                'backgroundImg': 'http://mpic.tiankong.com/795/369/795369bfa33ca4717aa6082ed7552722/640.jpg@300h',
            }
        };
    }
    /**
     * 获取item右侧图标
     * @param {*} isSHow 
     */
    getClickIcon(isShow) {
        return isShow ? require('../../../res/images/ic_tiaozhuan_up.png') : require('../../../res/images/ic_tiaozhuan_down.png');
    }
    updateState(dic){
        this.setState(dic);
    }
    componentDidMount() {
        this.aboutCommon.componentDidMount();
    }
    onClick = (tab) => {
        let TargetComponent, params ={...this.props, menuType: tab };
        switch(tab) {
        case FLAG.REPOSITORY:
            this.setState({
                showRespository: !this.state.showRespository,
            });
            break;
        case FLAG.BLOG:
            this.setState({
                showBlog: !this.state.showBlog,
            });
            break;
        case FLAG.QQ:
            this.setState({
                showQQ: !this.state.showQQ,
            });
            break;
        case FLAG.CONTACT:
            this.setState({
                showContact: !this.state.showContact,
            });
            break;
        case FLAG.CONTACT.items.QQ:
            Clipboard.setString(tab.account);
            this.toast.show('QQ' + tab.account + '已复制到剪贴板');
            break;
        case FLAG.CONTACT.items.Email:
            var url = 'mailto:' + tab.account;
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
            break;
        case FLAG.QQ.items.MD:
        case FLAG.QQ.items.RN:
            Clipboard.setString(tab.account);
            this.toast.show('群号' + tab.account + '已复制到剪贴板');
            break;
        case FLAG.BLOG.items.CSDN:
        case FLAG.BLOG.items.GITHUB:
        case FLAG.BLOG.items.JIANSHU:
        case FLAG.BLOG.items.PERSONAL_BLOG:
            TargetComponent = WebViewPage;
            params.title = tab.title;
            var url= tab.url;
            params.url = url;
            break;
        }
        if(TargetComponent){
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    
    /**
     * 显示列表数据
     * @param {*} dic 
     * @param {*} isShowAccount 
     */
    renderItems(dic, isShowAccount) {
        if(!dic) return null;
        let views = [];
        for(let i in dic) {
            let title = isShowAccount ? dic[i].title+ ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {
                        ViewUtils.getSettingItem(() => this.onClick(dic[i]), '', title, {tintColor: '#2196F3'})
                    }
                    <View style={GlobalStyles.line}></View>
                </View>
            );
        }
        return views;
    }

    render(){
        let content = <View>
            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.BLOG), require('../../../res/images/ic_computer.png'), FLAG.BLOG.name, {tintColor: '#2196F3'}, this.getClickIcon(this.state.showBlog))}
            <View style={GlobalStyles.line}></View>
            {
                this.state.showBlog ? this.renderItems(FLAG.BLOG.items, false) : null
            }
            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.REPOSITORY), require('../../../res/images/ic_code.png'), FLAG.REPOSITORY, {tintColor: '#2196F3'}, this.getClickIcon(this.state.showRespository))}
            <View style={GlobalStyles.line}></View>
            {
                this.state.showRespository ? this.aboutCommon.renderRepository(this.state.projectModels) : null
            }
            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.QQ), require('../../../res/images/ic_computer.png'), FLAG.QQ.name, {tintColor: '#2196F3'}, this.getClickIcon(this.state.showQQ))}
            <View style={GlobalStyles.line}></View>
            {
                this.state.showQQ ? this.renderItems(FLAG.QQ.items, true) : null
            }
            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.CONTACT), require('../../../res/images/ic_computer.png'), FLAG.CONTACT.name, {tintColor: '#2196F3'}, this.getClickIcon(this.state.showContact))}
            <View style={GlobalStyles.line}></View>
            {
                this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null
            }
        </View>;
        return (
            <View style={styles.container}>
                {
                    this.aboutCommon.render(content, this.state.auther)
                }
                <Toast ref={e => this.toast=e}></Toast>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flex: 1
    }
})
