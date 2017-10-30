
export default class Utils{
    /**
    * 检查该Item 有没有被收藏过
    * @param {*} item 
    * @param {*} items 
    * @return {boolean}
    */
    static checkFavorite(item, items) {
        for(var i=0,len=items.length;i<len;i++) {
            let id = item.id ? item.id.toString() : item.fullName;
            if(id === items[i]) {
                return true;
            }
        }
        return false;
    }

    /**
 * 判断数据是否过时
 * https://github.com/facebook/react-native
 * @param longTime 数据的时间戳
 * @returns {boolean} true 需要更新， false 不需要更新    
 */
    static checkData(longTime) {
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
