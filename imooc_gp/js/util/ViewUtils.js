import React,{Component} from 'react';
import {
    Image,
    TouchableHighlight,
    View,
    StyleSheet,
    Text
} from 'react-native';
export default class ViewUtils{
    /**
     * 获取设置页的Item
     * @param {*} callBack 单击Item的回调
     * @param {*} icon 左侧图标
     * @param {*} text 显示的文本
     * @param {*} tintStyle 图表着色
     * @param {*} expandableIco 右侧图标
     */
    static getSettingItem(callBack, icon, text, tintStyle, expandableIco) {
        return (
            <TouchableHighlight
                onPress={callBack}
            >
                <View style={styles.item}>
                    <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                        <Image source={icon} 
                            resizeMode='stretch'
                            style={[{width: 16,height: 16, marginRight: 10}, tintStyle]}
                        />
                        <Text>{text}</Text>
                    </View>
                    <Image source={expandableIco ? expandableIco : require('../../res/images/ic_tiaozhuan.png')} style={[{
                        marginRight: 10,
                        height: 22,
                        width: 22},
                    {tintColor: '#2196F3'}]}/>
                </View>
            </TouchableHighlight>
        );
    }
    static getLeftButton(callBack){
        return <TouchableHighlight onPress={callBack}>
            <Image style={{width:22,height:22,margin:5}} source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
        </TouchableHighlight>;
    }
    static getRightButton(title, callBack) {
        return <TouchableHighlight
            style={{alignItems: 'center',}}
            onPress={callBack}>
            <View style={{marginRight: 10}}>
                <Text style={{fontSize: 20, color: '#FFFFFF',}}>{title}</Text>
            </View>
        </TouchableHighlight>;
    }

}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 60,
        backgroundColor: '#fff',
    }
});