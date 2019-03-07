package com.copa.ordermeal.config;

import com.copa.ordermeal.service.security.CustomUserAdminService;
import com.copa.ordermeal.service.security.CustomUserService;
import com.copa.ordermeal.util.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.filter.CharacterEncodingFilter;

/**
 * 1.19
 * SpringSecurity配置
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig{

    //员工登录页面
    @Configuration
    @Order(1)
    public static class UserConfigurationAdapter extends WebSecurityConfigurerAdapter {

        @Bean
        UserDetailsService customUserService() {
            return new CustomUserService();
        }

        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(customUserService())
                    //启动MD5加密
                    .passwordEncoder(new PasswordEncoder() {
                        MD5Util md5Util=new MD5Util();
                        @Override
                        public String encode(CharSequence rawPassword) {
                            return md5Util.encode((String) rawPassword);
                        }

                        @Override
                        public boolean matches(CharSequence rawPassword, String encodedPassword) {
                            return encodedPassword.equals(md5Util.encode((String) rawPassword));
                        }
                    });
        }


        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .antMatcher("/user/**")//多HttpSecurity配置时必须设置这个，除最后一个外，因为不设置的话默认匹配所有，就不会执行到下面的HttpSecurity了
                    .authorizeRequests().antMatchers("/user/userCenter","/user/cart","/user/orderConfirm","/user/order","/user/rice","/user/fenMian","/user/pastry","/user/drink").hasAnyRole("EMPLOYEE")
                    .antMatchers("/user/userCenter1","/user/meal").hasAnyRole("TAKER")
                    .and()
                    .formLogin().loginPage("/user/login").failureUrl("/user/login?error").defaultSuccessUrl("/user/index")
                    .and()
                    //退出登录后的默认url是“/”
                    .logout().logoutUrl("/user/logout").logoutSuccessUrl("/user/index")
                    .and()
                    .headers().frameOptions().disable()//关闭X-Frame-Options
                    .and()
                    .csrf().disable();


            //解决中文乱码问题
            CharacterEncodingFilter filter = new CharacterEncodingFilter();
            filter.setEncoding("UTF-8");
            filter.setForceEncoding(true);
            http.addFilterBefore(filter, CsrfFilter.class);
        }
    }

    //后台登录页面
    @Configuration
    @Order(2)
    public static class AdminConfigurationAdapter extends WebSecurityConfigurerAdapter {

        @Bean
        UserDetailsService customUserAdminService() {
            return new CustomUserAdminService();
        }

        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(customUserAdminService())
                    //启动MD5加密
                    .passwordEncoder(new PasswordEncoder() {
                        MD5Util md5Util=new MD5Util();
                        @Override
                        public String encode(CharSequence rawPassword) {
                            return md5Util.encode((String) rawPassword);
                        }

                        @Override
                        public boolean matches(CharSequence rawPassword, String encodedPassword) {
                            return encodedPassword.equals(md5Util.encode((String) rawPassword));
                        }
                    });
        }


        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .antMatcher("/admin/**")//多HttpSecurity配置时必须设置这个，除最后一个外，因为不设置的话默认匹配所有，就不会执行到下面的HttpSecurity了
                    .formLogin().loginPage("/admin/login").failureUrl("/admin/login?error=true").defaultSuccessUrl("/admin/index")
                    .and()
                    //退出登录后的默认url是“/”
                    .logout().logoutUrl("/logout").logoutSuccessUrl("/")
                    .and()
                    .headers().frameOptions().disable()//关闭X-Frame-Options
                    .and()
                    .csrf().disable();
            //解决中文乱码问题
            CharacterEncodingFilter filter = new CharacterEncodingFilter();
            filter.setEncoding("UTF-8");
            filter.setForceEncoding(true);
            http.addFilterBefore(filter, CsrfFilter.class);
        }
    }
}
