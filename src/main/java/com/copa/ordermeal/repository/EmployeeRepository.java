package com.copa.ordermeal.repository;

import com.copa.ordermeal.model.Employee;
import org.springframework.stereotype.Repository;

/**
 * 1.17
 * employee表配置操作类
 */
@Repository
public interface EmployeeRepository {

    Employee findByUsername(String username);
}
