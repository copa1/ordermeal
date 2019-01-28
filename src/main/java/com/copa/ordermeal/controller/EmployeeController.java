package com.copa.ordermeal.controller;

import com.copa.ordermeal.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
