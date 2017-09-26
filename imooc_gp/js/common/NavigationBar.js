/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 状态栏组件
 */
import React,{Component,PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Platform
} from 'react-native';
const NAV_BAR_HEIGHT_ANDROID=50;
const NAV_BAR_HEIGHT_IOS=44;
const STATUS_BAR_HEIGHT=20;
const StatusBarShape={
  backgroundColor:PropTypes.string,
  barStyle:PropTypes.oneOf(['default','light-content','dark-content']),
  hidden:PropTypes.bool
}

export default class NavigationBar extends Component{
  static propTypes = {
    style:View.propTypes.style,
    title:PropTypes.string,
    titleView:PropTypes.element,
    hidden:PropTypes.bool,
    leftButton:PropTypes.element,
    rightButton:PropTypes.element,
    statusBar:PropTypes.shape(StatusBarShape)
  }
  static defaultProps={
    statusBar:{
      barStyle:'light-content',
      hidden:false
    }
  }
  constructor(props){
    super(props);
    this.state={
      title:'',
      hide:false
    }
  }
  render(){
    // 状态栏组件
    let status = <View style={[styles.statusBar,this.props.statusBar]}>
      <StatusBar {...this.props.statusBar}/>
    </View>
    let titleView=this.props.titleView?this.props.titleView:<Text style={styles.title}>{this.props.title}</Text>
  let content=<View style={styles.navBar}>
    {/* leftButton、rightButton由父组件传递过来，未定义时也不会报错 */}
      {this.props.leftButton}
      <View style={styles.titleViewContainer}>
        {titleView}
      </View>
      {this.props.rightButton}
    </View>
    return (
      <View style={styles.container}>
        {status}
        {content}
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:'#2196F3',
  },
  navBar:{
    justifyContent:'space-between',
    alignItems:'center',
    height:Platform.OS ==='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
    flexDirection:'row'
  },
  titleViewContainer:{
    justifyContent:'center',
    alignItems:'center',
    // titleView居中显示设置
    position:'absolute',
    left:40,
    right:40,
    top:0,
    bottom:0
  },
  title:{
    fontSize:20,
    color:'white'
  },
  statusBar:{
    // IOS可自定义状态栏高度，ANDROID状态栏为默认，不可自定义
    height:Platform.os === 'ios'?STATUS_BAR_HEIGHT:0,
  }
});
