package com.copa.ordermeal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 1.17
 * 页面跳转Controller
 */
@Controller
public class BackController {

    @GetMapping("/")
    public String test(){
        return "login";
    }
}
