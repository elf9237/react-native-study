import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput,
} from 'react-native';
import NavigationBar from './js/common/NavigationBar';
import Toast,{DURATION} from 'react-native-easy-toast';
const KEY='text';

export default class AsyncStorageTest extends Component{
    // 初始化构造函数
    constructor(props){
        super(props);
    }
    onSave(){
        AsyncStorage.setItem(KEY,this.text,(error)=>{
            if(!error){
                this.toast.show('保存成功',DURATION.LENGTH_LONG);
            }else{
                this.toast.show('保存失败',DURATION.LENGTH_LONG);
            }
        });
    }
    onRemove(){
        AsyncStorage.removeItem(KEY,(error)=>{
            if(!error){
                this.toast.show('移除成功');
            }else{
                this.toast.show('移除失败');
            }
        });
    }
    onFetch(){
        AsyncStorage.getItem(KEY,(error,result)=>{
            if(!error){
                if(result!==''&&result!==null){
                    this.toast.show('取出的内容为：'+result);
                }else{
                    this.toast.show('取出的内容不存在');
                }
            }else{
                this.toast.show('取出失败');
            }
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar title={'AsyncStorageTest'}
                    statusBar={{
                        backgroundColor:'#EE6363'
                    }}
                    style={{
                        backgroundColor:'#2196F3'
                    }}
                />
                <TextInput
                    style={{borderWidth:1,height:40,margin:5}}
                    onChangeText={text=>this.text=text}
                ></TextInput>
                <View style={{flexDirection:'row'}}>
                    <Text
                        style={styles.tips}
                        onPress={()=>this.onSave()}
                    >
                    保存
                    </Text>
                    <Text
                        style={styles.tips}
                        onPress={()=>this.onRemove()}
                    >
                      移除
                    </Text>
                    <Text
                        style={styles.tips}
                        onPress={()=>this.onFetch()}
                    >
                        取出
                    </Text>
                </View>
                <Toast ref={toast=>this.toast=toast} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    tips:{
        fontSize:29,
        margin:5
    }
});
