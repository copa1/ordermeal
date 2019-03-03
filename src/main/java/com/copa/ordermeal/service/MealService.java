package com.copa.ordermeal.service;

import com.copa.ordermeal.model.Meal;

/**
 *  3.3
 *  meal表业务接口
 */
public interface MealService {

    /**
     * 送餐表添加一条记录
     * @param meal
     */
    void addMeal(Meal meal);
}
