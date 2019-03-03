package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.model.OrderDetail;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * 3.3
 * order表和order_detail表注解版操作
 */
@Mapper
@Repository
public interface OrderMapper {

    @Insert("INSERT INTO `order`(employeeId,sumPrice,address,payment,status) VALUES(#{o.employeeId},#{o.sumPrice},#{o.address},#{o.payment},#{o.status})")
    void insertOrder(@Param("o") Order order);

    @Select("SELECT * FROM `order` WHERE employeeId=#{e} AND (status=0 OR status=1) ORDER BY id DESC LIMIT 1")
    Order selectByEmployId(@Param("e") Integer employId);

    @Insert("INSERT INTO order_detail(foodId,foodNum,price,orderId) VALUES(#{o.foodId},#{o.foodNum},#{o.price},#{o.orderId})")
    void insertOrderDetail(@Param("o") OrderDetail orderDetail);
}
