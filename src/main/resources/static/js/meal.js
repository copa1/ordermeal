$(function () {
    var orderId=0;
    $.ajax({
        url:"/user/checkMealing",
        type:"get",
        success:function (result) {
            if (result.extend.errorPage === "403") {
                alert("您尚未登录！请先登录！");
                window.location.href = "http://localhost/user/login";
            } else if (result.extend.mealCode==="200"){
                orderId=result.extend.meal.orderId;
                $("#listContainer").css("display","none");
                $.ajax({
                    url:"/user/getOrderAndMealAndEmployeeByOrderId",
                    type:"get",
                    data:"orderId="+orderId,
                    success:function (result) {
                        //订单信息模块
                        $("#orderDetailId").empty();
                        $("#orderDetailPlace").empty();
                        $("#orderDetailPeople").empty();
                        $("#orderDetailPeoplePhone").empty();
                        $("#orderDetailOrderStatus").empty();
                        $("#orderDetailMealStatus").empty();
                        $("#payDetailMethod").empty();
                        $("#totalMoney").empty();
                        $("#orderDetailTbody").empty();
                        $("#orderDetailId").append(result.extend.meal.orderId);
                        $("#orderDetailPlace").append(result.extend.meal.order.address);
                        $("#orderDetailPeople").append(result.extend.meal.employee.username);
                        $("#orderDetailPeoplePhone").append(result.extend.meal.employee.phone);
                        if (result.extend.meal.order.status===0){
                            $("#orderDetailOrderStatus").append("未支付");
                        }
                        else if (result.extend.meal.order.status===1){
                            $("#orderDetailOrderStatus").append("已支付");
                        }
                        else if (result.extend.meal.order.status===2){
                            $("#orderDetailOrderStatus").append("订单人已取消订单");
                        }
                        else if (result.extend.meal.order.status===3){
                            $("#orderDetailOrderStatus").append("订单人已确认收餐");
                        }
                        else {
                            $("#orderDetailOrderStatus").append("系统取消订单");
                        }
                        if (result.extend.meal.status===0){
                            $("#orderDetailMealStatus").append("未配送");
                        }
                        else if (result.extend.meal.status===1){
                            $("#orderDetailMealStatus").append("配送中");
                        }
                        else if (result.extend.meal.status===2||result.extend.meal.status===3){
                            $("#orderDetailMealStatus").append("已送达");
                        }
                        else{
                            $("#orderDetailMealStatus").append("配送失败");
                        }
                        //支付方式及其总价
                        if (result.extend.meal.order.payment===1){
                            $("#payDetailMethod").append("余额支付");
                        }
                        else if (result.extend.meal.order.payment===2){
                            $("#payDetailMethod").append("工资支付");
                        }
                        $("#totalMoney").append("￥"+result.extend.meal.order.sumPrice);
                        //按钮模块
                        if (result.extend.meal.status===1&&result.extend.meal.order.status===0){
                            var notPayButton=$('<div class="col-md-3 col-md-offset-2"><button type="button" class="btn btn-success" id="sendAndNotPayButton" order-id="'+result.extend.meal.orderId+'">已送达未支付</button></div>');
                            var payButton=$('<div class="col-md-3"><button type="button" class="btn btn-success" id="sendAndPayButton" order-id="'+result.extend.meal.orderId+'">已送达已支付</button></div>');
                            var cancelButton=$('<div class="col-md-3"><button type="button" class="btn btn-danger" id="cancelOrderSendButton" order-id="'+result.extend.meal.orderId+'">取消订单配送</button></div>');
                            $("#sendDetailButton").append(notPayButton).append(payButton).append(cancelButton);
                        }
                        else if (result.extend.meal.status===2&&result.extend.meal.order.status===0){
                            var payButton=$('<div class="col-md-11 col-md-offset-1 text-center"><button type="button" class="btn btn-success" id="sendAndPayButton" order-id="'+result.extend.meal.orderId+'">员工已支付</button></div>');
                            $("#sendDetailButton").append(payButton);
                        }
                        else if (result.extend.meal.status===1&&result.extend.meal.order.status===1){
                            var payButton=$('<div class="col-md-4 col-md-offset-2 text-center"><button type="button" class="btn btn-success" id="sendButton" order-id="'+result.extend.meal.orderId+'">已配送</button></div>');
                            var cancelButton=$('<div class="col-md-4"><button type="button" class="btn btn-danger" id="cancelOrderSendButton" order-id="'+result.extend.meal.orderId+'">取消订单配送</button></div>');
                            $("#sendDetailButton").append(payButton).append(cancelButton);
                        }
                        //这个ajax是用于订单列表模块的
                        $.ajax({
                            url:"/user/getOrderAndOrderDetail",
                            type:"get",
                            data:"orderId="+orderId,
                            success:function (result) {
                                // console.log(result);

                                var list=result.extend.order;
                                $.each(list,function (index,item) {
                                    var foodName=$('<td>'+item.food.name+'</td>');
                                    var foodSinglePrice=$('<td>￥'+item.food.price+'</td>');
                                    var foodNum=$('<td>'+item.foodNum+'</td>');
                                    var singleTotalPrice=$('<td>￥'+item.price+'</td>');
                                    $('<tr></tr>').append(foodName)
                                        .append(foodSinglePrice)
                                        .append(foodNum)
                                        .append(singleTotalPrice)
                                        .appendTo("#orderDetailTbody");
                                })
                            }
                        })
                    }
                })
                // alert(result.extend.meal.orderId);
            }else {
                $("#contentContainer").css("display","none");
                to_page(1);
            }
        }
    })

});

// 转订单页面
function to_page(pn) {
    $.ajax({
        url:"/user/orderNotSendList",
        data:"pn="+pn,
        type:"get",
        success:function (result) {
            if (result.extend.errorPage==="403"){
                alert("您尚未登录！请先登录！");
                window.location.href = "http://localhost/user/login";
            }else if (result.extend.order.pageNum===0){
                $("#listContainer").empty();
                var divTitle=$('  <div class="row">\n' +
                    '                <div class="col-md-12"><h2>未送餐订单</h2></div>\n' +
                    '            </div><br><br>');
                var divImage=$('<div class="row"><div class="col-md-10 col-md-offset-2 text-center">' +
                    '<img src="/img/sendOrderEmpty.jpg"> </div></div>')
                $("#listContainer").append(divTitle).append(divImage);
            }
            else {
                build_order_list(result);
                build_orderPage_nav(result);
            }
        }
    })
}

// 订单列表
function build_order_list(result){
    $("#orderTbody").empty();
    $.each(result.extend.order.list,function (index,item) {
        var orderId=$('<td>'+item.orderId+'</td>');
        var sumPrice=$('<td>￥'+item.order.sumPrice+'</td>');
        if (item.order.payment===1){
            var payMethod=$('<td>余额支付</td>');
        }
        else if (item.order.payment===2){
            var payMethod=$('<td>工资支付</td>');
        }
        if(item.order.status===0){
            var orderStatus=$('<td>未支付</td>');
        }
        else if(item.order.status===1){
            var orderStatus=$('<td>已支付</td>');
        }
        else if(item.order.status===2){
            var orderStatus=$('<td>订单人已取消</td>');
        }
        else if(item.order.status===3){
            var orderStatus=$('<td>确认订单</td>');
        }
        else{
            var orderStatus=$('<td>系统已取消</td>');
        }
        var button=$('<td><button type="button" class="btn btn-primary acceptOrderButton" order-id="'+item.orderId+'">接单</button></td>');
        $("<tr></tr>").append(orderId).append(sumPrice).append(payMethod).append(orderStatus).append(button).appendTo("#orderTbody");
    })
}

// 订单设置页
function build_orderPage_nav(result){
    $("#order_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.order.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_page(1);
        });
        prePageLi.click(function () {
            to_page(result.extend.order.pageNum-1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.order.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_page(result.extend.order.pageNum+1);
        });
        lastPageLi.click(function () {
            to_page(result.extend.order.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.order.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.order.pageNum==item){
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

//接单按钮
$(document).on("click",".acceptOrderButton",function () {
    var orderId=$(this).attr("order-id");
    // alert(orderId);
    layer.confirm("您是否要接订单id为<"+orderId+">吗？", {
        title:"接单提示",icon: 3,btn: ["确定接单","取消接单"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/acceptSendOrder",
            type:"put",
            data:"orderId="+orderId,
            success:function (result) {
                layer.alert("接单成功！",{icon:1});
                $("#listContainer").css("display","none");
                $("#contentContainer").css("display","block");
                $.ajax({
                    url:"/user/getOrderAndMealAndEmployeeByOrderId",
                    type:"get",
                    data:"orderId="+orderId,
                    success:function (result) {
                        //订单信息模块
                        $("#orderDetailId").empty();
                        $("#orderDetailPlace").empty();
                        $("#orderDetailPeople").empty();
                        $("#orderDetailPeoplePhone").empty();
                        $("#orderDetailOrderStatus").empty();
                        $("#orderDetailMealStatus").empty();
                        $("#payDetailMethod").empty();
                        $("#totalMoney").empty();
                        $("#orderDetailTbody").empty();
                        $("#orderDetailId").append(result.extend.meal.orderId);
                        $("#orderDetailPlace").append(result.extend.meal.order.address);
                        $("#orderDetailPeople").append(result.extend.meal.employee.username);
                        $("#orderDetailPeoplePhone").append(result.extend.meal.employee.phone);
                        if (result.extend.meal.order.status===0){
                            $("#orderDetailOrderStatus").append("未支付");
                        }
                        else if (result.extend.meal.order.status===1){
                            $("#orderDetailOrderStatus").append("已支付");
                        }
                        else if (result.extend.meal.order.status===2){
                            $("#orderDetailOrderStatus").append("订单人已取消订单");
                        }
                        else if (result.extend.meal.order.status===3){
                            $("#orderDetailOrderStatus").append("订单人已确认收餐");
                        }
                        else {
                            $("#orderDetailOrderStatus").append("系统取消订单");
                        }
                        if (result.extend.meal.status===0){
                            $("#orderDetailMealStatus").append("未配送");
                        }
                        else if (result.extend.meal.status===1){
                            $("#orderDetailMealStatus").append("配送中");
                        }
                        else if (result.extend.meal.status===2||result.extend.meal.status===3){
                            $("#orderDetailMealStatus").append("已送达");
                        }
                        else{
                            $("#orderDetailMealStatus").append("配送失败");
                        }
                        //支付方式及其总价
                        if (result.extend.meal.order.payment===1){
                            $("#payDetailMethod").append("余额支付");
                        }
                        else if (result.extend.meal.order.payment===2){
                            $("#payDetailMethod").append("工资支付");
                        }
                        $("#totalMoney").append("￥"+result.extend.meal.order.sumPrice);
                        //按钮模块
                        if (result.extend.meal.status===1&&result.extend.meal.order.status===0){
                            var notPayButton=$('<div class="col-md-3 col-md-offset-2"><button type="button" class="btn btn-success" id="sendAndNotPayButton" order-id="'+result.extend.meal.orderId+'">已送达未支付</button></div>');
                            var payButton=$('<div class="col-md-3"><button type="button" class="btn btn-success" id="sendAndPayButton" order-id="'+result.extend.meal.orderId+'">已送达已支付</button></div>');
                            var cancelButton=$('<div class="col-md-3"><button type="button" class="btn btn-danger" id="cancelOrderSendButton" order-id="'+result.extend.meal.orderId+'">取消订单配送</button></div>');
                            $("#sendDetailButton").append(notPayButton).append(payButton).append(cancelButton);
                        }
                        else if (result.extend.meal.status===2&&result.extend.meal.order.status===0){
                            var payButton=$('<div class="col-md-11 col-md-offset-1 text-center"><button type="button" class="btn btn-success" id="sendAndPayButton" order-id="'+result.extend.meal.orderId+'">员工已支付</button></div>');
                            $("#sendDetailButton").append(payButton);
                        }
                        else if (result.extend.meal.status===1&&result.extend.meal.order.status===1){
                            var payButton=$('<div class="col-md-4 col-md-offset-2 text-center"><button type="button" class="btn btn-success" id="sendButton" order-id="'+result.extend.meal.orderId+'">已配送</button></div>');
                            var cancelButton=$('<div class="col-md-4"><button type="button" class="btn btn-danger" id="cancelOrderSendButton" order-id="'+result.extend.meal.orderId+'">取消订单配送</button></div>');
                            $("#sendDetailButton").append(payButton).append(cancelButton);
                        }
                        //这个ajax是用于订单列表模块的
                        $.ajax({
                            url:"/user/getOrderAndOrderDetail",
                            type:"get",
                            data:"orderId="+orderId,
                            success:function (result) {
                                // console.log(result);

                                var list=result.extend.order;
                                $.each(list,function (index,item) {
                                    var foodName=$('<td>'+item.food.name+'</td>');
                                    var foodSinglePrice=$('<td>￥'+item.food.price+'</td>');
                                    var foodNum=$('<td>'+item.foodNum+'</td>');
                                    var singleTotalPrice=$('<td>￥'+item.price+'</td>');
                                    $('<tr></tr>').append(foodName)
                                        .append(foodSinglePrice)
                                        .append(foodNum)
                                        .append(singleTotalPrice)
                                        .appendTo("#orderDetailTbody");
                                })
                            }
                        })
                    }
                })
            }
        })
    }, function(){
        layer.msg('取消接单', {icon: 2});
    });

});

//已送达未支付按钮
$(document).on("click","#sendAndNotPayButton",function () {
   // alert($(this).attr("order-id"));
   var orderId=$(this).attr("order-id");
    layer.confirm("您是否要点击已送达未支付这个状态吗？", {
        title:"信息提示",icon: 3,btn: ["确定","取消"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/modifyMealSendAndNotPay",
            type:"put",
            data:"orderId="+orderId,
            success:function (result) {
                if (result.extend.errorCode==="403"){
                    alert("您尚未登录！请先登录！");
                    window.location.href="http://localhost/user/login";
                }else {
                    alert("修改状态成功！");
                    window.location.href="http://localhost/user/meal";
                }
            },
            error:function () {
                layer.msg('删除错误！有事请与小c联系！', {icon: 2});
            }
        })
    }, function(){
        layer.msg('取消操作', {icon: 2});
    });
});

//已送达已支付按钮
$(document).on("click","#sendAndPayButton",function () {
    // alert($(this).attr("order-id"));
    var orderId=$(this).attr("order-id");
    layer.confirm("您是否要点击已送达已支付这个状态吗？", {
        title:"信息提示",icon: 3,btn: ["确定","取消"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/modifyMealSendAndPay",
            type:"put",
            data:"orderId="+orderId,
            success:function (result) {
                if (result.extend.errorCode==="403"){
                    alert("您尚未登录！请先登录！");
                    window.location.href="http://localhost/user/login";
                }else {
                    alert("修改状态成功！");
                    window.location.href="http://localhost/user/meal";
                }
            },
            error:function () {
                layer.msg('删除错误！有事请与小c联系！', {icon: 2});
            }
        })
    }, function(){
        layer.msg('取消操作', {icon: 2});
    });

});

//取消订单配送按钮
$(document).on("click","#cancelOrderSendButton",function () {
    // alert($(this).attr("order-id"));
    var orderId=$(this).attr("order-id");
    layer.confirm("您是否要点击取消订单配送这个状态吗？", {
        title:"信息提示",icon: 3,btn: ["确定","取消"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/modifyPay",
            type:"put",
            data:"orderId="+orderId,
            success:function (result) {
                if (result.extend.errorCode==="403"){
                    alert("您尚未登录！请先登录！");
                    window.location.href="http://localhost/user/login";
                }else {
                    alert("修改状态成功！");
                    window.location.href="http://localhost/user/meal";
                }
            },
            error:function () {
                layer.msg('删除错误！有事请与小c联系！', {icon: 2});
            }
        })
    }, function(){
        layer.msg('取消操作', {icon: 2});
    });

});

//已配送配送按钮（提前支付的情况下）
$(document).on("click","#sendButton",function () {
    // alert($(this).attr("order-id"));
    var orderId=$(this).attr("order-id");
    layer.confirm("您是否要点击已配送这个状态吗？", {
        title:"信息提示",icon: 3,btn: ["确定","取消"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/modifySend",
            type:"put",
            data:"orderId="+orderId,
            success:function (result) {
                if (result.extend.errorCode==="403"){
                    alert("您尚未登录！请先登录！");
                    window.location.href="http://localhost/user/login";
                }else {
                    alert("修改状态成功！");
                    window.location.href="http://localhost/user/meal";
                }
            },
            error:function () {
                layer.msg('删除错误！有事请与小c联系！', {icon: 2});
            }
        })
    }, function(){
        layer.msg('取消操作', {icon: 2});
    });

});