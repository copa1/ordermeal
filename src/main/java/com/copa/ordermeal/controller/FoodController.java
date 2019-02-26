package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Food;
import com.copa.ordermeal.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 2.26
 * food表Controller处理
 */
@RestController
public class FoodController {

    @Autowired
    private FoodService foodService;

    /**
     * 显示上架饭食信息
     * @return
     */
    @GetMapping("/user/getRiceInfo")
    public Msg getRiceInfo(){
        List<Food> foods=foodService.findRiceFoodInfo();
        return Msg.success().add("food",foods);
    }
}
