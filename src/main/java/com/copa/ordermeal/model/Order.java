package com.copa.ordermeal.model;

import lombok.Data;

/**
 * 2.26
 * 订单类
 */
@Data
public class Order {

    /**
     * 订单编号
     */
    private Integer id;

    /**
     * 所属员工id
     */
    private int employeeId;

    /**
     * 订单总价
     */
    private double sumPrice;

    /**
     * 地址
     */
    private String address;

    /**
     * 支付方式
     * 1-余额支付 2-工资支付
     */
    private int payment;

    /**
     * 订单状态
     * 0-稍后支付（暂未支付）此状态可开始配送
     * 1-支付成功（已支付【非工资支付】）此状态可开始配送
     * 2-取消订单（用户已取消）
     * 3-确认收到菜品（已确认）
     * 4-订单被取消（官方已取消）
     */
    private int status;

    /**
     * 下单时间
     */
    private String orderTime;

    /**
     * 预计配送时间
     */
    private String edelTime;

    /**
     * 员工
     */
    private Employee employee;
}
