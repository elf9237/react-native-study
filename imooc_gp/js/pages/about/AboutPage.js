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
} from 'react-native';

import ViewUtils from '../../util/ViewUtils';
import { MORE_MENU } from '../../common/MoreMenu';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';

export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic) => this.updateState(dic), FLAG_ABOUT.flag_about);
    }
    updateState(dic){
        this.setState(dic);
    }
    onClick = (tab) => {
        let TargetComponent, params ={...this.props, menuType: tab };
        switch(tab) {
        case MORE_MENU.About_Auther:
            break;
        case MORE_MENU.WebSite:
            break;
        case MORE_MENU.Feedback:
            break;
        }
        if(TargetComponent){
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    

    render(){
        let content = <View>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.WebSite), require('../../../res/images/ic_computer.png'), MORE_MENU.WebSite, {tintColor: '#2196F3'})}
            <View style={GlobalStyles.line}></View>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.About_Auther), require('../my/images/ic_insert_emoticon.png'), MORE_MENU.About_Auther, {tintColor: '#2196F3'})}
            <View style={GlobalStyles.line}></View>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.Feedback), require('../../../res/images/ic_feedback.png'), MORE_MENU.Feedback, {tintColor: '#2196F3'})}
            <View style={GlobalStyles.line}></View>
        </View>;
        return this.aboutCommon.render(content, {
            'name':'Github Popular',
            'description': '这是一个用来查看GitHub最受欢迎与最热项目的App,它基于React Native支持Android和iOS双平台。',
            'avatar': 'https://avatars2.githubusercontent.com/u/8716595?v=4&s=460',
            'backgroundImg': 'http://mpic.tiankong.com/795/369/795369bfa33ca4717aa6082ed7552722/640.jpg@300h',
        });
    }
}

