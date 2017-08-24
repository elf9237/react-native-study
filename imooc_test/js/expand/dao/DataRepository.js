/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 网络请求数据方法
 */
export default class DataRepository{
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json())  // 将文本解析为json
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }
}
