const mongoose = require('mongoose');

mongoose.Promise = global.Promise

// 校车定位系统的数据集合
const schoolBusSchema = {
	// 用户名称
	userName: { 
		type: String, 
		default: '' 
	},
  // 注册时间
  registTime: { 
    type: String, 
    default: '' 
  },
	// 电话号码
  phoneNumber: { 
  	type: String, 
  	default: '' 
  },
  	// 密码
  passWord: { 
  	type: String, 
  	default: '' 
  },
  // 账号余额
  accountBalance: {
  	type: Number,
  	default: 0
  },
  // 用户类型 0: 普通用户 1： 校车司机
  userType: {
  	type: Number,
  	default: 0
  },
  isOnline: {
  	type: Boolean,
  	default: false
  },
  userIp: {
    type: String,
    default: ''
  },
  // 消费记录
	expensesRecord: [{
    // 更新时间
    updateTime: String,
    // 消费类型 0: 消费记录 1：充值记录
    consumeType: String,
    // 消费金额
    consumeMoney: Number
  }]
};

const SchoolBus = mongoose.model('schoolBus',schoolBusSchema);


module.exports = SchoolBus;