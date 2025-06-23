package com.pension.controller;

//import com.pension.service.pensionService;
//import com.pension.vo.pensionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@Controller
public class PensionControl {
    private final RestTemplate restTemplate;

    /** application.properties 에 세팅된 외부 API 기본 URL */
    @Value("${booking.api.base}")
    private String bookingApiBase;

    @Autowired
    public PensionControl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
//
//    @Autowired
//    pensionService pensionService;

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/about")
    public String about(){
        return "about";
    }

    @RequestMapping("/room")
    public String room(){
        return "room";
    }

    @RequestMapping("/gallery")
    public String gallery(){
        return "gallery";
    }

    @RequestMapping("/contact")
    public String contact(){
        return "contact";
    }

    @RequestMapping("/controlBooking")
    public String booking(){
        return "controlBooking";
    }

    @RequestMapping("/adminLogin")
    public String adminLogin(){
        return "adminLogin";
    }

    @RequestMapping("/reservation")
    public String reservation(){
        return "reservation";
    }


//    @RequestMapping("/checkId")
//    public String checkId(@RequestParam("userId") String userId, @RequestParam("userPw") String userPw, RedirectAttributes redirectAttributes){
//        boolean checkTrue = false;
//
//        checkTrue = pensionService.checkId(userId, userPw);
//
//        if(checkTrue){
//            return "redirect:/controlBooking";
//        } else
//            redirectAttributes.addFlashAttribute("loginError", "아이디 또는 비밀번호가 올바르지 않습니다.");
//        return "redirect:/adminLogin";
//    }
}
