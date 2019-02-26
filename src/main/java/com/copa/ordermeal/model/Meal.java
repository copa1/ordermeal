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
     */
    private int employeeId;

    /**
     * 订单Id
     */
    private int orderId;

    /**
     * 订单配送状态 0-未配送 1-配送中 2-已送达 3-配送失败
     */
    private int status;
}
