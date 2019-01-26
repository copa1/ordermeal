package com.copa.ordermeal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 1.17
 * 页面跳转Controller
 */
@Controller
public class BackController {

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

    /**
     * 后台首页
     * @return
     */
    @GetMapping("/admin/index")
    public String adminIndex(){
        return "superadmin/index";
    }

    /**
     * 用户端首页
     * @return
     */
    @GetMapping("/user/index")
    public String userIndex(){
        return "users/index";
    }
}
