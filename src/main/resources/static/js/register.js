var username=$("#username");
var password=$("#password");
var confirmPassword=$("#confirmPassword");
var phone=$("#phone");
var gender=$("input[name='gender']");
var email=$("#email");
var realName=$("#realName");
var register_clear=$("#registerClear");

var helpSpanUsername=$("#helpBlockUsername");
var helpSpanPassword=$("#helpBlockPassword");
var helpSpanConfirmPassword=$("#helpBlockConfirmPassword");
var helpSpanPhone=$("#helpBlockPhone");
var helpSpanEmail=$("#helpBlockEmail");
var helpSpanRealName=$("#helpBlockRealName");

username.val("");
password.val("");
confirmPassword.val("");
phone.val("");
email.val("");
realName.val("");

helpSpanUsername.text("");
helpSpanPassword.text("");
helpSpanConfirmPassword.text("");
helpSpanPhone.text("");
helpSpanEmail.text("");
helpSpanRealName.text("");

$("#usernameDiv").removeClass("has-success","has-error");
$("#passwordDiv").removeClass("has-success","has-error");
$("#confirmPassword").removeClass("has-success","has-error");
$("#phoneDiv").removeClass("has-success","has-error");
$("#emailDiv").removeClass("has-success","has-error");
$("#realNameDiv").removeClass("has-success","has-error");
$("#genderLabel").text("");

//用户名输入框失去焦点
username.blur(function () {
    if (username.val()!=="" && username.val().length!==0){
        $.ajax({
            url:"/user/checkUsername",
            data:"username="+username.val(),
            type:"get",
            success:function (result) {
                if (result.code=='100'){
                    userInfoDeal("usernameDiv","has-error","has-success","");
                }else {
                    userInfoDeal("usernameDiv","has-success","has-error",result.extend.error);
                }
            }
        });
    }else {
        userInfoDeal("usernameDiv","has-success","has-error","亲~用户名不能为空哦~");
    }
});

//用户名输入框获得焦点
username.focus(function () {
    removeMessage("helpBlockUsername","usernameDiv");
});

//密码输入框失去焦点
password.blur(function () {
    var regPassword=new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$");
    if (password.val()!=="" && password.val().length!==0){
        if (!regPassword.test(password.val())){
            userInfoDeal("passwordDiv","has-success","has-error","亲~密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间~");
        }
        else {
            userInfoDeal("passwordDiv", "has-error", "has-success", "");
        }
    }else {
        userInfoDeal("passwordDiv","has-success","has-error","亲~密码不能为空哦~");
    }
});

//密码输入框获得焦点
password.focus(function () {
    removeMessage("helpBlockPassword","passwordDiv");
});

//确认密码输入框获得焦点
confirmPassword.focus(function () {
    removeMessage("helpBlockConfirmPassword","confirmPasswordDiv");
});

//确认密码输入框失去焦点
confirmPassword.blur(function () {
    if (password.val()!=="" && password.val().length!==0 && confirmPassword.val()===password.val()){
        userInfoDeal("confirmPasswordDiv","has-error","has-success","");
    }else if(password.val()==="" && password.val().length===0){
        userInfoDeal("confirmPasswordDiv","has-success","has-error","亲~确认密码不能为空哦~");
    }else if (confirmPassword.val()!==password.val()){
        userInfoDeal("confirmPasswordDiv","has-success","has-error","亲~您输入的确认密码与上面的密码不一致哦~请重新输入吧~");
    } else {
        userInfoDeal("confirmPasswordDiv","has-success","has-error","亲~您所输入的密码不一致哦~请重新输入~");
    }
});

//手机号码输入框失去焦点
phone.blur(function () {
    var regPhone=new RegExp("^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$");
    if (phone.val()!=="" && phone.val().length!==0){
        $.ajax({
            url:"/user/checkPhone",
            data:"phone="+phone.val(),
            type:"get",
            success:function (result) {
                if (result.code=='100'){
                    if (!regPhone.test(phone.val())){
                        userInfoDeal("phoneDiv","has-success","has-error","亲~手机号码格式不对哦~请重新输入手机号");
                    }else {
                        userInfoDeal("phoneDiv", "has-error", "has-success", "");
                    }
                }else {
                    userInfoDeal("phoneDiv","has-success","has-error",result.extend.error);
                }
            }
        });

    }else {
        userInfoDeal("phoneDiv","has-success","has-error","亲~手机号码不能为空哦~");
    }
});

//手机号码输入框获得焦点
phone.focus(function () {
    removeMessage("helpBlockPhone","phoneDiv");
});

//电子邮箱输入框失去焦点
email.blur(function () {
    var regEmail=new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    if (email.val()!=="" && email.val().length!==0){
        $.ajax({
            url:"/user/checkEmail",
            data:"email="+email.val(),
            type:"get",
            success:function (result) {
                if (result.code=='100'){
                    if (!regEmail.test(email.val())){
                        userInfoDeal("emailDiv","has-success","has-error","亲~电子邮箱格式不对哦~请重新输入吧~");
                    }else {
                        userInfoDeal("emailDiv", "has-error", "has-success", "");
                    }
                }else {
                    userInfoDeal("emailDiv","has-success","has-error",result.extend.error);
                }
            }
        });

    }else {
        userInfoDeal("emailDiv","has-success","has-error","亲~电子邮箱不能为空哦~");
    }
});

//电子邮箱输入框获得焦点
email.focus(function () {
    removeMessage("helpBlockEmail","emailDiv");
});

//员工姓名输入框失去焦点
realName.blur(function () {
    var regRealName=new RegExp("^[\u4E00-\u9FA5]{2,}$");
    if (realName.val()!=="" && realName.val().length!==0){
        $.ajax({
            url:"/user/checkRealName",
            data:"realName="+realName.val(),
            type:"get",
            success:function (result) {
                if (result.code=='100'){
                    if (!regRealName.test(realName.val())){
                        userInfoDeal("realNameDiv","has-success","has-error","请输入正确的姓名~");
                    }else {
                        userInfoDeal("realNameDiv", "has-error", "has-success", "");
                    }
                }else {
                    userInfoDeal("realNameDiv","has-success","has-error",result.extend.error);
                }
            }
        });

    }else {
        userInfoDeal("realNameDiv","has-success","has-error","亲~员工姓名不能为空哦~");
    }
});

//员工姓名输入框获得焦点
realName.focus(function () {
    removeMessage("helpBlockRealName","realNameDiv");
});


//注册按钮
$("#registerButton").click(function () {
    gender = $(":radio:checked");
    var len=gender.length;

    //空值判断
    if (username.val()==="" || username.val().length===0){
        layer.msg("亲~用户名不能为空哦~",{icon:"0"});
        userInfoDeal("usernameDiv","has-success","has-error","亲~用户名不能为空哦~");
        return false;
    }
    if (password.val()==="" || password.val().length===0){
        layer.msg("亲~密码不能为空哦~",{icon:"0"});
        userInfoDeal("passwordDiv","has-success","has-error","亲~密码不能为空哦~");
        return false;
    }
    if (confirmPassword.val()==="" || confirmPassword.val().length===0){
        layer.msg("亲~确认密码不能为空哦~",{icon:"0"});
        userInfoDeal("confirmPasswordDiv","has-success","has-error","亲~确认密码不能为空哦~");
        return false;
    }
    if (phone.val()==="" || phone.val().length===0){
        layer.msg("亲~手机号码不能为空哦~",{icon:"0"});
        userInfoDeal("phoneDiv","has-success","has-error","亲~手机号码不能为空哦~");
        return false;
    }
    if (len===0 || len===2){
        layer.msg("亲~就不能告诉我你是MM还是GG吗~",{icon:"0"});
        $("#genderLabel").text("亲~就不能告诉我你是MM还是GG吗~");
        return false;
    }
    $("#genderLabel").text("");
    if (email.val()==="" || email.val().length===0){
        layer.msg("亲~电子邮箱不能为空哦~",{icon:"0"});
        userInfoDeal("emailDiv","has-success","has-error","亲~电子邮箱不能为空哦~");
        return false;
    }
    if (realName.val()==="" || realName.val().length===0){
        layer.msg("亲~员工姓名不能为空哦~",{icon:"0"});
        userInfoDeal("realNameDiv","has-success","has-error","亲~员工姓名不能为空哦~");
        return false;
    }
    //正则表达式及其细节判断
    var regPassword=new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$");
    var regPhone=new RegExp("^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$");
    var regEmail=new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    var regRealName=new RegExp("^[\u4E00-\u9FA5]{2,}$");
    if (!regPassword.test(password.val())){
        layer.msg("亲~密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间~",{icon:"0"});
        userInfoDeal("passwordDiv","has-success","has-error","亲~密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间~");
        return false;
    }
    if (confirmPassword.val()!==password.val()){
        layer.msg("亲~您输入的确认密码与上面的密码不一致哦~请重新输入吧~",{icon:"0"});
        userInfoDeal("confirmPasswordDiv","has-success","has-error","亲~您输入的确认密码与上面的密码不一致哦~请重新输入吧~");
        return false;
    }
    if (!regPhone.test(phone.val())){
        layer.msg("亲~手机号码格式不对哦~请重新输入手机号",{icon:"0"});
        userInfoDeal("phoneDiv","has-success","has-error","亲~手机号码格式不对哦~请重新输入手机号");
        return false;
    }
    if (!regEmail.test(email.val())){
        layer.msg("亲~电子邮箱格式不对哦~请重新输入吧~",{icon:"0"});
        userInfoDeal("emailDiv","has-success","has-error","亲~电子邮箱格式不对哦~请重新输入吧~");
        return false;
    }
    if (!regRealName.test(realName.val())){
        layer.msg("请输入正确的姓名~",{icon:"0"});
        userInfoDeal("realNameDiv","has-success","has-error","请输入正确的姓名~");
        return false;
    }

    //注册信息重复检验
    //Ajax调用处理
    if (usernameRepeat(username.val())==false){
        layer.msg("亲~该用户名不可用哦~请换一个用户名吧~",{icon:"0"});
        userInfoDeal("usernameDiv","has-success","has-error","亲~该用户名不可用哦~请换一个用户名吧~");
        return false;
    }
    if (phoneRepeat(phone.val())==false){
        layer.msg("亲~该手机号码不可用哦~请换一个手机号码吧~",{icon:"0"});
        userInfoDeal("phoneDiv","has-success","has-error","亲~该手机号码不可用哦~请换一个手机号码吧~");
        return false;
    }
    if (emailRepeat(email.val())==false){
        layer.msg("亲~该电子邮箱不可用哦~请换一个电子邮箱吧~",{icon:"0"});
        userInfoDeal("emailDiv","has-success","has-error","亲~该电子邮箱不可用哦~请换一个电子邮箱吧~");
        return false;
    }
    if (realNameRepeat(realName.val())==false){
        layer.msg("亲~该员工姓名不可用哦~",{icon:"0"});
        userInfoDeal("realNameDiv","has-success","has-error","亲~该员工姓名不可用哦~");
        return false;
    }


    else {
        $("#genderLabel").text("");
        $.ajax({
            url: "/user/register",
            type: "post",
            data: {
                "username":username.val(),
                "password":password.val(),
                "phone":phone.val(),
                "gender":gender.val(),
                "email":email.val(),
                "realName":realName.val()},
            async: false,//同步加载（必须加），不然就直接加两条记录！这里坑了我很久！
            success: function (result) {
                if (result=="1")
                putIn();
            },error:function () {
                layer.alert("系统错误，有问题尽快和小c联系！",{icon:"2"});
            }
        });
    }
});

//检验信息重复
function usernameRepeat(val) {
    var usernameResult =false;
    if (username.val()!=="" && username.val().length!==0){
        $.ajax({
            url:"/user/checkUsername",
            data:"username="+username.val(),
            type:"get",
            async: false,//同步加载（必须加）
            success:function (result) {
                if (result.code=='100'){
                    userInfoDeal("usernameDiv","has-error","has-success","");
                    usernameResult=true;
                }else {
                    userInfoDeal("usernameDiv","has-success","has-error",result.extend.error);
                    usernameResult=false;
                }
            }
        });
        return usernameResult;
    }
}
function phoneRepeat(val) {
    var phoneResult =false;
    if (phone.val()!=="" && phone.val().length!==0){
        $.ajax({
            url:"/user/checkPhone",
            data:"phone="+phone.val(),
            type:"get",
            async: false,//同步加载（必须加）
            success:function (result) {
                if (result.code=='100'){
                    userInfoDeal("phoneDiv", "has-error", "has-success", "");
                    phoneResult=true;
                }else {
                    userInfoDeal("phoneDiv","has-success","has-error",result.extend.error);
                    phoneResult=false;
                }
            }
        });
        return phoneResult;
    }
}
function emailRepeat(val) {
    var emailResult =false;
    if (email.val()!=="" && email.val().length!==0){
        $.ajax({
            url:"/user/checkEmail",
            data:"email="+email.val(),
            type:"get",
            async: false,//同步加载（必须加）
            success:function (result) {
                if (result.code=='100'){
                    userInfoDeal("emailDiv", "has-error", "has-success", "");
                    emailResult=true;
                }else {
                    userInfoDeal("emailDiv","has-success","has-error",result.extend.error);
                    emailResult=false;
                }
            }
        });
        return emailResult;
    }
}
function realNameRepeat(val) {
    var realNameResult =false;
    if (realName.val()!=="" && realName.val().length!==0){
        $.ajax({
            url:"/user/checkRealName",
            data:"realName="+realName.val(),
            type:"get",
            async: false,//同步加载（必须加）
            success:function (result) {
                if (result.code=='100'){
                    userInfoDeal("realNameDiv", "has-error", "has-success", "");
                    realNameResult=true;
                }else {
                    userInfoDeal("realNameDiv","has-success","has-error",result.extend.error);
                    realNameResult=false;
                }
            }
        });
        return realNameResult;
    }
}
// 注册成功显示
function putIn() {
    register_clear.html('');
    var div=$('<div class="row">\n' +
        '<div class="col-md-12">\n' +
        '<div class="row">\n' +
        '<div class="col-md-12 text-center" style="color: orange">\n' +
        '<h2>恭喜您完成注册！</h2>\n' +
        '<br><br><br><br>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div></div>' +
        '<div class="row">' +
        '<div class="col-md-12 text-center">' +
        '尊敬的员工，您已成功注册员工订餐系统，请<a href="/user/login">点击登录！</a>' +
        '</div></div><br><br><br>' +
        '<div class="row">' +
        '<div class="col-md-12 text-center">' +
        '<button type="button" class="btn btn-primary" onclick="window.location.href = \'http://localhost/user/login\'">立即登录</button>' +
        '</div></div>');
    $("#registerBig").append(div);
}

//点入输入框处理
function removeMessage(spanEle,divEle) {
    $("#"+spanEle).text("");
    $("#"+divEle).removeClass("has-success","has-error");
}

//用户填写信息后处理
function userInfoDeal(ele,removeClass,addClass,msg) {
    $("#"+ele).addClass(addClass);
    $("#"+ele+" span").text(msg);
    $("#"+ele).removeClass(removeClass);
}
