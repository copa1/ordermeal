package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.FoodSaleRank;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 3.13
 * foodSaleRank表注解版操作
 */
@Mapper
@Repository
public interface FoodSaleRankMapper {

    @Select("SELECT COUNT(*) FROM foodSaleRank WHERE foodTopId=#{f}")
    long selectFoodIdCount(@Param("f") int foodId);

    @Update("UPDATE foodSaleRank SET foodTopNum=foodTopNum+#{n} WHERE foodTopId=#{i}")
    void updateFoodNumByFoodId(@Param("n") int foodNum,@Param("i") int foodId);

    @Insert("INSERT INTO foodSaleRank(foodTopId,foodTopNum) VALUES(#{i},#{n})")
    void insertFoodSaleRank(@Param("i") int foodId,@Param("n") int foodNum);

    @Select("SELECT * FROM foodSaleRank ORDER BY foodTopNum DESC")
    List<FoodSaleRank> selectAllList();

    @Delete("DELETE FROM foodSaleRank")
    void deleteAll();
}
