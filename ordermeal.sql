/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : ordermeal

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-03-31 00:37:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foodId` int(10) NOT NULL,
  `foodNum` int(5) NOT NULL,
  `employeeId` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('48', '15', '1', '7');
INSERT INTO `cart` VALUES ('49', '2', '1', '7');
INSERT INTO `cart` VALUES ('87', '7', '1', '5');

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `gender` char(2) NOT NULL,
  `email` varchar(50) NOT NULL,
  `realName` varchar(30) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `recentlyLanded` varchar(40) NOT NULL,
  `account` double(8,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('1', 'copa', '1053d7d0bf5229313dd0b8a502212540', '13800138070', 'M', '4381286529@qq.com', '梁哈哈', '/img/avatar/default.jpeg', '无', '0.00');
INSERT INTO `employee` VALUES ('2', 'copa1', '0c4e91c0b2a315a0b4fe42f7065d1ff4', '13800138022', 'M', '1232@q.com', '梁哈哈啊', '/img/avatar/default.jpeg', '2019-02-25 16:46:06', '415.03');
INSERT INTO `employee` VALUES ('3', 'copa2', '881d585f0b5a481c53e610af812bc88a', '13800138002', 'F', '14@qq.com', '梁哈哈哈', '/img/avatar/default.jpeg', '无', '1.00');
INSERT INTO `employee` VALUES ('4', 'copa3', '743e43904ef5948eaac279e5109e45c6', '13800138008', 'F', '2@qqq.com', '梁哈哈阿', '/img/avatar/default.jpeg', '无', '0.00');
INSERT INTO `employee` VALUES ('5', 'test1', '6599d0583dcb82ebfe233d0cedd1d733', '13800138004', 'M', '1111@q.com', '梁哦哦', '/img/avatar/2019/03/24/1553437741food011.jpg', '2019-03-29 22:17:22', '4.00');
INSERT INTO `employee` VALUES ('6', 'bbtest', '197d62c2b8c0420f0e42cc57bf87a148', '13579854654', 'M', '48866@q.com', '梁稳稳', '/img/avatar/2019/02/25/15511026162.jpg', '2019-02-25 21:49:56', '0.01');
INSERT INTO `employee` VALUES ('7', 'test2', '6599d0583dcb82ebfe233d0cedd1d733', '13579854655', 'F', '123212@qq.com', '梁哈哈啊啊', '/img/avatar/default.jpeg', '2019-03-24 15:55:37', '0.00');
INSERT INTO `employee` VALUES ('8', 'test3', '6599d0583dcb82ebfe233d0cedd1d733', '13800138011', 'F', '121@qq.com', '梁啦啦', '/img/avatar/default.jpeg', '2019-03-25 08:33:45', '1.00');
INSERT INTO `employee` VALUES ('9', 'test4', '6599d0583dcb82ebfe233d0cedd1d733', '13800138006', 'F', '111@q.com', '梁宝宝', '/img/avatar/default.jpeg', '2019-03-29 22:18:07', '0.00');
INSERT INTO `employee` VALUES ('10', 'test5', '6599d0583dcb82ebfe233d0cedd1d733', '13800138021', 'F', '4@qqq.comww', '傻乎乎', '/img/avatar/default.jpeg', '2019-03-16 13:48:29', '0.00');
INSERT INTO `employee` VALUES ('11', 'test6', '6599d0583dcb82ebfe233d0cedd1d733', '13800138032', 'F', '4@qqq.comww24', '梁哈哈醃', '/img/avatar/default.jpeg', '2019-03-16 14:03:02', '100.00');
INSERT INTO `employee` VALUES ('12', 'test10', '6599d0583dcb82ebfe233d0cedd1d733', '13776655443', 'M', 'xiaoc@copa.com', '小梁', '/img/avatar/default.jpeg', '无', '10050.00');

-- ----------------------------
-- Table structure for employee_role
-- ----------------------------
DROP TABLE IF EXISTS `employee_role`;
CREATE TABLE `employee_role` (
  `employee_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of employee_role
-- ----------------------------
INSERT INTO `employee_role` VALUES ('1', '3');
INSERT INTO `employee_role` VALUES ('2', '1');
INSERT INTO `employee_role` VALUES ('3', '3');
INSERT INTO `employee_role` VALUES ('4', '0');
INSERT INTO `employee_role` VALUES ('6', '1');
INSERT INTO `employee_role` VALUES ('7', '2');
INSERT INTO `employee_role` VALUES ('5', '1');
INSERT INTO `employee_role` VALUES ('8', '3');
INSERT INTO `employee_role` VALUES ('9', '4');
INSERT INTO `employee_role` VALUES ('10', '1');
INSERT INTO `employee_role` VALUES ('11', '0');
INSERT INTO `employee_role` VALUES ('12', '2');

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` double(8,2) NOT NULL,
  `total` int(5) NOT NULL,
  `surplus` int(5) NOT NULL,
  `type` int(1) NOT NULL,
  `desc` text,
  `image` varchar(255) NOT NULL,
  `status` int(1) NOT NULL,
  `lastModifyTime` varchar(40) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES ('1', '饭1', '16.00', '300', '1', '1', '好吃呀', '/img/food/food004.jpg', '0', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('2', '饭2', '15.00', '200', '175', '1', '好吃呀', '/img/food/food005.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('3', '饭3', '14.00', '50', '31', '1', '好吃呀', '/img/food/food006.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('4', '饭4', '13.00', '300', '285', '1', '好吃呀', '/img/food/food007.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('5', '饭5', '13.00', '300', '299', '1', '好吃呀', '/img/food/food007.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('6', '饭6', '13.00', '300', '293', '1', '好吃呀', '/img/food/food007.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('7', '饭7', '13.00', '300', '289', '1', '好吃呀', '/img/food/food007.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('8', '粉面1', '12.00', '50', '12', '2', '好面好粉！', '/img/food/food008.jpg', '1', '2019-03-16 20:30:28');
INSERT INTO `food` VALUES ('9', '粉面2', '12.00', '50', '48', '2', '好面好粉！', '/img/food/food009.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('10', '粉面3', '12.00', '50', '48', '2', '好面好粉！', '/img/food/food010.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('11', '粉面4', '12.00', '50', '49', '2', '好面好粉！', '/img/food/food008.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('12', '粉面5', '12.00', '50', '50', '2', '好面好粉！', '/img/food/food008.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('13', '粉面6', '12.00', '50', '50', '2', '好面好粉！', '/img/food/food008.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('14', '粉面7', '12.00', '50', '50', '2', '好面好粉！', '/img/food/food010.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('15', '面点1', '12.00', '50', '0', '3', '面点大好！', '/img/food/food011.jpg', '0', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('16', '面点2', '12.00', '50', '50', '3', '面点大好！', '/img/food/food012.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('17', '面点3', '12.00', '50', '49', '3', '面点大好！', '/img/food/food013.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('18', '面点4', '12.00', '50', '50', '3', '面点大好！', '/img/food/food011.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('19', '面点5', '12.00', '50', '50', '3', '面点大好！', '/img/food/food011.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('20', '面点6', '12.00', '50', '49', '3', '面点大好！', '/img/food/food011.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('21', '面点7', '12.00', '50', '50', '3', '面点大好！', '/img/food/food013.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('22', '饮料小吃1', '3.00', '50', '0', '4', '饮料小吃棒棒哒！', '/img/food/food014.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('23', '饮料小吃2', '3.00', '50', '46', '4', '饮料小吃棒棒哒！', '/img/food/food015.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('24', '饮料小吃3', '3.00', '50', '49', '4', '饮料小吃棒棒哒！', '/img/food/food016.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('25', '饮料小吃4', '3.00', '50', '49', '4', '饮料小吃棒棒哒！', '/img/food/food014.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('26', '饮料小吃5', '3.00', '50', '50', '4', '饮料小吃棒棒哒！', '/img/food/food014.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('27', '饮料小吃6', '3.00', '50', '48', '4', '饮料小吃棒棒哒！', '/img/food/food014.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('28', '饮料小吃7', '3.00', '50', '50', '4', '饮料小吃棒棒哒！', '/img/food/food016.jpg', '1', '2019-03-08 21:12:06');
INSERT INTO `food` VALUES ('29', 'test1', '15.01', '300', '300', '1', '', '/img/food/15521368662.jpg', '0', '2019-03-09 21:07:49');
INSERT INTO `food` VALUES ('30', 'test2', '15.01', '300', '300', '1', '', '/img/food/15521371243.jpg', '0', '2019-03-09 21:12:06');
INSERT INTO `food` VALUES ('31', '21', '211.00', '121', '21', '2', '222', '/img/food/15521506943.jpg', '1', '2019-03-10 01:47:10');
INSERT INTO `food` VALUES ('32', '123', '1.00', '1221', '0', '1', '', '/img/food/15521511252.jpg', '1', '2019-03-10 01:05:27');
INSERT INTO `food` VALUES ('33', '12', '21.00', '2332', '0', '1', '', '/img/food/15521511642.jpg', '1', '2019-03-10 01:06:06');
INSERT INTO `food` VALUES ('34', '1', '2.00', '32', '4', '3', '', '/img/food/15521514873.jpg', '0', '2019-03-10 01:11:32');
INSERT INTO `food` VALUES ('35', '12', '21.00', '21', '21', '2', '12', '/img/food/15521523951.jpg', '1', '2019-03-10 01:26:36');
INSERT INTO `food` VALUES ('36', 'test菜品', '12.00', '333', '111', '2', '', '/img/food/15527154731.jpg', '1', '2019-03-16 13:51:17');
INSERT INTO `food` VALUES ('37', '菜品test2', '4.55', '300', '295', '1', '', '/img/food/15527163062.jpg', '1', '2019-03-16 14:06:42');
INSERT INTO `food` VALUES ('38', 'test3', '12.00', '122', '12', '4', '', '/img/food/15527412782.jpg', '1', '2019-03-16 21:01:21');
INSERT INTO `food` VALUES ('39', '213', '1223.00', '221', '12', '2', '', '/img/food/15527413151.jpg', '1', '2019-03-16 21:26:58');
INSERT INTO `food` VALUES ('40', '123', '2.00', '22', '2', '2', '', '/img/food/15527428293.jpg', '0', '2019-03-16 21:27:11');

-- ----------------------------
-- Table structure for foodsalerank
-- ----------------------------
DROP TABLE IF EXISTS `foodsalerank`;
CREATE TABLE `foodsalerank` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `foodTopId` int(10) NOT NULL,
  `foodTopNum` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of foodsalerank
-- ----------------------------

-- ----------------------------
-- Table structure for meal
-- ----------------------------
DROP TABLE IF EXISTS `meal`;
CREATE TABLE `meal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeId` int(10) NOT NULL,
  `orderId` int(10) NOT NULL,
  `status` int(1) NOT NULL,
  `acceptOrderTime` varchar(40) DEFAULT NULL,
  `esendTime` varchar(40) DEFAULT NULL,
  `sendTime` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of meal
-- ----------------------------
INSERT INTO `meal` VALUES ('70', '7', '74', '4', '2019-03-24 00:35:38', '2019-03-24 01:05:38', '2019-03-24 16:03:27');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeId` int(10) NOT NULL,
  `sumPrice` double(8,2) NOT NULL,
  `address` varchar(255) NOT NULL,
  `payment` int(1) NOT NULL,
  `status` int(1) NOT NULL,
  `orderTime` varchar(40) NOT NULL COMMENT '下单时间',
  `edelTime` varchar(40) NOT NULL COMMENT '预计配送时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('74', '5', '16.00', '广东技术师范大学天河学院', '2', '4', '2019-03-24 00:35:26', '2019-03-24 01:35:26');

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `foodId` int(10) NOT NULL,
  `foodNum` int(5) NOT NULL,
  `price` double(8,2) NOT NULL,
  `orderId` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_detail
-- ----------------------------
INSERT INTO `order_detail` VALUES ('100', '6', '1', '13.00', '74');
INSERT INTO `order_detail` VALUES ('101', '27', '1', '3.00', '74');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('0', 'ROLE_NOTEMPLOYEE');
INSERT INTO `role` VALUES ('1', 'ROLE_EMPLOYEE');
INSERT INTO `role` VALUES ('2', 'ROLE_TAKER');
INSERT INTO `role` VALUES ('3', 'ROLE_ADMIN');
INSERT INTO `role` VALUES ('4', 'ROLE_SUPERADMIN');
