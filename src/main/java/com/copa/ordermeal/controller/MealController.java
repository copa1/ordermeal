package com.copa.ordermeal.controller;


import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.model.Meal;
import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.service.EmployeeService;
import com.copa.ordermeal.service.MealService;
import com.copa.ordermeal.service.OrderService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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

    /**
     * 通过员工id联合查询订单总表和送餐表
     * @return
     */
    @GetMapping("/user/getOrderAndMeal")
    public Msg getOrderAndMeal(@AuthenticationPrincipal Principal principal,@RequestParam(value = "pn",defaultValue = "1") Integer pn){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee = employeeService.findEmployeeInfoByUsername(principal.getName());
        PageHelper.startPage(pn,6);
        List<Meal> meal = mealService.findMealAndOrderByEmployeeId(employee.getId());

        PageInfo info=new PageInfo(meal,5);
        //System.out.println(info);
        return Msg.success().add("meal",info);
    }

    /**
     * 通过订单id查询送餐-订单-员工表
     * @param orderId 订单id
     * @return
     */
    @GetMapping("/user/checkMealAndOrderAndEmployee")
    public Msg checkMealAndOrderAndEmployeeByOrderId(@AuthenticationPrincipal Principal principal,
                                                     @RequestParam(value = "orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Meal meal1 = mealService.findMealByOrderId(orderId);
        if (meal1.getEmployeeId()==0){
            Order order = orderService.findByOrderId(orderId);
            return Msg.success().add("employeeInfo","404").add("orderStatus",order.getStatus());
        }
        else {
            Meal meal = mealService.findMealAndOrderAndEmployeeByOrderId(orderId);
            return Msg.success().add("meal", meal);
        }
    }

    /**
     * 查出未配送订单（送餐员）联合配送表
     * @return
     */
    @GetMapping("/user/orderNotSendList")
    public Msg orderNotSendList(@AuthenticationPrincipal Principal principal,
                                @RequestParam(value = "pn",defaultValue = "1") Integer pn){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        PageHelper.startPage(pn,8);
        List<Meal> orderList = mealService.findOrderNotSendList();
        PageInfo pageInfo=new PageInfo(orderList,5);
        return Msg.success().add("order",pageInfo);
    }
}
