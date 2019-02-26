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
}
