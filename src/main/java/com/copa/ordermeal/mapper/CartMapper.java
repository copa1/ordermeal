package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Cart;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

/**
 * 2.28
 * cart表注解版操作
 */
@Mapper
@Repository
public interface CartMapper {

    @Delete("DELETE FROM cart WHERE id=#{f} AND employeeId=#{e}")
    void deleteCartInfoByFoodIdAndEmployeeId(@Param("f") Integer foodId,@Param("e") Integer employeeId);

    @Insert("INSERT INTO cart(foodId,foodNum,employeeId) VALUES(#{c.foodId},1,#{c.employeeId})")
    void insertCartInfo(@Param("c") Cart cart);

    @Select("SELECT COUNT(*) FROM cart WHERE foodId=#{c.foodId} AND employeeId=#{c.employeeId}")
    long countCartInfoByEmployeeIdAndFoodId(@Param("c") Cart cart);

    @Update("UPDATE cart SET foodNum=foodNum+1 WHERE foodId=#{c.foodId} AND employeeId=#{c.employeeId}")
    void updateFoodNumByEmployeeIdAndFoodId(@Param("c") Cart cart);

    @Select("SELECT * FROM cart WHERE id=#{f}")
    Cart selectCartInfoByFoodIdAndEmployeeId(@Param("f") Integer id);

    @Delete("DELETE FROM cart WHERE employeeId=#{e}")
    void deleteCartInfoByEmployeeId(@Param("e") Integer employeeId);
}
