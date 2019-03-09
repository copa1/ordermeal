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

    @Override
    public List<Food> findFoodList() {
        return foodMapper.selectFoodList();
    }

    @Override
    public void modifyStatusByFoodId(Integer foodId, Integer status) {
        foodMapper.updateStatusByFoodId(foodId,status);
    }

    @Override
    public List<Food> findFoodList2() {
        return foodMapper.selectFoodList2();
    }

    @Override
    public List<Food> findFoodList3() {
        return foodMapper.selectFoodList3();
    }

    @Override
    public List<Food> findFoodList4() {
        return foodMapper.selectFoodList4();
    }

    @Override
    public List<Food> findFoodList5(String key) {
        return foodMapper.selectFoodList5(key);
    }

    @Override
    public void addFood(Food food) {
        foodMapper.insertFood(food);
    }

    @Override
    public void modifyFoodByFoodId(Food food) {
        foodMapper.updateFoodByFoodId(food);
    }

    @Override
    public void removeFoodByFoodId(Integer foodId) {
        foodMapper.deleteFoodByFoodId(foodId);
    }
}
