(function(){
	 $("table").on("click",".play",function(){
	 	if (!getCookie("username")) {
		alert("请登录后操作")
	}else if(getCookie("username").length==14){
		alert("公司不可操作")
	}
	else{
	 		var url=["/sendResume","userCollection"];
	 	var num=$(this).attr("value");
	 	var companyID=$(".section_header p").eq(0).attr("value");
	 	var positionID=$(this).parent().find("th").eq(0).attr("value");
	 	$.ajax({
			url:url[num],
			dataType:"json",
			type:"get",
			data:{"companyID":companyID,"positionID":positionID},
			success:function(data){
				alert(data.result)
			},
			error:function(err){
				console.log(err)
			}
		})
	 	}
	 })
	  $("#person").on("click",function(){
        	var username=getCookie("username");
        	if (!!getCookie("username")) {
        		if (username.length>12) {
        			window.location.href="/company";
        		}else{
        			window.location.href="/person";
        		}
        	}else{
        		var a=confirm("请登录后进入")
        		if (a) {
        			window.location.href="/GUI.html"
        		}
        	}
        })
})()