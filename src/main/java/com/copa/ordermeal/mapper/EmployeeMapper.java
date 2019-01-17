package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 1.17
 * employee表注解版操作
 */
@Mapper
@Repository
public interface EmployeeMapper {

    @Select("select * from employee")
    List<Employee> selectEmployeeList();
}
