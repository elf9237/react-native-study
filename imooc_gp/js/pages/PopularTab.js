import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
    Text,
    FlatList,
} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import FavoriteDao from '../expand/dao/FavoriteDao';
import Utils from '../util/Utils';
import ActionsUtils from '../util/ActionsUtils';
import RepositoryDetail from './RepositoryDetail';
import ProjectModel from '../model/ProjectModel';
import PropTypes from 'prop-types';

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&page,per_page,sort,order';


export default class PopularTab extends React.Component{
    constructor(props){
        super(props);
        // 类初始化后才能在自定义函数方法中调用
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_popular);
        this.isFavoriteChanged = false; //初始化收藏状态
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:true,
            favoriteKeys: [],
        };
    }
    componentWillMount() {
        // this.loadData();
        // console.log(this.state.dataSource);
    }
    componentDidMount(){
        // console.log(this.state.dataSource);
        this.loadData();
        this.listener = DeviceEventEmitter.addListener('favoriteChanged_popular', ()=>{
            this.isFavoriteChanged = true;
        });
    }
    componentWillReceiveProps(nextProps) {
        if(this.isFavoriteChanged) {
            this.isFavoriteChanged = false;
            this._getFavoriteKeys();
        }
    }

    componentWillUnmount() {
        if(this.listener){
            this.listener.remove();  //组件卸载的时候移除监听器
        }
    }
    /**
     * 更新Project Item Favorite的状态
     */
    _flushFavoriteState = () => {
        let projectModels = [];
        let items = this.items;
        // console.log(this.state.favoriteKeys);
        for(var i =0, len = items.length; i< len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(projectModels),
        });
        // console.log(this.state.dataSource);
    }
    _updateState(dic){
        if(!this)return;
        this.setState({dic});
    }
    _getDateSource = (projectModels) => {
        this.setState({
            dataSource:projectModels,
            isLoading: false,
        });
    }
    _getFavoriteKeys = () => {
        this.favoriteDao.getFavoriteKeys()
            .then(keys => {
                if(keys){
                    // console.log(keys);
                    this.setState({favoriteKeys:keys});
                }
                this._flushFavoriteState();
            })
            .catch( e => {
                this._flushFavoriteState();
            });
    }
    loadData(){
        this.setState({
            isLoading:true
        });
        let url = this.genFetchUrl(this.props.tabLabel);
        this.dataRepository
            .fetchRespository(url)
            .then(result=>{
                this.items = result && result.items ? result.items: result ? result : [];
                // this.setState({
                //     dataSource:this.state.dataSource.cloneWithRows(items),
                //     isLoading:false,
                // });

                //this._flushFavoriteState();
                this._getFavoriteKeys();
                if (result && result.update_date && !Utils.checkData(result.update_date)) {
                    DeviceEventEmitter.emit('showToast', '数据已过时');
                    return this.dataRepository.fetchNetRepository(url);
                } else {
                    DeviceEventEmitter.emit('showToast', '获取缓存数据');
                }
            })
            .then(items => {
                if(!items || items.length === 0)return;
                this.items = items;
                //this._flushFavoriteState();
                // this.setState({
                //     dataSource:this.state.dataSource.cloneWithRows(items),
                //     isLoading:false,
                // });
                this._getFavoriteKeys();
                DeviceEventEmitter.emit('showToast', '获取网络数据');
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)  //将对象解析成字符串 JSON.parse() 和 JSON.stringify()
                });
            });
    }
    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    /**
     * favoriteIcon 的单击回调函数
     * @param item 
     * @param isFavorite
     */

    // _onFavorite = (item, isFavorite) => {
    //     console.log(isFavorite);
    //     if(isFavorite) {
    //         favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item));
    //     }else{
    //         favoriteDao.removeFavoriteItem(item.id.toString());
    //     }
    //     //this._getFavoriteKeys();
    // }
    // onSelectRepository = (projectModel) => {
    //     var item = projectModel.item;
    //     this.props.navigator.push({
    //         title: item.full_name,
    //         component: RepositoryDetail,
    //         params:{
    //             projectModel:projectModel,
    //             parentComponent: this,
    //             flag:FLAG_STORAGE.flag_popular,
    //             ...this.props,
    //         }
    //     });
    // }
    renderRow = (projectModel) => {
        return (
            <RepositoryCell
                onSelect={() => ActionsUtils.onSelectRepository({
                    projectModel: projectModel,
                    flag:FLAG_STORAGE.flag_popular,
                    ...this.props,
                })}
                key={projectModel.item.id}
                projectModel={projectModel}
                onFavorite={(item, isFavorite) => ActionsUtils._onFavorite(this.favoriteDao, item, isFavorite)}
            />
        );
    }

    // _keyExtractor = (item, index) => item.id;

    render(){
        // console.log('this.state.dataSource');
        // console.log(this.state.dataSource);
        // console.log(typeof this.state.dataSource);
        return (
            <View style={styles.container}>
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
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        height:900,
    }
});