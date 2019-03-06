package com.copa.ordermeal.service;

import com.copa.ordermeal.model.Meal;
import com.copa.ordermeal.model.Order;

import java.util.List;

/**
 *  3.3
 *  meal表业务接口
 */
public interface MealService {

    /**
     * 送餐表添加一条记录
     * @param meal
     */
    void addMeal(Meal meal);

    /**
     * 通过员工id查出送餐表和订单表
     * @param employeeId 员工id
     * @return
     */
    List<Meal> findMealAndOrderByEmployeeId(Integer employeeId);

    /**
     * 通过订单id查询送餐-订单-员工表
     * @param orderId 订单id
     * @return
     */
    Meal findMealAndOrderAndEmployeeByOrderId(Integer orderId);

    /**
     * 通过订单id来查meal表记录
     * @param orderId 订单id
     * @return
     */
    Meal findMealByOrderId(Integer orderId);

    /**
     * 通过订单id来修改meal表的状态
     * @param orderId 订单id
     * @param num 状态码
     */
    void modifyMealStatusByOrderId(Integer orderId, Integer num);
}
