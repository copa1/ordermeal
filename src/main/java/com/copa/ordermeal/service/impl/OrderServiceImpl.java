package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.OrderMapper;
import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.model.OrderDetail;
import com.copa.ordermeal.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 3.3
 * order表和order_detail表业务实现类
 */
@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderMapper orderMapper;

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
}
