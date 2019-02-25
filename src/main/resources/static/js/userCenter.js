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