$(function () {

    $.ajax({
        url:"/user/getOrder",
        type:"get",
        success:function (result) {
            // console.log(result);
            if(result.code===100) {
                var firstRow = $(' <div class="row">\n' +
                    '        <div class="col-md-2 col-md-offset-4">\n' +
                    '            <img src="/img/tradeSuccess.jpg" width="100" height="100">\n' +
                    '        </div>\n' +
                    '        <div class="col-md-5" style="margin-top:38px;margin-left:-25px">\n' +
                    '            <span style="font-weight: bolder;font-family: \'Microsoft YaHei UI\';font-size: 25px">恭喜您交易成功！</span>\n' +
                    '        </div>\n' +
                    '    </div><br>');
                var secondRow1 = $('<div class="row">\n' +
                    '        <div class="col-md-12"><h4>订单详情</h4></div>\n' +
                    '    </div>\n' +
                    '    <div class="row" style="background-color: #F5F4F2">\n' +
                    '        <div class="row"><div class="col-md-12" style="margin-top:8px;margin-left:20px">订单编号：'+result.extend.orderId+'</div></div>\n' +
                    '        <div class="col-md-12" style="margin-left:125px">\n' +
                    '            <table class="table table-bordered">\n' +
                    '                <thead>\n' +
                    '                <tr>\n' +
                    '                    <th>菜品名</th>\n' +
                    '                    <th>单价</th>\n' +
                    '                    <th>数量</th>\n' +
                    '                    <th>金额</th>\n' +
                    '                </tr>\n' +
                    '                </thead>\n' +
                    '                <tbody>');
                var secondRow2 = $('</tbody>\n' +
                    '            </table>\n' +
                    '        </div>\n' +
                    '    </div>');
                var thirdRow = $('<div class="row">\n' +
                    '        <div class="col-md-12 text-center">\n' +
                    '            <img src="/img/tradeSuccess.png" width="300" height="200">\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div class="row">\n' +
                    '        <div class="col-md-12 text-center">交易成功，您可以在个人中心 → 我的订单查看订单详情</div>');
                $("#orderTable").append(firstRow).append(secondRow1).append(secondRow2).append(thirdRow);
                $.each(result.extend.order,function (index,item) {
                    var tbody=$('<tr><td>'+item.food.name+'</td><td>'+item.food.price/item.foodNum+'</td><td>'+item.foodNum+'</td><td>'+item.price+'</td></tr>');
                    $("tbody").append(tbody);
                })

            }
            else {
                var div=$('<div class="row" style="margin-top: 100px">\n' +
                    '        <div class="col-md-3 col-md-offset-3">\n' +
                    '            <img src="/img/tradeFail.jpg" width="150" height="150">\n' +
                    '        </div>\n' +
                    '        <div class="col-md-5" style="margin-top:10px;margin-left:-25px">\n' +
                    '            <span style="font-weight: bolder;font-family: \'Microsoft YaHei UI\';font-size: 20px">订单支付失败，此订单不存在或参数错误</span>\n' +
                    '            <br><br>\n' +
                    '            您可以：<br><br>\n' +
                    '            1.检查刚才的输入<br>\n' +
                    '            2.去其它地方逛逛：<a href="/user/index" style="color: #337ab7"> 首页</a> | <a href="/user/userCenter" style="color: #337ab7"> 个人中心</a>\n' +
                    '        </div>\n' +
                    '    </div>');
                $("#orderTable").append(div);
            }
        }
    });

});