const mongoose = require('mongoose');

mongoose.Promise = global.Promise

// 校车定位系统的数据集合
const ArticleSchema = {
	// 用户名称
	articleTitle: { 
		type: String, 
		default: '' 
	},
  // 发文时间
  sendTime: { 
    type: String, 
    default: '' 
  },
  // 图片
	picUrl: {
    type: String,
    default: ''
  },
  // 文本
  content: {
  	type: String,
  	default: ''
  },
  islike: {
    type: Number,
    default: 0
  },
  message: [{
    createTime: {
      type: String,
      default: ''
    },
    messageText: {
      type: String,
      default: '',
    },
    byWho: {
      type: String,
      default: ''
    }
  }]
};

const Article = mongoose.model('article', ArticleSchema);


module.exports = Article;