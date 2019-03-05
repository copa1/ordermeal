package com.copa.ordermeal.service;

import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.model.OrderDetail;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 *  3.3
 *  order表和order_detail表业务接口
 */
public interface OrderService {

    /**
     * 订单总表增加一条记录
     * @param order
     */
    @Transactional
    void addOrder(Order order);

    /**
     * 查出该用户最新一条总订单
     * @param employId 员工id
     */
    Order findByEmployId(Integer employId);

    /**
     * 订单详细表增加n条记录
     * @param orderDetail
     */
    @Transactional
    void addOrderDetail(OrderDetail orderDetail);

    /**
     * 通过订单id查出该用户的订单详细列表
     * @param orderId 订单id
     * @return
     */
    List<OrderDetail> findOrderDetailByOrderId(Integer orderId);

    /**
     * 通过订单id来查询订单表记录
     * @param orderId 订单id
     * @return
     */
    Order findByOrderId(Integer orderId);
}
