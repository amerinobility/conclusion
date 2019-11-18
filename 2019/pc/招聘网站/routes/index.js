const express = require('express');
const router = express.Router();
const handler = require('./users');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* GET home page. */
router
    .get('/', handler.main)
    .get('/love.html', handler.love)
    .get('/native', handler.main1)
    .get('/GUI.html', handler.index)
    .get('/main.html', handler.main)
    .get('/userLogin.html', handler.userLogin)
    .get('/companyLogin.html', handler.companyLogin)
    .get('/person', handler.person)
    .get('/administrator', handler.administrator)
    .get('/company', handler.company)
    .get('/recruitment', handler.recruitment)
    .get('/personResume', handler.personResume)
    .get('/content', handler.content)
    .get('/communication', handler.communication)
    .get('/findResume', handler.findResume)
    .get('/notice', handler.notice)//公告
    .post('/updataNotice', handler.updataNotice)//公告
    .get('/findPersonResume', handler.findPersonResume)//更新公告
    .get('/internet', handler.internet)//互联网前百强
    .get('/house', handler.house)//房地产前百强
    .get('/money', handler.money)//金融前百强
    .get('/myRelease', handler.myRelease)//我的发布
    .get('/userAccept', handler.userAccept)//用户投递
    .get('/sendResume', handler.sendResume)//用户投递
    .get('/userCollection', handler.userCollection)//用户收藏
    .get('/send', handler.send)//查看投递
    .get('/collection', handler.collection)//查看收藏
    .get('/deleteSend', handler.deleteSend)//用户删除投递
    .get('/deleteCollection', handler.deleteCollection)//用户删除收藏
    .get('/updataStatus', handler.updataStatus)//更新用户状态    
    .get('/deleteCommunication', handler.deleteCommunication)//管理员删除信息
    .get('/ajax', handler.ajax) //标签搜索
    .get('/removeUser', handler.removeUser)//删除用户
    .get('/selectUser', handler.selectUser)//查询用户
    .get('/findPerson', handler.findPerson)//查询个人资料
    .post('/updataUser', handler.updataUser)//修改用户
    .post('/releaseWoke', handler.releaseWoke)//发布职位
    .get('/removeWoke', handler.removeWoke)//删除职位
    .post('/resume', handler.resume) //生成简历
    .get('/selectResume',handler.selectResume)//查询简历
    .get('/removeResume',handler.removeResume)//删除简历
    .get('/updataResume',handler.updataResume)//改简历
    .get('/position', handler.position)//岗位标签
    .get('/label', handler.label) //城市标签
    .get('/labelSelect', handler.labelSelect) //搜索列表
    .get('/selectSkin', handler.selectSkin)  //联合搜索
    .get('/typeSkin', handler.typeSkin)  //theme搜索
    .get('/upload', handler.upload)  //theme搜索
module.exports = router;

