package com.copa.ordermeal.service.security;

import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.model.Role;
import com.copa.ordermeal.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

/**
 * 1.19
 * 用户登录验证service
 */
public class CustomUserService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //根据用户名从数据库查询对应记录
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null){
            return (UserDetails) new UsernameNotFoundException("该员工不存在！");
        }

        List<SimpleGrantedAuthority> authorities=new ArrayList<>();

        for (Role role : employee.getRoles()){
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        System.out.println("员工登录成功");
        return new User(employee.getUsername(),employee.getPassword(),authorities);

    }
}
