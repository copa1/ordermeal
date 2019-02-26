package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Food;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 2.26
 * food表注解版操作
 */
@Mapper
@Repository
public interface FoodMapper {

    @Select("SELECT * FROM food WHERE surplus>0 and status=1 and type=1")
    List<Food> selectRiceFoodInfo();
}
