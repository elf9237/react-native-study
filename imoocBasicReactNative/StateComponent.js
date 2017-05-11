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
export default class StateComponent extends Component{
  state = {
    size:60
  }
  constructor(props){
    super(props);
    // 初始化组件state方式一
    // this.state = {
    //   size:80,
    // };
  }
  render(){
    return <View>
      <Text
        onPress={
          ()=>{
            this.setState({
              size:this.state.size+10
            })
          }
        }
      >我吹啊，吹啊</Text>
      <Text
        onPress={
          ()=>{
            this.setState({
              size:this.state.size-10
            })
          }
        }
      >变小，变小</Text>
      <Image
        style={{width:this.state.size,height:this.state.size}}
        source={require('./qiqiu.jpg')}
      />
    </View>
  }
}
