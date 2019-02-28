package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.CartMapper;
import com.copa.ordermeal.model.Cart;
import com.copa.ordermeal.repository.CartRepository;
import com.copa.ordermeal.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 2.27
 * cart表业务实现类
 */
@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartMapper cartMapper;

    @Override
    public List<Cart> findCartListByEmployeeId(Integer employeeId) {
        return cartRepository.selectCartListByEmployeeId(employeeId);
    }

    @Override
    public void removeCartInfoByFoodIdAndEmployeeId(Integer foodId, Integer employeeId) {
        cartMapper.deleteCartInfoByFoodIdAndEmployeeId(foodId,employeeId);
    }

    @Override
    public void addCartInfo(Cart cart) {
        cartMapper.insertCartInfo(cart);
    }

    @Override
    public long findCartInfoByEmployeeIdAndFoodId(Cart cart) {
        return cartMapper.countCartInfoByEmployeeIdAndFoodId(cart);
    }

    @Override
    public void modifyFoodNumByEmployeeIdAndFoodId(Cart cart) {
        cartMapper.updateFoodNumByEmployeeIdAndFoodId(cart);
    }

    @Override
    public Cart findCartInfoById(Integer id) {
        return cartMapper.selectCartInfoByFoodIdAndEmployeeId(id);
    }
}
