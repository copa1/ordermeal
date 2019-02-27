$(function () {
    to_page(1);
});

// 转饮料小吃菜品页面
function to_page(pn) {
    $.ajax({
        url:"/user/getDrinkInfo",
        data:"pn="+pn,
        type:"get",
        success:function (result) {
            build_food_list(result);
            build_foodPage_nav(result);
        }
    })
}

// 食物列表
function build_food_list(result){
    $("#food_list").empty();
    var food=result.extend.food.list;
    $.each(food,function (index,item) {
        var div=$('<div class="col-md-4">' +
            '<div class="thumbnail text-center" style="width:213.33px;">' +
            '<img src="'+item.image+'" width="100%" height="133.55">' +
            '<div class="caption">' +
            '<h4 style="font: 16px Microsoft YaHei;font-weight: bold;">'+item.name+'</h4><br><h4 style="font: 14px Microsoft YaHei;color:#E5534E;font-weight: bold;margin-top:0;margin-bottom:15px">'+item.price+'元</h4>' +
            '<p><a href="#" class="btn btn-success" role="button">加入购物车</a></p>' +
            '</div>' +
            '</div>' +
            '</div>');
        $("#food_list").append(div);
        $(".thumbnail>img").css("height","150");
    });
    $("#contentLeft").css("height",$("#food_list").height()-18);
}

// 食物设置页
function build_foodPage_nav(result){
    $("#food_page").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.food.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_page(1);
        });
        prePageLi.click(function () {
            to_page(result.extend.food.pageNum-1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.food.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_page(result.extend.food.pageNum+1);
        });
        lastPageLi.click(function () {
            to_page(result.extend.food.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.food.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.food.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_page(item);
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#food_page");

}