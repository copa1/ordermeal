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

    // alert(name.substring(0,name.length-2));
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