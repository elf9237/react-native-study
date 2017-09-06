
export default class Utils{
    /**
    * 检查该Item 有没有被收藏过
    * @param {*} item 
    * @param {*} items 
    * @return {boolean}
    */
    static checkFavorite(item, items) {
        for(var i=0,len=items.length;i<len;i++) {
            if(item.id.toString() === items[i]) {
                return true;
            }
        }
        return false;
    }
}
