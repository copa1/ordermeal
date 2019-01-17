package com.copa.ordermeal.repository;

import org.apache.catalina.User;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 1.17
 * employee表配置类
 */
@Repository
public interface EmployeeRepository {

    List<User> selectUserList();
}
