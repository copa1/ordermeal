package com.copa.ordermeal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

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
     * 用户端页面饭食
     * @return
     */
    @GetMapping("/user/rice")
    public String ricePage(){
        return "users/rice";
    }

    /**
     * 用户端页面粉面
     * @return
     */
    @GetMapping("/user/fenMian")
    public String fenMianPage(){
        return "users/fenmian";
    }

    /**
     * 用户端页面面点
     * @return
     */
    @GetMapping("/user/pastry")
    public String pastryPage(){
        return "users/pastry";
    }

    /**
     * 用户端页面饮料
     * @return
     */
    @GetMapping("/user/drink")
    public String drinkPage(){
        return "users/drink";
    }

    /**
     * 用户端主页
     * @return
     */
    @GetMapping("/user/index")
    public String userIndex(){
        return "users/index";
    }

    /**
     * 用户端注册页面
     * @return
     */
    @GetMapping("/user/register")
    public String userRegister(){
        return "users/register";
    }

    /**
     * 个人中心页面
     * @param request
     * @return
     */
    @GetMapping("/user/userCenter")
    public String userCenterPage(HttpServletRequest request){
        //System.out.println(request.getSession());
        return "users/userCenter";
    }
}
