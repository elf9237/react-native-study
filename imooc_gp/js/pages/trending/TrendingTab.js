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
import Popover from '../../common/Popover';
import TimeSpan from '../../model/TimeSpan';

import ProjectModel from '../../model/ProjectModel';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import Utils from '../../util/Utils';
import ActionsUtils from '../../util/ActionsUtils';
const API_URL='https://github.com/trending/';
var timeSpanTextArray = [
    new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'),
    new TimeSpan('本 月', 'since=monthly'),
];

const dataRepository=new DataRepository(FLAG_STORAGE.flag_trending);
export default class TrendingTab extends Component{
    constructor(props){
        super(props);
        // 类初始化后才能在自定义函数方法中调用
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:true,
            favoriteKeys: [],
        };
    }
    componentDidMount(){
        this.loadData(this.props.timeSpan, true);
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_trending', ()=>{
            this.isFavoriteChanged = true;
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.timeSpan !== this.props.timeSpan) {
            this.loadData(nextProps.timeSpan, true);
        }else if(this.isFavoriteChanged) {
            this.isFavoriteChanged = false;
            this._getFavoriteKeys();
        }
    }
    componentWillUnmount() {
        if(this.listener){
            this.listener.remove();  //组件卸载的时候移除监听器
        }
    }
    loadData(timeSpan, isRefresh){
        this.setState({
            isLoading:true
        });
        let url = this.genFetchUrl(timeSpan, this.props.tabLabel);
        // console.log('url');
        // console.log(url);
        dataRepository
            .fetchRespository(url)
            .then(result=>{
                this.items = result && result.items ? result.items: result ? result : [];
                // this.setState({
                //     dataSource:this.state.dataSource.cloneWithRows(items),
                //     isLoading:false,
                // });
                this._getFavoriteKeys();
                if (!this.items|| isRefresh && result && result.update_date && !Utils.checkData(result.update_date)) {
                    DeviceEventEmitter.emit('showToast', '数据已过时');
                    return dataRepository.fetchNetRepository(url);
                } else {
                    DeviceEventEmitter.emit('showToast', '获取缓存数据');
                }
            })
            .then(items => {
                if(!items || items.length === 0)return;
                // this.setState({
                //     dataSource:this.state.dataSource.cloneWithRows(items),
                //     isLoading:false,
                // });
                this.items = items ;
                this._getFavoriteKeys();
                DeviceEventEmitter.emit('showToast', '获取网络数据');
            })
            .catch(error=>{
                console.log(error);
                this.setState({
                    isLoading: false,
                    result:JSON.stringify(error)  //将对象解析成字符串 JSON.parse() 和 JSON.stringify()
                });
            });
    }
    _getFavoriteKeys = () => {
        this.favoriteDao.getFavoriteKeys()
            .then(keys => {
                // console.log(keys);
                if(keys){
                    this.setState({favoriteKeys:keys});
                }
                this._flushFavoriteState();
            })
            .catch( e => {
                this._flushFavoriteState();
            });
    }
    /**
     * 更新Project Item Favorite的状态
     */
    _flushFavoriteState = () => {
        let projectModels = [];
        let items = this.items;
        for(var i =0, len = items.length; i< len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(projectModels),
        });
        // console.log(this.state.dataSource);
    }
    _updateState = (dic) => {
        if(!this) return;
        this.setState({dic});
    }
    genFetchUrl(timeSpan, category) {
        return API_URL+category+'?'+timeSpan.searchText;
    }
    /**
     * favoriteIcon 的单击回调函数
     * @param item 
     * @param isFavorite
     */

    // _onFavorite = (item, isFavorite) => {
    //     if(isFavorite) {
    //         this.favoriteDao.saveFavoriteItem(item.fullName, JSON.stringify(item));
    //     }else{
    //         this.favoriteDao.removeFavoriteItem(item.fullName);
    //     }
    // }
    // onSelectRepository = (projectModel) => {
    //     var item = projectModel.item;
    //     this.props.navigator.push({
    //         title: item.fullName,
    //         component: RepositoryDetail,
    //         params:{
    //             projectModel:projectModel,
    //             parentComponent: this,
    //             flag:FLAG_STORAGE.flag_trending,
    //             ...this.props,
    //         }
    //     });
    // }
    onRefresh = () => {
        this.loadData(this.props.timeSpan, true);
    }
    renderRow(projectModel){
        return (
            <TrendingCell
                onSelect={() => ActionsUtils.onSelectRepository({
                    projectModel:projectModel,
                    flag:FLAG_STORAGE.flag_trending,
                    ...this.props,
                })}
                key={projectModel.item.fullName}
                projectModel={projectModel}
                onFavorite={(item, isFavorite) => ActionsUtils._onFavorite(this.favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
            />
        );
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