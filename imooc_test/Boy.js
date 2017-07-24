import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import Girl from './Girl';
import NavigationBar from './NavigationBar';
export default class Boy extends Component{
  // 初始化构造函数
  constructor(props){
    super(props);
    this.state={
      world:''
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar title={'Boy'}
          statusBar={{
            backgroundColor:'#EE6363'
          }}
          style={{
            backgroundColor:'#EE6363'
          }}
        />
        <Text style={styles.text}>
          I am boy.
        </Text>
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:Girl,
              params:{
                world:'一支玫瑰',
                onCallBack:(world)=>{
                  this.setState({
                    world:world
                  })
                }
              }
            })
          }}>送女孩一支玫瑰
        </Text>
        <Text style={styles.text}>
          {this.state.world}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  text:{
    fontSize:20,
  }
})
