package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.MealMapper;
import com.copa.ordermeal.model.Meal;
import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.repository.MealRepository;
import com.copa.ordermeal.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 3.3
 * meal表业务实现类
 */
@Service
public class MealServiceImpl implements MealService{

    @Autowired
    MealMapper mealMapper;

    @Autowired
    MealRepository mealRepository;

    @Override
    public void addMeal(Meal meal) {
        mealMapper.insertMeal(meal);
    }

    @Override
    public List<Meal> findMealAndOrderByEmployeeId(Integer employeeId) {
        return mealRepository.selectMealAndOrderByEmployeeId(employeeId);
    }

    @Override
    public Meal findMealAndOrderAndEmployeeByOrderId(Integer orderId) {
        return mealRepository.selectMealAndOrderAndEmployeeByOrderId(orderId);
    }

    @Override
    public Meal findMealByOrderId(Integer orderId) {
        return mealMapper.selectMealByOrderId(orderId);
    }
}
