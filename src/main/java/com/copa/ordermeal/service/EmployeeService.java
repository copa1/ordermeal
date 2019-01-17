package com.copa.ordermeal.service;

import com.copa.ordermeal.model.Employee;

import java.util.List;

/**
 *  1.17
 *  employee表业务接口
 */
public interface EmployeeService {

    /**
     * 查找所有员工
     * @return 所有员工
     */
    List<Employee> findUserList();
}
