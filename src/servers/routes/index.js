const express = require('express');
const controller = require('../controller/index.js');
const router = express.Router();
// 注册
router.post('/signup', (req, res , next) => {
	controller.setUserMessage(req, res);
});
// 登陆
router.post('/login', (req, res, next) => {
  	controller.login(req, res);
});
// 
router.post('/getRechargeMoney', (req, res, next) => {
  	controller.getRechargeMoney(req, res);
});
// 增加用户信息充值消费记录
router.post('/addRechargeMoney', (req, res, next) => {
	controller.addRechargeMoney(req, res);
})
// 
router.post('/getUserMessage', (req, res, next) => {
	controller.getUserMessage(req, res);
})
router.post('/payForMoney', (req, res, next) => {
	controller.payForMoney(req, res);
})

router.post('/getDriverIp', (req, res, next) => {
	controller.getDriverIp(req, res);
})

router.post('/logout', (req, res, next) => {
	controller.logout(req, res);
})
router.post('/upload', (req, res, next) => {
	controller.upload(req, res);
})

module.exports = router;
