package com.copa.ordermeal.model;

import lombok.Data;

import java.util.List;

/**
 * 1.17
 * 员工实体类
 */
@Data
public class Employee {

    /**
     * 员工id
     */
    private Integer id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 性别
     */
    private String gender;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 员工姓名
     */
    private String realName;

    /**
     * 头像链接
     */
    private String avatar;

    /**
     * 最近一次登录时间
     */
    private String recentlyLanded;

    /**
     * 员工拥有的权限
     */
    private List<Role> roles;
}
