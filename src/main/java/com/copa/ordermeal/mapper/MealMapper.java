package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Meal;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * 3.3
 * meal表注解版操作
 */
@Mapper
@Repository
public interface MealMapper {

    @Insert("INSERT INTO meal(employeeId,orderId,status) VALUES(#{m.employeeId},#{m.orderId},#{m.status})")
    void insertMeal(@Param("m") Meal meal);
}
