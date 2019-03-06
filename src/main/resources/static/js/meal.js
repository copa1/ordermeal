$(function () {
    to_page(1);
});

// 转饮料订单页面
function to_page(pn) {
    $.ajax({
        url:"/user/orderNotSendList",
        data:"pn="+pn,
        type:"get",
        success:function (result) {
            if (result.extend.errorPage==="403"){
                alert("您尚未登录！请先登录！");
                window.location.href = "http://localhost/user/login";
            }else {
                build_order_list(result);
                build_orderPage_nav(result);
            }
        }
    })
}

// 订单列表
function build_order_list(result){
    $("#orderTbody").empty();
    $.each(result.extend.order.list,function (index,item) {
        var orderId=$('<td>'+item.orderId+'</td>');
        var sumPrice=$('<td>￥'+item.order.sumPrice+'</td>');
        if (item.order.payment===1){
            var payMethod=$('<td>余额支付</td>');
        }
        else if (item.order.payment===2){
            var payMethod=$('<td>工资支付</td>');
        }
        if(item.order.status===0){
            var orderStatus=$('<td>未支付</td>');
        }
        else if(item.order.status===1){
            var orderStatus=$('<td>已支付</td>');
        }
        else if(item.order.status===2){
            var orderStatus=$('<td>订单人已取消</td>');
        }
        else if(item.order.status===3){
            var orderStatus=$('<td>确认订单</td>');
        }
        else{
            var orderStatus=$('<td>系统已取消</td>');
        }
        var button=$('<td><button type="button" class="btn btn-primary" order-id="'+item.orderId+'">接单</button></td>');
        $("<tr></tr>").append(orderId).append(sumPrice).append(payMethod).append(orderStatus).append(button).appendTo("#orderTbody");
    })
}

// 订单设置页
function build_orderPage_nav(result){
    $("#order_setPage").empty();
    var ul=$("<ul></ul>").addClass("pagination");

    var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
    var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
    if(result.extend.order.hasPreviousPage==false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {
        firstPageLi.click(function () {
            to_page(1);
        });
        prePageLi.click(function () {
            to_page(result.extend.order.pageNum-1);
        });
    }
    var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));
    var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
    if(result.extend.order.hasNextPage==false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {
        nextPageLi.click(function () {
            to_page(result.extend.order.pageNum+1);
        });
        lastPageLi.click(function () {
            to_page(result.extend.order.pages);
        });
    }
    ul.append(firstPageLi).append(prePageLi);
    $.each(result.extend.order.navigatepageNums,function (index,item) {

        var numLi=$("<li></li>").append($("<a></a>").append(item));
        if(result.extend.order.pageNum==item){
            numLi.addClass("active");
        }
        numLi.click(function () {
            to_page(item);
        });
        ul.append(numLi);
    });
    ul.append(nextPageLi).append(lastPageLi);

    var navEle=$("<nav></nav>").append(ul);
    navEle.appendTo("#order_setPage");

}