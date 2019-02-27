var totalMoney=0;

$(function () {
    $.ajax({
        url:"/user/getUserCartInfo",
        type:"get",
        success:function (result) {
            //该用户购物车没有菜品时
            if (result.extend.errorCode=="600"){
                $("#cartTable").empty();
                var div=$('<div class="row">\n' +
                    '        <div class="col-md-12"><h2>我的购物车</h2></div>\n' +
                    '    </div>');
                var image=$('<div class="row text-center"><div class="col-md-12"><img src="/img/cartEmpty.jpg" height="400"> </div></div>');
                var backButton=$('<br><br><div class="row">\n' +
                    '        <div class="col-md-12 text-center" style="margin-left:-20px">\n' +
                    '            <button class="btn btn-success" type="button">返回选菜</button>\n' +
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
                    var deleteBtn=$('<td class="cartRight" style="color: #acaf8b">删除</td>');
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