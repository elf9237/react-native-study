/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

/**
*方式一：es6方式创建组件
*/
export default class EiComponent extends Component{
  render(){
    return <Text style={{fontSize:20,backgroundColor:'red'}}>hello{this.props.name}</Text>
  }
}

/**
*方式二：es5方式创建组件
*/

// var HelloComponent = React.createClass({
//   render(){
//     return <Text style={{fontSize:20,backgroundColor:'red'}}>Hello</Text>
//   }
// })
// module.exports=HelloComponent;


/**
*方式三：函数式方式定义组件
*无状态，不能使用this
*/
// function HelloComponent(props){
//   return <Text style={{fontSize:20,backgroundColor:'red'}}>Hello{props.name}</Text>
// }
// module.exports = HelloComponent;
