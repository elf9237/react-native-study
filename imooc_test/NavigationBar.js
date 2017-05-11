import React,{Component,PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  statusBar
} from 'react-native';
const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
  backgroundColor:PropTypes.string,
  hidden:false,
  barStyle:PropTypes.oneOf(['default','light-content','dark-content'])
}

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      title:'',
      hidden:'false'
    }
  }
  static propTypes = {
    title: PropTypes.string,
    titleView:PropTypes.element,
    hidden:PropTypes.bool,
    leftButton:PropTypes.element,
    rightButton:PropTypes.element,
    statusBar:PropTypes.shape(StatusBarShape)
  }
  static defaultProps = {
    statusBar:{
      barStyle:'light-content',
      hidden:'false'
    }
  }

render(){
    let status = <View style={[styles.statusBar,this.props.statusBar]}>
      <StatusBar
        {...this.props.statusBar}
        >
      </StatusBar>
    </View>
    let titleView = this.props.titleView?this.props.titleView:<Text style={styles.title}>{ this.props.title }</Text>
    let content = <View style={styles.navBar}>
    {this.props.leftButton}
    <View style={styles.titleViewContainer}>
      {titleView}
    </View>
    {this.props.rightButton}
  </View>
  return (<View style={[styles.container,this.props.style]}>
    {status}
    {content}
  </View>
  )
}
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'gray'
  },
  navBar:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    height:Platform.OS ==='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID
  },
  title:{
    fontSize:20,
    color:'white'
  },
  titleViewContainer:{
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0
  },
  statusBar:{
    // IOS可自定义状态栏高度，ANDROID状态栏为默认，不可自定义
    height:Platform.OS ==='ios'?STATUS_BAR_HEIGHT:0
  }

})
