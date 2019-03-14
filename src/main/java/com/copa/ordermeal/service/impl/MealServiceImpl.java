package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.MealMapper;
import com.copa.ordermeal.model.Meal;
import com.copa.ordermeal.model.Order;
import com.copa.ordermeal.repository.MealRepository;
import com.copa.ordermeal.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 3.3
 * meal表业务实现类
 */
@Service
public class MealServiceImpl implements MealService{

    @Autowired
    MealMapper mealMapper;

    @Autowired
    MealRepository mealRepository;

    @Override
    public void addMeal(Meal meal) {
        mealMapper.insertMeal(meal);
    }

    @Override
    public List<Meal> findMealAndOrderByEmployeeId(Integer employeeId) {
        return mealRepository.selectMealAndOrderByEmployeeId(employeeId);
    }

    @Override
    public Meal findMealAndOrderAndEmployeeByOrderId(Integer orderId) {
        return mealRepository.selectMealAndOrderAndEmployeeByOrderId(orderId);
    }

    @Override
    public Meal findMealByOrderId(Integer orderId) {
        return mealMapper.selectMealByOrderId(orderId);
    }

    @Override
    public void modifyMealStatusByOrderId(Integer orderId, Integer num) {
        mealMapper.updateMealStatusByOrderId(orderId,num);
    }

    @Override
    public List<Meal> findOrderNotSendList() {
        return mealRepository.selectOrderNotSendList();
    }

    @Override
    public void modifyMealStatusAndEmployeeIdByOrderId(Integer employeeId, Integer orderId) {
        mealMapper.updateMealStatusAndEmployeeIdByOrderId(employeeId,orderId);
    }

    @Override
    public long findCheckMealingByEmployeeId(Integer employeeId,Integer status) {
        return mealMapper.countMealingByEmployeeId(employeeId,status);
    }

    @Override
    public Meal findMealInfoByEmployeeId(Integer employeeId) {
        return mealMapper.selectMealByEmployeeId(employeeId);
    }

    @Override
    public Meal findOrderAndMealAndEmployeeByOrderId(Integer orderId) {
        return mealRepository.selectOrderAndMealAndEmployeeByOrderId(orderId);
    }

    @Override
    public Meal findMealInfoByEmployeeId2(Integer employeeId) {
        return mealMapper.selectMealByEmployeeId2(employeeId);
    }

    @Override
    public long findMealSendCount() {
        return mealMapper.countMealSend();
    }

    @Override
    public List<Meal> findMealAndEmployeeList() {
        return mealRepository.selectMealAndEmployeeList();
    }

    @Override
    public List<Meal> findOrderSendList() {
        return mealMapper.selectOrderSendList();
    }

    @Override
    public void modifyMealAcceptOrderTimeAndEsendTimeByOrderId(String acceptOrderTime, String esendTime, Integer orderId) {
        mealMapper.updateMealAcceptOrderTimeAndEsendTimeByOrderId(acceptOrderTime,esendTime,orderId);
    }

    @Override
    public void modifySendTimeByOrderId(String sendTime, Integer orderId) {
        mealMapper.updateSendTimeByOrderId(sendTime,orderId);
    }

    @Override
    public long findSendTimeCountByOrderId(Integer orderId) {
        return mealMapper.countSendTImeByOrderId(orderId);
    }
}
