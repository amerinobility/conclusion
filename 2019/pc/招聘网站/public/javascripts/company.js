(function(){
	if (getCookie("username").length!==14) {
    window.location.href="/GUI.html";
}
$("#quit").on("click",function(){
        	delCookie("username");
        	window.location.href="/GUI.html"
        })
$("table").on("click",".remove",function(){
	var self=this;
	var url=["/deleteSend","/deleteCollection"];
	num=parseInt($(this).attr("value"));
	var companyID=$(this).parent().parent().find("th").eq(0).attr("value");
	var positionID=$(this).parent().parent().find("th").eq(1).attr("value");
	console.log(companyID)
	$.ajax({
		url:url[num],
		dataType:"json",
		type:"get",
		data:{"companyID":companyID,"positionID":positionID},
		success:function(data){
			alert("成功")
			$(self).parent().parent().remove();
		},
		error:function(err){
			alert("失败")
		}
	})
})
$("table").on("click",".watch",function(){
	var self=this;
	var usernameID=$(this).attr("usernameID");
	var companyID=$(this).parent().parent().find("th").eq(0).attr("value");
	var positionID=$(this).parent().parent().find("th").eq(1).attr("value");
	console.log(companyID)
	$.ajax({
		url:"updataStatus",
		dataType:"json",
		type:"get",
		data:{"companyID":companyID,"positionID":positionID},
		success:function(data){
			alert("成功")
			window.location.href="findResume?value="+usernameID+"&usernameID="+companyID+"&positionID="+positionID;
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
            var th5=document.createElement("th");
            var p=document.createElement("p");
            var a=document.createElement("a");
            if(num==1){
            	th0.innerHTML=data[i].positionName;
            th0.setAttribute("value",data[i].companyID)
            th1.innerHTML=data[i].pay;
            th1.setAttribute("value",data[i].positionID)
            	 th2.innerHTML=data[i].ranking;
                 th3.innerHTML=data[i].place;
                 th4.innerHTML=data[i].time;
                 p.setAttribute("value","0")
                 p.innerHTML="删除";
            p.setAttribute("class","remove")
            th5.append(p)
            tr.append(th0);
            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            tr.append(th4);
            tr.append(th5);
            }else if(num==2){
            th0.innerHTML=data[i].positionName;
            th0.setAttribute("value",data[i].companyID)
            th1.innerHTML=data[i].number;
            th1.setAttribute("value",data[i].positionID)
            th2.innerHTML=data[i].time;
            p.setAttribute("value","1")
            p.innerHTML="删除";
            p.setAttribute("class","remove");
            a.innerHTML="查看";
            a.setAttribute("class","watch");
            a.setAttribute("href","javascript:;")
            a.setAttribute("usernameID",data[i].usernameID)
            th3.append(p)
            th4.append(a)
            tr.append(th0);
            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            tr.append(th4);
            }

            tbody.append(tr);
        }
		
        table.append(tbody)
		}
	}
	function send(){
		var num=1
		$.ajax({
			url:"/myRelease",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				console.log(data)
				add(data.result,num)
			},
			error:function(err){
				console.log(err)
			}
		})
	}
	function collection(){
		var num=2;
		$.ajax({
			url:"/userAccept",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				console.log(data)
				add(data.result,num)
			},
			error:function(err){
				console.log(err)
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
		$("section input").eq(3).attr("value",data.result[0].city);
		$("section input").eq(4).attr("value",data.result[0].ranking);
		$("section input").eq(5).attr("value",data.result[0].type);
		$("textarea").eq(0).html(data.result[0].content);
			},
			error:function(err){
				console.log(err)
			}
		})
	}
	send();
	collection();
	userCommunication()
		$("section input[type='button']").eq(0).on("click",function(){
		var username=getCookie("username");
		var updataUsername=$("section input").eq(0).val();
		var password=$("section input").eq(1).val();
		var name=$("section input").eq(2).val();
		var city=$("section input").eq(3).val();
		var ranking=$("section input").eq(4).val();
		var type=$("section input").eq(5).val();
		var content=$("textarea").eq(0).val();
		var  num=/^[0-9]*$/g;
		if(!username || !password || !name ||!city ||!ranking || !type||!content)
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
			data:{"username":username,"updataUsername":updataUsername,"password":password,"name":name,"city":city,"ranking":ranking,"type":type,"content":content},
            success: function (data) {
            	alert("修改成功");
			},
			error:function(err){
				console.log(1);}
                });
       }
		}
			})
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
                        console.log(111);
                    }
                });
            	}
            });
})();
