// 功能函数集合
export const vertifyPhone = (phoneNumber) => { //手机号码验证
  if (!phoneNumber) return false;
  const pattern=/^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
  return pattern.test(phoneNumber) ? true : false
}
// 密码长度判断
export const vertifyPassword = (passWord) => {
	return passWord.length >= 6 ? true : false
}
//用户名验证
export const vertifyUser = (userName) => {
	return (userName.length >= 3 && userName.length <= 16 ) ? true : false
}
// 获取cookie
export const getCookie = (name) => {
   	let arr = [],
        reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    return arr ? unescape(arr[2]) : null ;
}