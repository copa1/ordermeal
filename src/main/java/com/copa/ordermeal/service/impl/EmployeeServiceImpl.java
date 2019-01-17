package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.mapper.EmployeeMapper;
import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 1.17
 * employee表业务实现类
 */
@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeMapper employeeMapper;

    @Override
    public List<Employee> findUserList() {
        return employeeMapper.selectEmployeeList();
    }
}
