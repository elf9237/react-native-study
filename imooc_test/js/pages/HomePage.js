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
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import AsyncStorageTest from '../../AsyncStorageTest';
import MyPage from './my/MyPage';
export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_popular'
        };
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
                        <PopularPage />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                        <AsyncStorageTest style={styles.page2}>
                        </AsyncStorageTest>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_polular.png')} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                        <View style={styles.page1}>
                        </View>
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
