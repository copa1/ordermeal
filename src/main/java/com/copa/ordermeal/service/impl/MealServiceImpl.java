package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.MealMapper;
import com.copa.ordermeal.model.Meal;
import com.copa.ordermeal.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 3.3
 * meal表业务实现类
 */
@Service
public class MealServiceImpl implements MealService{

    @Autowired
    MealMapper mealMapper;

    @Override
    public void addMeal(Meal meal) {
        mealMapper.insertMeal(meal);
    }
}
