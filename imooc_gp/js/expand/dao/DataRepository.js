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
export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending', flag_my: 'flag_my'};

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
            if(this.flag !== FLAG_STORAGE.flag_trending) {
                // popular 模块直接从github API获取数据
                fetch(url)
                    .then(response=>response.json())  // 将文本解析为json
                    .then(responseData=>{
                        // if(!result) {
                        //     reject(new Error('responseData is null'));
                        //     return;
                        // }
                        // // console.log(result);
                        // resolve(result.items);
                        // this.saveRespository(url, result.items);
                        // DeviceEventEmitter.emit('showToast', '获取网络数据');
                        if(this.flag===FLAG_STORAGE.flag_my&&responseData){
                            this.saveRespository(url, responseData);
                            resolve(responseData);
                        }else if (responseData&&responseData.items) {
                            this.saveRespository(url, responseData.items);
                            resolve(responseData.items);
                        }else{
                            reject(new Error('responseData is null'));
                        }
                    })
                    .catch(error=>{
                        reject(error);
                    });
            } else {
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
        let wrapData;
        if(this.flag === FLAG_STORAGE.flag_my) {
            wrapData = {
                item: items,
                update_date: new Date().getTime(),
            };
        }else{
            wrapData = {
                items: items,
                update_date: new Date().getTime(),
            };
        }
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
    }

  
}
