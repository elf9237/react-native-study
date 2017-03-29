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
import EiComponent , {name,age,sum} from './EiComponent';
export default class setup extends Component {
  constructor(props){
    super(props);
    this.state=({
      remove:false,
      result:''
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20}}>姓名：{name}</Text>
        <Text style={{fontSize:20}}>年龄：{age}</Text>
        <Text style={{fontSize:20}} onPress={
          ()=>{
            var result = sum(2,3);
            this.setState({
              result:result,
            })
          }
        }>2+3={this.state.result}</Text>
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
