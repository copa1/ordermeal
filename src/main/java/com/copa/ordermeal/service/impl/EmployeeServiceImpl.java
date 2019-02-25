package com.copa.ordermeal.service.impl;

import com.copa.ordermeal.constant.RoleConstant;
import com.copa.ordermeal.controller.Msg;
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

    @Override
    public void modifyRecentlyLanded(String username, String date) {
        employeeMapper.updateRecentlyLanded(username,date);
    }

    @Override
    public long findUsernameCount(String username) {
        return employeeMapper.countUsername(username);
    }

    @Override
    public long findPhoneCount(String phone) {
        return employeeMapper.countPhone(phone);
    }

    @Override
    public long findEmailCount(String email) {
        return employeeMapper.countEmail(email);
    }

    @Override
    public long findRealNameCount(String realName) {
        return employeeMapper.countRealName(realName);
    }

    @Override
    public String addEmployee(Employee employee) {
        employeeMapper.insertEmployee(employee);
        int employeeId = employeeMapper.selectEmployeeByUsername(employee.getUsername());
        employeeMapper.insertEmployeeRole(employeeId, RoleConstant.ROLE_EMPLOYEE);
        return "1";
    }

    @Override
    public Employee findEmployeeInfoByUsername(String username) {
        Employee employee=employeeMapper.selectEmployeeInfoByUsername(username);
        return employee;
    }

    @Override
    public void modifyAvatarUrlByUsername(String username, String avatarUrl) {
        employeeMapper.updateAvatarUrlByUsername(username,avatarUrl);
    }
}
