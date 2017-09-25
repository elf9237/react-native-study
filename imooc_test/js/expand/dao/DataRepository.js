/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 网络请求数据方法
 */
import {
    AsyncStorage,
    DeviceEventEmitter,
} from 'react-native';
import GitHubTrending from 'GitHubTrending';
//设立 popular 和trending 模块标识
export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'};
export default class DataRepository{
    constructor(flag) {
        this.flag = flag;
        if(flag === FLAG_STORAGE.flag_trending)this.trending = new GitHubTrending();
    }
    fetchRespository(url) {
        return new Promise((resolve, reject) => {
            // 获取本地数据
            this.fetchLocalRespository(url)
                .then(
                    result => {
                        if (result) {
                            resolve(result);
                        } else {
                            // 获取网络数据
                            this.fetchNetRepository(url)
                                .then(result => { 
                                    resolve(result);
                                })
                                .catch(e => {
                                    reject(e);
                                });
                        }
                    }
                )
                .catch(e => {
                    // 获取网络数据
                    this.fetchNetRepository(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(e => {
                            reject(e);
                        });
                });
        });
    }
    fetchLocalRespository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url,(error, result) =>{
                if(!error) {
                    try{
                        resolve(JSON.parse(result));
                        DeviceEventEmitter.emit('showToast', '获取本地数据');
                    }catch (e){
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            if(this.flag === FLAG_STORAGE.flag_trending) {
                // trending 模块间接通过GithubTrending对象从github获取数据
                this.trending.fetchTrending(url)
                    .then(result => {
                        if(!result){
                            reject(new Error('responseData is null'));
                            return;
                        }
                        this.saveRespository(url, result);
                        resolve(result);
                    });
            } else {
                // popular 模块直接从github API获取数据
                fetch(url)
                    .then(response=>response.json())  // 将文本解析为json
                    .then(result=>{
                        if(!result) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        // console.log(result);
                        resolve(result.items);
                        this.saveRespository(url, result.items);
                        DeviceEventEmitter.emit('showToast', '获取网络数据');
                    })
                    .catch(error=>{
                        reject(error);
                    });
            }
            
        });
    }
    /**
     * 数据重新封装  数据离线存储
     * @param {*} url 
     * @param {*} items 
     * @param {*} callBack 
     */
    saveRespository(url, items, callBack) {
        if(!url || !items) return;
        let wrapData = {
            items: items,
            update_date: new Date().getTime(),
        };
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
    }

    /**
 * 判断数据是否过时
 * https://github.com/facebook/react-native
 * @param longTime 数据的时间戳
 * @returns {boolean}
 */
    checkData(longTime) {
        // return false;
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if(cDate.getFullYear() !== tDate.getFullYear()) return false;
        if(cDate.getMonth() !== tDate.getMonth()) return false;
        if(cDate.getDay() !== tDate.getDay()) return false;
        if(cDate.getHours() - tDate.getHours > 4) return false;
        return true;
    }
}
