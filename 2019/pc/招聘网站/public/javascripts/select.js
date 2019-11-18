(function(){
	$('#text').on('keyup',function(){
		var value=$(this).val().replace(/(^\s*)|(\s*$)/gi,"");
		if (value) {
			$.ajax({
			url:'/labelSelect',
			dataType:"json",
			type:'GET',
			data:{value: value},
			success:function(data){
				console.log(data.result.length)
				var relative = document.getElementById('relative');
        var html = '';
        				if(data.result.length){
        relative.style.display = 'block';
//         var hash = {};
// data = data.result.reduce(function(item, next) {
//                                 hash[next.] ? '' : hash[next.key] = true && item.push(next);
//                                 return item;
//                             }, []);
data.length=data.result.length>6?6:data.result.length;
        for (var i=0; i<data.length; i++) {
            html += '<li><a  href="/ajax?number=0&value='+data.result[i].positionID+'">'+ data.result[i].name +'</a></li>';
        }
        //渲染到页面里
        console.log(html)
        relative.innerHTML = html;
       }else {
        relative.style.display = 'none';
    }
			},
			error:function(err){
				console.log(1)
			}
		});
		}
	});
	$(document).on("click",function(){
		relative.style.display = 'none';
	});
	$("#select").on("click",function(){
		var a=$("#relative").find("a")[0] ||"/ajax?number=0";
		window.location.href=a;
	});
})();