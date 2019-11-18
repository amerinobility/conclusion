(function(){
	if (getCookie("username").length!==12) {
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
            th0.innerHTML=data[i].companyName;
            th0.setAttribute("value",data[i].companyID)
            th1.innerHTML=data[i].positionName;
            th1.setAttribute("value",data[i].positionID)
            if(num==1){
            	 th2.innerHTML=data[i].status;
                 th3.innerHTML=data[i].contents;
                 p.setAttribute("value","0")
            }else if(num==2){
            	 th2.innerHTML=data[i].number;
                 th3.innerHTML=data[i].time;
                 p.setAttribute("value","1")
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
	function send(){
		var num=1
		$.ajax({
			url:"/send",
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
			url:"/collection",
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
			},
			error:function(err){
				console.log(err)
			}
		})
	}
		function findPersonResume(){
		var username=getCookie("username");
		$.ajax({
			url:"/findPersonResume",
			dataType:"json",
			type:"get",
			data:{"username":username},
			success:function(data){
				console.log(data.result[0])
		$(".value").eq(0).html(data.result[0].username);
		$(".value").eq(1).html(data.result[0].sex);
		$(".value").eq(2).html(data.result[0].year);
		$(".value").eq(3).html(data.result[0].phone);
		$(".value").eq(4).html(data.result[0].work);
		$(".value").eq(5).html(data.result[0].education);
		$(".value").eq(6).html(data.result[0].content);

			},
			error:function(err){
				console.log(err)
			}
		})
	}
	send();
	collection();
	userCommunication();
	findPersonResume();
		$("section input").eq(3).on("click",function(){
		var username=getCookie("username");
		var updataUsername=$("section input").eq(0).val();
		var password=$("section input").eq(1).val();
		var name=$("section input").eq(2).val();
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
                        console.log(111)}
                });
            	}
            })
		$("#quit").on("click",function(){
        	delCookie("username");
        	window.location.href="/GUI.html"
        })
})();
