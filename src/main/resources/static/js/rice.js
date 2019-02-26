$(function () {
   $.ajax({
       url:"/user/getRiceInfo",
       type:"get",
       success:function (result) {
           // console.log(result);
           var food=result.extend.food;
           $.each(food,function (index,item) {
               var div=$('<div class="col-md-4">' +
                   '<div class="thumbnail text-center" style="width:213.33px;">' +
                   '<img src="'+item.image+'" width="100%" height="133.55">' +
                   '<div class="caption">' +
                   '<h4>'+item.name+'</h4>' +
                   '<p><a href="#" class="btn btn-success" role="button">加入购物车</a></p>' +
                   '</div>' +
                   '</div>' +
                   '</div>');
               $("#contentRight").append(div);
               $(".thumbnail>img").css("height","150");
           });
       }
   })
});