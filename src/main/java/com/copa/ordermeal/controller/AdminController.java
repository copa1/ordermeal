package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Employee;
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
     * 查看员工/权限/注销/恢复管理模块
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
}
