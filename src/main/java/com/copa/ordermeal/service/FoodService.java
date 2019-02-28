package com.copa.ordermeal.service;

import com.copa.ordermeal.model.Food;

import java.util.List;

/**
 *  2.26
 *  food表业务接口
 */
public interface FoodService {

    /**
     * 查找所有关于饭食并上架的食物
     * @return
     */
    List<Food> findRiceFoodInfo();

    /**
     * 查找所有关于粉面并上架的食物
     * @return
     */
    List<Food> findFenmianFoodInfo();

    /**
     * 查找所有关于面点并上架的食物
     * @return
     */
    List<Food> findPastryFoodInfo();

    /**
     * 查找所有关于饮料小吃并上架的食物
     * @return
     */
    List<Food> findDrinkFoodInfo();

    /**
     * 根据菜品id查找该菜品的相关信息（模态框用）
     * @param id 菜品id
     * @return
     */
    Food findFoodInfoById(Integer id);

    /**
     * 根据菜品id修改菜品剩余量的值
     * @param foodId
     */
    void modifySurplusByFoodId(int foodId);

    /**
     * 根据购物车的单菜品数量和菜品id来修改该菜品剩余量
     * @param foodNum 购物车单菜品数量
     * @param foodId 菜品id
     */
    void modifySurplusByFoodNumAndFoodId(Integer foodNum,Integer foodId);
}
