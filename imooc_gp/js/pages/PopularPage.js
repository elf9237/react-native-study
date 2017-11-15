import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import FavoriteDao from '../expand/dao/FavoriteDao';
import Utils from '../util/Utils';
import PopularTab from './PopularTab';
import RepositoryDetail from './RepositoryDetail';
import ProjectModel from '../model/ProjectModel';
import PropTypes from 'prop-types';
import SearchPage from './SearchPage';

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&page,per_page,sort,order';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

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
    renderRightButton = () => {
        return (<View style={{flexDirection:'row'}}>
            <TouchableOpacity
                onPress={() => {
                    this.props.navigator.push({
                        component: SearchPage,
                        params:{
                            ...this.props
                        }
                    })
                }}
            >
                <View style={{padding:5, marginRight: 8}}>
                    <Image
                        style={{width:24,height:24}}
                        source={require('../../res/images/ic_search_white_48pt.png')}
                    />
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
                    return lan.checked?<PopularTab key={i} tabLabel={lan.name} {...this.props}>{lan.name}</PopularTab>:null;
                })}
            </ScrollableTabView>:null;
        var statusBar={
        }
        let navigationBar =
            <NavigationBar
                title={'最热'}
                statusBar={statusBar}
                rightButton={this.renderRightButton()}
            />;
        return (<View style={styles.container}>
            {navigationBar}
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
