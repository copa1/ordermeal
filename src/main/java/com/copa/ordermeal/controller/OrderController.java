package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Cart;
import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.model.OrderDetail;
import com.copa.ordermeal.service.CartService;
import com.copa.ordermeal.service.EmployeeService;
import com.copa.ordermeal.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * 3.3
 * order表和order_detail表Controller处理
 */
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @Autowired
    private EmployeeService employeeService;

    /**
     * 创建订单总表
     * @return
     */
    @PostMapping("/user/createOrder")
    public Msg createOrder(@AuthenticationPrincipal Principal principal,
                           Order order){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee = employeeService.findEmployeeInfoByUsername(principal.getName());
        order.setEmployeeId(employee.getId());
        if (order.getPayment()==1){
            if (employee.getAccount()-order.getPayment()>=0){
                order.setStatus(0);
                orderService.addOrder(order);
            }else if (employee.getAccount()-order.getPayment()<0){
                return Msg.fail().add("errorPage","700");
            }

        }else if (order.getPayment()==2){
            order.setStatus(1);
            orderService.addOrder(order);
        }

        return Msg.success();
    }

    /**
     * 创建n条订单详细表记录
     * @param principal
     * @param orderDetail
     * @return
     */
    @PostMapping("/user/createOrderDetail")
    public Msg createOrderDetail(@AuthenticationPrincipal Principal principal,
                                 OrderDetail orderDetail){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee = employeeService.findEmployeeInfoByUsername(principal.getName());
        Integer employId=employee.getId();
        //查出该用户最新一条总订单
        Order order = orderService.findByEmployId(employId);
        //System.out.println(order);
        List<Cart> carts = cartService.findCartListByEmployeeId(employId);
        for (Cart cart:carts){
            orderDetail.setFoodId(cart.getFoodId());
            orderDetail.setFoodNum(cart.getFoodNum());
            orderDetail.setPrice(cart.getFoodNum()*cart.getFood().getPrice());
            orderDetail.setOrderId(order.getId());
            //System.out.println(orderDetail);
            orderService.addOrderDetail(orderDetail);
        }

        return Msg.success();
    }

    /**
     * 得到订单
     * @param principal
     * @return
     */
    @GetMapping("/user/getOrder")
    public Msg getOrderInfo(@AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Employee employee = employeeService.findEmployeeInfoByUsername(principal.getName());
        Order order = orderService.findByEmployId(employee.getId());
        List<OrderDetail> orderDetail = orderService.findOrderDetailByOrderId(order.getId());
        return Msg.success().add("order",orderDetail).add("orderId",order.getId());

    }
}
