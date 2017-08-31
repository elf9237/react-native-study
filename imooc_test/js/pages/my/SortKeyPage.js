import React,{Component} from 'react';
import {
    View,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    Alert,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import SortableListView  from 'react-native-sortable-listview';
import ViewUtil from '../../util/ViewUtils';
export default class SortKeyPage extends Component{
    constructor(props){
        super(props);
        // 从数据库读取的所有标签数组
        this.dataArray=[];
        //排序后新生成所有标签的数据
        this.SortResultArray=[];
        //初始化标签排序顺序
        this.originalCheckedArray=[];
        this.state={
        // 已经定义的标签
            checkedArray:[],
        };
    }
    componentDidMount(){
        this.languageDao=new LanguageDao(this.props.flag);
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.getCheckedItems(result);
                // console.log(result);
            })
            .catch(error=>{
                console.log(error);
            });
    }
    getCheckedItems(result){
        this.dataArray = result;
        let checkedArray=[];
        for(let i=0,len=result.length;i<len;i++){
            let data=result[i];
            if(data.checked)checkedArray.push(data);
        }
        this.setState({
            checkedArray:checkedArray,
        });
        this.originalCheckedArray=ArrayUtils.clone(checkedArray);
        // console.log(this.originalCheckedArray);
    }
    onBack(){
        if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '是否要保存修改？',
            [
                {text: '不保存', onPress: () => {this.props.navigator.pop();},style:'cancel'},
                {text: '保存', onPress: () => {this.onSave(true);}}
            ]
        );
    }
    onSave(isChecked){
        if(!isChecked&&ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){ 
        //ArrayUtils.isEqual方法重复使用，另外加一个参数判断
            this.props.navigator.pop();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.SortResultArray);
        this.props.navigator.pop();
    }
    getSortResult(){
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for(let i =0,l=this.originalCheckedArray.length;i<l;i++){
            let item = this.originalCheckedArray[i];
            let index = this.sortResultArray.indexOf(item);
            this.sortResultArray.splice(index,1,this.state.checkedArray[i]);
        }
    }
    render(){
        let title = this.props.flag === FLAG_LANGUAGE.flag_langage ? '语言排序' : '标签排序';
        let rightButton=<TouchableOpacity
            onPress={()=>this.onSave()}
        >
            <View style={{margin:10}}>
                <Text style={styles.rightButton}>
            Save
                </Text>
            </View>
        </TouchableOpacity>;
        return (<View style={styles.container}>
            <NavigationBar
                title={title}
                style={{
                    backgroundColor:'#EE6363'
                }}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
                leftButton={ViewUtil.getLeftButton(()=>{
                    this.onBack();
                })}
                rightButton={rightButton}
            />
            <SortableListView
                style={{flex: 1}}
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
                // limitScrolling={true}
                activeOpacity={0.2}
                rowHasChanged={console.log('已经改变')}
                onMoveStart={()=>{console.log(1)}}
                onMoveEnd ={()=>{console.log(2)}}
                sortRowStyle={{backgroundColor:'red'}}
                renderRow={row => <SortCell data={row} />}
            />
        </View>);
    }
}
class SortCell extends Component{
    render(){
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                delayLongPress={500} /* 500ms hold delay */
                style={{padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}}
                {...this.props.sortHandlers}
            >
                <View style={styles.row}>
                    <Image source={require('./images/ic_sort.png')} style={styles.image}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    tips:{
        fontSize:29
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        width:16,
        height:16,
        tintColor:'#2196f3',
        marginRight:10
    },
    rightButton:{
        fontSize:20,
        color:'white',
    },
});
