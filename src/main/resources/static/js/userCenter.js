var username=$("#username");
var email=$("#email");

displayUserCenter();

$(".clickLi").click(function () {
    // alert($(this).attr("class").substring(8));
    var name=$(this).attr("class").substring(8);
    clearContent();
    $("#" + name).css("display", "block");
});

//清除右边内容
function clearContent() {
    $("#userInfo-page,#userSecurity-page,#userOrder-page").css("display","none");
}

// 个人中心首次显示
function displayUserCenter() {
    $("#userSecurity-page,#userOrder-page").css("display","none");
}

//获取员工信息和订单信息
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
            $("#avatatUrlHidden").val(avatarUrl);
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
            $("#realNameP").append(realName);
        }
    });
    to_page(1);
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
                /*alert($("#imgTest").val());
                alert("头像更换成功！需要重新登录设置才能生效！");
                window.location.href = "http://localhost/user/logout";*/
                layer.msg("上传头像成功！需要保存信息设置才能生效哦~",{icon:1});
                $("#avatatUrlHidden").val(data.extend.avatarUrl);
            }
            else {
                if (data.extend.errorCode=='300'){
                    layer.alert(data.extend.error,{icon: 2});
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
    var avatarUrl=$("#avatatUrlHidden");
    //空值判断
    if (username.val()==="" || username.val().length===0){
        layer.msg('亲~昵称不能为空哦~', {icon: 0});
        userInfoDeal("usernameDiv","has-success","has-error","亲~昵称不能为空哦~");
        return false;
    }
    if (email.val()==="" || email.val().length===0){
        layer.msg('亲~电子邮箱不能为空哦~', {icon: 0});
        userInfoDeal("emailDiv","has-success","has-error","亲~电子邮箱不能为空哦~");
        return false;
    }
    if (len==0||len==2){
        layer.msg('就不能告诉我你是MM还是GG吗', {icon: 0});
        $("#genderLabel").text("就不能告诉我你是MM还是GG吗~");
        return false;
    }
    $("#genderLabel").text("");

    //正则表达式判断
    var regEmail=new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    if (!regEmail.test(email.val())){
        layer.msg('亲~电子邮箱格式不对哦~请重新输入吧~', {icon: 0});
        userInfoDeal("emailDiv","has-success","has-error","亲~电子邮箱格式不对哦~请重新输入吧~");
        return false;
    }

    //更改信息重复检验
    //Ajax调用处理
    if (usernameRepeat(username.val())==false){
        layer.msg('亲~该用户名不可用哦~请换一个用户名吧~', {icon: 0});
        userInfoDeal("usernameDiv","has-success","has-error","亲~该用户名不可用哦~请换一个用户名吧~");
        return false;
    }
    if (emailRepeat(email.val())==false){
        layer.msg('亲~该电子邮箱不可用哦~请换一个电子邮箱吧~', {icon: 0});
        userInfoDeal("emailDiv","has-success","has-error","亲~该电子邮箱不可用哦~请换一个电子邮箱吧~");
        return false;
    }

    else {
        $("#genderLabel").text("");
        $.ajax({
            url: "/user/updateEmployeeInfo",
            type: "put",
            data: {
                username: username.val(),
                gender: gender.val(),
                email: email.val(),
                avatar:avatarUrl.val(),
            },
            async: false,//同步加载（必须加）
            success: function (result) {
                alert("修改信息成功！需要重新登录设置才能生效！");
                window.location.href = "http://localhost/user/logout";
            }, error: function () {
                layer.alert("系统错误，有问题尽快和小c联系！", {icon: 2});
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

// 邮箱重复
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

var phone=$("#phone");
var password=$("#password");
var confirmPassword=$("#confirmPassword");
//手机号码输入框失去焦点
phone.blur(function () {
    var regPhone=new RegExp("^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$");
    if (phone.val()!=="" && phone.val().length!==0){
        if (!regPhone.test(phone.val())) {
            userInfoDeal("phoneDiv", "has-success", "has-error", "亲~手机号码格式不对哦~请重新输入手机号");
        } else {
            userInfoDeal("phoneDiv", "has-error", "has-success", "");
        }
    }else {
        userInfoDeal("phoneDiv","has-success","has-error","亲~手机号码不能为空哦~");
    }
});

//手机号码输入框获得焦点
phone.focus(function () {
    removeMessage("helpBlockPhone","phoneDiv");
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

//修改密码按钮
$("#updateUserPasswordButton").click(function () {
    // 空值判断
    if (phone.val()==="" || phone.val().length===0){
        layer.msg('亲~手机号码不能为空哦~', {icon: 0});
        userInfoDeal("phoneDiv","has-success","has-error","亲~手机号码不能为空哦~");
        return false;
    }
    if (password.val()==="" || password.val().length===0){
        layer.msg('亲~密码不能为空哦~', {icon: 0});
        userInfoDeal("passwordDiv","has-success","has-error","亲~密码不能为空哦~");
        return false;
    }
    if (confirmPassword.val()==="" || confirmPassword.val().length===0){
        layer.msg('亲~确认密码不能为空哦~', {icon: 0});
        userInfoDeal("confirmPasswordDiv","has-success","has-error","亲~确认密码不能为空哦~");
        return false;
    }

    //正则表达式及其细节判断
    var regPassword=new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$");
    if (!regPassword.test(password.val())){
        layer.msg('亲亲~密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间~', {icon: 0});
        userInfoDeal("passwordDiv","has-success","has-error","亲~密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间~");
        return false;
    }
    if (confirmPassword.val()!==password.val()){
        layer.msg('亲~您输入的确认密码与上面的密码不一致哦~请重新输入吧~', {icon: 0});
        userInfoDeal("confirmPasswordDiv","has-success","has-error","亲~您输入的确认密码与上面的密码不一致哦~请重新输入吧~");
        return false;
    }

    else {
        $("#genderLabel").text("");
        $.ajax({
            url: "/user/updateUserPassword",
            type: "put",
            data: {
                "phone":phone.val(),
                "password":password.val()
                },
            async: false,//同步加载（必须加）
            success: function (result) {
                if (result.extend.errorCode=='400'){
                    layer.msg('result.extend.error', {icon: 2});
                    userInfoDeal("phoneDiv","has-success","has-error",result.extend.error);
                }else {
                    alert("修改密码成功！需要重新登录设置才能生效！");
                    window.location.href = "http://localhost/user/logout";
                }
            },error:function () {
                // alert("系统错误，有问题尽快和小c联系！");
                layer.alert('系统错误，有问题尽快和小c联系！', {icon: 2});
            }
        });
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

// 转订单页面
function to_page(pn) {
    $.ajax({
        url:"/user/getOrderAndMeal",
        data:"pn="+pn,
        type:"get",
        success:function (result) {
            if (result.extend.meal.lastPage===0){
                $("#orderTableDiv").empty();
                var img=$('<img src="/img/orderEmpty.jpg">');
                $("#orderTableDiv").append(img);
                $("#orderTableDiv").addClass("text-center");
            }else {
                build_order_list(result);
                build_orderPage_nav(result);
            }
        }
    })
}

// 订单列表
function build_order_list(result){
    $("#orderTbody").empty();
    var list=result.extend.meal.list;
    $.each(list,function (index,item) {
        var orderId= $('<td>' + item.orderId+ '</td>');
        var sumPrice = $('<td>￥' + item.order.sumPrice + '</td>');

        if (item.status===0){
            var mealStatus = $('<td>未配送</td>');
        }
        else if (item.status===1){
            var mealStatus = $('<td>配送中</td>');
        }
        else if (item.status===2||item.status===3){
            var mealStatus = $('<td>已送达</td>');
        }
        else {
            var mealStatus = $('<td>配送失败</td>');
        }

        if(item.order.status===0){
            var orderStatus=$(' <td>未支付</td>');
        }
        else if(item.order.status===1){
            var orderStatus=$(' <td>已支付</td>');
        }
        else if(item.order.status===2){
            var orderStatus=$(' <td>取消订单</td>');
        }
        else if(item.order.status===3){
            var orderStatus=$(' <td>已确认收餐</td>');
        }
        else {
            var orderStatus=$(' <td>订单被取消</td>');
        }
        var checkButton = $('<td><button type="button" class="btn btn-info checkOrder" order-id="'+item.orderId+'">查看订单</button></td>');
        $("<tr></tr>").append(orderId)
            .append(sumPrice)
            .append(mealStatus)
            .append(orderStatus)
            .append(checkButton)
            .appendTo("#orderTbody");
    });
}

// 订单设置页
function build_orderPage_nav(result){
    $("#order_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.meal.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_page(1);
        });
        prePageLi.click(function () {
            to_page(result.extend.meal.pageNum-1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.meal.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_page(result.extend.meal.pageNum+1);
        });
        lastPageLi.click(function () {
            to_page(result.extend.meal.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.meal.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.meal.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_page(item);
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#order_setPage");
}

/*$("#checkOrder").click(function () {
    $("#checkOrderModal").modal({
        backdrop: "static"
    });
});*/
//点击查看订单详情按钮
$(document).on("click",".checkOrder",function () {
    var orderId=$(this).attr("order-id");
    $("#modalTbody").empty();
    $("#addressModal").empty();
    $("#payMethodModal").empty();
    $("#totalMoneyModal").empty();
    $("#mealSpan").empty();
    $("#mealPeopleSpan").empty();
    $("#mealPeoplePhoneSpan").empty();
    $("#orderSpan").empty();
    $("#buttonModal").empty();
    $.ajax({
        url:"/user/getOrderAndOrderDetail",
        type:"get",
        data:"orderId="+orderId,
        success:function (result) {
            // console.log(result);
            var list=result.extend.order;
            //菜品信息
            $.each(list,function (index,item) {
                var foodName = $('<td>' + item.food.name + '</td>');
                var foodPrice = $('<td>￥' + item.food.price/item.foodNum + '</td>');
                var foodNum = $('<td>' + item.foodNum + '</td>');
                var totalSingleFoodPrice = $('<td class="moneyTd" style="font-weight: bolder">￥' + item.food.price + '</span></td>');
                // totalMoney=totalMoney+item.food.price*item.foodNum;
                $("<tr></tr>").append(foodName)
                    .append(foodPrice)
                    .append(foodNum)
                    .append(totalSingleFoodPrice)
                    .appendTo("#modalTbody");
            });

        }
    });
    $.ajax({
        url:"/user/getOrderInfo",
        type:"get",
        data:"orderId="+orderId,
        success:function (result) {
            // console.log(result);
            if (result.extend.errorPage === "403") {
                alert("您尚未登录！请先登录！");
                window.location.href = "http://localhost/user/login";
            } else {
                $("#addressModal").append(result.extend.order.address);
                if (result.extend.order.payment === 1) {
                    $("#payMethodModal").append("余额支付");
                }
                else if (result.extend.order.payment === 2) {
                    $("#payMethodModal").append("工资支付");
                }
                $("#totalMoneyModal").append(result.extend.order.sumPrice);
            }
        }
    });
    $.ajax({
        url:"/user/checkMealAndOrderAndEmployee",
        type:"get",
        data:"orderId="+orderId,
        success:function (result) {
            // console.log(result);
            if (result.extend.errorPage === "403") {
                alert("您尚未登录！请先登录！");
                window.location.href = "http://localhost/user/login";
            } else {
                if (result.extend.employeeInfo === "404") {
                    $("#mealPeopleSpan").append("暂无");
                    $("#mealPeoplePhoneSpan").append("暂无");
                    if (result.extend.orderStatus === 0) {
                        $("#orderSpan").append("未支付");
                    }
                    else if (result.extend.orderStatus === 1) {
                        $("#orderSpan").append("已支付");
                    }
                    else if (result.extend.orderStatus === 2) {
                        $("#orderSpan").append("取消订单");
                    }
                    else if (result.extend.orderStatus === 3) {
                        $("#orderSpan").append("已确认收餐");
                    }
                    else {
                        $("#orderSpan").append("订单被取消");
                    }
                    if (result.extend.orderStatus === 0 || result.extend.orderStatus === 1) {
                        $("#mealSpan").append("未配送");
                        var cancelOrderButton = $('<button type="button" class="btn btn-danger cancelOrderButton" data-order="' + orderId + '">取消订单</button>');
                        var backButton = $('<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>');
                    }
                    else {
                        $("#mealSpan").append("配送失败");
                        var backButton = $('<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>');
                    }
                    $("#buttonModal").append(cancelOrderButton).append(backButton);

                }
                else {
                    if (result.extend.meal.status === 0) {
                        $("#mealSpan").append("未配送");
                    }
                    else if (result.extend.meal.status === 1) {
                        $("#mealSpan").append("配送中");
                    }
                    else if (result.extend.meal.status === 2 || result.extend.meal.status === 3) {
                        $("#mealSpan").append("已送达");
                    }
                    else {
                        $("#mealSpan").append("配送失败");
                    }

                    $("#mealPeopleSpan").append(result.extend.meal.employee.realName);
                    $("#mealPeoplePhoneSpan").append(result.extend.meal.employee.phone);

                    if (result.extend.meal.order.status === 0) {
                        $("#orderSpan").append("未支付");
                    }
                    else if (result.extend.meal.order.status === 1) {
                        $("#orderSpan").append("已支付");
                    }
                    else if (result.extend.meal.order.status === 2) {
                        $("#orderSpan").append("取消订单");
                    }
                    else if (result.extend.meal.order.status === 3) {
                        $("#orderSpan").append("已确认收餐");
                    }
                    else {
                        $("#orderSpan").append("订单被取消");
                    }
                    if ((result.extend.meal.order.status === 0 && result.extend.meal.status === 0) ||
                        (result.extend.meal.order.status === 1 && result.extend.meal.status === 0) ||
                        (result.extend.meal.order.status === 0 && result.extend.meal.status === 1) ||
                        (result.extend.meal.order.status === 1 && result.extend.meal.status === 1)) {
                        var cancelOrderButton = $('<button type="button" class="btn btn-danger cancelOrderButton" data-order="' + orderId + '">取消订单</button>');
                        var backButton = $('<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>');
                        $("#buttonModal").append(cancelOrderButton).append(backButton);
                    }
                    else if (result.extend.meal.order.status === 0 && result.extend.meal.status === 2) {
                        var backButton = $('<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>');
                        $("#buttonModal").append(backButton);
                    }
                    else if (result.extend.meal.order.status === 1 && result.extend.meal.status === 3) {
                        var confirmOrderButton = $('<button type="button" class="btn btn-success confirmMealButton" data-order="' + orderId + '">确认收餐</button>');
                        var backButton = $('<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>');
                        $("#buttonModal").append(confirmOrderButton).append(backButton);
                    }
                    else {
                        var backButton = $('<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>');
                        $("#buttonModal").append(backButton);
                    }
                }

            }
        }
    });

    $("#checkOrderModal").modal({
        backdrop: "static"
    });
});

//取消订单按钮操作
$(document).on("click",".cancelOrderButton",function () {
    var orderId=$(this).attr("data-order");
    layer.confirm("您是否要取消该订单吗？", {
        title:"取消订单警告",icon: 3,btn: ["确定取消订单","返回"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/userCancelOrder",
            type:"put",
            data:"orderId="+orderId,
            success:function (result) {
                if (result.extend.errorPage==="403") {
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/user/login";
                }else {
                    layer.alert('取消订单成功！有问题请与工作人员联系！', {icon: 1});
                    $("#checkOrderModal").modal('hide');
                    clearContent();
                    $("#userOrder-page").css("display", "block");
                    to_page(1);
                }
            }
        })
    }, function(){
        layer.msg('操作取消', {icon: 2});
    });
});


//确认收餐按钮操作
$(document).on("click",".confirmMealButton",function () {
    // alert($(this).attr("data-order"));
    var orderId=$(this).attr("data-order");
    layer.confirm("您确认收餐吗？", {
        title:"取消订单警告",icon: 3,btn: ["确定","返回"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/userConfirmMeal",
            type:"put",
            data:"orderId="+orderId,
            success:function (result) {
                if (result.extend.errorPage==="403"){
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/user/login";
                }else {
                    layer.alert('确认收餐成功！', {icon: 1});
                    $("#checkOrderModal").modal('hide');
                    clearContent();
                    $("#userOrder-page").css("display", "block");
                    to_page(1);
                }
            }
        })
    }, function(){
        layer.msg('操作取消', {icon: 2});
    });
});
