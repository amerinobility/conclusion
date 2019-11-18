var mysql  = require('mysql');  
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : '',              
  password : '',       
  port: '3306',                   
  database: 'test', 
}); 
 
connection.connect();
function userAdd(username2,password2,sex,name){
  return new Promise(function(resolve,reject){
     var  sql = 'SELECT * FROM users';
//查

connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        for (var i = 0; i < result.length; i++) {
          if (username2===result[i].username) {
               resolve(false);
               return;
          }
        }
var  addSql = 'INSERT INTO users(username,password,sex,name) VALUES(?,?,?,?)';
var  addSqlParams = [username2,password2,sex,name];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ss',err.message);
         return;
        } 
          resolve(true);     
});
}); 
});
// connection.end();
  }
  function resume(name,sex,year,phone,work,type,education,username,content){
  return new Promise(function(resolve,reject){
var  sql = 'SELECT * FROM resume WHERE username='+username;
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        if(result.length==0){
          var addSql = 'INSERT INTO resume(name,sex,year,phone,work,type,education,username,content) VALUES(?,?,?,?,?,?,?,?,?)';
        }else{
          var addSql = 'UPDATE resume SET name = ?,sex = ?,year= ?, phone= ?,work=?,type=?,education=?,username=?,content=? WHERE username='+username;
        }
var  addSqlParams = [name,sex,year,phone,work,type,education,username,content];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ss',err.message);
         return;
        } 
          resolve(true);     
});
});
});
// connection.end();
  }
    function sendResume(usernameID,companyID,positionID){
  return new Promise(function(resolve,reject){
    var  sql = 'SELECT * FROM accept where usernameID='+usernameID+" AND companyID="+companyID+" AND positionID="+positionID;
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(result.length)
        if(result.length>0){
          resolve("已投递")
        }else{
          var  addSql = 'INSERT INTO accept(usernameID,companyID,positionID,status) VALUES(?,?,?,?)';
var  addSqlParams = [usernameID,companyID,positionID,"已投递"];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ss',err.message);
         return;
        } 
          resolve("投递成功");     
});
        }
});
});
// connection.end();
  }
    function userCollection(usernameID,companyID,positionID){
  return new Promise(function(resolve,reject){
    var  sql = 'SELECT * FROM collection where usernameID='+usernameID+" AND companyID="+companyID+" AND positionID="+positionID;
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(result.length)
        if(result.length>0){
          resolve("已投递")
        }else{
          var  addSql = 'INSERT INTO collection(usernameID,companyID,positionID,accept) VALUES(?,?,?,?)';
var  addSqlParams = [usernameID,companyID,positionID,1];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ss',err.message);
         return;
        } 
          resolve("投递成功");     
});
        }
});
// connection.end();
  })
}

  function releaseWoke(position,pay,education,number,place,ranking,type,username,required){
  return new Promise(function(resolve,reject){
     var  sql = 'SELECT * FROM company where username='+username;
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        var companyID=result[0].companyID;
         var companyName=result[0].name;
         console.log(companyName)
         var  sql = 'SELECT * FROM position where name='+"'"+position+"'";
         connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        var positionID=result[0].positionID;
var  addSql = 'INSERT INTO recruitment(positionName,pay,education,number,place,ranking,type,companyID,companyName,positionID,required) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
var  addSqlParams = [position,pay,education,number,place,ranking,type,companyID,companyName,positionID,required];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ss',err.message);
         return;
        } 
          resolve(true);     
});
}); 
}); 
});
// connection.end();
  }

  function companyAdd(username2,password2,name){
  return new Promise(function(resolve,reject){
     var  sql = 'SELECT * FROM company';
//查

connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        for (var i = 0; i < result.length; i++) {
          if (username2===result[i].username) {
               resolve(false);
               return;
          }
        }
        console.log(111)
var  addSql = 'INSERT INTO company(username,password,name) VALUES(?,?,?)';
var  addSqlParams = [username2,password2,name];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ss',err.message);
         return;
        } 
          resolve(true);     
});
}); 
});
// connection.end();
  }
  function deleteSend(companyID,positionID){
    return new Promise(function(resolve,reject){
    var delSql = 'DELETE FROM accept where companyID='+companyID+" AND positionID="+positionID;
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        resolve(result)
});
 });
  }
    function deleteCommunication(num,first,second){
    return new Promise(function(resolve,reject){
    if (num==0) {
      var  delSql = 'DELETE FROM users where usernameID='+first;
    }else if(num==1){
      var  delSql = 'DELETE FROM company where companyID='+first;
    }else if(num==2){
      var  delSql = 'DELETE FROM resume where username='+first;
    }else if(num==3){
      var  delSql = 'DELETE FROM recruitment where companyID='+first+" AND positionID="+second;
    }
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        resolve(result)
});
 });
  }
    function deleteCollection(companyID,positionID){
    return new Promise(function(resolve,reject){
    var delSql = 'DELETE FROM accept where companyID='+companyID+" AND positionID="+positionID;
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        resolve(result)
});
 });
  }
   function updataUser(username,updataUsername,password,name,city,ranking,type,content){
    return new Promise(function(resolve,reject){
      if (username.length==12) {
      var modSql = 'UPDATE users SET username = ?,password = ?,name= ? WHERE username='+username;
      var modSqlParams = [updataUsername,password,name];
    }else if(username.length==14){
      var modSql = 'UPDATE company SET username = ?,password = ?,name= ?,city=?,ranking=?,type=?,content=? WHERE username='+username;
      var modSqlParams = [updataUsername,password,name,city,ranking,type,content];
    }else if(username.length==10){
      var modSql = 'UPDATE admin SET username = ?,password = ?,name= ? WHERE username='+username;
      var modSqlParams = [updataUsername,password,name];
    }
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
   resolve(result);
});
 });
connection.end();
  }

function userSelect(username,password){
    return new Promise(function(resolve,reject){
    if (username.length==12) {
      var  sql = 'SELECT * FROM userse WHERE username='+username+' AND password='+password;
    }else if(username.length==14){
      var  sql = 'SELECT * FROM company WHERE username='+username+' AND password='+password;
    }else if(username.length==10){
      var  sql = 'SELECT * FROM admin WHERE username='+username+' AND password='+password;
    }
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        // for (var i = 0; i < result.length; i++) {
        //   if (username===result[i].username&&password===result[i].password) {
        //       console.log(result[i].username)
        //        resolve(result[i].username);
        //   }
        // }
        resolve(result);
});
 
// connection.end();
  });
  }
  function internet(){
    return new Promise(function(resolve,reject){
      var  sql = 'SELECT * FROM company WHERE type="互联网" AND ranking<100';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        // for (var i = 0; i < result.length; i++) {
        //   if (username===result[i].username&&password===result[i].password) {
        //       console.log(result[i].username)
        //        resolve(result[i].username);
        //   }
        // }
        resolve(result);
});
 
// connection.end();
  });
  }
    function findResume(usernameID){
    return new Promise(function(resolve,reject){
      var  sql = 'SELECT * FROM users WHERE usernameID='+usernameID;
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        var username=result[0].username;
        console.log(username)
         var  sql = 'SELECT * FROM resume WHERE username='+username;
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        resolve(result);
});
  });
  });
  }
    function money(){
    return new Promise(function(resolve,reject){
      var  sql = 'SELECT * FROM company WHERE type="金融" AND ranking<100';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        // for (var i = 0; i < result.length; i++) {
        //   if (username===result[i].username&&password===result[i].password) {
        //       console.log(result[i].username)
        //        resolve(result[i].username);
        //   }
        // }
        resolve(result);
});
 
// connection.end();
  });
  }
    function house(){
    return new Promise(function(resolve,reject){
      var  sql = 'SELECT * FROM company WHERE type="房地产" AND ranking<100';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        // for (var i = 0; i < result.length; i++) {
        //   if (username===result[i].username&&password===result[i].password) {
        //       console.log(result[i].username)
        //        resolve(result[i].username);
        //   }
        // }
        resolve(result);
});
 
// connection.end();
  });
  }
  function notice(){
    return new Promise(function(resolve,reject){
      var  sql = 'SELECT * FROM notice';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        resolve(result);
});
 
// connection.end();
  });
  }
  function updataNotice(title,content,time){
    return new Promise(function(resolve,reject){
      console.log(title)
  var modSql = 'UPDATE notice SET title=?,content=?,time=?';
var modSqlParams = [title,content,time];
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
   resolve(result);
});
 });
connection.end();
  }
  function myRelease(companyID){
    return new Promise(function(resolve,reject){
      var  sql = 'SELECT * FROM recruitment WHERE companyID='+companyID;
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        // for (var i = 0; i < result.length; i++) {
        //   if (username===result[i].username&&password===result[i].password) {
        //       console.log(result[i].username)
        //        resolve(result[i].username);
        //   }
        // }
        resolve(result);
});
 
// connection.end();
  });
  }
    function userAccept(companyID){
      console.log(companyID)
    return new Promise(function(resolve,reject){
      var  sql = 'SELECT * FROM accept,recruitment WHERE accept.companyID=recruitment.companyID AND accept.positionID=recruitment.positionID AND accept.companyID='+companyID;
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        // for (var i = 0; i < result.length; i++) {
        //   if (username===result[i].username&&password===result[i].password) {
        //       console.log(result[i].username)
        //        resolve(result[i].username);
        //   }
        // }
        console.log(result)
        resolve(result);
});
 
// connection.end();
  });
  }
  function selectUser(num){
    return new Promise(function(resolve,reject){
    if (num==1) {
      var  sql = 'SELECT * FROM users';
    }else if(num==2){
      var  sql = 'SELECT * FROM company';
    }
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        // for (var i = 0; i < result.length; i++) {
        //   if (username===result[i].username&&password===result[i].password) {
        //       console.log(result[i].username)
        //        resolve(result[i].username);
        //   }
        // }
        resolve(result);
});
 
// connection.end();
  });
  }
  function findPerson(username){
    return new Promise(function(resolve,reject){
    if (username.length==10) {
      var  sql = 'SELECT * FROM admin WHERE username='+username;
    }else if(username.length==12){
      var  sql = 'SELECT * FROM users WHERE username='+username;
    }else if(username.length==14){
      var  sql = 'SELECT * FROM company WHERE username='+username;
    }
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        // for (var i = 0; i < result.length; i++) {
        //   if (username===result[i].username&&password===result[i].password) {
        //       console.log(result[i].username)
        //        resolve(result[i].username);
        //   }
        // }
        resolve(result);
});
 
// connection.end();
  });
  }
  function label(){
    return new Promise(function(resolve,reject){
    var  sql = 'SELECT * FROM label';
    var  data=[];
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        resolve(result);
});
 
// connection.end();
  });
  }
function position(){
    return new Promise(function(resolve,reject){
        var  sql = 'SELECT * FROM position';
        var  data=[];
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            resolve(result);
        });

// connection.end();
    });
}
function communication(companyID){
    return new Promise(function(resolve,reject){
        var  sql = 'SELECT * FROM company,recruitment WHERE company.companyID=recruitment.companyID AND company.companyID='+companyID;
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            resolve(result);
        });

// connection.end();
    });
}
function collection(usernameID){
    return new Promise(function(resolve,reject){
        var  sql = 'SELECT * FROM collection,recruitment WHERE collection.companyID=recruitment.companyID AND collection.positionID=recruitment.positionID AND collection.accept="1" AND collection.usernameID='+usernameID;
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            resolve(result);
        });

// connection.end();
    });
}
function send(usernameID){
    return new Promise(function(resolve,reject){
        var  sql = 'SELECT * FROM accept,recruitment WHERE accept.companyID=recruitment.companyID AND accept.positionID=recruitment.positionID AND accept.usernameID='+usernameID;
        connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            resolve(result);
        });

// connection.end();
    });
}
function ajax(value){
    return new Promise(function(resolve,reject){
      var  sql = 'SELECT * FROM position,recruitment,company where company.companyID=recruitment.companyID AND position.positionID=recruitment.positionID ';
        if(!!value){
         sql+='AND position.positionID='+value;
            }
            connection.query(sql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }
                resolve(result)

            });
        

// connection.end();
    });
}
 function updataStatus(companyID,positionID,contents){
    return new Promise(function(resolve,reject){
      console.log(companyID+""+positionID)
      if (!!contents) {
        var modSql = 'UPDATE accept SET contents=? WHERE companyID='+companyID+" AND positionID="+positionID;
var modSqlParams = [contents];
}else{
  var modSql = 'UPDATE accept SET status=? WHERE companyID='+companyID+" AND positionID="+positionID;
var modSqlParams = ["已查看"];
}
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
   resolve(result);
});
 });
connection.end();
  }
function selectSkin(position,city){
    return new Promise(function(resolve,reject){
        var  sql = 'SELECT * FROM position,recruitment,company where company.companyID=recruitment.companyID AND position.positionID=recruitment.positionID';
        if(!!position){
            sql+=' AND position.positionID='+position;
            }
            console.log(sql)
            var  data=[];
            connection.query(sql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }
                    if(!!city && city!="不限"){
                        for(var i=0;i<result.length;i++){
                            console.log(result[i].city.indexOf(city))
                            console.log(result[i].city)
                            if(result[i].city.indexOf(city)>=0){
                                data.push(result[i])
                            }
                    }
                        resolve(data)
                }else{
                        resolve(result)
                    }
            });


// connection.end();
    });
}
function typeSkin(type){
    return new Promise(function(resolve,reject){
        var  sql = 'SELECT * FROM position,recruitment,company where company.companyID=recruitment.companyID AND position.positionID=recruitment.positionID';
        if(!!type){
          console.log(999)
            sql+=' AND position.type='+"'"+type+"'";
            }
            connection.query(sql,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }
                 resolve(result)
            });


// connection.end();
    });
}
  function labelSelect(value){
    return new Promise(function(resolve,reject){
    var  sql = 'SELECT * FROM position';
    var  data=[];
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        if (!!value) {
          for (var i = 0; i < result.length; i++) {
            console.log(result[i].name.indexOf(value)+result[i].name)
            if (result[i].name.indexOf(value)>=0) {
               data.push(result[i]);
        }
        }
        resolve(data);
        }else{
          for (var i = 0; i < result.length; i++) {
               data.push(result[i])
        }
        resolve(data);
        }
});
 
// connection.end();
  });
  }
function selectResume(value){
    return new Promise(function(resolve,reject){
    var  sql = 'SELECT * FROM resume';
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        resolve(result);
});
// connection.end();
  });
  }
function administrator(username,password){
    return new Promise(function(resolve,reject){
    if (username.length==12) {
      var  sql = 'SELECT * FROM users WHERE username='+username+' AND password='+password;
    }else if(username.length==14){
      var  sql = 'SELECT * FROM company WHERE username='+username+' AND password='+password;
    }else if(username==1){
      var  sql = 'SELECT * FROM users'
    }else if(username==2){
      var  sql = 'SELECT * FROM company'
    }else if(username==3){
      var  sql = 'SELECT * FROM users,resume WHERE users.username=resume.username';
    }
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        resolve(result);
});
 
// connection.end();
  });
  }
  function company(username,password){
    return new Promise(function(resolve,reject){
    if (username.length==12) {
      var  sql = 'SELECT * FROM users WHERE username='+username+' AND password='+password;
    }else if(username.length==14){
      var  sql = 'SELECT * FROM company WHERE username='+username+' AND password='+password;
    }else if(username==1){
      var  sql = 'SELECT * FROM users'
    }else if(username==2){
      var  sql = 'SELECT * FROM company'
    }else if(username==3){
      var  sql = 'SELECT * FROM users,resume WHERE users.username=resume.username';
    }
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        resolve(result);
});
 
// connection.end();
  });
  }
  function person(username,password){
    return new Promise(function(resolve,reject){
    if (username.length==12) {
      var  sql = 'SELECT * FROM users WHERE username='+username+' AND password='+password;
    }else if(username.length==14){
      var  sql = 'SELECT * FROM company WHERE username='+username+' AND password='+password;
    }else if(username==1){
      var  sql = 'SELECT * FROM users'
    }else if(username==2){
      var  sql = 'SELECT * FROM company'
    }else if(username==3){
      var  sql = 'SELECT * FROM users,resume WHERE users.username=resume.username';
    }
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        resolve(result);
});
 
// connection.end();
  });
  }
  exports.userAdd=userAdd;
  // exports.userDelete=userDelete;
  exports.notice=notice;//查看公告
  exports.updataNotice=updataNotice;//添加公告
  // exports.notice=notice;//修改公告
  // exports.notice=notice;//删除公告
  exports.findResume=findResume//查看简历
  exports.internet=internet;//互联网前百强
  exports.money=money;//金融前百强
  exports.house=house;//房地产前百强
  exports.updataUser=updataUser;//修改用户
  exports.updataStatus=updataStatus//更新用户状态
  exports.companyAdd=companyAdd;
  exports.userCollection=userCollection;//用户收藏
  exports.sendResume=sendResume;//用户投递
  exports.userAccept=userAccept;//用户投递
  exports.myRelease=myRelease;//我的发布
  exports.collection=collection;//查看收藏
  exports.send=send;//查看投递
  exports.deleteSend=deleteSend;//删除投递
  exports.deleteCollection=deleteCollection;//删除收藏
  exports.deleteCommunication=deleteCommunication;//管理员删除信息
  exports.releaseWoke=releaseWoke;//发布岗位
  exports.resume=resume;//生成简历
  exports.selectResume=selectResume;//查询简历
  exports.userSelect=userSelect;
  exports.selectUser=selectUser;
  exports.findPerson=findPerson;//查询个人用户
  exports.label=label;//城市标签
  exports.position=position;//岗位
  exports.labelSelect=labelSelect;//搜索列表
  exports.ajax=ajax;//标签搜索
  exports.selectSkin=selectSkin;//联合搜索;
  exports.communication=communication;//公司信息
  exports.typeSkin=typeSkin;//theme搜索
  // CREATE TABLE `test`.`userse` ( `username` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名' , `password` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码' , `sex` INT(10) NOT NULL , `name` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `usernameID` INT(4) NOT NULL , PRIMARY KEY (`usernameID`(4))) ENGINE = InnoDB;
  // create table users(usernameID int primary key auto_increment,username varchar(18),password varchar(2),sex int,name varchar(20));
  // INSERT INTO users(usernameID,username,password,sex,name) VALUES(1,'201421092102','201421092102','男','盖伦')
  // -> id int,
  // -> stu_id int,
  // -> name varchar(20),
  // -> PRIMARY KEY(id,stu_id)
  // -> );
  // create table users(usernameID int primary key auto_increment,username varchar(50),password varchar(50),sex varchar(50),name varchar(50));