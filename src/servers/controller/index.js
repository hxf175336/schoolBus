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
		let userIp = req.connection.remoteAddress;
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
						res.cookie('userName', req.body.userName, {
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
			});
		let isExits = await proxyFindObject.getUserByPhone(req.body.phoneNumber);
		console.log(isExits);
		if (isExits != null) {
			result = {
				'code': 9999,
				'status': 'failed',
				'message': '手机号已注册,请登录'
			};
			res.json(result);
		} else {
			setUser.save(function(err) {
				if (err) {
					result = {
						'code': 9999,
						'status': 'failed',
						'message': '写入数据库失败'
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

	},
	getUserByUserName: async(req, res) => {
		let isExits, result,
			param = req.body;
		isExits = await proxyFindObject.getUserRechargeList();
	},
	
}

module.exports = controller