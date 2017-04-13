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
// 获取用户信息
router.post('getUserInfo', (req, res, next) => {
	controller.getUserByUserName(req, res);
})
module.exports = router;
