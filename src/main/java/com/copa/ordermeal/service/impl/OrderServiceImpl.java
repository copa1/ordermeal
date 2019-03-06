package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.OrderMapper;
import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.model.OrderDetail;
import com.copa.ordermeal.repository.OrderRepository;
import com.copa.ordermeal.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 3.3
 * order表和order_detail表业务实现类
 */
@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void addOrder(Order order) {
        orderMapper.insertOrder(order);
    }

    @Override
    public Order findByEmployId(Integer employId) {
        return orderMapper.selectByEmployId(employId);
    }

    @Override
    public void addOrderDetail(OrderDetail orderDetail) {
        orderMapper.insertOrderDetail(orderDetail);
    }

    @Override
    public List<OrderDetail> findOrderDetailByOrderId(Integer orderId) {
        return orderRepository.selectOrderDetailByOrderId(orderId);
    }

    @Override
    public Order findByOrderId(Integer orderId) {
        return orderMapper.selectByOrderId(orderId);
    }

    @Override
    public void modifyOrderStatusByOrderId(Integer orderId, Integer num) {
        orderMapper.updateOrderStatusByOrderId(orderId,num);
    }

}
