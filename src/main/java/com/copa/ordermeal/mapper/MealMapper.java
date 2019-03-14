package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Meal;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 3.3
 * meal表注解版操作
 */
@Mapper
@Repository
public interface MealMapper {

    @Insert("INSERT INTO meal(employeeId,orderId,status) VALUES(#{m.employeeId},#{m.orderId},#{m.status})")
    void insertMeal(@Param("m") Meal meal);

    @Select("SELECT * FROM meal WHERE orderId=#{o}")
    Meal selectMealByOrderId(@Param("o") Integer orderId);

    @Update("UPDATE meal SET status=#{n} WHERE orderId=#{o}")
    void updateMealStatusByOrderId(@Param("o") Integer orderId,@Param("n") Integer num);

    @Update("UPDATE meal SET employeeId=#{e},status=1 WHERE orderId=#{o}")
    void updateMealStatusAndEmployeeIdByOrderId(@Param("e") Integer employeeId,@Param("o") Integer orderId);

    @Select("SELECT COUNT(*) FROM meal WHERE employeeId=#{e} AND status=#{s}")
    long countMealingByEmployeeId(@Param("e") Integer employeeId,@Param("s") Integer status);

    @Select("SELECT * FROM meal WHERE employeeId=#{e} AND status=1")
    Meal selectMealByEmployeeId(@Param("e") Integer employeeId);

    @Select("SELECT * FROM meal WHERE employeeId=#{e} AND status=2")
    Meal selectMealByEmployeeId2(@Param("e") Integer employeeId);

    @Select("SELECT COUNT(*) FROM meal WHERE status=2 OR status=3")
    long countMealSend();

    @Select("SELECT * FROM meal WHERE status=2 OR status=3")
    List<Meal> selectOrderSendList();

    @Update("UPDATE meal SET acceptOrderTime=#{a},esendTime=#{e} WHERE orderId=#{o}")
    void updateMealAcceptOrderTimeAndEsendTimeByOrderId(@Param("a") String acceptOrderTime,@Param("e") String esendTime,@Param("o") Integer orderId);

    @Update("UPDATE meal SET sendTime=#{s} WHERE orderId=#{o}")
    void updateSendTimeByOrderId(@Param("s") String sendTime,@Param("o") Integer orderId);

    @Select("SELECT COUNT(*) FROM meal WHERE sendTime IS NOT NULL AND orderId=#{o}")
    long countSendTImeByOrderId(@Param("o") Integer orderId);
}
