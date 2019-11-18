(function(){
  var handler2 = function (captchaObj) {
        $("#submit2").click(function (e) {
            var result = captchaObj.getValidate();
            console.log($("input[name='radio']:checked").val())
            if (!result) {
                $("#notice2").show();
                setTimeout(function () {
                    $("#notice2").hide();
                }, 2000);
            } else {
                $.ajax({
                    url: '/gt/form-validate1',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username2: $('#username2').val(),
                        password2: $('#password2').val(),
                        sex:$("input[name='radio']:checked").val(),
                        name: $('#name').val(),
                        geetest_challenge: result.geetest_challenge,
                        geetest_validate: result.geetest_validate,
                        geetest_seccode: result.geetest_seccode
                    },
                    success: function (data) {
                        if (data.status === 'success') {
                            window.location.href="/GUI.html";
                        } else if (data.status === 'fail') {
                            window.location.reload(true)
                        }
                    }
                });
            }
            e.preventDefault();
        });

        // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
        captchaObj.appendTo("#captcha2");

        captchaObj.onReady(function () {
            $("#wait2").hide();
        });

        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
    };
    handler3=function (captchaObj) {
    // 省略其他方法的调用
    document.getElementById('submit2').addEventListener('click', function () {
        // if (check()) { // 检查是否可以进行提交
            captchaObj.verify();
        // }
    });
    captchaObj.onSuccess(function () {
        // 用户验证成功后，进行实际的提交行为
        // todo
    });
};

    $.ajax({
        url: "/gt/register1?t=" + (new Date()).getTime(), // 加随机数防止缓存
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
                width: "300px"
                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
            }, handler2);
        }
});
    $("#password3").blur(function(){
        var password2=$("#password2").val();
        var password3=$("#password3").val();
        if (password2!==password3) {
            alert("请输入一样密码")
        }
    })
  })();