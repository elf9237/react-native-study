import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../../common/NavigationBar';
import DataRepository, {FLAG_STORAGE} from '../../expand/dao/DataRepository';
import TrendingCell from '../../common/TrendingCell';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import RepositoryDetail from '../RepositoryDetail';
import Popover from '../../common/Popover'
import TimeSpan from '../../model/TimeSpan'

const API_URL='https://github.com/trending/';
var timeSpanTextArray = [
    new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'),
    new TimeSpan('本 月', 'since=monthly'),
];
export default class TrendingPage extends Component{
    constructor(props){
        super(props);
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_langage);
        this.state={
            languages:[],
            isVisible: false,
            buttonRect: {},
            timeSpan: timeSpanTextArray[0],
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
    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
          this.setState({
            isVisible: true,
            buttonRect: {x: px, y: py, width: width, height: height}
          });
        });
      }
    
      closePopover() {
        this.setState({isVisible: false});
      }
      _onSelectTimeSpan = (timeSpan) => {
        this.setState({
            timeSpan,
            isVisible: false,
        })
      }
    _renderTitleView = () => {
        return (<View>
            <TouchableOpacity 
                ref='button'
                onPress={() => this.showPopover()}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: '#fff', fontWeight: '400'}}>趋势 {this.state.timeSpan.showText}</Text>
                    <Image source={require('../../../res/images/ic_tiaozhuan_down.png')} style={{tintColor: '#fff'}}/>
                </View>
            </TouchableOpacity>
        </View>);
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
                    return lan.checked?<TrendingTab key={i} tabLabel={lan.name} timeSpan={this.state.timeSpan} {...this.props}>{lan.name}</TrendingTab>:null;
                })}
            </ScrollableTabView>:null;
        const timeSpanView = <Popover
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    onClose={() => this.closePopover()}
                    placement='bottom'
                    contentStyle={{
                        backgroundColor: '#343434', opacity: .8
                    }}
                    >
                    {
                        timeSpanTextArray.map((result, i, arr) => {
                            return (<TouchableOpacity 
                                key={i}
                                underlayColor='transparent'
                                onPress={() => this._onSelectTimeSpan(arr[i])}
                            >
                                        <Text style={{fontSize: 18, fontWeight: '400', color: '#fff', padding: 8}}>{arr[i].showText}</Text>
                                </TouchableOpacity>)
                        })
                    }
                </Popover>;
        const navigationBar = <NavigationBar
        titleView={this._renderTitleView()}
        style={{
            backgroundColor:'#EE6363'
        }}
        statusBar={{
            backgroundColor:'#EE6363'
        }}
    ></NavigationBar>
        return (<View style={styles.container}>
            {navigationBar}
            {content}
            {timeSpanView}
        </View>);
    }
}
class TrendingTab extends Component{
    constructor(props){
        super(props);
        // 类初始化后才能在自定义函数方法中调用
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_trending);
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:true,
        };
    }
    componentDidMount(){
        this.loadData(this.props.timeSpan, true);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.timeSpan !== this.props.timeSpan) {
            this.loadData(nextProps.timeSpan, true);
        }
    }
    loadData(timeSpan, isRefresh){
        this.setState({
            isLoading:true
        });
        let url = this.genFetchUrl(timeSpan, this.props.tabLabel);
        console.log('url');
        console.log(url);
        this.dataRepository
            .fetchRespository(url)
            .then(result=>{
                const items = result && result.items ? result.items: result ? result : [];
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items),
                    isLoading:false,
                });
                if (result && result.update_date && !this.dataRepository.checkData(result.update_date)) {
                    DeviceEventEmitter.emit('showToast', '数据已过时');
                    return this.dataRepository.fetchNetRepository(url);
                } else {
                    DeviceEventEmitter.emit('showToast', '获取缓存数据');
                }
            })
            .then(items => {
                if(!items || items.length === 0)return;
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items),
                    isLoading:false,
                });
                DeviceEventEmitter.emit('showToast', '获取网络数据');
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)  //将对象解析成字符串 JSON.parse() 和 JSON.stringify()
                });
            });
    }
    _updateState = (dic) => {
        if(!this) return;
        this.setState({dic});
    }
    genFetchUrl(timeSpan, category) {
        return API_URL+category+'?'+timeSpan.searchText;
    }
    onSelect = (item) => {
        this.props.navigator.push({
            component: RepositoryDetail,
            params:{
                item:item,
                ...this.props,
            }
        });
    }
    onRefresh = () => {
        this.loadData(this.props.timeSpan);
    }
    renderRow(data){
        return <TrendingCell
            onSelect={(() => this.onSelect(data))}
            id={data.id}
            data={data}
        />;
    }
    render(){
        // console.log(this.state.dataSource);
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                enableEmptySections = {true}
                refreshControl={
                    <RefreshControl     // 为其添加下拉刷新的功能
                        refreshing={this.state.isLoading}  // 是否应该在刷新时显示指示器
                        onRefresh={()=>this.onRefresh()}
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
