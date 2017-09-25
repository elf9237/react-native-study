/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 本地存储数据方法
 */

import {
    AsyncStorage,
} from 'react-native'
import keysData from '../../../res/data/keys.json'
import langageData from '../../../res/data/langs.json'

const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao{
    constructor(flag){
        this.flag= flag;
        this.favoriteKey= FAVORITE_KEY_PREFIX + flag;
    }
    /**
     * 收藏项目。保存收藏的项目
     * @param {*} key 项目id 或者名称
     * @param {*} value 收藏的项目
     * @param {*} callback 
     */
    saveFavoriteItem(key, value, callback) {
        AsyncStorage.setItem(key, value, (error) => {
            if(!error) {
                this.updateFavoriteKeys(key, true);
            }
        });
    }

    /**
     * 取消收藏，移除已经收藏的项目
     * @param {*} key 
     */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error) => {
            if(!error) {
                this.updateFavoriteKeys(key, false);
            }
        });
    }
    /**
     * 更新 Favorite Key 集合
     * @param {*} key 
     * @param {*} isAdd true 添加， false 删除
     */
    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if(!error) {
                // console.log(result);
                var favoriteKeys = [];
                if(result) {
                    favoriteKeys = JSON.parse(result);
                }
                var index = favoriteKeys.indexOf(key);
                if(isAdd) {
                    if (index === -1) favoriteKeys.push(key);
                } else {
                    if( index !== -1) favoriteKeys.splice(index, 1);
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
            }
        });
    }

    /**
     * 获取收藏项目对应的key
     * @returns {Promise}
     */
    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if(!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }
}
