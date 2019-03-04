package com.copa.ordermeal.model;

import lombok.Data;

/**
 * 2.26
 * 订单明细表
 */
@Data
public class OrderDetail {

    /**
     * 订单编号,同Order类的id
     */
    private Integer id;

    /**
     * 菜品Id
     */
    private int foodId;

    /**
     * 单菜品数量
     */
    private int foodNum;

    /**
     * 价格
     */
    private double price;

    /**
     * 订单id
     */
    private int orderId;

    /**
     * 菜品
     */
    private Food food;

}
