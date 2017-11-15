/**
 * Created by Andy on 2017/11/14.
 */
import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import PropTypes from 'prop-types';
import ViewUtils from '../util/ViewUtils';
import GlobalStyles from '../../res/styles/GlobalStyles';
import Toast,{DURATION} from 'react-native-easy-toast';
import FavoriteDao from '../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../expand/dao/DataRepository';
import ProjectModel from '../model/ProjectModel';
import Utils from '../util/Utils';
import ActionsUtils from '../util/ActionsUtils';
import RepositoryCell from '../common/RepositoryCell';

const API_URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&page,per_page,sort,order';

export default class SearchPage extends Component{
    constructor(props){
        super(props);
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.favoriteKeys = [];
        this.state={
            rightButtonText: '搜索',
            isLoading: false, //设置加载标志位
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1,r2) => r1!== r2,
            }),
        };
    }
    genFetchUrl(key) {
        return API_URL + key + QUERY_STR;
    }
    _getFavoriteKeys = () => {
        this.favoriteDao.getFavoriteKeys()
            .then(keys => {
                this.favoriteKeys = keys || [];
                this._flushFavoriteState();
            })
            .catch( e => {
                this._flushFavoriteState();
                console.log(e);
            });
    }
    /**
     * 更新Project Item Favorite的状态
     */
    _flushFavoriteState = () => {
        let projectModels = [];
        let items = this.items;
        // console.log(this.state.favoriteKeys);
        for(var i =0, len = items.length; i< len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.favoriteKeys)));
        }
        this.setState({
            isLoading: false,
            dataSource:this.state.dataSource.cloneWithRows(projectModels),
            rightButtonText: '搜索',
        });
        // console.log(this.state.dataSource);
    }
    loadData = () => {
        this.setState({
            isLoading: true,
        })
        fetch(this.genFetchUrl(this.inputkey))
            .then(response => response.json())
            .then(responseData => {
                if(!this || !responseData || !responseData.items || responseData.items.length ===0){
                    this.toast.show(this.inputKey + '什么都没找到', DURATION.LENGTH_LONG);
                    this.setState({
                        isLoading: false,
                        rightButtonText: '搜索',
                    })
                    return;
                }
                this.items = responseData.items;
                this._getFavoriteKeys();
            }).catch(e => {
                this.setState({
                    isLoading: false,
                    rightButtonText: '搜索',
                });
            });
    }
    componentDidMount(){

    }
    onBackPress = () => {
        this.refs.input.blur();
        this.props.navigator.pop();
    }
    updateState = (dic) => {
        this.setState(dic);
    }
    onRightButtonClick = () => {
        if (this.state.rightButtonText === '搜索') {
            this.setState({
                rightButtonText: '取消',
            });
            this.loadData();
        } else {
            this.setState({
                rightButtonText: '搜索',
                isLoading: false,
            });
        }
    }
    renderNavbar = () => {
        let backButton = ViewUtils.getLeftButton(() => this.onBackPress());
        let inputView = <TextInput
            ref='input'
            style={styles.textInput}
            underlineColorAndroid="transparent"
            onChangeText={
                text => this.inputkey = text
            }
        />;

        let rightButton = <TouchableOpacity
            onPress={
                () => {
                    this.refs.input.blur();
                    this.onRightButtonClick();
                }}>
            <View style={{marginRight: 10}}>
                <Text style={styles.title}>{this.state.rightButtonText}</Text>
            </View>
        </TouchableOpacity>
        return (<View style={{
            backgroundColor: '#2196f3',
            flexDirection: 'row',
            alignItems: 'center',
            height: (Platform.OS === 'ios' ) ? GlobalStyles.nav_bar_height_ios:GlobalStyles.nav_bar_height_android,
        }}>
            {backButton}
            {inputView}
            {rightButton}
        </View>)
    }
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
                onFavorite={(item, isFavorite) => this._onFavorite(item, isFavorite)}
            />
        );
    }
    render(){
        let statusBar = null;
        if(Platform.OS === 'ios'){
            statusBar = <View style={[styles.statusBar, {backgroundColor: '#2196f3'}]} />;
        }
        let listView = <ListView
            dataSource={this.state.dataSource}
            renderRow={(e) => this.renderRow(e) }
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
        return<View style={GlobalStyles.root_container}>
            {statusBar}
            {this.renderNavbar()}
            {listView}
            <Toast ref={toast => this.toast = toast}/>
        </View>;
    }
}

var
    styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        statusBar: {
            height: 20,
        },
        textInput: {
            flex: 1,
            height: (Platform.OS === 'ios' ) ? 30 : 30,
            borderWidth: 1,
            borderColor: 'white',
            alignSelf: 'center',
            paddingLeft: 5,
            marginRight: 10,
            marginLeft: 5,
            borderRadius: 3,
            opacity: .7,
            color: 'white',
            padding: 0,
        },
        title:{
            fontSize: 18,
            color: '#fff',
            fontWeight: '500',
        },
})

