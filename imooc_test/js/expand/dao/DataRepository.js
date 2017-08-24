/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 网络请求数据方法
 */
import {
    AsyncStorage,
} from 'react-native';
export default class DataRepository{
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
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }

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
