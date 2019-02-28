package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.FoodMapper;
import com.copa.ordermeal.model.Food;
import com.copa.ordermeal.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 2.26
 * food表业务实现类
 */
@Service
public class FoodServiceImpl implements FoodService{

    @Autowired
    private FoodMapper foodMapper;

    @Override
    public List<Food> findRiceFoodInfo() {
        return foodMapper.selectRiceFoodInfo();
    }

    @Override
    public List<Food> findFenmianFoodInfo() {
        return foodMapper.selectFenmianFoodInfo();
    }

    @Override
    public List<Food> findPastryFoodInfo() {
        return foodMapper.selectPastryFoodInfo();
    }

    @Override
    public List<Food> findDrinkFoodInfo() {
        return foodMapper.selectDrinkFoodInfo();
    }

    @Override
    public Food findFoodInfoById(Integer id) {
        return foodMapper.selectFoodInfoById(id);
    }

    @Override
    public void modifySurplusByFoodId(int foodId) {
        foodMapper.updateSurplusByFoodId(foodId);
    }

    @Override
    public void modifySurplusByFoodNumAndFoodId(Integer foodNum,Integer foodId) {
        foodMapper.updateSurplusByFoodNumAndFoodId(foodNum,foodId);
    }
}
