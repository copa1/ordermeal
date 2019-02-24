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
            var username=result.extend.employee.username;
            var phone=result.extend.employee.phone;
            phone=phone.substring(0,3)+"***"+phone.substring(7,11);
            var gender=result.extend.employee.gender;
            var email=result.extend.employee.email;
            $("#username").val(username);
            $("#phoneP").append(phone+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔已验证");
            if (gender=='M'){
                $("#gender_man").attr("checked","checked");
            }
            else if (gender=='F'){
                $("#gender_woman").attr("checked","checked");
            }
            $("#email").val(email);
        }
    })
});