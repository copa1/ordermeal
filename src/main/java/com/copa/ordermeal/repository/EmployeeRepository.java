package com.copa.ordermeal.repository;

import com.copa.ordermeal.model.Employee;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 1.17
 * employee表配置操作类
 */
@Repository
public interface EmployeeRepository {

    Employee findByUsername(String username);

    List<Employee> selectEmployeeAndRoleList();

    Employee selectEmployeeInfoById(@Param("e") Integer employeeId);

}
