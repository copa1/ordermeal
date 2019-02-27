package com.copa.ordermeal.service.impl;

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

    @Override
    public List<Cart> findCartListByEmployeeId(Integer employeeId) {
        return cartRepository.selectCartListByEmployeeId(employeeId);
    }
}
