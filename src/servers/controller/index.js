const mongoose = require('mongoose');
const SchoolBus = require('../model/schema.js');
const util = require('../util/utils.js')

const proxyFindObject = require('../proxy');

// 链接数据库
mongoose.connect("mongodb://127.0.0.1:27017/schoolBus");
// 创建数据集合

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected:' );
});

//控制器
const controller = {
	//login
	login: async(req, res) => {
		// 获取用户的ip
		let userIp = req.body.userIp;
		let isExits = await proxyFindObject.getUserByUserPassword(req.body),
			result = {};

		console.log('----'+isExits);

		if (isExits !== null) {
			SchoolBus.update(
				{
					'userName': req.body.userName,
					'passWord': req.body.passWord
				}, {
					$set: {
						'isOnline': true,
						'userIp': userIp
					}
				},
				(err) => {
					if (err) {
						result = {
							'code': 9999,
							'status': 'failed',
							'message': '写入数据库失败'
						};
						res.json(result);
					} else {
						res.cookie('userName', isExits.userName, {
						    expires: new Date(Date.now() + 2592000000),
						    httpOnly: false
						});
						
						console.log(res.cookie);
						result = {
							'code': 0,
							'status': 'success',
							'message': 'success'
						};
						res.json(result);
					}
				}
			)
		} else {
			result = {
				'code': 9999,
				'status': 'failed',
				'message': '登陆失败，账号或密码不正确！'
			}
			res.json(result);
		}
	},
	
	//注册
	setUserMessage: async(req, res) => {
		let registTime = util.format(new Date(), 'yyyy-MM-dd hh-mm-ss'),
			setUser = new SchoolBus({
				'userName': req.body.userName,
				'registTime': registTime,
				'phoneNumber': req.body.phoneNumber,
				'passWord': req.body.passWord,
				'userType': req.body.type,
				'accountBalance': 0
			});
		let isExitsPhone = await proxyFindObject.getUserByPhone(req.body.phoneNumber),
			isExitsUser = await proxyFindObject.getUserByUserName(req.body.userName);
		if (isExitsPhone != null) {
			result = {
				'code': 9999,
				'status': 'failed',
				'message': '手机号已注册'
			};
			res.json(result);
		} else {
			if (isExitsUser != null) {
				result = {
					'code': 9999,
					'status': 'failed',
					'message': '用户名已注册'
				};
				res.json(result);
			} else {
				setUser.save(function(err) {
				if (err) {
					result = {
						'code': 9999,
						'status': 'failed',
						'message': '数据出错'
					};
					res.json(result);
				} else {
					result = {
						'code': 0,
						'status': 'success',
						'message': 'success'
					};
					res.json(result);
				}
			})
			}
		}
	},
	// 获取充值消费详情
	getRechargeMoney: async(req, res) => {
		let isExits, result, list = [],
			param = req.body;
		isExits = await proxyFindObject.getUserByUserName(param.userName);
		console.log(isExits);
		if (isExits) {
			if (param.type == '0') {
				isExits.expensesRecord.forEach((item) => {
					if (item.consumeType == '0') {
						list.push(item);
					}
				});
			} else if (param.type == '1') {
				isExits.expensesRecord.forEach((item) => {
					if (item.consumeType == '1') {
						list.push(item);
					}
				})
			}
			console.log(list)
			result = {
				'code': 0,
				'status': 'success',
				'message': 'success',
				'list': list
			};
			res.json(result);
		} else {	
			result = {
				'code': 9999,
				'status': 'failed',
				'message': '未检索到数据'
			};
			res.json(result);
		}
	},
	//充值
	addRechargeMoney: async(req, res) => {
		let isExits, 
			result = {}, 
			param = {};
		param = req.body;
		param.updateTime = util.format(new Date(), 'yyyy-MM-dd hh-mm-ss');

		isExits = await proxyFindObject.getUserByUserName(param.userName);

		let accountBalance = Number(isExits.accountBalance) + Number(req.body.consumeMoney),
			updateBalanceParam = {
				userName: req.body.userName,
				accountBalance: accountBalance
			};

		let isSetAccountBalance = await proxyFindObject.setAccountBalance(updateBalanceParam);
		if (isSetAccountBalance) {
			let isAddRechargeMoney = await proxyFindObject.addRechargeMoney(param);
			if (isAddRechargeMoney) {
				result = {
					'code': 0,
					'status': 'success',
					'message': 'success'
				};
			} else {
				result = {
					'code': 9999,
					'status': 'failed',
					'message': '添加纪录出错'
				};
			}

		} else {
			result = {
				'code': 9999,
				'status': 'failed',
				'message': '更新余额出错'
			};
		}
		res.json(result);
	},
	// 获取用户信息
	getUserMessage: async(req, res) => {
		let isExits, result;
		isExits = await proxyFindObject.getUserByUserName(req.body.userName);
		console.log(isExits.userName, isExits.accountBalance)
		if (isExits) {
			result = {
				'code': 0,
				'status': 'success',
				'message': 'success',
				'data': {
					'userName': isExits.userName,
					'accountBalance': isExits.accountBalance,
					'userType': isExits.userType
				}
			};
		} else {
			result = {
				'code': 999,
				'status': 'failed',
				'message': 'user message is error',
			}
		}
		res.json(result);
	},
	// 付款
	payForMoney: async(req, res) => {
		let payMoneyTime = util.format(new Date(), 'yyyy-MM-dd hh-mm-ss'),
			param,
			result = {};
		param = req.body;
		console.log(param);
		param.updateTime = payMoneyTime;
		let isExits = await proxyFindObject.getUserByUserName(param.userName);

		let accountBalance = Number(isExits.accountBalance) - Number(param.consumeMoney),
			updateBalanceParam = {
				userName: param.userName,
				accountBalance: accountBalance
			};

		let isSetAccountBalance = await proxyFindObject.setAccountBalance(updateBalanceParam);
		if (isSetAccountBalance) {
			let isAddRechargeMoney = await proxyFindObject.addRechargeMoney(param);
			if (isAddRechargeMoney) {
				result = {
					'code': 0,
					'status': 'success',
					'message': 'success'
				};
			} else {
				result = {
					'code': 9999,
					'status': 'failed',
					'message': '添加纪录出错'
				};
			}

		} else {
			result = {
				'code': 9999,
				'status': 'failed',
				'message': '更新余额出错'
			};
		}
		res.json(result);
	},
	// 获取校车司机列表
	getDriverIp: async(req, res) => {
		let result = {},
			list = [],
			isExits = await proxyFindObject.getDriverIp(req.body);
		if (isExits) {
			isExits.forEach((item, index) => {
				list.push({
					key: 'bus' + index,
					userIp: item.userIp
				});
			});
			result = {
				code: 0,
				status: 'success',
				message: 'success',
				list: list
			}
		} else {
			result = {
				code: 9999,
				status: 'failed',
				message: '查询失败'
			}
		}
		res.json(result);
	},
	logout: async(req, res) => {

	},
	upload: async(req, res) => {
		
	}
}

module.exports = controller