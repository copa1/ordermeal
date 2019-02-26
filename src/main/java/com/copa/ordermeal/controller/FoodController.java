package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Food;
import com.copa.ordermeal.service.FoodService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public Msg getRiceInfo(@RequestParam(value = "pn",defaultValue = "1") Integer pn){
        PageHelper.startPage(pn,6);
        List<Food> foods=foodService.findRiceFoodInfo();
        PageInfo page=new PageInfo(foods,5);
        return Msg.success().add("food",page);
    }
}
