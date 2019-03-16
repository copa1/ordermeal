package com.copa.ordermeal.config.errorpage;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

/**
 *  错误页面跳转
 */
@Controller
public class ErrorPageControl {

    @GetMapping("/401")
    public String error401(HttpServletRequest request, Model model) {
        return "users/401";
    }

    @GetMapping("/403")
    public String error403(HttpServletRequest request, Model model) {
        return "users/403";
    }

    @GetMapping("/404")
    public String error404(HttpServletRequest request, Model model){
        return "users/404";
    }

    @GetMapping("/500")
    public String error500(HttpServletRequest request, Model model){
        return "users/500";
    }

}
