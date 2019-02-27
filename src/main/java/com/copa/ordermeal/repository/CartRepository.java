package com.copa.ordermeal.repository;

import com.copa.ordermeal.model.Cart;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 2.27
 * cart表配置操作类
 */
@Repository
public interface CartRepository {

    List<Cart> selectCartListByEmployeeId(@Param("id") Integer employeeId);
}
