(function()
{
	if (!getCookie("username")) {
		window.location.href="/";
	}else{
		$("input[type='button']").eq(1).on("click",function(){
		var position=$("input[type=text]").eq(1).val();
		var pay=$("input[type=text]").eq(2).val();
		var education=$("input[type=text]").eq(3).val();
		var number=$("input[type=text]").eq(4).val();
		var place=$("input[type=text]").eq(5).val();
		var ranking=$("input[type=text]").eq(6).val();
		var required=$("textarea").val();
		var type=$("option:selected").val();
		console.log(required)
		var username=getCookie("username");
		if (!position || !pay || !education || !number || !place || !ranking || !type || !required) {
			alert("请完整输入")
		}else{
			$.ajax({
            url:'/releaseWoke',
			dataType:"json",
			type:'POST',
			data:{"position":position,"pay":pay,"education":education,"number":number,"place":place,"ranking":ranking,"type":type,"username":username,"required":required},
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
		}	})
	}
	})()