var address=$("#address");
var sendTime=0;
//点击菜品图片可弹出菜品详情模态框
$(document).on("click","#confirmOrderButton",function () {

    var payMethodNum = $("input[name='payMethod']:checked").val();
    var payMethodSelect=$(":radio:checked").length;
    //空值判断
    if (address.val().trim()==="" || address.val().trim().length===0){
        layer.msg("亲~地址不能为空哦~",{icon:"0"});
        userInfoDeal("addressDiv","has-success","has-error","亲~地址不能为空哦~");
        return false;
    }
    if (payMethodSelect!==1){
        layer.msg("亲~就不能告诉我您的支付方式吗(┬＿┬)~",{icon:"0"});
        // userInfoDeal("helpBlockPayMethod","has-success","has-error","亲~就不能告诉我您的支付方式吗(┬＿┬)~");
        return false;
    }
    if ($("#employeeTimeSelect").val()==="selectNone"){
        layer.msg("亲~请选择配送时间~",{icon:"0"});
        return false;
    }
    if ($("#employeeTimeSelect").val()==="employeeSelectTime"&&($("#sendTimeInput").val()===""|| $("#sendTimeInput").val().length===0)){
        layer.msg("亲~请选择配送时间~",{icon:"0"});
        return false;
    }
    var regTime=new RegExp("^\\d{2}$");
    if ($("#employeeTimeSelect").val()==="employeeSelectTime"&&($("#sendTimeInput").val()<30|| $("#sendTimeInput").val()>90)&&!regTime.test($("#sendTimeInput").val())){
        layer.msg("亲~请输入在30分钟到90分钟以内的时间~1",{icon:"0"});
        return false;
    }

    /*if ($("#employeeTimeSelect").val()==="30"||$("#employeeTimeSelect").val()==="60"){
        sendTime=$("#employeeTimeSelect").val();
    }
    else if ($("#employeeTimeSelect").val()==="employeeSelectTime"){
        sendTime=$("#sendTimeInput").val();
    }*/
    else {
        if ($("#employeeTimeSelect").val()==="employeeSelectTime"){
            sendTime=$("#sendTimeInput").val();
        }
        else {
            sendTime = $("#employeeTimeSelect").val();
        }
        $.ajax({
            url: "/user/getUserCartInfo",
            type: "get",
            success: function (result) {
                // console.log(result);
                if (result.extend.errorCode === "403") {
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/user/login";
                }
                //该用户购物车没有菜品时
                else if (result.extend.errorCode === "600") {
                    $("#confirmModalContainer").empty();
                    var div = $('<div class="row">\n' +
                        '        <div class="col-md-12"><h2>确认订单</h2></div>\n' +
                        '    </div>');
                    var image = $('<div class="row text-center"><div class="col-md-12"><img src="/img/orderEmpty.jpg" height="400"> </div></div>');
                    $("#confirmModalContainer").append(div).append(image);
                } else {
                    $("#modalTbody").empty();
                    $.each(result.extend.cart, function (index, item) {
                        var foodName = $('<td>' + item.food.name + '</td>');
                        var foodPrice = $('<td>￥' + item.food.price + '</td>');
                        var foodNum = $('<td>' + item.foodNum + '</td>');
                        var totalSingleFoodPrice = $('<td class="moneyTd">￥' + item.food.price * item.foodNum + '</span></td>');
                        // totalMoney=totalMoney+item.food.price*item.foodNum;
                        $("<tr></tr>").append(foodName)
                            .append(foodPrice)
                            .append(foodNum)
                            .append(totalSingleFoodPrice)
                            .appendTo("#modalTbody");
                    });
                    $("#addressModal").empty();
                    $("#addressModal").append($("#address").val());
                    $("#payMethodModal").empty();
                    // $("#payMethodModal").append($("input[name='payMethod']:checked").val());

                    if (payMethodNum === "1") {
                        $("#payMethodModal").append("余额支付");
                    }
                    else if (payMethodNum === "2") {
                        $("#payMethodModal").append("工资支付");
                    }
                    $("#totalMoneyModal").empty();
                    $("#totalMoneyModal").append(totalMoney);
                    // $("#totalMoney").append("￥"+totalMoney);
                    $("#sendTime").empty();
                    $("#sendTime").append(sendTime);
                }
            }
        });
        $("#confirmOrderModal").modal({
            backdrop: "static"
        });
    }
});

var totalMoney=0;

$(function () {
    $("#employeeSelectTimeDiv").css("display","none");
    $.ajax({
        url:"/user/getUserCartInfo",
        type:"get",
        success:function (result) {
            // console.log(result);
            if (result.extend.errorCode==="403"){
                alert("您尚未登录！请先登录！");
                window.location.href="http://localhost/user/login";
            }
            //该用户购物车没有菜品时
            else if (result.extend.errorCode==="600"){
                $("#orderConfirmTable").empty();
                var div=$('<div class="row">\n' +
                    '        <div class="col-md-12"><h2>确认订单</h2></div>\n' +
                    '    </div>');
                var image=$('<div class="row text-center"><div class="col-md-12"><img src="/img/orderEmpty.jpg" height="400"> </div></div>');
                var backButton=$('<br><br><div class="row">\n' +
                    '        <div class="col-md-12 text-center" style="margin-left:-20px">\n' +
                    '            <button class="btn btn-success backSelectFoodMenu" type="button">返回选菜</button>\n' +
                    '        </div>\n' +
                    '    </div>');
                $("#orderConfirmTable").append(div).append(image).append(backButton);
            }else {
                $.each(result.extend.cart,function (index,item) {

                    var foodName=$('<td>'+item.food.name+'</td>');
                    var foodPrice=$('<td>￥'+item.food.price+'</td>');
                    var foodNum=$('<td>'+item.foodNum+'</td>');
                    var totalSingleFoodPrice=$('<td class="moneyTd">￥'+item.food.price*item.foodNum+'</span></td>');
                    totalMoney=totalMoney+item.food.price*item.foodNum;
                    $("<tr></tr>").append(foodName)
                        .append(foodPrice)
                        .append(foodNum)
                        .append(totalSingleFoodPrice)
                        .appendTo("#confirmOrderTbody");
                });
                $("#totalMoney").append("￥"+totalMoney);

            }
        }
    });
});

//返回菜单按钮
$(document).on("click",".backSelectFoodMenu",function () {
    window.location.href="http://localhost/user/rice";
});

//返回购物车连接
$(document).on("click","#toCartPage",function () {
    window.location.href="http://localhost/user/cart";
});

//地址输入框获得焦点
address.focus(function () {
    removeMessage("helpBlockConfirmAddress","addressDiv");
});

//确认密码输入框失去焦点
address.blur(function () {
    if (address.val()!=="" && address.val().length!==0){
        userInfoDeal("addressDiv","has-error","has-success","");
    }else if(address.val()==="" && address.val().length===0){
        userInfoDeal("addressDiv","has-success","has-error","亲~地址不能为空哦~");
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

//确认订单按钮
$("#toOrderPage").click(function () {
    $.ajax({
        url:"/user/createOrder",
        type:"post",
        data:{sumPrice:totalMoney,address:$("#address").val().trim(),payment:$("input[name='payMethod']:checked").val(),sendTime:sendTime},
        success:function (result) {
            if (result.extend.errorPage==="403"){
                alert("您尚未登录！请先登录！");
                window.location.href = "http://localhost/user/login";
            }else if (result.extend.errorPage==="700"){
                layer.alert("亲~您的余额不足~不能支付此订单哦~",{icon:2,title:"支付信息"});
            }else {
                $.ajax({
                    url: "/user/createOrderDetail",
                    type: "post",
                    success: function (result) {
                        if (result.extend.errorPage==="403"){
                            alert("您尚未登录！请先登录！");
                            window.location.href = "http://localhost/user/login";
                        }else {
                            $.ajax({
                                url: "/user/createMeal",
                                type: "post",
                                success: function (result) {
                                    if (result.extend.errorPage==="403"){
                                        alert("您尚未登录！请先登录！");
                                        window.location.href = "http://localhost/user/login";
                                    }else {
                                        $.ajax({
                                            url: "/user/deleteCart",
                                            type: "delete",
                                            success: function (result) {
                                                if (result.extend.errorPage==="403"){
                                                    alert("您尚未登录！请先登录！");
                                                    window.location.href = "http://localhost/user/login";
                                                }else {
                                                    window.location.href = "http://localhost/user/order";
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
                

            }
        }
    })
});

$("#employeeTimeSelect").click(function () {
    // alert($(this).val());
    if ($(this).val()==="selectNone"||$(this).val()==="30"||$(this).val()==="60"){
        $("#employeeSelectTimeDiv").css("display","none")
    }
    else if ($(this).val()==="employeeSelectTime"){
        $("#employeeSelectTimeDiv").css("display","block");
    }
});


