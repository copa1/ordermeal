package com.copa.ordermeal.service;

import com.copa.ordermeal.model.Cart;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 *  2.27
 *  cart表业务接口
 */
public interface CartService {

    /**
     * 通过员工id查找该员工的购物车信息
     * @param employeeId
     * @return 该员工购物车集合
     */
    List<Cart> findCartListByEmployeeId(Integer employeeId);

    /**
     * 通过菜品id和员工id来删除对应的购物车记录
     * @param foodId 食品id
     * @param employeeId 员工id
     */
    void removeCartInfoByFoodIdAndEmployeeId(Integer foodId, Integer employeeId);

    /**
     * 添加一条购物车记录
     * @param cart 购物车
     */
    @Transactional
    void addCartInfo(Cart cart);

    /**
     * 通过员工id和食品id查询相关购物车信息是否存在
     * @param cart 购物车
     * @return
     */
    long findCartInfoByEmployeeIdAndFoodId(Cart cart);

    /**
     * 通过员工id和食品id修改购物车单件菜品数量
     * @param cart
     */
    void modifyFoodNumByEmployeeIdAndFoodId(Cart cart);

    /**
     * 通过购物车id和员工id查找单菜品购物车
     * @param id 购物车id
     * @return
     */
    Cart findCartInfoById(Integer id);

    /**
     * 通过员工id来删除对应的购物车记录
     * @param employeeId 员工id
     */
    void removeCartByEmployeeId(Integer employeeId);
}
