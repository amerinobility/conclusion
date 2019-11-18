(function(){
	if (getCookie("username").length!==10) {
    window.location.href="/GUI.html";
}
$("#quit").on("click",function(){
        	delCookie("username");
        	window.location.href="/GUI.html"
        })
$("table").on("click",".remove",function(){
	var self=this,second="";
	num=parseInt($(this).attr("value"));
	var first=$(this).parent().parent().find("th").eq(0).html();
	if (num==3) {
		second=$(this).parent().parent().find("th").eq(1).html();
	}
	$.ajax({
		url:"/deleteCommunication",
		dataType:"json",
		type:"get",
		data:{num:num,"first":first,"second":second},
		success:function(data){
			alert("成功")
			$(self).parent().parent().remove();
		},
		error:function(err){
			alert("失败")
		}
	})
})
	function add(data,num){
		if(data.length>0){
        for (var i=0;i<data.length;i++){
        	var table=$("table")[num-1];
            var tbody=$("tbody")[num-1];
        	var tr=document.createElement("tr");
        	var th0=document.createElement("th");
            var th1=document.createElement("th");
            var th2=document.createElement("th");
            var th3=document.createElement("th");
            var th4=document.createElement("th");
            var p=document.createElement("p");
            if(num==1){
            	 th0.innerHTML=data[i].usernameID;
            	 th1.innerHTML=data[i].username;  
            	 th2.innerHTML=data[i].password;   
                 th3.innerHTML=data[i].name;
                 p.setAttribute("value","0")
            }else if(num==2){
            	 th0.innerHTML=data[i].companyID;
            	 th1.innerHTML=data[i].username; 
            	 th2.innerHTML=data[i].password;    
                 th3.innerHTML=data[i].name;
                 p.setAttribute("value","1")
            }else if(num==3){
            	 th0.innerHTML=data[i].username;
            	 th1.innerHTML=data[i].name;
            	 th2.innerHTML=data[i].type;          
                 th3.innerHTML=data[i].phone;
                 p.setAttribute("value","2")
            }else  if(num==4){
            	 th0.innerHTML=data[i].companyID;
            	 th1.innerHTML=data[i].positionID; 
            	 th2.innerHTML=data[i].companyName;         
                 th3.innerHTML=data[i].positionName;
                 p.setAttribute("value","3")
            }
            
            p.innerHTML="删除";
            p.setAttribute("class","remove")
            th4.append(p)
            tr.append(th0);
            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            tr.append(th4);
            tbody.append(tr);
        }
		
        table.append(tbody)
		}
	}
	function user(){
		var num=1
		$.ajax({
			url:"/selectUser",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				add(data.result,num)
			},
			error:function(err){
				console.log(err)
			}
		})
	}
	function company(){
		var num=2;
		$.ajax({
			url:"/selectUser",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				add(data.result,num)
			},
			error:function(err){
				console.log(err)
			}
		})
	}
	function resume(){
		var num=3;
		$.ajax({
			url:"/selectResume",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				add(data.result,num);
			},
			error:function(err){
				console.log(err);
			}
		})
	}
	function position(){
		var num=4;
		$.ajax({
			url:"/selectSkin",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				add(data.result,num);
			},
			error:function(err){
				console.log(err);
			}
		})
	}
		function userCommunication(){
		var username=getCookie("username");
		$.ajax({
			url:"/findPerson",
			dataType:"json",
			type:"get",
			data:{"username":username},
			success:function(data){
		$("section input").eq(0).attr("value",data.result[0].username);
		$("section input").eq(1).attr("value",data.result[0].password);
		$("section input").eq(2).attr("value",data.result[0].name);
			},
			error:function(err){
				console.log(err)
			}
		})
	}
	user();
	company();
	resume();
	position();
	userCommunication();
		$("input").eq(3).on("click",function(){
		var username=getCookie("username");
		var updataUsername=$("input").eq(0).val();
		var password=$("input").eq(1).val();
		var name=$("input").eq(2).val();
		var  num=/^[0-9]*$/g;
		if(!username || !password || !name)
		{
			alert("请输入完整")
		}else{
			if (updataUsername.length<10 || updataUsername.length>14) {
            alert("用户名长度不够")
        }else if(!num.exec(username)){
            alert("格式错误")
        }else{
            $.ajax({
            url:'/updataUser',
			dataType:"json",
			type:'post',
			data:{"username":username,"updataUsername":updataUsername,"password":password,"name":name},
            success: function (data) {
            	alert("修改成功");
			},
			error:function(err){
				console.log(1);
			}
                });
       }
		}
			})
		$("input").eq(6).on("click",function(){
		var title=$("input").eq(4).val();
		var content=$("input").eq(5).val();
		var time=new Date().toLocaleString( );
		if(!title || !content)
		{
			alert("请输入完整")
		}else{
            $.ajax({
            url:'/updataNotice',
			dataType:"json",
			type:'post',
			data:{"title":title,"content":content,"time":time},
            success: function (data) {
            	alert("修改成功");
			},
			error:function(err){
				console.log(1);
			}
                });
       }
			});
		$("nav li").on("click",function(){
		$("section").eq($(this).index()-1).removeClass("hidden").siblings().addClass('hidden');
	})
		$(".page").on("click",function(e){
			var url=["/selectUser","/selectUser","/selectResume","/selectSkin"]
			    var self=this;
			    console.log($(this).attr("value"))
            	var number=parseInt($(".section_bottom").eq($(this).attr("value")).find("input[type='text']").attr("number"));
            	var maxNumber=parseInt($(".section_bottom").eq($(this).attr("value")).find("input[type='text']").attr("big"));
            	var num=parseInt(e.target.getAttribute("data"));
            	color=$(".color");
            	number+=num;
            	if (number<0) {
            		console.log($(this).eq($(this).attr("value")))
            		$(this).eq($(this).attr("value")).find("input[name='lastPage']").attr("disabled",true);
            		$(this).eq($(this).attr("value")).find("input[name='nextPage']").attr("disabled",false);
            	}else if(number>=maxNumber){
            		$(this).eq($(this).attr("value")).find("input[name='nextPage']").attr("disabled",true);
            		$(this).eq($(this).attr("value")).find("input[name='lastPage']").attr("disabled",false);
            	}else{
            		$(this).eq($(this).attr("value")).find("input[name='lastPage']").attr("disabled",false);
            		redColor=$(".redColor a");
                $.ajax({
                    url:url[$(this).attr("value")],
                    dataType:"json",
                    type:'GET',
					data:{number:number,num:parseInt($(self).attr("value"))+1},
                    success: function (data) {
                    	console.log(data)
                    	$(".section_bottom").eq($(self).attr("value")).find("input[type='text']").attr("placeholder",data.number);
                    	$(".section_bottom").eq($(self).attr("value")).find("input[type='text']").attr("big",data.maxNumber);
                         $(".section_bottom").eq($(self).attr("value")).find("input[type='text']").attr("number",data.number);
                      $("table").eq($(self).attr("value")).find("tr:gt(0)").remove();
                        add(data.result,parseInt($(self).attr("value"))+1);
                    },
                    error:function(err){
                        console.log(111)}
                });

            	}
            })
		$("input[name='skin']").on("click",function(e){
			var url=["/selectUser","/selectUser","/selectResume","/selectSkin"]
			    var self=this;
            	var number=parseInt($(".section_bottom").eq($(this).parent().parent().find(".page").attr("value")).find("input[type='text']").val());
            	color=$(".color");
            	console.log(number)
            		$(this).eq($(this).attr("value")).find("input[name='lastPage']").attr("disabled",false);
            		redColor=$(".redColor a");
                $.ajax({
                    url:url[$(this).parent().parent().find(".page").attr("value")],
                    dataType:"json",
                    type:'GET',
					data:{number:number},
                    success: function (data) {
                    	console.log(data)
                    	$(".section_bottom").eq($(self).attr("value")).find("input[type='text']").attr("placeholder",data.number);
                    	$(".section_bottom").eq($(self).attr("value")).find("input[type='text']").attr("big",data.maxNumber);
                         $(".section_bottom").eq($(self).attr("value")).find("input[type='text']").attr("number",data.number);
                        $("table").eq($(self).parent().parent().find(".page").attr("value")).find("tr:gt(0)").remove();
                        add(data.result,parseInt($(self).parent().parent().find(".page").attr("value"))+1);
                    },
                    error:function(err){
                        console.log(111)}
                });
            })
		
})();
