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
import FavoriteDao from '../../expand/dao/FavoriteDao';
import Utils from '../../util/Utils';
import FavoriteTab from './FavoriteTab';
import RepositoryDetail from '../RepositoryDetail';
import ProjectModel from '../../model/ProjectModel';
import PropTypes from 'prop-types';

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&page,per_page,sort,order';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

export default class FavoritePage extends Component{
    constructor(props){
        super(props);
        this.state={
            languages:[]
        };
    }
    componentDidMount(){
    }
    render(){
        // 初始化判断tab个数，为零返回null，大于零加载数据
        let content = <ScrollableTabView
            tabBarBackgroundColor='#2196F3'
            tabBarActiveTextColor='white'
            tabBarInactiveTextColor='white'
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
            renderTabBar={()=><ScrollableTabBar/>}
        >
            <FavoriteTab  tabLabel='最热' flag={FLAG_STORAGE.flag_popular} {...this.props} />
            <FavoriteTab  tabLabel='趋势' flag={FLAG_STORAGE.flag_trending} {...this.props} />
        </ScrollableTabView>;
        return (<View style={styles.container}>
            <NavigationBar
                title={'收藏'}
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

const styles=StyleSheet.create({
    container:{
        flex:1,
        height:900,
    }
});
