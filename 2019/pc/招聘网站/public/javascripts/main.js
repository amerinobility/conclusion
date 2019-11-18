$(function (){
	$(document).ready(function(){
        function carseoul() {
            var slid = $('ul.slide_box li'),controls = $('ul.bx-controls a');
            slid.addClass('none');
            slid.eq(0).removeClass('none');
            var slideindex = 0;
            function switchi() {
                if(slideindex == slid.length - 1){
                    slideindex = 0;
                }else {
                    slideindex = slideindex + 1;
                }
                slid.addClass('none');
                slid.eq(slideindex).removeClass('none');
                controls.removeClass('actives');
                controls.eq(slideindex).addClass('actives');
            }
            var timer = setInterval(switchi, 3000);
            function options(indexs) {
                slid.addClass('none');
                slid.eq(indexs).removeClass('none');
                controls.removeClass('actives');
                controls.eq(indexs).addClass('actives');
            }
            $('a.options').click(function(){
                var drec = $(this).data('drec');
                if(drec == 'pre') {
                    if(slideindex == 0) {
                        slideindex = 3;
                    }else {
                        slideindex = slideindex - 1;
                    }
                }else {
                    if(slideindex == 3) {
                        slideindex = 0;
                    }else {
                        slideindex = slideindex + 1;
                    }
                }
                clearInterval(timer);
                options(slideindex);
                timer = setInterval(switchi, 3000);
            });
            $('ul.bx-controls li').hover(function(){
                slideindex = $(this).index();
                clearInterval(timer);
                options(slideindex);
            },function(){
                timer = setInterval(switchi, 3000);
            });
        }
        function tp(main) {
            var data = {'dataImg':[{'img':'main1.jpg',"title":"丰华有限公司1","href":"/communication?companyID=100"},{'img':'main2.jpg',"title":"丰华有限公司2","href":"/communication?companyID=101"},{'img':'main3.jpg',"title":"丰华有限公司3","href":"/communication?companyID=102"},{'img':'main4.jpg',"title":"丰华有限公司4","href":"/communication?companyID=103"},
            {'img':'main5.jpg',"title":"丰华有限公司5","href":"/communication?companyID=104"},
            {'img':'main6.jpg',"title":"丰华有限公司6","href":"/communication?companyID=105"},{'img':'main7.jpg',"title":"丰华有限公司7","href":"/communication?companyID=106"},
            {'img':'main8.jpg',"title":"丰华有限公司8","href":"/communication?companyID=107"},{'img':'main9.jpg',"title":"丰华有限公司9","href":"/communication?companyID=108"},
            {'img':'main10.jpg',"title":"丰华有限公司10","href":"/communication?companyID=109"},{'img':'main11.jpg',"title":"丰华有限公司11","href":"/communication?companyID=110"},
            {'img':'main12.jpg',"title":"丰华有限公司12","href":"/communication?companyID=111"},{'img':'main13.jpg',"title":"丰华有限公司13","href":"/communication?companyID=112"},
            {'img':'main14.jpg',"title":"丰华有限公司14","href":"/communication?companyID=113"},{'img':'main15.jpg',"title":"丰华有限公司15","href":"/communication?companyID=114"},
            {'img':'main16.jpg',"title":"丰华有限公司16","href":"/communication?companyID=115"},{'img':'main17.jpg',"title":"丰华有限公司17","href":"/communication?companyID=116"},
            {'img':'main18.jpg',"title":"丰华有限公司18","href":"/communication?companyID=117"},{'img':'main19.jpg',"title":"丰华有限公司19","href":"/communication?companyID=118"},
            {'img':'main20.jpg',"title":"丰华有限公司20","href":"/communication?companyID=119"},{'img':'main21.jpg',"title":"丰华有限公司21","href":"/communication?companyID=120"}]};

            for (var i = 0; i < 20; i++) {
                create(i);
            }
            function create(i){
                var box=document.createElement("a");
                box.className="box";
                box.setAttribute("href",data.dataImg[i%21].href);
                var pic=document.createElement("div");
                pic.className="pic";
                var img=document.createElement("img");
                img.setAttribute("src","../images/"+data.dataImg[i%21].img);
                var a=document.createElement("a");
                var title=document.createElement("div");
                title.setAttribute("class","title");
                title.innerHTML=data.dataImg[i%21].title;        
                a.setAttribute("href","./goods.html?title="+data.dataImg[i%21].title);
                main.append(box);
                box.append(pic);
                a.append(img);
                pic.append(a);
                pic.append(title);
            }
            create(i)
        }
        var main=document.getElementById("panel_bottom");
        tp(main)
        carseoul();
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
            var a=document.createElement("a");
            	if (num==1) {
            	 th0.innerHTML=data[i].companyName;
                 th1.innerHTML=data[i].positionName;
            	 th2.innerHTML=data[i].number;
                 th3.innerHTML=data[i].place;
                 th4.innerHTML=data[i].time;
             }else if(num==2 || num==3 || num==4){
             	th0.innerHTML=data[i].name;
                th1.innerHTML=data[i].city;
            	 th2.innerHTML=data[i].ranking;
            	  th3.innerHTML=data[i].companyID;
                 th4.innerHTML=data[i].type;
             }
                 a.innerHTML="查看";
                 a.setAttribute("class","visit")
                 a.setAttribute("href","/communication?companyID="+data[i].companyID)
                 th5.append(a)
            tr.append(th0);
            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            tr.append(th4);
            tr.append(th5);
            tbody.append(tr);
        }
		
        table.append(tbody)
		}
	}
	function send(){
		var num=1;
		$.ajax({
			url:"/selectSkin",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				console.log($(".box")[10].offsetTop)
				console.log($(".box").offset())
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
			url:"/internet",
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
	function money(){
		var num=3;
		$.ajax({
			url:"/money",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				console.log(data.result)
				add(data.result,num)
			},
			error:function(err){
				console.log(err)
			}
		})
	}
	function house(){
		var num=4;
		$.ajax({
			url:"/house",
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
	function notice(){
		var num=5;
		$.ajax({
			url:"/notice",
			dataType:"json",
			type:"get",
			data:{num:num},
			success:function(data){
				$(".title1").html(data.result[0].title);
				$(".content").html(data.result[0].content);
				$(".time").html(data.result[0].time);
			},
			error:function(err){
				console.log(err)
			}
		})
	}
	send();
	collection();
	money();
	house();
	notice();
        $("#quit").on("click",function(){
        	delCookie("username");
        	window.location.href="/GUI.html"
        })
        $(".main_left ul li").mouseover(function (e){
			var a=$(this).offset().top-50;
			var p=$(this).find(".show").height();
			if(p>300){
				$(this).find(".white").show();
			$(this).find(".show").show().css({top:"0"});
			}
			else{
			$(this).find(".white").show();
			$(this).find(".show").show().css({top:a})}
		}).mouseout(function (){
			$(this).find(".show").hide();
			$(this).find(".white").hide();
		});
		$(".box").on("mouseover",function(){
                 $(this).find(".title").show();
            }).on("mouseout",function(){
                $(this).find(".title").hide();
            });
	})
})
