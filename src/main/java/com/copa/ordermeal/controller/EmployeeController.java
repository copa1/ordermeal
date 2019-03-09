package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Employee;
import com.copa.ordermeal.service.EmployeeService;
import com.copa.ordermeal.util.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

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
     * 检验更改用户名是否可用
     * @return
     */
    @GetMapping("/user/checkUsernameUpdate")
    public Msg getUsernameCountUpdate(@RequestParam String username,@AuthenticationPrincipal Principal principal){
        long countUser=employeeService.findUsernameCount(username);
        if ((countUser==1 && !principal.getName().equals(username)) || (countUser>1)){
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
    public Msg getEmailCount(@RequestParam String email,@AuthenticationPrincipal Principal principal){
        long countEmail=employeeService.findEmailCount(email);
        if (countEmail>0){
            return Msg.fail().add("error","亲~该电子邮箱不可用哦~请换一个电子邮箱吧~");
        }
        return Msg.success();
    }

    /**
     * 检验更改电子邮箱是否可用
     * @return
     */
    @GetMapping("/user/checkEmailUpdate")
    public Msg getEmailCountUpdate(@RequestParam String email,@AuthenticationPrincipal Principal principal){
        long countEmail=employeeService.findEmailCount(email);
        Employee employee=employeeService.findEmployeeInfoByUsername(principal.getName());
        if ((countEmail==1 && !email.equals(employee.getEmail())) || (countEmail>1)){
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

    /**
     * 员工注册
     * @param employee 员工
     * @return
     */
    @PostMapping("/user/register")
    public String postEmployeeInfoRegister(Employee employee){
        MD5Util md5Util=new MD5Util();
        employee.setPassword(md5Util.encode(employee.getPassword()));
        return employeeService.addEmployee(employee);
    }

    /**
     * 获取员工信息
     * @return
     */
    @GetMapping("/user/getEmployeeInfo")
    public Msg getEmployeeInfo(@AuthenticationPrincipal Principal principal){
        String username=principal.getName();
        Employee employee = employeeService.findEmployeeInfoByUsername(username);

        //System.out.println(username);
        //System.out.println(employee);
        return Msg.success().add("employee",employee);
    }

    /**
     * 更换头像
     * @param file 接收前端参数
     * @return
     */
    @PostMapping("/user/uploadAvatar")
    public Msg upload(@RequestParam("file") MultipartFile file,@AuthenticationPrincipal Principal principal) {
        String username;
        //System.out.println(principal.getName());
        /*if (principal.getName()==null){
            return Msg.fail().add("error","亲~请先登录再操作哦~").add("errorCode","403");
        }*/
        try {
            username = principal.getName();
        } catch (NullPointerException e){
            return  Msg.fail().add("error","亲~请先登录再操作哦~").add("errorCode","403");
        }

        String fileName = file.getOriginalFilename();
        //System.out.println("1:"+fileName);

        if(fileName.indexOf("\\") != -1){
            fileName = fileName.substring(fileName.lastIndexOf("\\"));
            //System.out.println("2:"+fileName);
        }
        //以下方法月份不对！2019/2/25变成了2019/11/25
        /*  Calendar now=Calendar.getInstance();
        String filePath = "src/main/resources/static/img/avatar/"+now.get(Calendar.YEAR)+"/"+now.get(Calendar.MONTH) + 1+"/"+ now.get(Calendar.DAY_OF_MONTH)+"/";
        System.out.println(filePath);*/
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String dateTime=now.format(format);
        String filePath = "src/main/resources/static/img/avatar/"+dateTime+"/";
        File targetFile = new File(filePath);
        String avatarUrl="";
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        Date nowTime = new Date();
        long l = nowTime.getTime() / 1000;
        fileName=l+file.getOriginalFilename();
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(filePath+fileName);
            out.write(file.getBytes());
            out.flush();
            out.close();
            avatarUrl="/"+filePath.substring(26)+fileName;
            //System.out.println(avatarUrl);
            //employeeService.modifyAvatarUrlByUsername(principal.getName(),avatarUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return Msg.fail().add("error","亲~上传失败，请重新上传头像！").add("errorCode","300");
        }
        return Msg.success().add("avatarUrl",avatarUrl);
    }

    /**
     *
     * @param employee
     * @param principal
     * @return
     */
    @PutMapping("/user/updateEmployeeInfo")
    public Msg updateEmployeeInfo(Employee employee,@AuthenticationPrincipal Principal principal) {
        String username1=principal.getName();
        Employee employee1=employeeService.findEmployeeInfoByUsername(username1);
        employeeService.modifyEmployeeInfoById(employee,employee1.getId());
        return Msg.success();
    }

    /**
     *
     * @param employee
     * @param principal
     * @return
     */
    @PutMapping("/user/updateUserPassword")
    public Msg updateEmployeePassword(Employee employee,@AuthenticationPrincipal Principal principal) {
        String username1=principal.getName();
        Employee employee1=employeeService.findEmployeeInfoByUsername(username1);
        if (!employee1.getPhone().equals(employee.getPhone())){
            return Msg.fail().add("error","亲~您输入的手机号与您的账号绑定不匹配哦~请重新输入吧~").add("errorCode","400");
        }
        MD5Util md5Util=new MD5Util();
        employee.setPassword(md5Util.encode(employee.getPassword()));
        employeeService.modifyEmployeePasswordByPhone(employee,employee1.getPhone());
        return Msg.success();
    }

}
