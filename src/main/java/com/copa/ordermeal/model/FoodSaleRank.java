package com.copa.ordermeal.model;

import lombok.Data;

/**
 * 3.13
 * 菜品售卖排行榜实体类
 */
@Data
public class FoodSaleRank {

    /**
     * id
     */
    private Integer id;

    /**
     * 菜品id
     */
    private Integer foodTopId;

    /**
     * 总售卖菜品数量（配送成功才算）
     */
    private int foodTopNum;

    /**
     * 菜品
     */
    private Food food;
}