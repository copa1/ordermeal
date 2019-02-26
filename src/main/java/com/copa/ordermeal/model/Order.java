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
     * 订单状态
     * 1-订单提交成功（未确认）
     * 2-当订单提交成功以后24小时未支付或员工未支付时取消订单（无效）
     * 3-支付成功或选择稍后现金支付（已支付）此状态可开始配送
     * 4-支付成功后取消订单（已取消）
     * 5-确认收到菜品（已确认）
     */
    private int status;
}
