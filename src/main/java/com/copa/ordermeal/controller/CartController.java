package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Cart;
import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.service.CartService;
import com.copa.ordermeal.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

    /**
     * 查询该员工的购物车信息
     * @param principal
     * @return
     */
    @GetMapping("/user/getUserCartInfo")
    public Msg getUserCartInfo(@AuthenticationPrincipal Principal principal){
        Employee employee=employeeService.findEmployeeInfoByUsername(principal.getName());
        Integer employeeId=employee.getId();
        List<Cart> carts=cartService.findCartListByEmployeeId(employeeId);
        if (carts.size()==0){
            return Msg.success().add("errorCode","600");
        }
        return Msg.success().add("cart",carts);
    }
}
