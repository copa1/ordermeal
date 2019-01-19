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

    /**
     * 修改最近一次登录时间
     * @param username 员工用户名
     * @param date 最近一次登录日期
     */
    void modifyRecentlyLanded(String username, String date);
}
