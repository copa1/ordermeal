package com.copa.ordermeal.model;

import lombok.Data;

/**
 * 2.26
 * 送餐类
 */
@Data
public class Meal {

    /**
     * 配送id
     */
    private Integer id;

    /**
     * 配送员Id
     * 0-无送餐员
     * >1-有送餐员
     */
    private int employeeId;

    /**
     * 订单Id
     */
    private int orderId;

    /**
     * 订单配送状态
     * 0-未配送
     * 1-配送中
     * 2-已送达（针对工资支付员工未付款）
     * 3-已送达并付款
     * 4-配送失败（非工资支付员工没有2状态）
     */
    private int status;

    /**
     * 接单时间
     */
    private String acceptOrderTime;

    /**
     * 预计送达时间
     */
    private String esendTime;

    /**
     * 送达时间
     */
    private String sendTime;

    /**
     * 订单
     */
    private Order order;

    /**
     * 配送员
     */
    private Employee employee;
}
