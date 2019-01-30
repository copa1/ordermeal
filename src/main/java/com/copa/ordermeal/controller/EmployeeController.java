package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 1.17
 * employee表Controller处理
 */
@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    /*@GetMapping("/index")
    public Msg getAllEmployee(){
        return Msg.success().add("users",employeeService.findUserList());
    }*/

    /**
     * 检验用户名是否可用
     * @return
     */
    @GetMapping("/user/checkUsername")
    public Msg getUsernameCount(@RequestParam String username){
        long countUser=employeeService.findUsernameCount(username);
        if (countUser>0){
            return Msg.fail().add("error","亲~该用户名不可用哦~请换一个用户名吧~");
        }
        return Msg.success();
    }

    /**
     * 检验手机号码是否可用
     * @return
     */
    @GetMapping("/user/checkPhone")
    public Msg getPhoneCount(@RequestParam String phone){
        long countPhone=employeeService.findPhoneCount(phone);
        if (countPhone>0){
            return Msg.fail().add("error","亲~该手机号码不可用哦~请换一个手机号码吧~");
        }
        return Msg.success();
    }

    /**
     * 检验电子邮箱是否可用
     * @return
     */
    @GetMapping("/user/checkEmail")
    public Msg getEmailCount(@RequestParam String email){
        long countEmail=employeeService.findEmailCount(email);
        if (countEmail>0){
            return Msg.fail().add("error","亲~该电子邮箱不可用哦~请换一个电子邮箱吧~");
        }
        return Msg.success();
    }

    /**
     * 检验员工姓名是否可用
     * @return
     */
    @GetMapping("/user/checkRealName")
    public Msg getRealNameCount(@RequestParam String realName){
        long countRealName=employeeService.findRealNameCount(realName);
        if (countRealName>0){
            return Msg.fail().add("error","亲~该员工姓名不可用哦~");
        }
        return Msg.success();
    }

    @PostMapping("/user/register")
    public Msg postEmployeeInfoRegister(Employee employee){
        return employeeService.addEmployee(employee);
    }
}
