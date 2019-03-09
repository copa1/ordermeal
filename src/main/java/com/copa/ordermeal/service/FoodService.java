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

    /**
     * 列出所有食物（默认）
     * @return
     */
    List<Food> findFoodList();

    /**
     * 根据菜品来修改菜品状态
     * @param foodId 菜品id
     */
    void modifyStatusByFoodId(Integer foodId,Integer status);

    /**
     * 列出所有食物（剩余份数升序）
     * @return
     */
    List<Food> findFoodList2();

    /**
     * 列出所有食物（按菜品类型升序）
     * @return
     */
    List<Food> findFoodList3();

    /**
     * 列出所有食物（按上架状态降序）
     * @return
     */
    List<Food> findFoodList4();

    /**
     * 按菜品名模糊查询
     * @param key 菜品名关键字
     * @return
     */
    List<Food> findFoodList5(String key);

    /**
     * 添加菜品
     * @param food 菜品
     */
    void addFood(Food food);

    /**
     * 通过菜品id修改菜品信息
     * @param food 菜品
     */
    void modifyFoodByFoodId(Food food);

    /**
     * 通过菜品id删除菜品信息
     * @param foodId 菜品id
     */
    void removeFoodByFoodId(Integer foodId);
}
