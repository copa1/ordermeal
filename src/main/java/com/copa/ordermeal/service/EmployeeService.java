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
    String addEmployee(Employee employee);

    /**
     * 通过用户名来查询用户信息
     * @param username 用户名
     * @return
     */
    Employee findEmployeeInfoByUsername(String username);

    /**
     * 通过用户名来修改用户头像
     * @param username 用户名
     * @param avatarUrl 头像链接
     */
    void modifyAvatarUrlByUsername(String username, String avatarUrl);

    /**
     * 通过员工Id修改员工信息
     * @param employee 员工
     * @param id 员工id
     */
    void modifyEmployeeInfoById(Employee employee, Integer id);

    /**
     * 通过员工手机号修改员工信息
     * @param employee 员工
     * @param phone 手机号
     */
    void modifyEmployeePasswordByPhone(Employee employee, String phone);

    /**
     * 通过员工id来修改员工余额
     * @param id 员工id
     * @param money 支付的钱数
     */
    void modifyAccountByEmployeeId(Integer id, double money);

    /**
     * 查出除超级管理员的用户信息
     * @return
     */
    List<Employee> findEmployeeAndRoleList();

    /**
     * 通过员工id查找员工相关信息
     * @param employeeId
     */
    Employee findEmployeeInfoById(Integer employeeId);

    /**
     * 通过员工id修改员工权限
     * @param employeeId 员工id
     * @param roleId 权限id
     * @return
     */
    void modifyEmployeeRole(Integer employeeId, Integer roleId);
}
