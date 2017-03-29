/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
/**
*导入变量跟方法
*/
import StateComponent from './StateComponent';
export default class setup extends Component {
  constructor(props){
    super(props);
    this.state=({
      remove:false,
      result:''
    });
  }
  render() {
    var params = {name:'小张',age:20,sex:'男'};
    //使用解构赋值获取一组属性中部分属性
    var {name,sex} = params;
    return (
      <View style={styles.container}>
        <StateComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop:10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
