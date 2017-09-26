import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import DataRepository, {FLAG_STORAGE} from '../../expand/dao/DataRepository';
import GitHubTrending from 'GitHubTrending';
const KEY='text';
const URL = 'https://github.com/trending/';
export default class TrendingPageTest extends Component{
    // 初始化构造函数
    constructor(props){
        super(props);
        // this.trending = new GitHubTrending();
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            result: '',
        }
    }
    onLoad = () => {
        const url = URL + this.text;
        this.dataRepository.fetchRespository(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result),
                });
            })
            .catch(e => {
                this.setState({
                    result: JSON.stringify(e),
                });
            })
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar title={'GitHubTrending的使用'}
                    statusBar={{
                        backgroundColor:'#EE6363'
                    }}
                    style={{
                        backgroundColor:'#2196F3'
                    }}
                />
                <TextInput
                    style={{borderWidth:1,height:40,margin:5}}
                    onChangeText={text=>this.text=text}
                ></TextInput>
                <View style={{flexDirection:'column'}}>
                    <Text
                        style={styles.tips}
                        onPress={()=>this.onLoad()}
                    >
                    加载数据
                    </Text>
                    <Text>{this.state.result}</Text>
                </View>
                {/* <Toast ref={toast=>this.toast=toast} /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    tips:{
        fontSize:29,
        margin:5
    }
});
