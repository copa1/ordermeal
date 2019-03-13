$(function () {
    $("tbody").empty();
    $.ajax({
       url:"/user/topSaleFood",
       type:"get",
       async: false,//同步加载（必须加）
       success:function (result) {
           // console.log(result);
           $.each(result.extend.top,function (index,item) {
               var rank=$('<td>#'+(index+1)+'</td>');
               var foodName=$('<td>'+item.food.name+'</td>');
               var foodImage=$('<td><img src="'+item.food.image+'" width="50" height="50"></td>');
               var foodNum=$('<td>'+item.foodTopNum+'</td>');
               $('<tr></tr>').append(rank)
                   .append(foodName)
                   .append(foodImage)
                   .append(foodNum)
                   .appendTo("tbody");
           });
       }
   })
});

$("#topBackButton").click(function () {
   window.location.href="/user/index";
});