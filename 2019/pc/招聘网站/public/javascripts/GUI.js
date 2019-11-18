(function(){


//   var theme = 'dark';

// //    var type = 'fullpage'; // 一键通过
//     var type = 'slide'; // 走滑动
// //    var type = 'click'; // 走大图

//     var localTest = true;

//     // 测试配置
//     var debugConfig = localTest
//         ? {
//             static_servers: ['', 'static.geetest.com', 'dn-staticdown.qbox.me'],
//             skin_path: '/',

//             theme: theme,
//             theme_version:'1.3.3'
//         }
//         : {};
  var handler2 = function (captchaObj) {
        $("#submit").click(function (e) {
            var result = captchaObj.getValidate();
            if (!result) {
                $("#notice").show();
                setTimeout(function () {
                    $("#notice").hide();
                }, 2000);
            } else {
                $.ajax({
                    url: '/gt/ajax-validate2',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username: $('#username').val(),
                        password: $('#password').val(),
                        geetest_challenge: result.geetest_challenge,
                        geetest_validate: result.geetest_validate,
                        geetest_seccode: result.geetest_seccode
                    },
                    success: function (data) {
                        if (data.status === 'success') {
                            setCookie("username",data.name,40)
                            if (data.name.length==10) {
                                window.location.href="/administrator"
                            }else{
                                window.location.href="/main.html"
                            }
                        } else if (data.status === 'fail') {
                            alert("用户名或密码错误")
                            window.location.reload(true)
                        }
                    }
                });
            }
            e.preventDefault();
        });

        // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
        captchaObj.appendTo("#captcha1");

        captchaObj.onReady(function () {
            $("#wait2").hide();
        });

        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
    };
//     handler3=function (captchaObj) {
//     // 省略其他方法的调用
//     document.getElementById('submit2').addEventListener('click', function () {
//         // if (check()) { // 检查是否可以进行提交
//             captchaObj.verify();
//         // }
//     });
//     captchaObj.onSuccess(function () {
//         // 用户验证成功后，进行实际的提交行为
//         // todo
//     });
// };
$("#password").on("click",function(){
        var  num=/^[0-9]*$/g; 
        var username=$("#username").val();
        if (username.length<10 || username.length>14) {
            alert("用户名长度不够")
        }else if(!num.exec(username)){
            alert("格式错误")
        }else{
            return 0;
        }
    })
if (getCookie("username")) {
    window.location.href="/main.html";
}else{
    $.ajax({
        url: "/gt/register2?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {

            // 调用 initGeetest 初始化参数
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                product: 'popup',
                width: "100%"
                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
            }, handler2);
        }
});
}
    

  })();