import React,{Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListView,
  Alert,
  RefreshControl,
} from 'react-native';
import NavigationBar from './NavigationBar';
// 使用第三方組件
// import Toast, {DURATION} from 'react-native-easy-toast';
var data={
  "statusCode": 0,
  "result": [
    {
      "email": "a.sdasd@adsdsa.com",
      "fullName": "张三张三张三张三"
    },
    {
      "email": "b.sdasd@adsdsa.com",
      "fullName": "李四李四"
    },
    {
      "email": "d.sdasd@adsdsa.com",
      "fullName": "王五王五王五"
    },
    {
      "email": "e.sdasd@adsdsa.com",
      "fullName": "王五王五王五"
    },
    {
      "email": "f.sdasd@adsdsa.com",
      "fullName": "王五王五王五"
    },
    {
      "email": "c.sdasd@adsdsa.com",
      "fullName": "王五王五王五"
    }
  ]
};

export default class ListViewTest extends Component{
  constructor(props){
    super(props);
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
    this.state={
      selectedTab:'tb_popular',
      dataSource:ds.cloneWithRows(data.result),
      isRefreshing:true,
    };
    // 初始化的時候調用停止刷新的定時器
    this.onLoad();
  }
  renderRow(item){
    return <View>
      <TouchableOpacity onPress={()=>{
          // this.toast.show('hello world!',DURATION.LENGTH_LONG);
          // 原生提示組件
          {/*Alert.alert('title','這是一段消息',[
            {text:'確定',onPress:()=>{},style:'cancle'},
            {text:'取消',onPress:()=>{}}
          ]);*/}
        }}>
        <Text style={styles.tips}>
          {item.fullName}
        </Text>
        <Text style={styles.tips}>
          {item.email}
        </Text>
      </TouchableOpacity>
    </View>
  }
  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return <View style={styles.line} key={rowID}>
    </View>
  }
  renderFooter(){
    return <View>
      <Image style={{width:400,height:100}} source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}/>
    </View>
  }
  onLoad(){
    setTimeout(()=>{
      this.setState({
        isRefreshing:false,
      })
    },2000);
  }
  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'ListView'}
          statusBar={{
            backgroundColor:'#EE6363'
          }}
          style={{
              backgroundColor:'#EE6363'
            }}
          ></NavigationBar>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(item)=>this.renderRow(item)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
          renderFooter={()=>this.renderFooter()}
          refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={()=>this.onLoad()}></RefreshControl>}
        />
      {/* <Toast ref={toast=>{this.toast=toast}} /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  text:{
    fontSize:22
  },
  tips:{
    fontSize:20
  },
  row:{
    height:50
  },
  line:{
    height:1,
    backgroundColor:'black'
  }
})
