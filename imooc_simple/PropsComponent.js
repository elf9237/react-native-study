/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

/**
*方式一：es6方式创建组件
*/
export default class PropsComponent extends Component{
  // es6语法定义默认属性
  static defaultProps={
    name:'小明',
    age:16
  };
  static propTypes={
    name:PropTypes.string,
    age:PropTypes.number,
    //isRequired 限定性别是必须传递的
    sex:PropTypes.string.isRequired,
  };
  render(){
    // props从父页面传值
    return (
      <View>
        <Text style={{fontSize:20,backgroundColor:'red'}}>姓名：{this.props.name}</Text>
        <Text style={{fontSize:20,backgroundColor:'red'}}>年龄：{this.props.age}</Text>
        <Text style={{fontSize:20,backgroundColor:'red'}}>性别：{this.props.sex}</Text>
      </View>
    )

  }
}
