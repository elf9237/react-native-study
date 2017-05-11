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
  TouchableWithoutFeedback,
  Alert
} from 'react-native';

/**
*方式一：es6方式创建组件
*/
export default class TouchableTest extends Component{
  constructor(props){
    super(props);
    this.state=({
      count:0,
      text:'',
      waiting:false
    });
  }
  render(){
    return (<View>
      <TouchableWithoutFeedback
    onPress={()=> {
        this.setState({count: this.state.count+1})
    }}
    onLongPress={()=>{
      console.log('长按');
      Alert.alert('提示','确认删除吗？',[
        {text:'取消',onPress:()=>{},style:'cancle'},
        {text:'确定',onPress:()=>{}}
      ])
    }
  }>
    <View style={styles.button}>
        <Text style={styles.buttonText}>
            我是TouchableWithoutFeedback,单击我
        </Text>
    </View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback
    disabled={this.state.waiting}
    onPress={()=> {
        console.log('点击了');
        this.setState({text:'正在登录...',waiting:true});
        setTimeout(()=>{
            this.setState({text:'网络不流畅',waiting:false})
        },2000);

    }}
>
    <View style={styles.button}>
        <Text style={styles.buttonText}>
           登录
        </Text>
    </View>
</TouchableWithoutFeedback>
<Text style={styles.text}>{this.state.text}</Text>
<Text style={styles.text}>您单击了:{this.state.count}次</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  button:{
    borderWidth:1,
    borderColor:'red'
  },
  buttonText:{
    fontSize:18
  },
  text:{
    fontSize:16
  }
})
