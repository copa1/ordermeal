package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Cart;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
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
}
