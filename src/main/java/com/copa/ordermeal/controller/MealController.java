package com.copa.ordermeal.controller;


import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.model.Meal;
import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.service.EmployeeService;
import com.copa.ordermeal.service.MealService;
import com.copa.ordermeal.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * 3.3
 * meal表Controller处理
 */
@RestController
public class MealController {

    @Autowired
    MealService mealService;

    @Autowired
    OrderService orderService;

    @Autowired
    EmployeeService employeeService;

    /**
     * 创建配送表记录
     * @param principal
     * @return
     */
    @PostMapping("/user/createMeal")
    public Msg createMeal(@AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee = employeeService.findEmployeeInfoByUsername(principal.getName());
        Order order = orderService.findByEmployId(employee.getId());
        //System.out.println(order);
        Meal meal=new Meal();
        meal.setEmployeeId(0);
        meal.setOrderId(order.getId());
        meal.setStatus(0);
        mealService.addMeal(meal);
        return Msg.success();
    }
}
