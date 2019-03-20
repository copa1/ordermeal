var username=$("#username");
var password=$("#password");
var helpSpanUsername=$("#helpBlockUsername");
var helpSpanPassword=$("#helpBlockPassword");
username.val("");
password.val("");
helpSpanUsername.text("");
helpSpanPassword.text("");
$("#usernameDiv").removeClass("has-success","has-error");
$("#passwordDiv").removeClass("has-success","has-error");

//用户名输入框失去焦点
username.blur(function () {
    if (username.val().trim()!=="" && username.val().trim().length!==0){
      userInfoDeal("usernameDiv","has-error","has-success","");
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
    if (password.val()!=="" && password.val().length!==0){
        userInfoDeal("passwordDiv","has-error","has-success","");
    }else {
        userInfoDeal("passwordDiv","has-success","has-error","亲~密码不能为空哦~");
    }
});

//密码输入框获得焦点
password.focus(function () {
    removeMessage("helpBlockPassword","passwordDiv");
});

//登录按钮
$("#loginButton").click(function () {
   /* if (username.val()==="" && username.val().length===0){
        userInfoDeal("usernameDiv","has-success","has-error","亲~用户名不能为空哦~");
        return false;
    } else if (password.val()==="" && password.val().length===0){
        userInfoDeal("passwordDiv","has-success","has-error","亲~密码不能为空哦~");
        return false;
    } else {
        return true;
    }*/
   if (username.val().trim()!=="" && username.val().trim().length!==0 && password.val().trim()!=="" && password.val().trim().length!==0){
       return true;
   }
   else {
       if (username.val().trim()==="" && username.val().trim().length===0){
           layer.msg("亲~用户名不能为空哦~",{icon:"0"});
           userInfoDeal("usernameDiv","has-success","has-error","亲~用户名不能为空哦~");
           return false;
       } else if (password.val().trim()==="" && password.val().trim().length===0){
           layer.msg("亲~密码不能为空哦~",{icon:"0"});
           userInfoDeal("passwordDiv","has-success","has-error","亲~密码不能为空哦~");
           return false;
       }
   }
});

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
