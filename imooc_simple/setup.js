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
import LifecycleComponent from './LifecycleComponent';
export default class setup extends Component {
  constructor(props){
    super(props);
    this.state=({
      remove:false,
    });
  }
  render() {
    var view=this.state.remove?null:<LifecycleComponent/>;
    var text=this.state.remove?"让他复活吧":"干掉他啊";
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20}} onPress={
          ()=>{
            this.setState({
              remove:!this.state.remove
            })
          }
        }>{text}</Text>
        {view}
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
