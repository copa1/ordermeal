$(function () {
    clearDiv();
    $(".welcome-pageLi").addClass("active");
    $("#welcome-page").css("display","block");
    $.ajax({
        url:"/admin/welcomePage",
        type:"get",
        success:function (result) {
            if (result.extend.errorPage === "403") {
                alert("您尚未登录！请先登录！");
                window.location.href = "http://localhost/admin/login";
            } else {
                $("#orderCount,#mealCount,#foodSaleCount,#foodUpCount,#foodDownCount").empty();
                $("#orderCount").append(result.extend.orderCount);
                $("#mealCount").append(result.extend.mealCount);
                $("#foodSaleCount").append(result.extend.foodSaleCount);
                $("#foodUpCount").append(result.extend.foodUpCount);
                $("#foodDownCount").append(result.extend.foodDownCount);
            }
        }
    });

});

$(".clickLi").click(function () {
    clearDiv();
    var name=$(this).attr("class").substring(8);
    // alert(name);
    var divIdName= name.substring(0,name.length-2);
    $("."+name).addClass("active");
    $("#" + divIdName).css("display", "block");
    if (name==="welcome-pageLi"){
        $.ajax({
            url:"/admin/welcomePage",
            type:"get",
            success:function (result) {
                if (result.extend.errorPage === "403") {
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/admin/login";
                } else {
                    $("#orderCount,#mealCount,#foodSaleCount,#foodUpCount,#foodDownCount").empty();
                    $("#orderCount").append(result.extend.orderCount);
                    $("#mealCount").append(result.extend.mealCount);
                    $("#foodSaleCount").append(result.extend.foodSaleCount);
                    $("#foodUpCount").append(result.extend.foodUpCount);
                    $("#foodDownCount").append(result.extend.foodDownCount);
                }
            }
        })
    }
    else if (name==="employeeStatus-pageLi"){
        to_employeeStatusPage(1);
    }
    else if (name==="employeeRecharge-pageLi"){
        to_employeeRechargePage(1);
    }
    else if (name==="foodCheck-pageLi"){
        to_foodPage(1);
    }
    else if (name==="orderCheck-pageLi"){
        to_orderPage(1);
    }
    else if (name==="mealCheck-pageLi"){
        to_mealPage(1)
    }
});

//div模块全清
function clearDiv() {
    $(".clickLi").removeClass("active");
    $("#welcome-page,#employeeStatus-page,#employeeRecharge-page,#foodCheck-page,#orderCheck-page,#mealCheck-page").css("display","none");
}

// 转员工权限修改页面
function to_employeeStatusPage(pn) {
    $.ajax({
        url:"/admin/employeeStatusPage",
        data:"pn="+pn,
        type:"get",
        success:function (result) {
            build_employeeStatusPage_list(result);
            build_employeeStatusPage_nav(result);
        }
    })
}

// 员工权限修改列表
function build_employeeStatusPage_list(result){
    $("#employeeList1Tbody").empty();
    $.each(result.extend.employee.list,function (index,item) {
        var id=$("<td></td>").append(item.id);
        var username=$("<td></td>").append(item.username);
        var phone=$("<td></td>").append(item.phone);
        if (item.gender==='M'){
            var gender=$("<td></td>").append("女");
        }
        else if (item.gender==='F'){
            var gender=$("<td></td>").append("男");
        }

        var email=$("<td></td>").append(item.email);
        var realName=$("<td></td>").append(item.realName);
        var avatar=$('<td><img src="'+item.avatar+'" width="50" height="50"> </td>').append();
        var recentlyLanded=$("<td></td>").append(item.recentlyLanded);
        var account=$("<td></td>").append("￥"+item.account);
        var roleId;
        $.each(item.roles,function () {
            if (this.name==="ROLE_EMPLOYEE"){
                roleId=$("<td></td>").append("普通员工");
            }else if (this.name==="ROLE_TAKER"){
                roleId=$("<td></td>").append("送餐员");
            }
            else if (this.name==="ROLE_ADMIN"){
                roleId=$("<td></td>").append("菜单管理员");
            }else {
                roleId=$("<td></td>").append("注销员工");
            }
        });

        var button=$('<td><button type="button" class="btn btn-info openEmployeeRoleModal" data-id="'+item.id+'">修改权限</button></td>');
        $('<tr></tr>').append(id)
            .append(username)
            .append(phone)
            .append(gender)
            .append(email)
            .append(realName)
            .append(avatar)
            .append(recentlyLanded)
            .append(account)
            .append(roleId)
            .append(button).appendTo("#employeeList1Tbody");
    })
}

// 员工权限设置页
function build_employeeStatusPage_nav(result){
    $("#employeeList1Tbody_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.employee.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_employeeStatusPage(1);
        });
        prePageLi.click(function () {
            to_employeeStatusPage(result.extend.employee.pageNum-1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.employee.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_employeeStatusPage(result.extend.employee.pageNum+1);
        });
        lastPageLi.click(function () {
            to_employeeStatusPage(result.extend.employee.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.employee.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.employee.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_employeeStatusPage(item);
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#employeeList1Tbody_setPage");

}

//修改权限界面修改按钮
$(document).on("click",".openEmployeeRoleModal",function () {
    $("#usernameRoleModal").empty();
    $("#realNameRoleModal").empty();
    $("form")[0].reset();
    // $("input[name='roleId']").attr("checked",false);
    $.ajax({
        url:"/admin/getEmployeeRoleStatus",
        type:"get",
        data:"employeeId="+$(this).attr("data-id"),
        success:function (result) {
            // console.log(result);
            $("#modifyRoleButton").attr("data-id",result.extend.employee.id);
            $("#usernameRoleModal").append(result.extend.employee.username);
            $("#realNameRoleModal").append(result.extend.employee.realName);
            $.each(result.extend.employee.roles,function () {
                if (this.name==="ROLE_EMPLOYEE"){
                    $("#roleId").val(1).attr("selected","selected");
                }
                else if (this.name==="ROLE_TAKER"){
                    $("#roleId").val(2).attr("selected","selected");
                }
                else if (this.name==="ROLE_ADMIN"){
                    $("#roleId").val(3).attr("selected","selected");
                }else {
                    $("#roleId").val(0).attr("selected","selected");
                }
            });
        }
    });
    $('#employeeModifyRoleModal').modal({
        backdrop: "static"
    })
});

//修改权限界面模态框里的修改权限按钮
$("#modifyRoleButton").click(function () {
    var employeeId=$(this).attr("data-id");
    layer.confirm("您是否要修改员工姓名为【"+$("#realNameRoleModal").text()+"】吗？", {
        title:"修改员工权限提示",icon: 3,btn: ["确定修改","取消"] //按钮
    }, function(index){
        $.ajax({
            url:"/admin/modifyEmployeeRole/"+employeeId,
            type: "put",
            data:{roleId:$("#roleId").val()},
            dataType:"json",
            success:function (result) {
                if (result.extend.errorPage === "403") {
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/admin/login";
                } else {
                    layer.alert("修改权限成功！");
                    $('#employeeModifyRoleModal').modal('hide');
                    to_employeeStatusPage(1);
                }
            }
        })
    }, function(){
        layer.msg('取消修改权限操作', {icon: 2});
    });
});

// 转员工充值页面
function to_employeeRechargePage(pn) {
    $.ajax({
        url:"/admin/employeeStatusPage",
        data:"pn="+pn,
        type:"get",
        success:function (result) {
            build_employeeRechargePage_list(result);
            build_employeeRechargePage_nav(result);
        }
    })
}

// 员工权限修改列表
function build_employeeRechargePage_list(result){
    $("#employeeList2Tbody").empty();
    $.each(result.extend.employee.list,function (index,item) {
        var id=$("<td></td>").append(item.id);
        var username=$("<td></td>").append(item.username);
        var realName=$("<td></td>").append(item.realName);
        var account=$("<td></td>").append("￥"+item.account);
        var button=$('<td><button type="button" class="btn btn-info openEmployeeRechargeModal" data-id="'+item.id+'">充值</button></td>');
        $('<tr></tr>').append(id)
            .append(username)
            .append(realName)
            .append(account)
            .append(button).appendTo("#employeeList2Tbody");
    })
}

// 员工权限设置页
function build_employeeRechargePage_nav(result){
    $("#employeeList2Tbody_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.employee.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_employeeRechargePage(1);
        });
        prePageLi.click(function () {
            to_employeeRechargePage(result.extend.employee.pageNum-1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.employee.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_employeeRechargePage(result.extend.employee.pageNum+1);
        });
        lastPageLi.click(function () {
            to_employeeRechargePage(result.extend.employee.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.employee.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.employee.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_employeeRechargePage(item);
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#employeeList2Tbody_setPage");
}

//充值按钮，弹出模态框
$(document).on("click",".openEmployeeRechargeModal",function () {
    $("#realNameRechargeModal").empty();
    $("#employeeRecharge").val("");
    $.ajax({
        url:"/admin/getEmployeeRoleStatus",
        type:"get",
        data:"employeeId="+$(this).attr("data-id"),
        success:function (result) {
            // console.log(result);
            $("#rechargeButton").attr("data-id",result.extend.employee.id);
            $("#realNameRechargeModal").append(result.extend.employee.realName);
        }
    });
    $('#employeeRechargeModal').modal({
        backdrop: "static"
    })
});

//充值按钮处理
$("#rechargeButton").click(function () {
    var employeeId=$(this).attr("data-id");
    var regPrice=new RegExp("^(?!0+(?:\\.0+)?$)(?:[1-9]\\d*|0)(?:\\.\\d{1,2})?$");
    if (!regPrice.test($("#employeeRecharge").val())){
        layer.msg("亲~请输入纯数字，以0开头只能跟1-2位小数~不以0为开头小数可有可无",{icon:"0"});
        return false;
    }
    layer.confirm("您是否要为员工姓名为【"+$("#realNameRechargeModal").text()+"】充值【"+$("#employeeRecharge").val()+"元】吗？", {
        title:"充值提示",icon: 3,btn: ["确定充值","取消"] //按钮
    }, function(index){
        $.ajax({
            url:"/admin/modifyEmployeeAccount/"+employeeId,
            type: "put",
            data:{account:$("#employeeRecharge").val()},
            dataType:"json",
            success:function (result) {
                if (result.extend.errorPage === "403") {
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/admin/login";
                } else {
                    layer.alert("充值成功！");
                    $('#employeeRechargeModal').modal('hide');
                    to_employeeRechargePage(1);
                }
            }
        })
    }, function(){
        layer.msg('取消充值', {icon: 2});
    });
});


// 转菜品列表页面
function to_foodPage(pn) {
    $.ajax({
        url:"/admin/getFoodList",
        type:"get",
        data:"pn="+pn,
        success:function (result) {
            build_foodPage_list(result);
            build_foodPage_nav(result);
        }
    })
}

// 菜品列表
function build_foodPage_list(result){
        $("#foodListTbody").empty();
        $.each(result.extend.food.list,function (index,item) {
            var foodId=$('<td>'+item.id+'</td>');
            var foodName=$('<td>'+item.name+'</td>');
            var foodPrice=$('<td>￥'+item.price+'</td>');
            var total=$('<td>'+item.total+'</td>');
            var surplus=$('<td>'+item.surplus+'</td>');
            if (item.type===1){
                var type=$('<td>饭食</td>');
            }
            else if (item.type===2){
                var type=$('<td>粉面</td>');
            }
            else if (item.type===3){
                var type=$('<td>面点</td>');
            }
            else{
                var type=$('<td>饮料小吃</td>');
            }
            var desc=$('<td>'+item.desc+'</td>');
            var image=$('<td><img src="'+item.image+'" width="50" height="50"></td>');
            if (item.status==="0"){
                var status=$('<td>已下架</td>');
            }
            else if (item.status==="1"){
                var status=$('<td>上架中</td>');
            }
            var lastModifyTime=$('<td>'+item.lastModifyTime+'</td>');
            $("<tr></tr>").append(foodId)
                .append(foodName)
                .append(foodPrice)
                .append(total)
                .append(surplus)
                .append(type)
                .append(desc)
                .append(image)
                .append(status)
                .append(lastModifyTime)
                .appendTo("#foodListTbody");
        })
}

// 菜品列表设置页
function build_foodPage_nav(result){
    $("#foodTbody_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.food.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_foodPage(1);
        });
        prePageLi.click(function () {
            to_foodPage(result.extend.food.pageNum-1,1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.food.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_foodPage(result.extend.food.pageNum+1);
        });
        lastPageLi.click(function () {
            to_foodPage(result.extend.food.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.food.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.food.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_foodPage(item);
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#foodTbody_setPage");
}

// 转订单列表页面
function to_orderPage(pn) {
    $.ajax({
        url:"/admin/getOrderList",
        type:"get",
        data:"pn="+pn,
        success:function (result) {
            build_orderPage_list(result);
            build_orderPage_nav(result);
        }
    })
}

// 订单列表
function build_orderPage_list(result){
    $("#orderListTbody").empty();
    $.each(result.extend.order.list,function (index,item) {
        var orderId=$('<td>'+item.id+'</td>');
        var orderRealName=$('<td>'+item.employee.realName+'</td>');
        var orderPrice=$('<td>￥'+item.sumPrice+'</td>');
        var orderAddress=$('<td>'+item.address+'</td>');
        if (item.payment===1){
            var orderPayment=$('<td>余额支付</td>');
        }
        else {
            var orderPayment=$('<td>工资支付</td>');
        }
        if (item.status===0){
            var orderStatus=$('<td>未支付</td>');
        }
        else if (item.status===1){
            var orderStatus=$('<td>已支付</td>');
        }
        else if (item.status===2){
            var orderStatus=$('<td>订单人取消订单</td>');
        }
        else if (item.status===3){
            var orderStatus=$('<td>已确认收餐</td>');
        }
        else {
            var orderStatus=$('<td>系统取消订单</td>');
        }
        var button=$('<td><button type="button" class="btn btn-info openOrderModal" data-id="'+item.id+'">查看详情</button></td>');
        $("<tr></tr>").append(orderId)
            .append(orderRealName)
            .append(orderPrice)
            .append(orderAddress)
            .append(orderPayment)
            .append(orderStatus)
            .append(button)
            .appendTo("#orderListTbody");
    })
}

// 订单列表设置页
function build_orderPage_nav(result){
    $("#orderTbody_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.order.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_orderPage(1);
        });
        prePageLi.click(function () {
            to_orderPage(result.extend.order.pageNum-1,1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.order.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_orderPage(result.extend.order.pageNum+1);
        });
        lastPageLi.click(function () {
            to_orderPage(result.extend.order.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.order.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.order.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_orderPage(item);
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#orderTbody_setPage");
}

//打开订单界面的模态框
$(document).on("click",".openOrderModal",function () {
    $("#orderModalTbody").empty();
    $("#mealSenderSpan,#mealStatusSpan").empty();

    $.ajax({
        url:"/admin/getOrderDetailByOrderId",
        type:"get",
        data:"orderId="+$(this).attr("data-id"),
        success:function (result) {
            // console.log(result);
            $.each(result.extend.order,function (index,item) {
                var foodName=$('<td>'+item.food.name+'</td>');
                var foodPrice=$('<td>￥'+item.food.price/item.foodNum+'</td>');
                var foodNum=$('<td>'+item.foodNum+'</td>');
                var foodTotalPrice=$('<td style="font-weight: bolder">￥'+item.price+'</td>');
                $('<tr></tr>').append(foodName)
                    .append(foodPrice)
                    .append(foodNum)
                    .append(foodTotalPrice).appendTo("#orderModalTbody");
            })
        }
    });

    $.ajax({
        url:"/admin/getOrderListModal",
        type:"get",
        data:"orderId="+$(this).attr("data-id"),
        success:function (result) {

            if (result.extend.order===null){
                $("#mealSenderSpan").append("暂无");
                $("#mealStatusSpan").append("未配送");
            }
            else if (result.extend.order.status===1){
                $("#mealSenderSpan").append(result.extend.order.employee.realName);
                $("#mealStatusSpan").append("配送中");
            }
            else if (result.extend.order.status===2||result.extend.order.status===3){
                $("#mealSenderSpan").append(result.extend.order.employee.realName);
                $("#mealStatusSpan").append("已送达");
            }
            else {
                $("#mealSenderSpan").append(result.extend.order.employee.realName);
                $("#mealStatusSpan").append("配送失败");
            }
        }
    });
    $('#orderModal').modal({
        backdrop: "static"
    })
});

// 转送餐列表页面
function to_mealPage(pn) {
    $.ajax({
        url:"/admin/getMealList",
        type:"get",
        data:"pn="+pn,
        success:function (result) {
            build_mealPage_list(result);
            build_mealPage_nav(result);
        }
    })
}

// 送餐列表
function build_mealPage_list(result){
    $("#mealListTbody").empty();
    $.each(result.extend.meal.list,function (index,item) {
        var mealId=$('<td>'+item.id+'</td>');
        if (item.employee.realName===null){
            var mealEmployeeName = $('<td>暂无</td>');
        }
        else{
            var mealEmployeeName = $('<td>' + item.employee.realName + '</td>');
        }
        var orderId=$('<td>'+item.orderId+'</td>');
        if (item.status===0){
            var mealStatus=$('<td>未配送</td>');
        }
        else if (item.status===1){
            var mealStatus=$('<td>配送中</td>');
        }
        if (item.status===2||item.status===3){
            var mealStatus=$('<td>已送达</td>');
        }
        if (item.status===4){
            var mealStatus=$('<td>配送失败</td>');
        }

        $("<tr></tr>").append(mealId)
            .append(mealId)
            .append(mealEmployeeName)
            .append(orderId)
            .append(mealStatus)
            .appendTo("#mealListTbody");
    })
}

// 送餐列表设置页
function build_mealPage_nav(result){
    $("#mealTbody_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.meal.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_mealPage(1);
        });
        prePageLi.click(function () {
            to_mealPage(result.extend.meal.pageNum-1,1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.meal.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_mealPage(result.extend.meal.pageNum+1);
        });
        lastPageLi.click(function () {
            to_mealPage(result.extend.meal.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.meal.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.meal.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_mealPage(item);
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#mealTbody_setPage");
}