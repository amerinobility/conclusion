(function()
{
	if (!getCookie("username")) {
		window.location.href="/";
		}
	else{
		$("input[type='button']").on("click",function(){
		var name=$("input[type=text]").eq(1).val();
		var sex=$("input[type=text]").eq(2).val();
		var year=$("input[type=text]").eq(3).val();
		var phone=$("input[type=text]").eq(4).val();
		var work=$("input[type=text]").eq(5).val();
		var type=$("option:selected").val();
		var education=$("textarea").eq(0).val();
		var content=$("textarea").eq(1).val();
		console.log(name+sex+year+phone+work+type+education+content)
		var username=getCookie("username");
		if (!name || !sex || !year || !phone || !work || !type || !education || !content) {
			alert("请完整输入")
		}else{
			$.ajax({
            url:'/resume',
			dataType:"json",
			type:'POST',
			data:{"name":name,"sex":sex,"year":year,"phone":phone,"work":work,"type":type,"education":education,"username":username,"content":content},
            success: function (data) {
            	if (data.result==true) {
            		var a=confirm("发布成功，是否返回")
            		if (a) {
            			window.location.href="/main.html";
            		}
            	}else{
            		alert("发布失败，请重试");
            	}
			},
			error:function(err){
				console.log(1)}
                });
		}
	})
	}
	})()