package com.copa.ordermeal.controller;

import com.copa.ordermeal.model.Food;
import com.copa.ordermeal.service.FoodService;
import com.copa.ordermeal.util.TimeUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 2.26
 * food表Controller处理
 */
@RestController
public class FoodController {

    @Autowired
    private FoodService foodService;

    /**
     * 显示上架饭食信息
     * @return
     */
    @GetMapping("/user/getRiceInfo")
    public Msg getRiceInfo(@RequestParam(value = "pn",defaultValue = "1") Integer pn){
        PageHelper.startPage(pn,6);
        List<Food> foods=foodService.findRiceFoodInfo();
        PageInfo page=new PageInfo(foods,5);
        return Msg.success().add("food",page);
    }

    /**
     * 显示上架粉面信息
     * @return
     */
    @GetMapping("/user/getFenmianInfo")
    public Msg getFenmianInfo(@RequestParam(value = "pn",defaultValue = "1") Integer pn){
        PageHelper.startPage(pn,6);
        List<Food> foods=foodService.findFenmianFoodInfo();
        PageInfo page=new PageInfo(foods,5);
        return Msg.success().add("food",page);
    }

    /**
     * 显示上架面点信息
     * @return
     */
    @GetMapping("/user/getPastryInfo")
    public Msg getPastryInfo(@RequestParam(value = "pn",defaultValue = "1") Integer pn){
        PageHelper.startPage(pn,6);
        List<Food> foods=foodService.findPastryFoodInfo();
        PageInfo page=new PageInfo(foods,5);
        return Msg.success().add("food",page);
    }

    /**
     * 显示上架饮料小吃信息
     * @return
     */
    @GetMapping("/user/getDrinkInfo")
    public Msg getDrinkInfo(@RequestParam(value = "pn",defaultValue = "1") Integer pn){
        PageHelper.startPage(pn,6);
        List<Food> foods=foodService.findDrinkFoodInfo();
        PageInfo page=new PageInfo(foods,5);
        return Msg.success().add("food",page);
    }

    /**
     * 根据菜品图片id显示菜品详细信息（模态框用）
     * @return
     */
    @GetMapping("/user/getFoodInfoById")
    public Msg getFoodInfoById(@RequestParam("id") Integer id){
        Food food=foodService.findFoodInfoById(id);
        return Msg.success().add("food",food);
    }

    /**
     * 根据菜品图片id显示菜品详细信息（模态框用）
     * listNum:1-按id排序（默认） 2-按剩余份数升序 3-按菜品类型升序 4-按上架状态降序 5-按菜品名模糊查询
     * @return
     */
    @GetMapping("/user/getFoodList")
    public Msg getFoodList(@RequestParam(value = "pn",defaultValue = "1") Integer pn,
                           @RequestParam(value = "listNum",defaultValue = "1") Integer listNum,
                           @RequestParam(value = "key",required = false) String key){
        List<Food> food=new ArrayList<Food>();
        PageHelper.startPage(pn,6);
        if (listNum==1) {
            food = foodService.findFoodList();
        }
        else if (listNum==2){
            food=foodService.findFoodList2();
        }
        else if (listNum==3){
            food=foodService.findFoodList3();
        }
        else if (listNum==4){
            food=foodService.findFoodList4();
        }
        else{
            food=foodService.findFoodList5(key);
        }
        PageInfo info=new PageInfo(food,5);
        return Msg.success().add("food",info);
    }

    /**
     * 上传菜品图片
     * @param file 接收前端参数
     * @return
     */
    @PostMapping("/user/uploadFood")
    public Msg upload(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal Principal principal) {
        try {
           principal.getName();
        } catch (NullPointerException e){
            return Msg.fail().add("error","亲~请先登录再操作哦~").add("errorCode","403");
        }

        String fileName = file.getOriginalFilename();

        if(fileName.indexOf("\\") != -1){
            fileName = fileName.substring(fileName.lastIndexOf("\\"));
        }
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String dateTime=now.format(format);
        String filePath = "src/main/resources/static/img/food/";
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
            avatarUrl="/"+filePath.substring(26)+fileName;
            out = new FileOutputStream(filePath+fileName);
            out.write(file.getBytes());
            out.flush();
            out.close();
            out = new FileOutputStream("target/classes/static/img/food/"+fileName);
            out.write(file.getBytes());
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
            return Msg.fail().add("error","亲~上传失败，请重新上传图片！").add("errorCode","300");
        }
        return Msg.success().add("avatarUrl",avatarUrl);
    }

    /**
     * 添加菜品
     * @param principal
     * @param food
     * @return
     */
    @PostMapping("/user/addFood")
    public Msg addFood(@AuthenticationPrincipal Principal principal,
                       Food food){
        try {
            principal.getName();
        } catch (NullPointerException e){
            return Msg.fail().add("error","亲~请先登录再操作哦~").add("errorCode","403");
        }
        if (food.getSurplus()>food.getTotal()){
            return Msg.fail().add("errorCode","600");
        }
        else {
            TimeUtil timeUtil = new TimeUtil();
            String date = timeUtil.getFormatDateForSix();
            food.setLastModifyTime(date);
            foodService.addFood(food);
            return Msg.success();
        }
    }

    /**
     * 修改菜品信息
     * @param principal
     * @param food
     * @return
     */
    @PutMapping("/user/updateFoodById")
    public Msg updateFoodBuId(@AuthenticationPrincipal Principal principal,
                       Food food){
        try {
            principal.getName();
        } catch (NullPointerException e){
            return Msg.fail().add("error","亲~请先登录再操作哦~").add("errorCode","403");
        }
        if (food.getSurplus()>food.getTotal()){
            return Msg.fail().add("errorCode","600");
        }
        else {
            TimeUtil timeUtil = new TimeUtil();
            String date = timeUtil.getFormatDateForSix();
            food.setLastModifyTime(date);
            foodService.modifyFoodByFoodId(food);
            return Msg.success();
        }
    }

    /**
     * 删除菜品信息
     * @param principal
     * @param id 菜品id
     * @return
     */
    @DeleteMapping("/user/deleteFoodById/{id}")
    public Msg deleteFoodById(@AuthenticationPrincipal Principal principal,
                              @PathVariable("id") Integer id){
        try {
            principal.getName();
        } catch (NullPointerException e){
            return Msg.fail().add("error","亲~请先登录再操作哦~").add("errorCode","403");
        }
        foodService.removeFoodByFoodId(id);
        return Msg.success();
    }
}
