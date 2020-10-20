/** 
 * @function external:Array.prototype.remove
 * @description 数组对象移除
 * @param {Number} index 位置索引.
 */
Array.prototype.remove = function(index) {
  this.splice(index, 1);
}

/** 
 * @function external:Array.prototype.insert
 * @description 数组指定位置插入对象
 * @param {Number} index 位置索引.
 * @param {Object} item 对象.
 */
Array.prototype.insert = function (index, item) { 
  this.splice(index, 0, item); 
};

Array.prototype.clear = function () {
  this.splice(0, this.length)
}

Array.prototype.reset = function (...arr) {
  this.clear()
  this.push(...arr)
}
