(function()
{
	function bouncer(arr) {
 	return arr.filter(function(val){
          return !(!val || val === "");
         });
           }
	function position(){
		 $.ajax({
            url:'/position',
			dataType:"json",
			type:'GET',
            success: function (data) {
            	for (var  i=0; i<data.result.length; i++) {
		    var a1=document.createElement("a");
            	a1.innerHTML=data.result[i].name;
                    a1.setAttribute("href","javascript:;")
            	a1.setAttribute("value",data.result[i].positionID);
		        section_content[0].append(a1);
            }
                    var hash = {};
data = data.result.reduce(function(item, next) {
                                hash[next.type] ? '' : hash[next.type] = true && item.push(next);
                                return item;
                            }, []);
var nav_images=$(".nav_images");
			for (var i = 0; i <data.length; i++) {
                var label=document.createElement("div");
                var a=document.createElement("a");
                label.setAttribute("class","label");
                a.innerHTML=data[i].type;
                a.setAttribute("href","javascript:;")
                a.setAttribute("value",data[i].type);
                label.append(a);
                nav_images.append(label);
			}
			},
			error:function(err){
				console.log(1)}
                });
			}
    function label(){
        $.ajax({
            url:'/label',
            dataType:"json",
            type:'GET',
            success: function (data) {
            	console.log(data)
                for (var  i=0; i<data.result.length; i++) {
                    var a2=document.createElement("a");
                    a2.innerHTML=data.result[i].city;
                    a2.setAttribute("href","javascript:;")
                    a2.setAttribute("value",data.result[i].id);
                    section_content[1].append(a2);
                }
            },
            error:function(err){
                console.log(1)}
        });
    }
    var section_content=$(".section_content");
    var right_cell=$(".right_cell");
    var color,redColor;
			position();
    		label();
    		$(".section_content").on("click","a",function () {
				$(this).addClass("color").siblings().removeClass("color")
				color=$(".color");
                $.ajax({
                    url:'/selectSkin',
                    dataType:"json",
                    type:'GET',
					data:{position:color[0].getAttribute("value"),city:color[1] && color[1].innerHTML || ""},
                    success: function (data) {
                    	$(".section_bottom").find("input[type='text']").attr("placeholder",data.number);
                  $(".section_bottom").find("input[type='text']").attr("number",data.number);
            	$(".section_bottom").find("input[type='text']").attr("big",data.maxNumber);
                        $("tr:gt(0)").remove();
                        if(data.result.length>0){
                             data.result=bouncer(data.result);
                            for (var i=0;i<data.result.length;i++){
                            	var tbody=$("tbody");
                            	var tr=document.createElement("tr");
                            	var th0=document.createElement("th");
                                var th1=document.createElement("th");
                                var th2=document.createElement("th");
                                var  a=document.createElement("a");
                                a.innerHTML=data.result[i].companyName;
                                a.setAttribute("href","/communication?companyID="+data.result[i].companyID);
                                th0.appendChild(a);
                                th1.innerHTML=data.result[i].positionName;
                                th2.innerHTML=data.result[i].city;
                                tr.appendChild(th0);
                                tr.appendChild(th1);
                                tr.appendChild(th2);
								tbody.append(tr);
							}
						}
                        // for (var  i=0; i<data.result.length; i++) {
                        //     var a2=document.createElement("a");
                        //     a2.innerHTML=data.result[i].city;
                        //     a2.setAttribute("href","javascript:;")
                        //     a2.setAttribute("value",data.result[i].id);
                        //     section_content[1].append(a2);
                        // }
                    },
                    error:function(err){
                        console.log(1)}
                });
            })   
            $(".nav_images").on("click",".label",function () {
				$(this).addClass("redColor").siblings().removeClass("redColor")
				redColor=$(".redColor a");
                $.ajax({
                    url:'/typeSkin',
                    dataType:"json",
                    type:'GET',
					data:{type:redColor[0].getAttribute("value") || ""},
                    success: function (data) {
                    	$(".section_bottom").find("input[type='text']").attr("placeholder",data.number);
                       $(".section_bottom").find("input[type='text']").attr("number",data.number);
            	$(".section_bottom").find("input[type='text']").attr("big",data.maxNumber);
                        $("tr:gt(0)").remove();
                        if(data.result.length>0){
                             data.result=bouncer(data.result);
                            for (var i=0;i<data.result.length;i++){
                            	var tbody=$("tbody");
                            	var tr=document.createElement("tr");
                            	var th0=document.createElement("th");
                                var th1=document.createElement("th");
                                var th2=document.createElement("th");
                                var  a=document.createElement("a");
                                a.innerHTML=data.result[i].companyName;
                                a.setAttribute("href","/communication?companyID="+data.result[i].companyID);
                                th0.appendChild(a);
                                th1.innerHTML=data.result[i].positionName;
                                th2.innerHTML=data.result[i].city;
                                tr.appendChild(th0);
                                tr.appendChild(th1);
                                tr.appendChild(th2);
								tbody.append(tr);
							}
						}
                    },
                    error:function(err){
                        console.log(1)}
                });
            })
            $(".page").on("click",function(e){
            	var number=parseInt($(".section_bottom").find("input[type='text']").attr("number"));
            	var maxNumber=parseInt($(".section_bottom").find("input[type='text']").attr("big"));
            	var num=parseInt(e.target.getAttribute("data"));
            	color=$(".color");
            		number+=num;
            		console.log(maxNumber)
            	console.log(number)
            	if (number<0) {
            		$(this).find("input[name='lastPage']").attr("disabled",true);
            		$(this).find("input[name='nextPage']").attr("disabled",false);
            	}else if(number>=maxNumber){
            		$(this).find("input[name='nextPage']").attr("disabled",true);
            		$(this).find("input[name='lastPage']").attr("disabled",false);
            	}else{
            		$(this).find("input[name='lastPage']").attr("disabled",false);
            		redColor=$(".redColor a");
                $.ajax({
                    url:'/selectSkin',
                    dataType:"json",
                    type:'GET',
					data:{position:color[0].getAttribute("value"),city:color[1] && color[1].innerHTML || "",number:number},
                    success: function (data) {
                    	$(".section_bottom").find("input[type='text']").attr("placeholder",data.number);
                         $(".section_bottom").find("input[type='text']").attr("number",data.number);
                        $("tr:gt(0)").remove();
                        if(data.result.length>0){
                            data.result=bouncer(data.result);
                            for (var i=0;i<data.result.length;i++){
                            	var tbody=$("tbody");
                            	var tr=document.createElement("tr");
                            	var th0=document.createElement("th");
                                var th1=document.createElement("th");
                                var th2=document.createElement("th");
                                var  a=document.createElement("a");
                                a.innerHTML=data.result[i].companyName;
                                a.setAttribute("href","/communication?companyID="+data.result[i].companyID);
                                th0.appendChild(a);
                                th1.innerHTML=data.result[i].positionName;
                                th2.innerHTML=data.result[i].city;
                                tr.appendChild(th0);
                                tr.appendChild(th1);
                                tr.appendChild(th2);
								tbody.append(tr);
							}
						}
                    },
                    error:function(err){
                        console.log(111)}
                });

            	}
            })
            $("input[name='skin']").on("click",function(e){
            	var number=$(".section_bottom").find("input[type='text']").val();
            	color=$(".color");
            		$(this).find("input[name='lastPage']").attr("disabled",false);
            		redColor=$(".redColor a");
            		console.log(number+"22")
                $.ajax({
                    url:'/selectSkin',
                    dataType:"json",
                    type:'GET',
					data:{position:color[0].getAttribute("value"),city:color[1] && color[1].innerHTML || "",number:number},
                    success: function (data) {
                    	$(".section_bottom").find("input[type='text']").attr("placeholder",data.number);
                         $(".section_bottom").find("input[type='text']").attr("number",data.number);
                        $("tr:gt(0)").remove();
                        if(data.result.length>0){
                               data.result=bouncer(data.result);
                            for (var i=0;i<data.result.length;i++){
                            	var tbody=$("tbody");
                            	var tr=document.createElement("tr");
                            	var th0=document.createElement("th");
                                var th1=document.createElement("th");
                                var th2=document.createElement("th");
                                var  a=document.createElement("a");
                                a.innerHTML=data.result[i].companyName;
                                a.setAttribute("href","/communication?companyID="+data.result[i].companyID);
                                th0.appendChild(a);
                                th1.innerHTML=data.result[i].positionName;
                                th2.innerHTML=data.result[i].city;
                                tr.appendChild(th0);
                                tr.appendChild(th1);
                                tr.appendChild(th2);
								tbody.append(tr);
							}
						}
                    },
                    error:function(err){
                        console.log(111)}
                });
            })
			for (var i = 0; i < right_cell.length; i++) {
				console.log(right_cell[i])
				right_cell[i].addEventListener("mouseover",function(){
				$(this).find(".right_title").show();
			});
				right_cell[i].addEventListener("mouseout",function(){
				$(this).find(".right_title").hide();
			})
			}
			// $("section_content li").on("click",function(){
			// 	$(this).addClass("add");
			// })
	}
)();