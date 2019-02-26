package com.copa.ordermeal.model;

import lombok.Data;

/**
 * 2.26
 * 菜品实体类
 */

@Data
public class Food {

    /**
     * 菜品id
     */
    private Integer id;

    /**
     * 菜品名称
     */
    private String name;

    /**
     * 菜品价格
     */
    private double price;

    /**
     * 菜品总量
     */
    private int total;

    /**
     * 菜品剩余量
     */
    private int surplus;

    /**
     * 菜品类型 1-饭食 2-粉面 3-面点 4-饮料小吃
     */
    private int type;

    /**
     * 菜品描述
     */
    private String desc;

    /**
     * 菜品图片
     */
    private String image;

    /**
     * 菜品上架状态 0-下架 1-上架
     */
    private String status;

    /**
     * 最后修改时间
     */
    private String lastModifyTime;
}
