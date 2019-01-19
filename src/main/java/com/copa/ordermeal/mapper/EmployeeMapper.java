package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 1.17
 * employee表注解版操作
 */
@Mapper
@Repository
public interface EmployeeMapper {

    @Select("SELECT * FROM employee")
    List<Employee> selectEmployeeList();

    @Select("SELECT COUNT(*) FROM employee_role WHERE employee_id=#{id}")
    long countUserAuthorities(@Param("id") Integer id);

    @Update("UPDATE employee SET recentlyLanded=#{d} WHERE username=#{u}")
    void updateRecentlyLanded(@Param("u") String username,@Param("d") String date);
}
