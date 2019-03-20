$(function () {
    to_page(1,1);
});

// 转菜品页面
function to_page(pn,listNum) {
    $.ajax({
        url:"/user/getFoodList",
        type:"get",
        // data:"pn="+pn,
        data:{pn:pn,listNum:listNum},
        success:function (result) {
            build_food_list(result);
            build_foodPage_nav(result,listNum,"");
        }
    })
}

// 转菜品页面
function to_page1(pn,listNum,key) {
    $.ajax({
        url:"/user/getFoodList",
        type:"get",
        // data:"pn="+pn,
        data:{pn:pn,listNum:listNum,key:key},
        success:function (result) {
            build_food_list1(result);
            build_foodPage_nav(result,listNum,key);
        }
    })
}

// 菜品列表
function build_food_list(result){
    if (result.extend.food.lastPage===0){
        $("#menuListContainer").empty();
        var divTitle=$('<div class="row">\n' +
            '            <div class="col-md-12"><h2>菜单管理</h2></div>\n' +
            '        </div><br><br>');
        var divImage=$('<div class="row"><div class="col-md-12 text-center">' +
            '<img src="/img/foodEmpty.jpg"> ' +
            '</div></div>');
        var backButton=$('<div class="row"><div class="col-md-12 text-center">' +
            '<button class="btn btn-success" id="backButton">返回菜品列表</button>')
        $("#menuListContainer").append(divTitle).append(divImage).append(backButton);
    }
    else {
        $("#menuTbody").empty();
        $.each(result.extend.food.list,function (index,item) {
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
            var button=$('<td> <button type="button" class="btn btn-primary btn-sm modifyFoodButton" data-id="'+item.id+'">修改</button>\n' +
                '              <button type="button" class="btn btn-danger btn-sm delFoodButton" data-id="'+item.id+'" data-name="'+item.name+'">删除</button></td>');

            $("<tr></tr>").append(foodName)
                .append(foodPrice)
                .append(total)
                .append(surplus)
                .append(type)
                .append(desc)
                .append(image)
                .append(status)
                .append(lastModifyTime)
                .append(button)
                .appendTo("#menuTbody");
        })

    }
}

// 菜品列表（给查询菜品用的）
function build_food_list1(result){
    if (result.extend.food.lastPage===0){
        $("#menuListContainer").empty();
        var divTitle=$('<div class="row">\n' +
            '            <div class="col-md-12"><h2>菜单管理</h2></div>\n' +
            '        </div><br><br>');
        var divImage=$('<div class="row"><div class="col-md-12 text-center">' +
            '<img src="/img/foodNameNotFound.jpg" height="432"> ' +
            '</div></div>');
        var backButton=$('<div class="row"><div class="col-md-12 text-center">' +
            '<button class="btn btn-success" id="backButton">返回菜品列表</button>')
        $("#menuListContainer").append(divTitle).append(divImage).append(backButton);
    }
    else {
        $("#menuTbody").empty();
        $.each(result.extend.food.list,function (index,item) {
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
            var button=$('<td> <button type="button" class="btn btn-primary btn-sm modifyFoodButton" data-id="'+item.id+'">修改</button>\n' +
                '              <button type="button" class="btn btn-danger btn-sm delFoodButton" data-id="'+item.id+'" data-name="'+item.name+'">删除</button></td>');

            $("<tr></tr>").append(foodName)
                .append(foodPrice)
                .append(total)
                .append(surplus)
                .append(type)
                .append(desc)
                .append(image)
                .append(status)
                .append(lastModifyTime)
                .append(button)
                .appendTo("#menuTbody");
        })

    }
}

// 菜品设置页
function build_foodPage_nav(result,listNum,key){
    $("#menu_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.food.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            if (listNum===1){
                to_page(1,1);
            }
            else if (listNum===2){
                to_page(1,2);
            }
            else if (listNum===3){
                to_page(1,3);
            }
            else if (listNum===4){
                to_page(1,4);
            }
            else {
                to_page1(1,5,key);
            }
        });
        prePageLi.click(function () {
            if (listNum===1){
                to_page(result.extend.food.pageNum-1,1);
            }
            else if (listNum===2){
                to_page(result.extend.food.pageNum-1,2);
            }
            else if (listNum===3){
                to_page(result.extend.food.pageNum-1,3);
            }
            else if (listNum===4){
                to_page(result.extend.food.pageNum-1,4);
            }
            else {
                to_page1(result.extend.food.pageNum-1,5,key);
            }
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.food.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            if (listNum===1){
                to_page(result.extend.food.pageNum+1,1);
            }
            else if (listNum===2){
                to_page(result.extend.food.pageNum+1,2);
            }
            else if (listNum===3){
                to_page(result.extend.food.pageNum+1,3);
            }
            else if (listNum===4){
                to_page(result.extend.food.pageNum+1,4);
            }
            else {
                to_page1(result.extend.food.pageNum+1,5,key);
            }
        });
        lastPageLi.click(function () {
            if (listNum===1){
                to_page(result.extend.food.pages,1);
            }
            else if (listNum===2){
                to_page(result.extend.food.pages,2);
            }
            else if (listNum===3){
                to_page(result.extend.food.pages,3);
            }
            else if (listNum===4){
                to_page(result.extend.food.pages,4);
            }
            else {
                to_page1(result.extend.food.pages,5,key);
            }
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.food.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.food.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            if (listNum===1){
                to_page(item,1);
            }
            else if (listNum===2){
                to_page(item,2);
            }
            else if (listNum===3){
                to_page(item,3);
            }
            else if (listNum===4){
                to_page(item,4);
            }
            else {
                to_page1(item,5,key);
            }
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#menu_setPage");
}

// 按菜品剩余份数排序按钮
$(document).on("click","#foodSurplusButton",function () {
    to_page(1,2);
});

// 按菜品类型排序按钮
$(document).on("click","#foodTypeButton",function () {
    to_page(1,3);
});

// 按上架状态排序按钮
$(document).on("click","#foodStatusButton",function () {
    to_page(1,4);
});

//搜索模糊关键字
$(document).on("click","#searchFoodNameButton",function () {
    var searchFoodName=$("#searchFoodNameInput");
    if (searchFoodName.val().trim()==="" || searchFoodName.val().trim().length===0){
        layer.msg("亲~菜品名不能为空哦~",{icon:"0"});
        return false;
    }
    else {
        to_page1(1,5,searchFoodName.val());
    }
});

// 返回菜品按钮
$(document).on("click","#backButton",function () {
    window.location.href="http://localhost/user/menu";
});

var addFoodName=$("#name");
var addFoodPrice=$("#price");
var addFoodTotal=$("#total");
var addFoodSurplus=$("#surplus");
// var addFoodType=$("#type");
var addFoodDesc=$("#desc");
// var addFoodImage=$("#imgTest");
var addFoodStatus;

// 添加菜品按钮
$("#insertMenuButton").click(function () {
    $("#insertMenuForm")[0].reset();
    $("#insertMenuForm span").text("");
    $("#insertMenuForm div").removeClass("has-error");
    $("#insertMenuForm div").removeClass("has-success");
    $("#insertMenuModal").modal({
        backdrop:"static"
    });
});

//菜品名输入框失去焦点（添加）
addFoodName.blur(function () {
    if (addFoodName.val()==="" || addFoodName.val().length===0){
        userInfoDeal("nameDiv","has-success","has-error","亲~菜品名不能为空哦~");
    }else {
        userInfoDeal("nameDiv", "has-error", "has-success", "");
    }
});
//菜品名输入框获得焦点（添加）
addFoodName.focus(function () {
    removeMessage("helpBlockName","nameDiv");
});

//菜品单价输入框失去焦点（添加）
addFoodPrice.blur(function () {
    var regPrice=new RegExp("^(?!0+(?:\\.0+)?$)(?:[1-9]\\d*|0)(?:\\.\\d{1,2})?$");
    if (addFoodPrice.val().trim()==="" || addFoodPrice.val().trim().length===0){
        userInfoDeal("priceDiv","has-success","has-error","亲~菜品单价不能为空哦~");
    }else if (!regPrice.test(addFoodPrice.val())){
        userInfoDeal("priceDiv","has-success","has-error","亲~请输入纯数字，以0开头只能跟1-2位小数~不以0为开头小数可有可无");
    }
    else {
        userInfoDeal("priceDiv", "has-error", "has-success", "");
    }
});
//菜品单价输入框获得焦点（添加）
addFoodPrice.focus(function () {
    removeMessage("helpBlockPrice","priceDiv");
});

//菜品总数量输入框失去焦点（添加）
addFoodTotal.blur(function () {
    var regTotal=new RegExp("^[1-9][0-9]{0,3}$");
    if (addFoodTotal.val().trim()==="" || addFoodTotal.val().trim().length===0){
        userInfoDeal("totalDiv","has-success","has-error","亲~菜品总数量不能为空哦~");
    }else if (!regTotal.test(addFoodTotal.val())){
        userInfoDeal("totalDiv","has-success","has-error","亲~请输入纯数字，不能以0开头~且只能是1-4位正整数");
    }
    else {
        userInfoDeal("totalDiv", "has-error", "has-success", "");
    }
});
//菜品总数量输入框获得焦点（添加）
addFoodTotal.focus(function () {
    removeMessage("helpBlockTotal","totalDiv");
});

//菜品剩余份数输入框失去焦点（添加）
addFoodSurplus.blur(function () {
    var regTotal=new RegExp("^[0]{1}$");
    var regSurplus=new RegExp("^[1-9][0-9]{0,3}$");
    if (addFoodSurplus.val().trim()==="" || addFoodSurplus.val().trim().length===0){
        userInfoDeal("surplusDiv","has-success","has-error","亲~菜品剩余数量不能为空哦~");
    }
    else if (regTotal.test(addFoodSurplus.val())||regSurplus.test(addFoodSurplus.val())){
        userInfoDeal("surplusDiv", "has-error", "has-success", "");
    }
    else {
        userInfoDeal("surplusDiv","has-success","has-error","亲~请输入纯数字，以0开头只能输入0；不以0开头的只能是1-4位正整数");
    }
});

//菜品剩余份数输入框获得焦点（添加）
addFoodSurplus.focus(function () {
    removeMessage("helpBlockSurplus","surplusDiv");
});

// 上传图片
function imgChange() {
    var type="file"; //后台接收时需要的参数名称
    var id="imgTest";  //即input的id，用来寻找值
    var formData=new FormData();
    formData.append(type, $("#"+id)[0].files[0]);    //生成一对表单属性
    $.ajax({
        type: "POST",                      //因为是传输文件，所以必须是post
        url: '/user/uploadFood',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            if(data.code=='100'){
                /*alert($("#imgTest").val());
                alert("头像更换成功！需要重新登录设置才能生效！");
                window.location.href = "http://localhost/user/logout";*/
                layer.msg("您已选择一张图片~",{icon:1});
                $("#addImageSpan").text("已选择1张图片！").css("color","black");
                $("#insertFoodImageUrlHidden").val(data.extend.avatarUrl);
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

//添加菜品按钮（模态框）
$("#insertFoodModalButton").click(function () {
    // alert($("#insertFoodImageUrlHidden").val());
    //alert(Number(addFoodSurplus.val())<=Number(addFoodTotal.val()));
    var addFoodStatus= $('input:radio[name="status"]:checked').val();

  // 空值判断
    if (addFoodName.val().trim()==="" || addFoodName.val().trim().length===0){
        layer.msg("亲~菜品名不能为空哦~",{icon:"0"});
        userInfoDeal("nameDiv","has-success","has-error","亲~菜品名不能为空哦~");
        return false;
    }
    if (addFoodPrice.val().trim()==="" || addFoodPrice.val().trim().length===0){
        layer.msg("亲~菜品单价不能为空哦~",{icon:"0"});
        userInfoDeal("priceDiv","has-success","has-error","亲~菜品单价不能为空哦~");
        return false;
    }
    if (addFoodTotal.val().trim()==="" || addFoodTotal.val().trim().length===0){
        layer.msg("亲~菜品总数量不能为空哦~",{icon:"0"});
        userInfoDeal("totalDiv","has-success","has-error","亲~菜品总数量不能为空哦~");
        return false;
    }
    if (addFoodSurplus.val().trim()==="" || addFoodSurplus.val().trim().length===0){
        layer.msg("亲~菜品剩余数量不能为空哦~",{icon:"0"});
        userInfoDeal("surplusDiv","has-success","has-error","亲~菜品剩余数量不能为空哦~");
        return false;
    }
    if ($("#type").val()==0){
        layer.msg("亲~菜品类型不能为空哦~",{icon:"0"});
        $("#helpBlockType").text("亲~菜品类型不能为空哦~");
        return false;
    }
    $("#helpBlockType").text("");
    if ($("#insertFoodImageUrlHidden").val()==="" ||$("#insertFoodImageUrlHidden").val().length===0){
        layer.msg("亲~菜品图片不能为空哦~",{icon:"0"});
        $("#addImageSpan").text("亲~菜品图片不能为空哦~").css("color","red");
        return false;
    }
    if (addFoodStatus==null){
        layer.msg("亲~菜品状态不能为空哦~",{icon:"0"});
        $("#helpBlockStatus").text("亲~菜品状态不能为空哦~").css("color","red");
        return false;
    }
    $("#helpBlockStatus").text("");

    //正则表达式判断及其细节
    var regPrice=new RegExp("^(?!0+(?:\\.0+)?$)(?:[1-9]\\d*|0)(?:\\.\\d{1,2})?$");
    if (!regPrice.test(addFoodPrice.val())){
        layer.msg("亲~请输入纯数字，以0开头只能跟1-2位小数~不以0为开头小数可有可无",{icon:"0"});
        userInfoDeal("priceDiv","has-success","has-error","亲~请输入纯数字，以0开头只能跟1-2位小数~不以0为开头小数可有可无");
        return false;
    }
    var regTotal=new RegExp("^[1-9][0-9]{0,3}$");
    if (!regTotal.test(addFoodTotal.val())){
        layer.msg("亲~请输入纯数字，不能以0开头~且只能是1-4位正整数",{icon:"0"});
        userInfoDeal("totalDiv","has-success","has-error","亲~请输入纯数字，不能以0开头~且只能是1-4位正整数");
        return false;
    }
    regTotal=new RegExp("^[0]{1}$");
    var regSurplus=new RegExp("^[1-9][0-9]{0,3}$");
    if (!regTotal.test(addFoodSurplus.val())&&!regSurplus.test(addFoodSurplus.val())){
        layer.msg("亲~请输入纯数字，以0开头只能输入0；不以0开头的只能是1-4位正整数",{icon:"0"});
        userInfoDeal("surplusDiv","has-success","has-error","亲~请输入纯数字，以0开头只能输入0；不以0开头的只能是1-4位正整数");
        return false;
    }

    else {
        $.ajax({
            url:"/user/addFood",
            type:"post",
            data:{
                name:addFoodName.val().trim(),
                price:addFoodPrice.val().trim(),
                total:addFoodTotal.val().trim(),
                surplus:addFoodSurplus.val(),
                type:$("#type").val(),
                desc:addFoodDesc.val(),
                image:$("#insertFoodImageUrlHidden").val(),
                status:$('input:radio[name="status"]:checked').val()
            },
            success:function (result) {
                if (result.extend.errorPage === "403") {
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/user/login";
                }
                else if (result.extend.errorCode==="600"){
                    layer.msg("亲~菜品剩余数量不能大于菜品总数量哦~",{icon:"0"});
                    userInfoDeal("surplusDiv","has-success","has-error","亲~菜品剩余数量不能大于菜品总数量哦~");
                }
                else {
                    alert("添加菜品成功！");
                    window.location.href = "/user/menu";
                }
            },
            error:function (result) {
                layer.msg("添加菜品错误！有事请与小c联系~",{icon:2});
            }
        })
    }
    
});


var updateFoodPrice=$("#updatePrice");
var updateFoodTotal=$("#updateTotal");
var updateFoodSurplus=$("#upadateSurplus");
var updateFoodDesc=$("#updateDesc");
var upadteFoodStatus;

//菜品单价输入框失去焦点（修改）
updateFoodPrice.blur(function () {
    var regPrice=new RegExp("^(?!0+(?:\\.0+)?$)(?:[1-9]\\d*|0)(?:\\.\\d{1,2})?$");
    if (updateFoodPrice.val()==="" || updateFoodPrice.val().length===0){
        userInfoDeal("updatePriceDiv","has-success","has-error","亲~菜品单价不能为空哦~");
    }else if (!regPrice.test(updateFoodPrice.val())){
        userInfoDeal("updatePriceDiv","has-success","has-error","亲~请输入纯数字，以0开头只能跟1-2位小数~不以0为开头小数可有可无");
    }
    else {
        userInfoDeal("updatePriceDiv", "has-error", "has-success", "");
    }
});
//菜品单价输入框获得焦点（修改）
updateFoodPrice.focus(function () {
    removeMessage("helpBlockUpdatePrice","updatePriceDiv");
});

//菜品总数量输入框失去焦点（修改）
updateFoodTotal.blur(function () {
    var regTotal=new RegExp("^[1-9][0-9]{0,3}$");
    if (updateFoodTotal.val()==="" || updateFoodTotal.val().length===0){
        userInfoDeal("updateTotalDiv","has-success","has-error","亲~菜品总数量不能为空哦~");
    }else if (!regTotal.test(updateFoodTotal.val())){
        userInfoDeal("updateTotalDiv","has-success","has-error","亲~请输入纯数字，不能以0开头~且只能是1-4位正整数");
    }
    else {
        userInfoDeal("updateTotalDiv", "has-error", "has-success", "");
    }
});
//菜品总数量输入框获得焦点（修改）
updateFoodTotal.focus(function () {
    removeMessage("helpBlockUpdateTotal","updateTotalDiv");
});

//菜品剩余份数输入框失去焦点（修改）
updateFoodSurplus.blur(function () {
    var regTotal=new RegExp("^[0]{1}$");
    var regSurplus=new RegExp("^[1-9][0-9]{0,3}$");
    if (updateFoodSurplus.val()==="" || updateFoodSurplus.val().length===0){
        userInfoDeal("updateSurplusDiv","has-success","has-error","亲~菜品剩余数量不能为空哦~");
    }else if (regTotal.test(updateFoodSurplus.val())||regSurplus.test(updateFoodSurplus.val())){
        userInfoDeal("updateSurplusDiv", "has-error", "has-success", "");
    }
    else {
        userInfoDeal("updateSurplusDiv","has-success","has-error","亲~请输入纯数字，以0开头只能输入0；不以0开头的只能是1-4位正整数");
    }
});

//菜品剩余份数输入框获得焦点（修改）
updateFoodSurplus.focus(function () {
    removeMessage("helpBlockUpdateSurplus","updateSurplusDiv");
});


//修改按钮打开模态框
$(document).on("click",".modifyFoodButton",function () {
    // alert($(this).attr("data-id"));
    $("#updateMenuForm")[0].reset();
    $("#updateMenuForm span").text("");
    $("#updateMenuForm div").removeClass("has-error");
    $("#updateMenuForm div").removeClass("has-success");
    $.ajax({
        url:"/user/getFoodInfoById",
        type:"get",
        data:"id="+$(this).attr("data-id"),
        success:function (result) {
            $("#updateName").append(result.extend.food.name);
            $("#updatePrice").val(result.extend.food.price);
            $("#updateTotal").val(result.extend.food.total);
            $("#upadateSurplus").val(result.extend.food.surplus);
            $("#updateFoodModalButton").attr("data-id",result.extend.food.id);
            if (result.extend.food.type===1){
                $("#updateType").append("饭食");
            }
            else if (result.extend.food.type===2){
                $("#updateType").append("粉面");
            }
            else if (result.extend.food.type===3){
                $("#updateType").append("面点");
            }
            else{
                $("#updateType").append("饮料小吃");
            }
            $("#updateDesc").val(result.extend.food.desc);
            $("#avatarImg").attr("src",result.extend.food.image);
            if (result.extend.food.status==="0"){
                $("#foodStatus1").attr("checked",false);
                $("#foodStatus2").attr("checked","checked");
            }
            else if  (result.extend.food.status==="1"){
                $("#foodStatus2").attr("checked",false);
                $("#foodStatus1").attr("checked","checked");
            }
        }
    });
    $("#updateMenuModal").modal({
        backdrop:"static"
    });
});

//修改菜品按钮（模态框内）
$("#updateFoodModalButton").click(function () {
    var updateFoodStatus= $('input:radio[name="status"]:checked').val();

    // 空值判断
    if (updateFoodPrice.val()==="" || updateFoodPrice.val().length===0){
        layer.msg("亲~菜品单价不能为空哦~",{icon:"0"});
        userInfoDeal("updatePriceDiv","has-success","has-error","亲~菜品单价不能为空哦~");
        return false;
    }
    if (updateFoodTotal.val()==="" || updateFoodTotal.val().length===0){
        layer.msg("亲~菜品总数量不能为空哦~",{icon:"0"});
        userInfoDeal("updateTotalDiv","has-success","has-error","亲~菜品总数量不能为空哦~");
        return false;
    }
    if (updateFoodSurplus.val()==="" || updateFoodSurplus.val().length===0){
        layer.msg("亲~菜品剩余数量不能为空哦~",{icon:"0"});
        userInfoDeal("updateSurplusDiv","has-success","has-error","亲~菜品剩余数量不能为空哦~");
        return false;
    }
    if (updateFoodStatus==null){
        layer.msg("亲~菜品状态不能为空哦~",{icon:"0"});
        $("#helpBlockUpdateStatus").text("亲~菜品状态不能为空哦~").css("color","red");
        return false;
    }
    $("#helpBlockUpdateStatus").text("");

    //正则表达式判断及其细节
    var regPrice=new RegExp("^(?!0+(?:\\.0+)?$)(?:[1-9]\\d*|0)(?:\\.\\d{1,2})?$");
    if (!regPrice.test(updateFoodPrice.val())){
        layer.msg("亲~请输入纯数字，以0开头只能跟1-2位小数~不以0为开头小数可有可无",{icon:"0"});
        userInfoDeal("updatePriceDiv","has-success","has-error","亲~请输入纯数字，以0开头只能跟1-2位小数~不以0为开头小数可有可无");
        return false;
    }
    var regTotal=new RegExp("^[1-9][0-9]{0,3}$");
    if (!regTotal.test(updateFoodTotal.val())){
        layer.msg("亲~请输入纯数字，不能以0开头~且只能是1-4位正整数",{icon:"0"});
        userInfoDeal("updateTotalDiv","has-success","has-error","亲~请输入纯数字，不能以0开头~且只能是1-4位正整数");
        return false;
    }
    regTotal=new RegExp("^[0]{1}$");
    var regSurplus=new RegExp("^[1-9][0-9]{0,3}$");
    if (!regTotal.test(updateFoodSurplus.val())&&!regSurplus.test(updateFoodSurplus.val())){
        layer.msg("亲~请输入纯数字，以0开头只能输入0；不以0开头的只能是1-4位正整数",{icon:"0"});
        userInfoDeal("updateSurplusDiv","has-success","has-error","亲~请输入纯数字，以0开头只能输入0；不以0开头的只能是1-4位正整数");
        return false;
    }
    else {
        $.ajax({
            url:"/user/updateFoodById",
            type:"put",
            data:{
                id:$(this).attr("data-id"),
                price:updateFoodPrice.val(),
                total:updateFoodTotal.val(),
                surplus:updateFoodSurplus.val(),
                desc:updateFoodDesc.val(),
                status:$('input:radio[name="status"]:checked').val()
            },
            success:function (result) {
                if (result.extend.errorPage === "403") {
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/user/login";
                }
                else if (result.extend.errorCode==="600"){
                    layer.msg("亲~菜品剩余数量不能大于菜品总数量哦~",{icon:"0"});
                    userInfoDeal("surplusDiv","has-success","has-error","亲~菜品剩余数量不能大于菜品总数量哦~");
                }
                else {
                    alert("修改菜品成功！");
                    window.location.href = "/user/menu";
                }
            },
            error:function (result) {
                layer.msg("添加菜品错误！有事请与小c联系~",{icon:2});
            }
        })
    }
});

// 删除按钮
$(document).on("click",".delFoodButton",function () {
    var foodId=$(this).attr("data-id");
    layer.confirm("您是否要删除菜品名为【"+$(this).attr("data-name")+"】吗？", {
        title:"信息提示",icon: 3,btn: ["确定删除","取消"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/deleteFoodById/"+foodId,
            type: 'delete',
            success:function (result) {
                if (result.extend.errorPage === "403") {
                    alert("您尚未登录！请先登录！");
                    window.location.href = "http://localhost/user/login";
                } else {
                    alert("删除成功！");
                    window.location.href = "/user/menu";
                }
            }
        })
    }, function(){
        layer.msg('取消删除操作', {icon: 2});
    });

});

//点入输入框处理
function removeMessage(spanEle,divEle) {
    $("#"+spanEle).text("");
    $("#"+divEle).removeClass("has-success","has-error");
}

//菜单管理员填写信息后处理
function userInfoDeal(ele,removeClass,addClass,msg) {
    $("#"+ele).addClass(addClass);
    $("#"+ele+" span").text(msg);
    $("#"+ele).removeClass(removeClass);
}
