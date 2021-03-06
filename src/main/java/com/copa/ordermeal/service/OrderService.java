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

    /**
     * 通过订单id来修改订单状态
     * @param orderId
     */
    void modifyOrderStatusByOrderId(Integer orderId,Integer num);

    /**
     * 查询总订单数
     * @return
     */
    long findOrderCount();

    /**
     * 菜品出售总份数（只算送餐成功的）
     * @return
     */
    long findFoodNumSale();

    /**
     * 查找订单-员工表
     * @return
     */
    List<Order> findOrderAndEmployeeList();

    /**
     * 通过姓名查询订单
     * @param key 姓名关键字
     * @return
     */
    List<Order> findOrderNameKeyWord(String key);
}
