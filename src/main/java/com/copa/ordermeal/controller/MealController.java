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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
     * 通过员工id联合查询订单总表和送餐表（送餐员id）
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
            return Msg.success().add("employeeInfo","404").add("orderStatus",order.getStatus()).add("orderTime",order.getOrderTime()).add("edelTime",order.getEdelTime());
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

    /**
     * 接单操作（送餐员）
     */
    @PutMapping("/user/acceptSendOrder")
    public Msg acceptSendOrder(@AuthenticationPrincipal Principal principal,
                               @RequestParam("orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime plus = now.plusMinutes(30);
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String acceptOrderTime = now.format(format);
        String esendTime = plus.format(format);
        Employee employee=employeeService.findEmployeeInfoByUsername(principal.getName());
        mealService.modifyMealStatusAndEmployeeIdByOrderId(employee.getId(),orderId);
        mealService.modifyMealAcceptOrderTimeAndEsendTimeByOrderId(acceptOrderTime,esendTime,orderId);
        return Msg.success();
    }

    /**
     * 检查送餐员是否正在送餐和订单是否支付，若送餐并且支付或者未支付，则显示订单详细页面，若没有送餐或者未支付，则显示未送餐列表
     */
    @GetMapping("/user/checkMealing")
    public Msg checkMealing(@AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee=employeeService.findEmployeeInfoByUsername(principal.getName());
        long mealingCount=mealService.findCheckMealingByEmployeeId(employee.getId(),1);
        long mealingSendCount=mealService.findCheckMealingByEmployeeId(employee.getId(),2);
        if (mealingCount==1){
            Meal meal=mealService.findMealInfoByEmployeeId(employee.getId());
            return Msg.success().add("mealCode","200").add("meal",meal);
        }
        else if (mealingSendCount==1){
            //System.out.println(mealingSendCount);
            Meal meal=mealService.findMealInfoByEmployeeId2(employee.getId());//这个改为2，待会来
            Order order=orderService.findByOrderId(meal.getOrderId());
            if (order.getStatus()==0){
                return Msg.success().add("mealCode","200").add("meal",meal);
            }
            else {
                return Msg.fail();
            }
        }
        return Msg.fail();
    }

    /**
     * 通过订单id联合查询订单总表、送餐表和员工表（订单人id）
     */
    @GetMapping("/user/getOrderAndMealAndEmployeeByOrderId")
    public Msg getOrderAndMealAndEmployeeByOrderId(@RequestParam("orderId") Integer orderId){
        Meal meal=mealService.findOrderAndMealAndEmployeeByOrderId(orderId);
        return Msg.success().add("meal",meal);
    }

    /**
     * （送餐员）已送餐未支付修改
     */
    @PutMapping("/user/modifyMealSendAndNotPay")
    public Msg modifyMealSendAndNotPay(@AuthenticationPrincipal Principal principal,
                                       @RequestParam("orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String sendTime = now.format(format);
        mealService.modifyMealStatusByOrderId(orderId,2);
        mealService.modifySendTimeByOrderId(sendTime,orderId);
        return Msg.success();
    }


    /**
     * （送餐员）已送餐已支付修改
     */
    @PutMapping("/user/modifyMealSendAndPay")
    public Msg modifyMealSendAndPay(@AuthenticationPrincipal Principal principal,
                                    @RequestParam("orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }

        long countSendTime=mealService.findSendTimeCountByOrderId(orderId);
        //System.out.println(countSendTime);
        if (countSendTime==0){
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String sendTime = now.format(format);
            mealService.modifySendTimeByOrderId(sendTime,orderId);
        }
        mealService.modifyMealStatusByOrderId(orderId,3);
        orderService.modifyOrderStatusByOrderId(orderId,1);
        return Msg.success();
    }

    /**
     * （送餐员）取消订单修改
     */
    @PutMapping("/user/modifyPay")
    public Msg modifyPay(@AuthenticationPrincipal Principal principal,
                                    @RequestParam("orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        mealService.modifyMealStatusByOrderId(orderId,4);
        orderService.modifyOrderStatusByOrderId(orderId,4);
        return Msg.success();
    }

    /**
     * （送餐员）已配送按钮（提前支付）
     */
    @PutMapping("/user/modifySend")
    public Msg modifySend(@AuthenticationPrincipal Principal principal,
                         @RequestParam("orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        //System.out.println("aa");
        mealService.modifyMealStatusByOrderId(orderId,3);
        return Msg.success();
    }
}