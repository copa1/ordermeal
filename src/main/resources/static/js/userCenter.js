var username=$("#username");
var email=$("#email");

displayUserCenter();

$(".clickLi").click(function () {
    // alert($(this).attr("class").substring(8));
    var name=$(this).attr("class").substring(8);
    clearContent();
    $("#"+name).css("display","block");
});

//清除右边内容
function clearContent() {
    $("#userInfo-page,#userSecurity-page,#userOrder-page").css("display","none");
}

// 个人中心首次显示
function displayUserCenter() {
    $("#userSecurity-page,#userOrder-page").css("display","none");
}

//获取员工信息
$(function () {
    $.ajax({
        url:"/user/getEmployeeInfo",
        type:"get",
        success:function (result) {
            // console.log(result);
            var avatarUrl=result.extend.employee.avatar;
            var username=result.extend.employee.username;
            var phone=result.extend.employee.phone;
            phone=phone.substring(0,3)+"***"+phone.substring(7,11);
            var gender=result.extend.employee.gender;
            var email=result.extend.employee.email;
            var realName=result.extend.employee.realName;
            $("#avatarImg").attr("src",avatarUrl);
            $("#username").val(username);
            $("#phoneP").append(phone+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔已验证");
            if (gender=='M'){
                $("#gender_man").attr("checked","checked");
            }
            else if (gender=='F'){
                $("#gender_woman").attr("checked","checked");
            }
            $("#email").val(email);
            $("#realNameP").append(realName);;
        }
    })
});

// 更换头像
function imgChange() {
    var type="file"; //后台接收时需要的参数名称
    var id="imgTest";  //即input的id，用来寻找值
    var formData=new FormData();
    formData.append(type, $("#"+id)[0].files[0]);    //生成一对表单属性
    $.ajax({
        type: "POST",                      //因为是传输文件，所以必须是post
        url: '/user/uploadAvatar',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            if(data.code=='100'){
                alert("头像更换成功！");
            }
            else {
                if (data.extend.errorCode=='300'){
                    alert(data.extend.error);
                }
                else if (data.extend.errorCode=='403'){
                    alert(data.extend.error);
                    window.location.href="http://localhost/user/login";
                }
            }
        }
    });
}

//用户名输入框失去焦点
username.blur(function () {
    if (username.val()!=="" && username.val().length!==0){
        $.ajax({
            url:"/user/checkUsernameUpdate",
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

//电子邮箱输入框失去焦点
email.blur(function () {
    var regEmail=new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    if (email.val()!=="" && email.val().length!==0){
        $.ajax({
            url:"/user/checkEmailUpdate",
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

// 修改个人信息按钮
$("#updateUserInfoButton").click(function () {
    var username=$("#username");
    var email=$("#email");
    var gender = $(":radio:checked");
    var len=gender.length;
    //空值判断
    if (username.val()==="" || username.val().length===0){
        userInfoDeal("usernameDiv","has-success","has-error","亲~昵称不能为空哦~");
        return false;
    }
    if (email.val()==="" || email.val().length===0){
        userInfoDeal("emailDiv","has-success","has-error","亲~电子邮箱不能为空哦~");
        return false;
    }
    if (email.val()==="" || email.val().length===0){
        $("#genderLabel").text("就不能告诉我你是MM还是GG吗~");
        return false;
    }
    $("#genderLabel").text("");

    //正则表达式判断
    var regEmail=new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    if (!regEmail.test(email.val())){
        userInfoDeal("emailDiv","has-success","has-error","亲~电子邮箱格式不对哦~请重新输入吧~");
        return false;
    }

    //更改信息重复检验
    //Ajax调用处理
    if (usernameRepeat(username.val())==false){
        userInfoDeal("usernameDiv","has-success","has-error","亲~该用户名不可用哦~请换一个用户名吧~");
        return false;
    }
    if (emailRepeat(email.val())==false){
        userInfoDeal("emailDiv","has-success","has-error","亲~该电子邮箱不可用哦~请换一个电子邮箱吧~");
        return false;
    }

    else {
        $("#genderLabel").text("");
        $.ajax({
            url: "/user/updateEmployeeInfo",
            type: "put",
            data: {
                "username": username.val(),
                "gender": gender.val(),
                "email": email.val()
            },
            async: false,//同步加载（必须加）
            success: function (result) {
                alert("修改信息成功！");
            },error:function () {
                alert("系统错误，有问题尽快和小c联系！");
            }
        });
    }
});

//检验信息重复
function usernameRepeat(val) {
    var usernameResult =false;
    if (username.val()!=="" && username.val().length!==0){
        $.ajax({
            url:"/user/checkUsernameUpdate",
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

function emailRepeat(val) {
    var emailResult =false;
    if (email.val()!=="" && email.val().length!==0){
        $.ajax({
            url:"/user/checkEmailUpdate",
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
