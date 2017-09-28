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
import NavigationBar from '../../common/NavigationBar';
import DataRepository, {FLAG_STORAGE} from '../../expand/dao/DataRepository';
import RepositoryCell from '../../common/RepositoryCell';
import TrendingCell from '../../common/TrendingCell';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import Utils from '../../util/Utils';

import RepositoryDetail from '../RepositoryDetail';
import ProjectModel from '../../model/ProjectModel';
import PropTypes from 'prop-types';




export default class FavoriteTab extends React.Component{
    constructor(props){
        super(props);
        this.favoriteDao = new FavoriteDao(this.props.flag);
        // 类初始化后才能在自定义函数方法中调用
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_popular);
        this.state={
            result:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:true,
            favoriteKeys: [],
        };
    }
    componentDidMount(){
        // console.log(this.state.dataSource);
        this.loadData();
    }
    componentWillReceiveProps(nextProps) {
        this.loadData();
        console.log(nextProps);
       
    }
    loadData(){
        this.setState({
            isLoading:true
        });
        this.favoriteDao.getAllItems()
            .then(items => {
                var resultData = [];
                for(var i=0,len = items.length;i<len;i++){
                    resultData.push(new ProjectModel(items[i], true));
                }
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(resultData),
                });
            })
            .catch(e => {
                this.setState({
                    isLoading: false,
                });
            });
    }
    onRefresh() {
        this.loadData(true);
    }
    onSelectRepository = (projectModel) => {
        var item = projectModel.item;
        this.props.navigator.push({
            title: item.fullName,
            component: RepositoryDetail,
            params:{
                projectModel:projectModel,
                parentComponent: this,
                flag:this.props.flag,
                ...this.props,
            }
        });
    }

    /**
     * favoriteIcon 的单击回调函数
     * @param item 
     * @param isFavorite
     */

    _onFavorite = (item, isFavorite) => {
        var key = this.props.flag === FLAG_STORAGE.flag_popular ? item.id.toString() :item.fullName;
        if(isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        }else{
            this.favoriteDao.removeFavoriteItem(key);
        }
        //this._getFavoriteKeys();
    }
  
    renderRow = (projectModel) => {
        let CellComponent=this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingCell;
        return (
            <CellComponent
                onSelect={() => this.onSelectRepository(projectModel)}
                key={this.props.flag ===FLAG_STORAGE.flag_popular? projectModel.item.id : projectModel.item.fullName}
                projectModel={projectModel}
                onFavorite={(item, isFavorite) => this._onFavorite(item, isFavorite)}
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
                    enableEmptySections={true} //没有数据的时候需要传递
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