Date.prototype.format = function (mark) {
  var options = {
    "M+": this.getMonth() + 1, //月份 
    "D+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  }
  if (/(Y+)/.test(mark)) {
    mark = mark.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in options)
    if (new RegExp("(" + k + ")").test(mark)) {
      mark = mark.replace(RegExp.$1, (RegExp.$1.length == 1) ?
        (options[k]) :
        (("00" + options[k]).substr(("" + options[k]).length)))
    }
  return mark
}