/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

/**
*方式一：es6方式创建组件
*/
export default class ImageTest extends Component{
  render(){
    return (<View>
      <Image
        style={{width:500,height:100,borderWidth:1}}
        resizeMode={'cover'}
        source={require('./qiqiu.jpg')}
        />
        <Image
          style={{width:500,height:100,borderWidth:1}}
          resizeMode={'cover'}
          source={{uri:'http://img.popo.cn/uploadfile/2017/0217/1487316191770266.jpg'}}
          />
          <Image
            style={{width:500,height:100,tintColor:'red'}}
            resizeMode={'cover'}
            source={{uri:'draw'}}
            />
    </View>)
  }
}
