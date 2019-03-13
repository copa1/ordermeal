package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.FoodSaleRankMapper;
import com.copa.ordermeal.model.FoodSaleRank;
import com.copa.ordermeal.repository.FoodSaleRankRepository;
import com.copa.ordermeal.service.FoodSaleRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodSaleRankServiceImpl implements FoodSaleRankService {

    @Autowired
    private FoodSaleRankMapper foodSaleRankMapper;

    @Autowired
    private FoodSaleRankRepository foodSaleRankRepository;

    @Override
    public long findFoodIdCount(int foodId) {
        return foodSaleRankMapper.selectFoodIdCount(foodId);
    }

    @Override
    public void modifyFoodNumByFoodId(int foodNum, int foodId) {
        foodSaleRankMapper.updateFoodNumByFoodId(foodNum,foodId);
    }

    @Override
    public void addFoodSaleRank(int foodId, int foodNum) {
        foodSaleRankMapper.insertFoodSaleRank(foodId,foodNum);
    }

    @Override
    public List<FoodSaleRank> findAllList() {
        return foodSaleRankMapper.selectAllList();
    }

    @Override
    public List<FoodSaleRank> findFoodSaleRankAndFoodList() {
        return foodSaleRankRepository.selectFoodSaleRankAndFoodList();
    }

    @Override
    public void removeAll() {
        foodSaleRankMapper.deleteAll();
    }
}
