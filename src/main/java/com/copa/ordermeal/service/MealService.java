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

    /**
     * 查出未配送的订单
     * @return
     */
    List<Meal> findOrderNotSendList();

    /**
     * 通过订单id来修改员工id和配送状态
     * @param employeeId 员工id
     * @param orderId 订单id
     */
    void modifyMealStatusAndEmployeeIdByOrderId(Integer employeeId, Integer orderId);

    /**
     * 通过配送员id来查询该配送单有没有送餐员配送
     * @param employeeId 送餐员id
     * @return
     */
    long findCheckMealingByEmployeeId(Integer employeeId,Integer status);

    /**
     * 通过配送员id来查询该配送单信息(此时配送单是配送中)
     * @param employeeId 送餐员id
     * @return
     */
    Meal findMealInfoByEmployeeId(Integer employeeId);

    /**
     * 通过订单id联合查询订单总表、送餐表和员工表（订单人id）
     * @param orderId 订单id
     * @return
     */
    Meal findOrderAndMealAndEmployeeByOrderId(Integer orderId);

    /**
     * 通过配送员id来查询该配送单信息(此时配送单是已送达)
     * @param employeeId 送餐员id
     * @return
     */
    Meal findMealInfoByEmployeeId2(Integer employeeId);

    /**
     * 查询送餐成功数
     * @return
     */
    long findMealSendCount();

    /**
     * 查找所有的送餐-员工表
     * @return
     */
    List<Meal> findMealAndEmployeeList();

    /**
     * 查出已送达的订单
     * @return
     */
    List<Meal> findOrderSendList();

    /**
     * 通过订单id修改接单时间和预计送达时间
     * @param acceptOrderTime 接单时间
     * @param esendTime 预计送达时间
     * @param orderId 订单id
     */
    void modifyMealAcceptOrderTimeAndEsendTimeByOrderId(String acceptOrderTime, String esendTime, Integer orderId);

    /**
     * 通过订单id修改送达时间
     * @param sendTime 送达时间
     * @param orderId 订单id
     */
    void modifySendTimeByOrderId(String sendTime, Integer orderId);

    /**
     * 通过订单id查找是否存在送餐时间
     * @param orderId 订单id
     * @return
     */
    long findSendTimeCountByOrderId(Integer orderId);

    /**
     * 通过送餐人关键字查找送餐信息
     * @param key
     * @return
     */
    List<Meal> findMealNameKeyWord(String key);
}
