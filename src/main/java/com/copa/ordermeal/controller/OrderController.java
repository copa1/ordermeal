package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Cart;
import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.model.OrderDetail;
import com.copa.ordermeal.service.CartService;
import com.copa.ordermeal.service.EmployeeService;
import com.copa.ordermeal.service.MealService;
import com.copa.ordermeal.service.OrderService;
import com.copa.ordermeal.util.TimeUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    @Autowired
    private MealService mealService;

    /**
     * 创建订单总表
     * @return
     */
    @PostMapping("/user/createOrder")
    public Msg createOrder(@AuthenticationPrincipal Principal principal,
                           Order order,
                           @RequestParam("sendTime") Integer sendTime){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime plus = now.plusMinutes(sendTime);
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String orderTime = now.format(format);
        String edelTime = plus.format(format);
        order.setOrderTime(orderTime);
        order.setEdelTime(edelTime);
        Employee employee = employeeService.findEmployeeInfoByUsername(principal.getName());
        order.setEmployeeId(employee.getId());
        if (order.getPayment()==1){
            if (employee.getAccount()-order.getSumPrice()>=0){
                order.setStatus(1);
                double money=order.getSumPrice();
                employeeService.modifyAccountByEmployeeId(employee.getId(),money);
                orderService.addOrder(order);
            }else if (employee.getAccount()-order.getSumPrice()<0){
                return Msg.fail().add("errorPage","700");
            }

        }else if (order.getPayment()==2){
            order.setStatus(0);
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
     * 通过订单id得到订单表
     * @param principal
     * @return
     */
    @GetMapping("/user/getOrderInfo")
    public Msg getOrder(@AuthenticationPrincipal Principal principal,@RequestParam("orderId") Integer orderId){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        Order order = orderService.findByOrderId(orderId);

        return Msg.success().add("order",order);

    }

    /**
     * 得到订单详细表
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
        String orderTime = order.getOrderTime();
        String second=orderTime.substring(orderTime.length()-2);
        //System.out.println(second);
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String format1 = now.format(format);
        String second1=format1.substring(format1.length()-2);
        int timeOrder=Integer.parseInt(second);
        int timeNow=Integer.parseInt(second1);
        if (timeNow>=timeOrder){
            if (timeNow-timeOrder>=2){
                return Msg.fail();
            }
            else {
                List<OrderDetail> orderDetail = orderService.findOrderDetailByOrderId(order.getId());
                return Msg.success().add("order",orderDetail).add("orderId",order.getId());
            }
        }
        else{
            if ((timeNow+60)-timeOrder>=2){
                return Msg.fail();
            }
            else {
                List<OrderDetail> orderDetail = orderService.findOrderDetailByOrderId(order.getId());
                return Msg.success().add("order", orderDetail).add("orderId", order.getId());
            }
        }


    }

    /**
     * 得到订单和订单详细表
     * @return
     */
    @GetMapping("/user/getOrderAndOrderDetail")
    public Msg getOrderAndOrderDetail(@RequestParam("orderId") Integer orderId){

        List<OrderDetail> orderDetail = orderService.findOrderDetailByOrderId(orderId);
        return Msg.success().add("order",orderDetail);
    }

    /**
     * 取消订单（用户）
     * @return
     */
    @PutMapping("/user/userCancelOrder")
    public Msg userCancelOrder(@RequestParam("orderId") Integer orderId,
                               @AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        orderService.modifyOrderStatusByOrderId(orderId,2);
        mealService.modifyMealStatusByOrderId(orderId,4);
        return Msg.success();
    }


    /**
     * 确认收餐（用户）
     * @return
     */
    @PutMapping("/user/userConfirmMeal")
    public Msg userConfirmMeal(@RequestParam("orderId") Integer orderId,
                               @AuthenticationPrincipal Principal principal){
        try {
            principal.getName();
        }catch (NullPointerException e){
            return Msg.fail().add("errorCode","403");
        }
        orderService.modifyOrderStatusByOrderId(orderId,3);
        return Msg.success();
    }

   /* @GetMapping("/user/aa")
    public Msg aa(){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime minus = now.plusMinutes(30);
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String format1 = now.format(format);
        String format2 = minus.format(format);
        System.out.println(format1);
        System.out.println(format2);
        return Msg.success();
    }*/
}
