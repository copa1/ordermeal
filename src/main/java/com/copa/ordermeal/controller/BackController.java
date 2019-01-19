package com.copa.ordermeal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 1.17
 * 页面跳转Controller
 */
@Controller
public class BackController {

    /*@GetMapping("/")
    public String test(){
        return "login";
    }*/

    /**
     * 用户端登录页面
     * @return
     */
    @GetMapping("/user/login")
    public String userLogin(){
        return "users/login";
    }

    /**
     * 后台登录页面
     * @return
     */
    @GetMapping("/admin/login")
    public String adminLogin(){
        return "superadmin/login";
    }
}
