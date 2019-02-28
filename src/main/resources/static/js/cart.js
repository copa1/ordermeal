var totalMoney=0;

$(function () {
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
                $("#cartTable").empty();
                var div=$('<div class="row">\n' +
                    '        <div class="col-md-12"><h2>我的购物车</h2></div>\n' +
                    '    </div>');
                var image=$('<div class="row text-center"><div class="col-md-12"><img src="/img/cartEmpty.jpg" height="400"> </div></div>');
                var backButton=$('<br><br><div class="row">\n' +
                    '        <div class="col-md-12 text-center" style="margin-left:-20px">\n' +
                    '            <button class="btn btn-success backSelectFoodMenu" type="button">返回选菜</button>\n' +
                    '        </div>\n' +
                    '    </div>');
                $("#cartTable").append(div).append(image).append(backButton);
            }else {
                $.each(result.extend.cart,function (index,item) {
                    var foodImage=$('<td class="cartLeft"><img src="'+item.food.image+'" width="100" height="100"></td>');
                    var foodName=$('<td>'+item.food.name+'</td>');
                    var foodPrice=$('<td><span style="color:#E5534E;font-weight: bolder;">￥'+item.food.price+'</span> </td>');
                    var foodNum=$('<td style="font-weight: bold;">'+item.foodNum+'</td>');
                    var totalSingleFoodPrice=$('<td><span style="color:#E5534E;font-weight: bolder;">￥'+item.food.price*item.foodNum+'</span></td>');
                    var deleteBtn=$('<td class="cartRight deleteBtn" style="color: #acaf8b" foodData="'+item.foodId+'" foodId="'+item.id+'" foodName="'+item.food.name+'" foodNum="'+item.foodNum+'"><a href="#">删除</a></td>');
                    totalMoney=totalMoney+item.food.price*item.foodNum;
                    $("<tr></tr>").append(foodImage)
                        .append(foodName)
                        .append(foodPrice)
                        .append(foodNum)
                        .append(totalSingleFoodPrice)
                        .append(deleteBtn)
                        .appendTo("tbody");
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

//删除购物车按钮
$(document).on("click",".deleteBtn",function () {
   // alert($(this).attr("foodId"));
    var foodId=$(this).attr("foodId");
    var foodNum=$(this).attr("foodNum");
    var foodData=$(this).attr("foodData");
    layer.confirm("您是否要删除菜品名为<"+$(this).attr("foodName")+">的记录吗？", {
        title:"删除菜品警告",icon: 3,btn: ["确定删除","取消"] //按钮
    }, function(index){
        $.ajax({
            url:"/user/deleteCartInfo/"+foodId,
            type:"delete",
            data:{"foodNum":foodNum,"foodData":foodData},
            success:function (result) {
                if (result.extend.errorCode==="403"){
                    alert("您尚未登录！请先登录！");
                    window.location.href="http://localhost/user/login";
                }else {
                    alert("删除成功！");
                    window.location.href = "http://localhost/user/cart";
                }
            },
            error:function () {
                layer.msg('删除错误！有事请与小c联系！', {icon: 2});
            }
        })
    }, function(){
        layer.msg('删除取消', {icon: 2});
    });
});