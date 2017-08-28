/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    DeviceEventEmitter,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import AsyncStorageTest from '../../AsyncStorageTest';
import MyPage from './my/MyPage';
import Toast,{DURATION} from 'react-native-easy-toast';
import WebViewTest from '../../WebViewTest';
// import TrendingTest from '../../TrendingTest';
import TrendingPage from './trending/TrendingPage';
export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_popular'
        };
    }
    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
            this.toast.show(text, DURATION.LENGTH_LONG);
        });
    }
    componentWillUnmount() {
        this.listener && this.listener.remove();
    }
    render() {
        return (
            <View style={styles.container}>
                {/* 底部导航菜单的开发 */}
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_polular.png')} />}
                        badgeText="3"
                        allowFontScaling={true}
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                        <PopularPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                        {/* <AsyncStorageTest style={styles.page2}>
                        </AsyncStorageTest> */}
                        {/* <TrendingTest /> */}
                        <TrendingPage />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_polular.png')} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                        <WebViewTest />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                        <MyPage {...this.props}>
                        </MyPage>
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast => this.toast = toast} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    page1: {
        flex:1,
        backgroundColor:'red'
    },
    page2: {
        flex:1,
        backgroundColor:'yellow'
    },
    image: {
        width:22,
        height:22
    }
});
