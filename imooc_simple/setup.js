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
import RefComponent from './RefComponent';
import Student from './Student';
import TouchableTest from './TouchableTest';
export default class setup extends Component {
  constructor(props){
    super(props);
    this.state=({
      remove:false,
      result:'',
      size:0
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableTest />
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
