package com.copa.ordermeal.repository;

import com.copa.ordermeal.model.Meal;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository {

    List<Meal> selectMealAndOrderByEmployeeId(@Param("e") Integer employeeId);

    Meal selectMealAndOrderAndEmployeeByOrderId(@Param("o") Integer orderId);

    List<Meal> selectOrderNotSendList();
}
