package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.*;
import com.copa.ordermeal.service.EmployeeService;
import com.copa.ordermeal.service.FoodService;
import com.copa.ordermeal.service.MealService;
import com.copa.ordermeal.service.OrderService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/**
 * 3.11
 * 专为超级管理员服务
 */
@RestController
public class AdminController {

    @Autowired
    OrderService orderService;

    @Autowired
    MealService mealService;

    @Autowired
    FoodService foodService;

    @Autowired
    EmployeeService employeeService;

    /**
     * 后台首页
     * @param principal
     * @return
     */
    @GetMapping("/admin/welcomePage")
    public Msg adminWelcomePage(@AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        long orderCount=orderService.findOrderCount();
        long mealCount=mealService.findMealSendCount();
        long foodSaleCount=orderService.findFoodNumSale();
        long foodUpCount=foodService.findFoodUpCount();
        long foodDownCount=foodService.findFoodDownCount();
        return Msg.success().add("orderCount",orderCount)
                .add("mealCount",mealCount)
                .add("foodSaleCount",foodSaleCount)
                .add("foodUpCount",foodUpCount)
                .add("foodDownCount",foodDownCount);
    }

    /**
     * 查看员工/权限/注销/恢复管理模块、充值模块、员工信息修改模块
     * @param principal
     * @return
     */
    @GetMapping("/admin/employeeStatusPage")
    public Msg adminEmployeeStatusPage(@AuthenticationPrincipal Principal principal,
                                       @RequestParam(value = "pn",defaultValue = "1") Integer pn){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        PageHelper.startPage(pn,6);
        List<Employee> employees=employeeService.findEmployeeAndRoleList();
        PageInfo pageInfo=new PageInfo(employees,5);
        return Msg.success().add("employee",pageInfo);
    }

    /**
     * 权限界面模态框回显
     * @param employeeId
     * @return
     */
    @GetMapping("/admin/getEmployeeRoleStatus")
    public Msg getEmployeeRoleStatus(@RequestParam("employeeId") Integer employeeId){
        Employee employee = employeeService.findEmployeeInfoById(employeeId);
        return Msg.success().add("employee",employee);
    }

    /**
     * 权限界面模态框修改权限
     * @param employeeId
     * @return
     */
    @PutMapping("/admin/modifyEmployeeRole/{employeeId}")
    public Msg modifyEmployeeRole(@AuthenticationPrincipal Principal principal,
                                  @PathVariable("employeeId") Integer employeeId,
                                  @RequestParam("roleId") Integer roleId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        employeeService.modifyEmployeeRole(employeeId,roleId);
        return Msg.success();
    }

    /**
     * 充值界面模态框修改员工余额
     * @param employeeId
     * @return
     */
    @PutMapping("/admin/modifyEmployeeAccount/{employeeId}")
    public Msg modifyEmployeeRole(@AuthenticationPrincipal Principal principal,
                                  @PathVariable("employeeId") Integer employeeId,
                                  @RequestParam("account") double account){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        employeeService.modifyEmployeeAccount(employeeId,account);
        return Msg.success();
    }

    /**
     * 查看菜品模块
     * @return
     */
    @GetMapping("/admin/getFoodList")
    public Msg getFoodList(@AuthenticationPrincipal Principal principal,
                           @RequestParam(value = "pn",defaultValue = "1") Integer pn){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        PageHelper.startPage(pn,6);
        List<Food> food = foodService.findFoodList();
        PageInfo info=new PageInfo(food,5);
        return Msg.success().add("food",info);
    }

    /**
     * 查看订单模块
     * @return
     */
    @GetMapping("/admin/getOrderList")
    public Msg getOrderList(@AuthenticationPrincipal Principal principal,
                           @RequestParam(value = "pn",defaultValue = "1") Integer pn){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        PageHelper.startPage(pn,6);
        List<Order> orders=orderService.findOrderAndEmployeeList();
        PageInfo info=new PageInfo(orders,5);

        return Msg.success().add("order",info);
    }

    /**
     * 查看订单模块模态框信息(配送者信息)
     * @return
     */
    @GetMapping("/admin/getOrderListModal")
    public Msg getOrderListModal(@AuthenticationPrincipal Principal principal,
                                 @RequestParam("orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Meal meal = mealService.findMealAndOrderAndEmployeeByOrderId(orderId);
        return Msg.success().add("order",meal);
    }

    /**
     * 查看订单模块模态框信息(详细订单信息)
     * @return
     */
    @GetMapping("/admin/getOrderDetailByOrderId")
    public Msg getOrderDetailByOrderId(@AuthenticationPrincipal Principal principal,
                                 @RequestParam("orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        List<OrderDetail> order = orderService.findOrderDetailByOrderId(orderId);
        return Msg.success().add("order",order);
    }

    /**
     * 查看配送模块
     * @return
     */
    @GetMapping("/admin/getMealList")
    public Msg getMealList(@AuthenticationPrincipal Principal principal,
                            @RequestParam(value = "pn",defaultValue = "1") Integer pn){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        PageHelper.startPage(pn,6);
        List<Meal> meals=mealService.findMealAndEmployeeList();
        PageInfo info=new PageInfo(meals,5);
        return Msg.success().add("meal",info);
    }

    /**
     * 检验手机号码是否可用
     * @return
     */
    @GetMapping("/admin/checkPhone")
    public Msg getPhoneCount(@RequestParam("phone") String phone,
                             @RequestParam("employeeId") Integer employeeId){
        long countPhone=employeeService.findPhoneCount(phone);
        String thisPhone=employeeService.findPhone(employeeId);
        if ((countPhone==1&&thisPhone.equals(phone))||countPhone==0){
            return Msg.success();
        }
        return Msg.fail().add("error","亲~该手机号码不可用哦~请换一个手机号码吧~");
    }

    /**
     * 检验电子邮箱是否可用
     * @return
     */
    @GetMapping("/admin/checkEmail")
    public Msg checkEmail(@RequestParam("email") String email,
                             @RequestParam("employeeId") Integer employeeId){
        long countPhone=employeeService.findEmailCount(email);
        String thisEmail=employeeService.findEmail(employeeId);
        if ((countPhone==1&&thisEmail.equals(email))||countPhone==0){
            return Msg.success();
        }
        return Msg.fail().add("error","亲~该电子邮箱不可用哦~请换一个电子邮箱吧~");
    }

    /**
     * 修改员工信息
     * @return
     */
    @PutMapping("/admin/modifyEmployeeInfo")
    public Msg modifyEmployeeInfo(@AuthenticationPrincipal Principal principal,
                                  Employee employee) {
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        employeeService.modifyEmployeePhoneAndEmailById(employee);
        return Msg.success();
    }
}