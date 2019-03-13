package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.FoodSaleRank;
import com.copa.ordermeal.model.Meal;
import com.copa.ordermeal.model.OrderDetail;
import com.copa.ordermeal.service.FoodSaleRankService;
import com.copa.ordermeal.service.MealService;
import com.copa.ordermeal.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * 3.13
 * food表Controller处理
 */
@RestController
public class FoodSaleRankController {

    @Autowired
    private MealService mealService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private FoodSaleRankService foodSaleRankService;

    /**
     * 查询已经售出的菜品及其各自信息（配送成功状态才算）
     */
    @GetMapping("/user/topSaleFood")
    public Msg getFoodSaleRank(){
        foodSaleRankService.removeAll();
        List<Meal> meals=mealService.findOrderSendList();
        List<OrderDetail> orderDetails=new ArrayList<OrderDetail>();
        for (Meal meal:meals){
            orderDetails=orderService.findOrderDetailByOrderId(meal.getOrderId());
            for (OrderDetail orderDetail:orderDetails){
                long foodCount=foodSaleRankService.findFoodIdCount(orderDetail.getFoodId());
                if (foodCount>0){
                    foodSaleRankService.modifyFoodNumByFoodId(orderDetail.getFoodNum(),orderDetail.getFoodId());
                }
                else {
                    foodSaleRankService.addFoodSaleRank(orderDetail.getFoodId(),orderDetail.getFoodNum());
                }
            }
        }
        List<FoodSaleRank> foodSaleRank=foodSaleRankService.findFoodSaleRankAndFoodList();
        return Msg.success().add("top",foodSaleRank);
    }

}
