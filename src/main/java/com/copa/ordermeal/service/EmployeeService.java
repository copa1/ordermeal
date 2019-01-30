package com.copa.ordermeal.service;

import com.copa.ordermeal.controller.Msg;
import com.copa.ordermeal.model.Employee;
import org.springframework.transaction.annotation.Transactional;

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

    /**
     * 用户名是否重复
     * @param username 用户名
     * @return
     */
    long findUsernameCount(String username);

    /**
     * 手机号码是否重复
     * @param phone 手机号码
     * @return
     */
    long findPhoneCount(String phone);

    /**
     * 电子邮箱是否重复
     * @param email
     * @return
     */
    long findEmailCount(String email);

    /**
     * 员工姓名是否重复
     * @param realName 真实姓名
     * @return
     */
    long findRealNameCount(String realName);

    /**
     * 员工注册
     * @param employee 员工
     */
    @Transactional
    Msg addEmployee(Employee employee);
}
