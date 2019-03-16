$(function () {
    to_page(1);
});

// 转面点菜品页面
function to_page(pn) {
    $.ajax({
        url:"/user/getPastryInfo",
        data:"pn="+pn,
        type:"get",
        success:function (result) {
            if (result.extend.food.size===0){
                $("#food_list").empty();
                $("#food_list").append("<h3 class='text-center'>暂没有菜品上线哦~等待工作人员上线菜品吧~</h3>");
            }
            else {
                build_food_list(result);
                build_foodPage_nav(result);
            }
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
            '<h4 style="font: 16px Microsoft YaHei;font-weight: bold;">'+item.name+'</h4><p style="font: 12px Microsoft YaHei;" class="foodNum'+item.id+'">总共有'+item.total+'份，剩余'+item.surplus+'份</p><br><h4 style="font: 14px Microsoft YaHei;color:#E5534E;font-weight: bold;margin-top:0;margin-bottom:15px">'+item.price+'元</h4>' +
            '<p><a href="#" class="btn btn-success addCart" role="button" foodId="'+item.id+'">加入购物车</a></p>' +
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

//构建菜品详情模态框
function foodDetailModal(foodId) {
    $.ajax({
        url:"/user/getFoodInfoById",
        type:"get",
        data:"id="+foodId,
        success:function (result) {
            // console.log(result);
            var foodImage=$('<image src="'+result.extend.food.image+'" width="400" height="262.74">');
            $("#foodImageModal").append(foodImage);
            var closeButton=$('<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-right:10px;margin-top:-25px"><span aria-hidden="true">&times;</span></button>');
            var foodMenuInfo=$('<div class="menu-info" style="font-size: 24px;\n' +
                '    font-weight: bold;"><span class="name">'+result.extend.food.name+'</span> </div>');
            var foodMenuDesc=$('<div class="menu-desc" style="word-wrap: break-word;\n' +
                '    margin-top: 32px;\n' +
                '    width: 390px;\n' +
                '    line-height: 24px;">'+result.extend.food.desc+'</div>');
            var foodNum=$('<div class="foodNum'+result.extend.food.id+'" style="word-wrap: break-word;font-weight: bolder;\n' +
                '    \n' +
                '    \n' +
                '   ">总共有'+result.extend.food.total+'份，剩余'+result.extend.food.surplus+'份</div>');
            var foodPriceInfo=$('<div class="price-info" style="padding-top:56px;font-size: 24px;color: #e55748;\n' +
                '    clear: both;"><span class="price pricetag">'+result.extend.food.price+'元</span></div>');
            var orderButton=$('<div class="addCart" data-dismiss="modal" foodId="'+result.extend.food.id+'" style="margin-top: 20px;\n' +
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

//添加菜品信息到购物车
$(document).on("click",".addCart",function () {
    var foodId=$(this).attr("foodId");
    $.ajax({
        url:"/user/addCartInfo",
        type:"post",
        data:"foodId="+foodId,
        async: false,//同步加载（必须加），不然就直接加两条记录！这里坑了我很久！
        success:function (result) {
            if (result.extend.errorCode==="403"){
                alert("您尚未登录！请先登录！");
                window.location.href="http://localhost/user/login";
            }else if (result.code===200){
                layer.msg('亲~该菜品已卖完或没有上架哦~挑其他菜品试试吧', {icon: 5});
            } else {
                layer.msg('亲~该菜品添加到购物车成功~o(∩_∩)o', {icon: 1});
                $(".foodNum"+result.extend.foodId).empty().append("总共有"+result.extend.total+"份，剩余"+result.extend.surplus+"份");
            }
        },
        error:function () {
            layer.msg('添加失败！', {icon: 2});
        }
    });

});