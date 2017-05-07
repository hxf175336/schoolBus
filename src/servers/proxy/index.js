const SchoolBus = require('../model/schema.js');
const Article = require('../model/article.js')

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
// 查询司机的ip
exports.adminlogin = async(param) => {
	return await SchoolBus.findOne({
		'userName': param.userName,
		'passWord': param.passWord,
		'userType': param.type
	})
}
// 查询文章并分页
exports.findArticle = async(param) => {
	return await Article.find().skip(param.skip).limit(param.pageSize).sort({sendTime: -1});
}
// 查询文章并分页
exports.findOneArticle = async(param) => {
	return await Article.findOne({
		_id: param.articleId
	});
}

//设置真正用户名
exports.setTrueName = async(param) => {
	return await SchoolBus.update({
		userName: param.userName
	}, {
		$set: {
			trueName: param.trueName
		}
	});
}

//设置生日
exports.setBirthDay = async(param) => {
	return await SchoolBus.update({
		userName: param.userName
	}, {
		$set: {
			birthDay: param.birthDay
		}
	});
}

// 得到点赞数
exports.getIslike = async(id) => {
	return await Article.findOne({
		_id: id
	});
}

// 点赞
exports.setIslike = async(param) => {
	return await Article.update({
		_id: param.articleId
	}, {
		$set: {
			islike: param.islike
		}
	});
}

// 留言
exports.setMessage = async(param) => {
	return await Article.update({
		_id: param.articleId
	}, {
		$push: {
			message: {
				createTime: param.createTime,
				messageText: param.messageText,
				byWho: param.byWho
			}
		},
	})
}

exports.modifyPhone = async(param) => {
	return await SchoolBus.update({
		userName: param.userName
	}, {
		$set: {
			phoneNumber: param.newPhone
		}
	});
}

exports.modifyUserName = async(param) => {
	return await SchoolBus.update({
		userName: param.userName
	}, {
		$set: {
			userName: param.newUserName
		}
	});
}