import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&page,per_page,sort,order';
export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state={
            languages:[]
        };
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.LanguageDao.fetch()
            .then(result=>{
                this.setState({
                    languages:result
                });
            })
            .catch(error=>{
                console.log(error);
            });
    }
    render(){
        // 初始化判断tab个数，为零返回null，大于零加载数据
        let content=this.state.languages.length>0?
            <ScrollableTabView
                tabBarBackgroundColor='#2196F3'
                tabBarActiveTextColor='white'
                tabBarInactiveTextColor='white'
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                renderTabBar={()=><ScrollableTabBar/>}
            >
                {this.state.languages.map((result,i,arr)=>{
                    let lan=arr[i];
                    return lan.checked?<PopularTab key={i} tabLabel={lan.name}>{lan.name}</PopularTab>:null;
                })}
            </ScrollableTabView>:null;
        return (<View style={styles.container}>
            <NavigationBar
                title={'最热'}
                style={{
                    backgroundColor:'#EE6363'
                }}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            ></NavigationBar>
            {content}
        </View>);
    }
}
class PopularTab extends Component{
    constructor(props){
        super(props);
        // 类初始化后才能在自定义函数方法中调用
        this.dataRepository=new DataRepository();
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:true,
        };
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.setState({
            isLoading:true
        });
        let url = URL+this.props.tabLabel+QUERY_STR;
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false,
                });
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)  //将对象解析成字符串 JSON.parse() 和 JSON.stringify()
                });
            });
    }
    renderRow(data){
        return <RepositoryCell data={data}/>;
    }
    render(){
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl     // 为其添加下拉刷新的功能
                        refreshing={this.state.isLoading}  // 是否应该在刷新时显示指示器
                        onRefresh={()=>this.loadData()}
                        initialListSize={3}
                        // android刷新按钮颜色
                        colors={['#2196F3']}
                        // ios刷新按钮颜色
                        tintColor={'#2196F3'}
                        title={'Loading...'}
                        titleColor={'#2196F3'}
                    />}
            />
        </View>;
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        height:900,
    }
});
