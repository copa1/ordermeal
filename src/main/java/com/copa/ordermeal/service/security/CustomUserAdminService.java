package com.copa.ordermeal.service.security;

import com.copa.ordermeal.mapper.EmployeeMapper;
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

public class CustomUserAdminService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //根据用户名从数据库查询对应记录
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null){
            return (UserDetails) new UsernameNotFoundException("该管理员不存在！");
        }

        long countAuthorities = employeeMapper.countUserAuthorities(employee.getId());

        List<SimpleGrantedAuthority> authorities=new ArrayList<>();

        for (Role role : employee.getRoles()) {

            authorities.add(new SimpleGrantedAuthority(role.getName()));
            if ((role.getName().equals("ROLE_EMPLOYEE") || role.getName().equals("ROLE_TAKER") || role.getName().equals("ROLE_ADMIN")) && countAuthorities==1){
                return (UserDetails) new UsernameNotFoundException("该员工不存在！");
            }
        }

        System.out.println("管理员登录成功");
        return new User(employee.getUsername(),employee.getPassword(),authorities);

    }
}
