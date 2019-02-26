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
}
