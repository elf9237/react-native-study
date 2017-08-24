import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao,{FLAG_LANGUAGE}from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
import ArrayUtils from '../../util/ArrayUtils';

export default class CustomKeyPage extends Component{
    constructor(props){
        super(props);
        this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues=[];
        this.isRemoveKey = this.props.isRemoveKey?true:false;
        this.state={
            dataArray:[]
        };
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    dataArray:result
                });
            })
            .catch(error=>{
                console.log(error);
            });
    }
    onSave(){
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return;
        }else{
            this.languageDao.save(this.state.dataArray);
            this.props.navigator.pop();
        }

    }
    onBack(){
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return;
        }else{
            Alert.alert(
                '提示',
                '是否要保存修改？',
                [
                    {text: '不保存', onPress: () => {this.props.navigator.pop();},style:'cancel'},
                    {text: '保存', onPress: () => {this.onSave();}}
                ]
            );
        }
    }
    renderView(){
        if(!this.state.dataArray||this.state.dataArray.length===0)return null;
        let len=this.state.dataArray.length;
        console.log(this.state.dataArray);
        let views=[];
        for(let i=0,l=len-2;i<l;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            );
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2===0?this.renderCheckBox(this.state.dataArray[len-2]):null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        );
        return views;
    }
    onClick(item){
        item.checked = !item.checked;
        ArrayUtils.updataArray(this.changeValues,item);
    }
    renderCheckBox(data){
        let leftText = data.name;
        let isChecked = this.isRemoveKey? false:data.checked;
        return <CheckBox
            style={{flex:1,padding:10}}
            onClick={()=>this.onClick(data)}
            isChecked={isChecked}
            checkedImage={<Image style={{tintColor:'#6495ed'}} source={require('./images/ic_check_box.png')}/>}
            unCheckedImage={<Image style={{tintColor:'#6495ed'}} source={require('./images/ic_check_box_outline_blank.png')}/>}
            leftText={leftText}
        />;
    }
    render(){
        let rightButton=<TouchableOpacity
            onPress={()=>this.onSave()}
        >
            <View style={{margin:10}}>
                <Text style={styles.rightButton}>
              Save
                </Text>
            </View>
        </TouchableOpacity>;
        return (<View>
            <NavigationBar
                title={'Custom Key'}
                style={{
                    backgroundColor:'#EE6363'
                }}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                rightButton={rightButton}
            />
            <ScrollView>
                {this.renderView()}
            </ScrollView>
        </View>);
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    tips:{
        
    },
    rightButton:{
        fontSize:20,
        color:'white',
    },
    line:{
        height:0.3,
        backgroundColor:'darkgray',

    },
    item:{
        flexDirection:'row',
        alignItems:'center',
    }
});
