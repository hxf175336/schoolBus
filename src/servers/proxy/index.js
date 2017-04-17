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
// 添加消费记录
exports.addRechargeMoney = async(param) => {
	return await SchoolBus.update({
		'userName': param.userName
	}, {
		$push: {
			expensesRecord: {
				updateTime: param.updateTime,
				consumeType: param.type,
				consumeMoney: param.consumeMoney
			}
		},
	})
}
// 修改余额
exports.setAccountBalance = async(param) => {
	return await SchoolBus.update({
		'userName': param.userName
	}, {
		$set: {
			accountBalance: param.accountBalance
		}
	})
}
//删除消费记录
exports.deleteRechargeMoney = async(param) => {
	return await SchoolBus.update({
		'userName': param.userName
	}, {
		$pull: {
			expensesRecord: {
				updateTime: param.updateTime
			}
		}
	})
}
// 查询司机的ip
exports.getDriverIp = async(param) => {
	return await SchoolBus.find({
		'userType': param.userType,
		'isOnline': true
	})
}