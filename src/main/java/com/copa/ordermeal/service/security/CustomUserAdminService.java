package com.copa.ordermeal.service.security;

import com.copa.ordermeal.mapper.EmployeeMapper;
import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.model.Role;
import com.copa.ordermeal.repository.EmployeeRepository;
import com.copa.ordermeal.service.EmployeeService;
import com.copa.ordermeal.util.TimeUtil;
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
 * 管理员验证登录
 */
public class CustomUserAdminService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private EmployeeService employeeService;

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

        //修改员工最近登录时间
        TimeUtil timeUtil=new TimeUtil();
        String date = timeUtil.getFormatDateForSix();
        employeeService.modifyRecentlyLanded(employee.getUsername(),date);

//        System.out.println("管理员登录成功");
        return new User(employee.getUsername(),employee.getPassword(),authorities);

    }
}
