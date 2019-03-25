package com.copa.ordermeal.service;

import com.copa.ordermeal.model.FoodSaleRank;

import java.util.List;

public interface FoodSaleRankService {

    /**
     * 查找菜品排行榜表有没有对应的菜品id
     * @param foodId 菜品id
     * @return
     */
    long findFoodIdCount(int foodId);

    /**
     * 通过菜品id来改变对应菜品售卖数量值
     * @param foodNum 菜品数量
     * @param foodId 菜品id
     */
    void modifyFoodNumByFoodId(int foodNum, int foodId);

    /**
     * 添加记录
     * @param foodId 菜品id
     * @param foodNum 菜品数量
     */
    void addFoodSaleRank(int foodId, int foodNum);

    /**
     * 查找所有记录
     * @return
     */
    List<FoodSaleRank> findAllList();

    /**
     * 查找菜品排行榜-菜品表
     * @return
     */
    List<FoodSaleRank> findFoodSaleRankAndFoodList();

    /**
     * 清空以前的排行榜
     */
    void removeAll();

    /**
     * 查询菜品售卖排行榜记录数
     * @return
     */
    long findFoodCount();
}
