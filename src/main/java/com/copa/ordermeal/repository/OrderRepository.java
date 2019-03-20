package com.copa.ordermeal.repository;

import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.model.OrderDetail;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository {

    List<OrderDetail> selectOrderDetailByOrderId(@Param("o") Integer orderId);

    List<Order> selectOrderAndEmployeeList();

    List<Order> selectOrderNameKeyWord(@Param("k") String key);
}
