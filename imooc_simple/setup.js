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
import MingStudent from './MingStudent';
export default class setup extends Component {
  constructor(props){
    super(props);
    this.state=({
      remove:false,
      result:'',
      size:0
    });
    this.stu = new Student('小东',13,'男');
    this.ming = new MingStudent();
  }
  render() {
    var params = {name:'小张',age:20,sex:'男'};
    //使用解构赋值获取一组属性中部分属性
    var {name,sex} = params;
    return (
      <View style={styles.container}>
        <Text
          style={{fontSize:20}}
          onPress={()=>{
            // 方式一获取ref属性(有两种方式)
            //var size = this.refs.reftest.getSize();
            var size = this.refs['reftest'].getSize();

            // 方式二获取ref属性
            // var size = this.reftest.getSize();
            this.setState({
              size:size,
            })
          }}
        >获取气球大小：{this.state.size}</Text>
        <Text style={{fontSize:20}}>
          {this.stu.getDescription()};
        </Text>
        <Text style={{fontSize:20}}>
          {this.ming.getDescription()};
        </Text>
        <RefComponent
          //方式一定义ref属性
          ref = "reftest"

          //方式二定义ref属性
          // ref={reftest=>this.reftest=reftest}
        />
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
