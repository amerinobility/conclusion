 var d=setTimeout(show,1000);
    function show(){
        var canvas0=document.getElementById("canvas");

        canvas0.width=window.screen.width;
        canvas0.height=window.screen.height;
        var context0=canvas0.getContext("2d");
        context0.fillStyle="#efefef";
        context0.fillRect(0,0,canvas0.width,canvas0.height);
        var img=new Image();
        img.src='/images/1.gif';
        context0.drawImage(img,0,0);

        for(var i=0;i<5;i++){
            var r=Math.random()*10+10;
            var x=Math.random()*canvas0.width;
            var y=Math.random()*canvas0.height;
            var a=Math.random()*360;
            drawStar(context0,x,y,r,r/2.0,a);
        }
    }
    function drawStar(cxt,x,y,R,r,rot){
        cxt.beginPath();
        for( var i = 0 ; i < 5 ; i ++){
            cxt.lineTo(Math.cos((18+72*i - rot)/180*Math.PI) * R + x ,- Math.sin((18+72*i - rot )/180*Math.PI) * R + y);
            cxt.lineTo(Math.cos((54+72*i - rot)/180*Math.PI) * r + x ,- Math.sin((54+72*i - rot )/180*Math.PI) * r + y);
        }
        cxt.closePath();
        cxt.fillStyle="#fb3";
        cxt.strokeStyle="#fd5";
        cxt.lineWidth=2;
        cxt.lineJoin="round";
        cxt.fill();
        cxt.stroke();
    }