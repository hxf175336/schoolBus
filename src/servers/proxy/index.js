const SchoolBus = require('../model/schema.js');

 /*  根据手机号查找用户信息  */
exports.getUserByPhone = async(phone) => {
	return await SchoolBus.findOne({
		phoneNumber: phone
	})
}
//根据用户名查询用户信息
exports.getUserByUserName = async(name) => {
	return await SchoolBus.findOne({
		userName: name
	})
}
//login
exports.getUserByUserPassword = async(param) => {
	return await SchoolBus.findOne({
		'userName': param.userName,
		'passWord': param.passWord 
	})
}


