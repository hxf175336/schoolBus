const formidable=require('formidable'),
	fs = require('fs'),
	path = require('path'),
	util = require('util'),
	Article = require('../model/article.js'),
	utils = require('./utils.js');

module.exports = {
	upload: async(req, res) => {
		let form = new formidable.IncomingForm();
	    form.uploadDir = path.join('./public/tmp');   //文件保存的临时目录为当前项目下的tmp文件夹
	    form.keepExtensions = true;        //使用文件的原扩展名
	    form.parse(req, (err, fields, file) => {
	        let filePath = '';
	        
	        console.log(file);
	        //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。
	        if(file.filepath){
	            filePath = file.filepath.path;
	        } else {
	            for(var key in file){
	                if( file[key].path && filePath==='' ){
	                    filePath = file[key].path;
	                    break;
	                }
	            }

	        }
	        //文件移动的目录文件夹，不存在时创建目标文件夹
	        let targetDir = path.join('./public/upload');
	        if (!fs.existsSync(targetDir)) fs.mkdir(targetDir);
	   
	        let fileExt = filePath.substring(filePath.lastIndexOf('.'));
	        //判断文件类型是否允许上传
	        if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
	            let err = new Error('此文件类型不允许上传');
	            console.log(err);
	            res.json({
	            	code: 999,
	            	status: 'failed',
	            	message: err
	            });
	        } else {
	        	console.log(fileExt);
	            //以当前时间戳对上传文件进行重命名
	            let fileName = new Date().getTime() + fileExt,
	       			targetFile = path.join(targetDir, fileName),
	            	fileUrl = '';
	            //移动文件
	            fs.rename(filePath, targetFile, function (err) {
	                if (err) {
	                    console.log(err)
	                } else {
	                    //上传成功，返回文件的相对路径
	                    fileUrl = '/upload/' + fileName;
	                    sendTime = utils.format(new Date(), 'yyyy-MM-dd hh-mm-ss');
	                    
	                   	let article = new Article({
							articleTitle: fields.title,
							sendTime: sendTime,
							picUrl: fileUrl,
							content: fields.content
						});
						article.save((err) => {
							if (err) {
		                   		res.json({
		                   			code: 0,
		                   			status: 'failed',
		                   			message: 'failed'
		                   		})
		                   	} else {
		                   		res.json({
		                   			code: 0,
		                   			status: 'success',
		                   			message: 'success'
		                   		})
		                   	}
						})
	                }
	            });
	        }
	    })
	}
}