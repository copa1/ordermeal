$(function () {
    to_page(1);
});

// 转粉面菜品页面
function to_page(pn) {
    $.ajax({
        url:"/user/getFenmianInfo",
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
            '<img src="'+item.image+'" width="100%" height="133.55" class="foodDetailImage" foodId="'+item.id+'">' +
            '<div class="caption">' +
            '<h4 style="font: 16px Microsoft YaHei;font-weight: bold;">'+item.name+'</h4><p style="font: 12px Microsoft YaHei;">总共有'+item.total+'份，剩余'+item.surplus+'份</p><br><h4 style="font: 14px Microsoft YaHei;color:#E5534E;font-weight: bold;margin-top:0;margin-bottom:15px">'+item.price+'元</h4>' +
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

//点击菜品图片可弹出菜品详情模态框
$(document).on("click",".foodDetailImage",function () {
    $("#foodImageModal").empty();
    $("#foodRightDetailModal").empty();
    var foodId=$(this).attr("foodId");
    foodDetailModal(foodId);
    $("#foodDetailModal").modal({
        backdrop:"static"
    });
});

//构建视频详情模态框
function foodDetailModal(foodId) {
    $.ajax({
        url:"/user/getFoodInfoById",
        type:"get",
        data:"id="+foodId,
        success:function (result) {
            console.log(result);
            var foodImage=$('<image src="'+result.extend.food.image+'" width="400" height="262.74">');
            $("#foodImageModal").append(foodImage);
            var closeButton=$('<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-right:10px;margin-top:-25px"><span aria-hidden="true">&times;</span></button>');
            var foodMenuInfo=$('<div class="menu-info" style="font-size: 24px;\n' +
                '    font-weight: bold;"><span class="name">'+result.extend.food.name+'</span> </div>');
            var foodMenuDesc=$('<div class="menu-desc" style="word-wrap: break-word;\n' +
                '    margin-top: 32px;\n' +
                '    width: 390px;\n' +
                '    line-height: 24px;">'+result.extend.food.desc+'</div>');
            var foodNum=$('<div style="word-wrap: break-word;font-weight: bolder;\n' +
                '    \n' +
                '    \n' +
                '   ">总共有'+result.extend.food.total+'份，剩余'+result.extend.food.surplus+'份</div>');
            var foodPriceInfo=$('<div class="price-info" style="padding-top:56px;font-size: 24px;color: #e55748;\n' +
                '    clear: both;"><span class="price pricetag">'+result.extend.food.price+'元</span></div>');
            var orderButton=$('<div style="margin-top: 20px;\n' +
                '    width: 160px;\n' +
                '    height: 44px;\n' +
                '    line-height: 44px;\n' +
                '    border: 1px solid #68d381;\n' +
                '    border-bottom-color: #58B36E;\n' +
                '    -moz-border-radius: 4px;\n' +
                '    -webkit-border-radius: 4px;\n' +
                '    border-radius: 4px;\n' +
                '    text-align: center;\n' +
                '    color: #fff;\n' +
                '    cursor: pointer;    background-color: #68d381;\n' +
                '    transition: .2s ease-out;"><span style="letter-spacing:1px;">加入购物车</span> </div>');
            $("#foodRightDetailModal").append(closeButton).append(foodMenuInfo).append(foodMenuDesc).append(foodNum).append(foodPriceInfo).append(orderButton);
        }
    });

}