//点击菜品图片可弹出菜品详情模态框
$(document).on("click","#confirmOrderButton",function () {
    $("#confirmOrderModal").modal({
        backdrop:"static"
    });
});