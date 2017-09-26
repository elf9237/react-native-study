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

import TrendingTab from './TrendingTab';
import RepositoryDetail from '../RepositoryDetail';
import Popover from '../../common/Popover';
import TimeSpan from '../../model/TimeSpan';

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
          });
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
                    </TouchableOpacity>);
                })
            }
        </Popover>;
        const navigationBar = <NavigationBar
            titleView={this._renderTitleView()}
            style={{
                backgroundColor:'#EE6363'
            }}
            statusBar={{
                backgroundColor:'#2196F3'
            }}
        ></NavigationBar>;
        return (<View style={styles.container}>
            {navigationBar}
            {content}
            {timeSpanView}
        </View>);
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        height:900,
    }
});
