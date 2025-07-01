package com.pension.controller;

import com.pension.service.pensionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Map;

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

    @Autowired
    pensionService pensionService;

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

    @RequestMapping("/controlRoom")
    public String controlRoom(){
        return "controlRoom";
    }

    @RequestMapping("/controlPrice")
    public String controlPrice(@RequestParam(value = "roomType", required = false) String roomType,
                               @RequestParam(value = "roomPrice", required = false) String roomPrice,
                               @RequestParam(value = "roomSPrice", required = false) String roomSPrice,
                               @RequestParam(value = "roomUPrice", required = false) String roomUPrice,
                               Model model){
        if (roomType != null){
            pensionService.savePrice(roomType, roomPrice, roomSPrice, roomUPrice);
        }

        List<Map<String, Object>> slctRoomPrice = pensionService.slctRoomPrice(roomType);

        model.addAttribute("roomPrice",slctRoomPrice);
        return "controlPrice";
    }


    @RequestMapping("/checkId")
    public String checkId(@RequestParam("userId") String userId, @RequestParam("userPw") String userPw, RedirectAttributes redirectAttributes){
        boolean checkTrue = false;

        checkTrue = pensionService.checkId(userId, userPw);

        if(checkTrue){
            return "redirect:/controlBooking";
        } else
            redirectAttributes.addFlashAttribute("loginError", "아이디 또는 비밀번호가 올바르지 않습니다.");
        return "redirect:/adminLogin";
    }
}
