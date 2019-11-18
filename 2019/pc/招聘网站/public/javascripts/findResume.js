(function(){
	$("input[type='button']").on("click",function(){
	var value=prompt("请输入信息");
	if (value) {
		var self=this;
		var content=value;
	var companyID=$(self).attr("companyID")
	var positionID=$(self).attr("positionID")
	console.log(companyID)
	$.ajax({
		url:"updataStatus",
		dataType:"json",
		type:"get",
		data:{"companyID":companyID,"positionID":positionID,"content":content},
		success:function(data){
			alert("成功")
		},
		error:function(err){
			alert("失败")
		}
	})
	}else{
		alert(1)
	}
})
})();