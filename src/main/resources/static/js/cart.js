var totalMoney=0;

$(function () {
    $.ajax({
        url:"/user/getUserCartInfo",
        type:"get",
        success:function (result) {
            console.log(result);
            //该用户购物车没有菜品时
            if (result.extend.errorCode=="600"){
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
                    var deleteBtn=$('<td class="cartRight deleteBtn" style="color: #acaf8b" foodId="'+item.id+'" foodName="'+item.food.name+'"><a href="#">删除</a></td>');
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
    if (confirm("您是否要删除菜品名为<"+$(this).attr("foodName")+">的记录吗？")){
        // alert("是的");
        $.ajax({
            url:"/user/deleteCartInfo/"+foodId,
            type:"delete",
            // data:"foodId="+foodId,
            success:function () {
                alert("删除成功！");
                window.location.href="http://localhost/user/cart";
            },
            error:function () {
                alert("删除错误！有事请与小c联系！");
            }
        })
    }
});