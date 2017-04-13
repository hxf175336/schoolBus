const format = (date, fmt) => {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - (RegExp.$1.length)));
  }
  for (let key in o) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1 ?
            (o[key]) : ("00" + o[key]).substr(("" + o[key]).length)));
    }
  }
  return fmt;
}
module.exports = {
  format: format
}