package com.copa.ordermeal.model;

import lombok.Data;

/**
 * 2.26
 * 购物车类
 */
@Data
public class Cart {

    /**
     * 编号
     */
    private Integer id;

    /**
     * 菜品Id
     */
    private int foodId;

    /**
     * 订购该菜品数量
     */
    private int foodNum;

    /**
     * 员工Id
     */
    private int employeeId;
}
