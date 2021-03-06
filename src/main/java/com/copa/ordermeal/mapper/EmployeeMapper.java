package com.copa.ordermeal.mapper;

import com.copa.ordermeal.model.Employee;
import org.apache.ibatis.annotations.*;
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

    @Select("SELECT COUNT(*) FROM employee WHERE username=#{u}")
    long countUsername(@Param("u") String username);

    @Select("SELECT COUNT(*) FROM employee WHERE phone=#{p}")
    long countPhone(@Param("p") String phone);

    @Select("SELECT COUNT(*) FROM employee WHERE email=#{e}")
    long countEmail(@Param("e") String email);

    @Select("SELECT COUNT(*) FROM employee WHERE realName=#{r}")
    long countRealName(@Param("r") String realName);

    @Insert("INSERT INTO employee(username,password,phone,gender,email,realName,avatar,recentlyLanded) VALUES(#{username},#{password},#{phone},#{gender},#{email},#{realName},'/img/avatar/default.jpeg','无')")
    void insertEmployee(Employee employee);

    @Select("SELECT id FROM employee WHERE username=#{u}")
    int selectEmployeeByUsername(@Param("u") String username);

    @Insert("INSERT INTO employee_role VALUES(#{e},#{r})")
    void insertEmployeeRole(@Param("e") int employeeId, @Param("r") int roleEmployee);

    @Select("SELECT * FROM employee WHERE username=#{u}")
    Employee selectEmployeeInfoByUsername(@Param("u") String username);

    @Update("UPDATE employee SET avatar=#{a} WHERE username=#{u}")
    void updateAvatarUrlByUsername(@Param("u") String username,@Param("a") String avatarUrl);

    @Update("UPDATE employee SET username=#{e.username},email=#{e.email},gender=#{e.gender},avatar=#{e.avatar} WHERE id=#{i}")
    void updateEmployeeInfoById(@Param("e") Employee employee,@Param("i") Integer id);

    @Update("UPDATE employee SET password=#{e.password} WHERE phone=#{p}")
    void updateEmployeePasswordByPhone(@Param("e") Employee employee,@Param("p") String phone);

    @Update("UPDATE employee SET account=account-#{m} WHERE id=#{i}")
    void updateAccountByEmployeeId(@Param("i") Integer id,@Param("m") double money);

    @Update("UPDATE employee_role SET role_id=#{r} WHERE employee_id=#{e}")
    void updateEmployeeRole(@Param("e") Integer employeeId,@Param("r") Integer roleId);

    @Update("UPDATE employee SET account=account+#{a} WHERE id=#{e}")
    void updateEmployeeAccount(@Param("e") Integer employeeId,@Param("a") double account);

    @Select("SELECT phone FROM employee WHERE id=#{e}")
    String selectPhone(@Param("e") Integer employeeId);

    @Select("SELECT email FROM employee WHERE id=#{e}")
    String selectEmail(@Param("e") Integer employeeId);

    @Update("UPDATE employee SET phone=#{e.phone},email=#{e.email} WHERE id=#{e.id}")
    void updateEmployeePhoneAndEmailById(@Param("e") Employee employee);

    /*@Select("SELECT * FROM employee WHERE realName LIKE CONCAT(CONCAT('%', #{r}), '%') ")
    List<Employee> selectEmployeeRealName(@Param("r") String realName);*/
}
