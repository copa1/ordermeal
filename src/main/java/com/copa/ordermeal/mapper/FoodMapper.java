package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Food;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 2.26
 * food表注解版操作
 */
@Mapper
@Repository
public interface FoodMapper {

    @Select("SELECT * FROM food WHERE surplus>0 and status=1 and type=1 ORDER BY id DESC")
    List<Food> selectRiceFoodInfo();

    @Select("SELECT * FROM food WHERE surplus>0 and status=1 and type=2 ORDER BY id DESC")
    List<Food> selectFenmianFoodInfo();

    @Select("SELECT * FROM food WHERE surplus>0 and status=1 and type=3 ORDER BY id DESC")
    List<Food> selectPastryFoodInfo();

    @Select("SELECT * FROM food WHERE surplus>0 and status=1 and type=4 ORDER BY id DESC")
    List<Food> selectDrinkFoodInfo();

    @Select("SELECT * FROM food WHERE id=#{i}")
    Food selectFoodInfoById(@Param("i") Integer id);

    @Update("UPDATE food SET surplus=surplus-1 WHERE id=#{f}")
    void updateSurplusByFoodId(@Param("f") int foodId);

    @Update("UPDATE food SET surplus=surplus+#{n} WHERE id=#{i}")
    void updateSurplusByFoodNumAndFoodId(@Param("n") Integer foodNum,@Param("i") Integer foodId);

    @Select("SELECT * FROM food ORDER BY id DESC")
    List<Food> selectFoodList();

    @Update("UPDATE food SET status=#{s} WHERE id=#{f}")
    void updateStatusByFoodId(@Param("f") Integer foodId,@Param("s") Integer status);

    @Select("SELECT * FROM food ORDER BY surplus")
    List<Food> selectFoodList2();

    @Select("SELECT * FROM food ORDER BY lastModifyTime DESC")
    List<Food> selectFoodList3();

    @Select("SELECT * FROM food ORDER BY status DESC")
    List<Food> selectFoodList4();

    @Select("SELECT * FROM food WHERE name LIKE CONCAT(CONCAT('%', #{k}), '%') ")
    List<Food> selectFoodList5(@Param("k") String key);

    @Insert("INSERT INTO food(`name`,price,total,surplus,type,`desc`,image,`status`,lastModifyTime) VALUES(#{f.name},#{f.price},#{f.total},#{f.surplus},#{f.type},#{f.desc},#{f.image},#{f.status},#{f.lastModifyTime})")
    void insertFood(@Param("f") Food food);

    @Update("UPDATE food SET price=#{f.price},total=#{f.total},surplus=#{f.surplus},`desc`=#{f.desc},`status`=#{f.status},lastModifyTime=#{f.lastModifyTime} WHERE id=#{f.id}")
    void updateFoodByFoodId(@Param("f") Food food);

    @Delete("DELETE FROM food WHERE id=#{f}")
    void deleteFoodByFoodId(@Param("f") Integer foodId);

    @Select("SELECT COUNT(*) FROM food WHERE status=1")
    long countFoodUp();

    @Select("SELECT COUNT(*) FROM food WHERE status=0")
    long countFoodDown();
}
