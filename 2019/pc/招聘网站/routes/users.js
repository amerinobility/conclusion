var express = require('express');
var router = express.Router();
var mysql=require('../mysql');
/* GET users listing. */
exports.index=function(req, res, next) {
  res.render('GUI.html', { title: 'Express' });
};
exports.love=function(req, res, next) {
  res.render('love.html', { title: 'Express' });
};
exports.upload=function(req, res, next) {
    res.send({
      result:'result'
  });
  };
exports.main=function(req, res, next) {
  var name=req.session.name;
  res.render('main.html', { title: name });
};
exports.main1=function(req, res, next) {
    res.render('index1.html', { title: "name" });
  };
exports.error=function(req, res, next) {
  res.render('404.html', { title: 'Express' });
};
exports.userLogin=function(req, res, next) {
  res.render('userLogin.html', { title: '' });
};
exports.companyLogin=function(req, res, next) {
    res.render('companyLogin.html', { title: '' });
};
exports.administrator=function(req, res, next) {
    res.render('administrator.html', { title: '' });
};
exports.company=function(req, res, next) {

    res.render('company.html', { title: '' });
};
exports.person=function(req, res, next) {
    res.render('person.html', { title: '' });
};
exports.recruitment=function(req, res, next) {
    res.render('recruitment.html', { title: '' });
};
exports.personResume=function(req, res, next) {
    res.render('personResume.html', { title: '' });
};
exports.content=function(req, res, next) {
    res.render('content.html', { title: '' });
};
exports.updataUser=function(req, res, next) {
  var username=req.body.username;
  var updataUsername=req.body.updataUsername;
  var password=req.body.password;
  var name=req.body.name;
  var city=req.body.city;
  var ranking=req.body.ranking;
  var type=req.body.type;
  var content=req.body.content;
  mysql.updataUser(username,updataUsername,password,name,city,ranking,type,content).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.removeUser=function(req, res, next) {
  var username=req.body.username;
  var updataUsername=req.body.updataUsername;
  var password=req.body.password;
  var name=req.body.name;
  mysql.selectUser(username).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.findPerson=function(req, res, next) {
  var username=req.query.username;
  mysql.findPerson(username).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.deleteSend=function(req, res, next) {
  var companyID=req.query.companyID;
  var positionID=req.query.positionID;
  mysql.deleteSend(companyID,positionID).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.deleteCommunication=function(req, res, next) {
  var first=req.query.first;
  var second=req.query.second;
  var num=req.query.num;
  mysql.deleteCommunication(num,first,second).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.deleteCollection=function(req, res, next) {
  var companyID=req.query.companyID;
  var positionID=req.query.positionID;
  mysql.deleteCollection(companyID,positionID).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.updataStatus=function(req, res, next) {
  var companyID=req.query.companyID;
  var positionID=req.query.positionID;
  var content=req.query.content || "";
  console.log(positionID+"]]]"+positionID)
  mysql.updataStatus(companyID,positionID,content).then(function(result){
       res.send({
                title:'',result:result,companyID:companyID,positionID:positionID
            });
    });
};
exports.communication=function(req, res, next) {
  var companyID=req.query.companyID;
  mysql.communication(companyID).then(function(result){
                res.render('communication.html', { title: '' ,result:result})
    });
};
exports.findResume=function(req, res, next) {
  var username=req.query.value;
  var companyID=req.query.usernameID;
  var positionID=req.query.positionID;
  mysql.findResume(username).then(function(result){
                res.render('findResume.html', { title: '' ,result:result,companyID:companyID,positionID:positionID})
    });
};
exports.findPersonResume=function(req, res, next) {
  var usernameID=req.session.usernameID
  mysql.findResume(usernameID).then(function(result){
                res.send({title: '' ,result:result})
    });
};
exports.collection=function(req, res, next) {
  var usernameID=req.session.usernameID;
  var num=[];
  var number=parseInt(req.query.number) ||0;
  var maxNumber=0;  
    mysql.collection(usernameID).then(function(result){
      maxNumber=Math.floor(result.length/10);
      if (result.length>10) {
        if (number>maxNumber) {
          number=maxNumber;
        }
        for (var i =number*10; i <(number+1)*10; i++) {
        num.push(result[i]);
      }
 res.send({
            result:num,number:number,maxNumber:maxNumber
        });      }else{
 res.send({
            result:result,number:number,maxNumber:maxNumber
        });      }
       
    });
};
exports.send=function(req, res, next) {
  var usernameID=req.session.usernameID;
  var num=[];
  var number=parseInt(req.query.number) ||0;
  var maxNumber=0;  
    mysql.send(usernameID).then(function(result){
      maxNumber=Math.floor(result.length/10);
      if (result.length>10) {
        if (number>maxNumber) {
          number=maxNumber;
        }
        for (var i =number*10; i <(number+1)*10; i++) {
        num.push(result[i]);
      }
 res.send({
            result:num,number:number,maxNumber:maxNumber
        });      }else{
 res.send({
            result:result,number:number,maxNumber:maxNumber
        });      }
       
    });
};
exports.sendResume=function(req, res, next) {
  var companyID=req.query.companyID;
  var positionID=req.query.positionID;
  var usernameID=req.session.usernameID;
  mysql.sendResume(usernameID,companyID,positionID).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.userCollection=function(req, res, next) {
  var companyID=req.query.companyID;
  var positionID=req.query.positionID;
  var usernameID=req.session.usernameID;
  mysql.userCollection(usernameID,companyID,positionID).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.userAccept=function(req, res, next) {
  var companyID=req.session.companyID;
  mysql.userAccept(companyID).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.internet=function(req, res, next) {
  mysql.internet().then(function(result){
       res.send({
                result:result
            });
    });
};
exports.house=function(req, res, next) {
  mysql.house().then(function(result){
       res.send({
                result:result
            });
    });
};
exports.money=function(req, res, next) {
  mysql.money().then(function(result){
       res.send({
                result:result
            });
    });
};
exports.myRelease=function(req, res, next) {
  var companyID=req.session.companyID;
  mysql.myRelease(companyID).then(function(result){
       res.send({
                result:result
            });
    });
};
exports.ajax=function(req, res, next) {
  var value=req.query.value||"";
  var number=req.query.number;
  var big=0;
  mysql.ajax(value).then(function(result){
      var name=req.session.name;
      var num=[];
      maxNumber=Math.floor(result.length/10);
      if (result.length>10) {
        if (number>maxNumber) {
          number=maxNumber;
        }
        for (var i =number*10; i <(number+1)*10; i++) {
        num.push(result[i]);
      }
       res.render('ajax.html', {title:name ,result:num,number:number,maxNumber:maxNumber,value:value});
      }else{
        res.render('ajax.html', {title:name ,result:result,number:number,maxNumber:maxNumber});
      }
  
    });
};
exports.position=function(req, res, next) {
  mysql.position().then(function(result){
            res.send({
                result:result
            });
    });
};
exports.label=function(req, res, next) {
    mysql.label().then(function(result){
        res.send({
            result:result
        });
    });
};
exports.notice=function(req, res, next) {
    mysql.notice().then(function(result){
        res.send({
            result:result
        });
    });
};
exports.updataNotice=function(req, res, next) {
  var title=req.body.title||"";
  var content=req.body.content||"";
  var time=req.body.time||"";
    mysql.updataNotice(title,content,time).then(function(result){
        res.send({
            result:result
        });
    });
};
exports.releaseWoke=function(req, res, next) {
  var position=req.body.position||"";
    var pay=req.body.pay||"";
    var education=req.body.education||"";
    var number=req.body.number||"";
    var place=req.body.place||"";
    var ranking=req.body.ranking||"";
    var type=req.body.type||"";
    var username=req.body.username||"";
    var required=req.body.required ||"";
  mysql.releaseWoke(position,pay,education,number,place,ranking,type,username,required).then(function(result){
            res.send({
                result:result
            });
    });
};
exports.removeWoke=function(req, res, next) {
  var position=req.body.position||"";
    var pay=req.body.pay||"";
    var education=req.body.education||"";
    var number=req.body.number||"";
    var place=req.body.place||"";
    var ranking=req.body.ranking||"";
    var type=req.body.type||"";
    var username=req.body.username||"";
    var required=req.body.required ||"";
  mysql.removeWoke(position,pay,education,number,place,ranking,type,username,required).then(function(result){
            res.send({
                result:result
            });
    });
};
exports.resume=function(req, res, next) {
  var name=req.body.name||"";
    var sex=req.body.sex||"";
    var year=parseInt(req.body.year)||0;
    var phone=parseInt(req.body.phone)||0;
    var work=req.body.work||"";
    var type=req.body.type||"";
    var content=req.body.content||"";
    var username=req.body.username||"";
    var education=req.body.education ||"";
  mysql.resume(name,sex,year,phone,work,type,education,username,content).then(function(result){
            res.send({
                result:result
            });
    });
};

exports.selectResume=function(req, res, next) {
  var num=[];
  var number=parseInt(req.query.number) ||0;
  var maxNumber=0;  
    mysql.selectResume().then(function(result){
      maxNumber=Math.floor(result.length/10);
      if (result.length>10) {
        if (number>maxNumber) {
          number=maxNumber;
        }
        for (var i =number*10; i <(number+1)*10; i++) {
        num.push(result[i]);
      }
 res.send({
            result:num,number:number,maxNumber:maxNumber
        });      }else{
 res.send({
            result:result,number:number,maxNumber:maxNumber
        });      }
       
    });
};
exports.selectUser=function(req, res, next) {
  var num=req.query.num;
  var all=[];
  var number=parseInt(req.query.number) ||0;
  var maxNumber=0;  
    mysql.selectUser(num).then(function(result){
      maxNumber=Math.floor(result.length/10);
      if (result.length>10) {
        if (number>maxNumber) {
          number=maxNumber;
        }
        for (var i =number*10; i <(number+1)*10; i++) {
        all.push(result[i]);
      }
 res.send({
            result:all,number:number,maxNumber:maxNumber
        });      }else{
 res.send({
            result:result,number:number,maxNumber:maxNumber
        });      }
       
    });
};
exports.removeResume=function(req, res, next) {
  var name=req.body.name||"";
  mysql.removeResume(name,sex,year,phone,work,type,education,username,content).then(function(result){
            res.send({
                result:result
            });
    });
};
exports.updataResume=function(req, res, next) {
  var name=req.body.name||"";
    var sex=req.body.sex||"";
    var year=parseInt(req.body.year)||0;
    var phone=parseInt(req.body.phone)||0;
    var work=req.body.work||"";
    var type=req.body.type||"";
    var content=req.body.content||"";
    var username=req.body.username||"";
    var education=req.body.education ||"";
  mysql.resume(name,sex,year,phone,work,type,education,username,content).then(function(result){
            res.send({
                result:result
            });
    });
};
exports.labelSelect=function(req, res, next) {
  var value=req.query.value||"";
  mysql.labelSelect(value).then(function(result){
            res.send({
                result:result
            });
    });
};
exports.selectSkin=function(req, res, next) {
  var position=req.query.position || "";
  var  city=req.query.city || "";
  var num=[];
  var number=parseInt(req.query.number) ||0;
  var maxNumber=0;
      
    mysql.selectSkin(position,city).then(function(result){
      maxNumber=Math.floor(result.length/10);
      if (result.length>10) {
        if (number>maxNumber) {
          number=maxNumber;
        }
        for (var i =number*10; i <(number+1)*10; i++) {
        num.push(result[i]);
      }
 res.send({
            result:num,number:number,maxNumber:maxNumber
        });      }else{
 res.send({
            result:result,number:number,maxNumber:maxNumber
        });      }
       
    });
};
exports.typeSkin=function(req, res, next) {
  var type=req.query.type;
  var num=[];
  var number=parseInt(req.query.number) ||0;
  var maxNumber=0;
    mysql.typeSkin(type).then(function(result){
        maxNumber=Math.floor(result.length/10);
      if (result.length>10) {
        if (number>maxNumber) {
          number=maxNumber;
        }
        for (var i =number*10; i <(number+1)*10; i++) {
        num.push(result[i]);
      }
 res.send({
            result:num,number:number,maxNumber:maxNumber
        });      }else{
 res.send({
            result:result,number:number,maxNumber:maxNumber
        });      }
    });
};
// router.get('/', function(req, res, next) {
//   res.render('GUI.html', { title: 'Express' });
// });
// router.get('/ajax', function(req, res, next) {
//   res.render('ajax.html', { title: 'Express' });
// });
// module.exports = router;
