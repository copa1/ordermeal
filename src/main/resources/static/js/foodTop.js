$(function () {
    $("tbody").empty();
    $.ajax({
       url:"/user/topSaleFood",
       type:"get",
       async: false,//同步加载（必须加）
       success:function (result) {
           // console.log(result);
           if (result.extend.top==""){
               $("#rankTable").empty();
               var div1=$(' <div class="row">\n' +
                   '        <div class="col-md-12"><h2>售卖菜品总排行榜</h2></div>\n' +
                   '    </div>');
               var div2=$('<div class="row"><div class="col-md-12 text-center"><img src="/img/sendFoodTopEmpty.jpg"></div></div>');
               $("#rankTable").append(div1).append(div2);
           }
           else {
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
       }}
   })

});

$("#topBackButton").click(function () {
   window.location.href="/user/index";
});