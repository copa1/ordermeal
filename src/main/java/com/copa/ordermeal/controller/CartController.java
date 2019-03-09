package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Cart;
import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.model.Food;
import com.copa.ordermeal.service.CartService;
import com.copa.ordermeal.service.EmployeeService;
import com.copa.ordermeal.service.FoodService;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * 2.27
 * cart表Controller处理
 */
@RestController
public class CartController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private CartService cartService;

    @Autowired
    private FoodService foodService;

    /**
     * 查询该员工的购物车信息
     * @param principal
     * @return
     */
    @GetMapping("/user/getUserCartInfo")
    public Msg getUserCartInfo(@AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee=employeeService.findEmployeeInfoByUsername(principal.getName());
        Integer employeeId=employee.getId();
        List<Cart> carts=cartService.findCartListByEmployeeId(employeeId);
        if (carts.size()==0){
            return Msg.success().add("errorCode","600");
        }
        return Msg.success().add("cart",carts);
    }

    /**
     * 通过菜品id和员工id来删除对应的购物车记录
     * @param principal
     * @param foodId 菜品id
     * @return
     */
    @DeleteMapping("/user/deleteCartInfo/{foodId}")
    public Msg deleteCartInfoByFoodIdAndEmployeeId(@PathVariable("foodId") Integer foodId,
                                                   @AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee=employeeService.findEmployeeInfoByUsername(principal.getName());
        Integer employeeId=employee.getId();
        Cart cart = cartService.findCartInfoById(foodId);
        cartService.removeCartInfoByFoodIdAndEmployeeId(foodId,employeeId);
        foodService.modifySurplusByFoodNumAndFoodId(cart.getFoodNum(),cart.getFoodId());
        return Msg.success();
    }

    /**
     * 添加购物车信息
     * @param cart 购物车
     * @param principal
     * @return
     */
    @PostMapping("/user/addCartInfo")
    public Msg addCartInfo(Cart cart,@AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee=employeeService.findEmployeeInfoByUsername(principal.getName());
        Integer employeeId=employee.getId();
        cart.setEmployeeId(employeeId);
        long cartRepeat=cartService.findCartInfoByEmployeeIdAndFoodId(cart);
        Food food = foodService.findFoodInfoById(cart.getFoodId());
        int foodSurplus=food.getSurplus();
        //如果购物车里一个用户有同样的菜品
        if (cartRepeat == 1){
            if (foodSurplus > 0) {
                cartService.modifyFoodNumByEmployeeIdAndFoodId(cart);
                foodService.modifySurplusByFoodId(cart.getFoodId());
                return Msg.success().add("surplus",foodSurplus-1).add("total",food.getTotal()).add("foodId",cart.getFoodId());
            }else {
                foodService.modifyStatusByFoodId(food.getId(),0);
                return Msg.fail();
            }
        }else {
            if (foodSurplus > 0) {
                cartService.addCartInfo(cart);
                foodService.modifySurplusByFoodId(cart.getFoodId());
                return Msg.success().add("surplus",foodSurplus-1).add("total",food.getTotal()).add("foodId",cart.getFoodId());
            }else {
                foodService.modifyStatusByFoodId(food.getId(),0);
                return Msg.fail();
            }
        }
    }

    /**
     * 通过员工id来删除对应的购物车记录
     * @param principal
     * @return
     */
    @DeleteMapping("/user/deleteCart")
    public Msg deleteCartByEmployeeId(@AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee = employeeService.findEmployeeInfoByUsername(principal.getName());
        cartService.removeCartByEmployeeId(employee.getId());
        return Msg.success();
    }
}
