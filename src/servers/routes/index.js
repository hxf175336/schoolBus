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
// 充值
router.post('/getRechargeMoney', (req, res, next) => {
  	controller.getRechargeMoney(req, res);
});
// 增加用户信息充值消费记录
router.post('/addRechargeMoney', (req, res, next) => {
	controller.addRechargeMoney(req, res);
})
// 获取用户信息
router.post('/getUserMessage', (req, res, next) => {
	controller.getUserMessage(req, res);
})
// 支付
router.post('/payForMoney', (req, res, next) => {
	controller.payForMoney(req, res);
})
// 获取校车司机的ip
router.post('/getDriverIp', (req, res, next) => {
	controller.getDriverIp(req, res);
})
// 退出
router.post('/logout', (req, res, next) => {
	controller.logout(req, res);
})
// 图片上传
router.post('/upload', (req, res, next) => {
	controller.upload(req, res);
})
// 管理员登陆
router.post('/adminlogin', (req, res, next) => {
	controller.adminlogin(req, res);
})
// 获取推送列表
router.post('/getActive', (req, res, next) => {
	controller.getActive(req, res);
})
// 获取单篇文章的详情
router.post('/getOneArticle', (req, res, next) => {
	controller.getOneArticle(req, res);
})

// 设置真正名字
router.post('/setName', (req, res, next) => {
	controller.setTrueName(req, res);
})
// 设置真正名字
router.post('/setBirthDay', (req, res, next) => {
	controller.setBirthDay(req, res);
})
router.post('/setIslike', (req, res, next) => {
	controller.setIslike(req, res);
})
router.post('/setMessage', (req, res, next) => {
	controller.setMessage(req, res);
})
router.post('/modifyUserName', (req, res, next) => {
	controller.modifyUserName(req, res);
})
router.post('/modifyPhone', (req, res, next) => {
	controller.modifyPhone(req, res);
})

module.exports = router;
