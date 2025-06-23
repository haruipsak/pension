package com.pension.controller;

//import com.pension.service.pensionService;
//import com.pension.vo.pensionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Map;

@RestController
@Controller
public class pensionControl {
    private final RestTemplate restTemplate;

    /** application.properties 에 세팅된 외부 API 기본 URL */
    @Value("${booking.api.base}")
    private String bookingApiBase;

    @Autowired
    public pensionControl(RestTemplate restTemplate) {
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

    @GetMapping("/reservation")
    @ResponseBody
    public ResponseEntity<String> reservationPage(@RequestParam Map<String, String> params) {
        // 외부 예약페이지 HTML 가져오기
        String url = bookingApiBase + "/booking-page";
        if (!params.isEmpty()) {
            String query = "?" + params.entrySet().stream()
                    .map(e -> e.getKey() + "=" + e.getValue())
                    .reduce((a, b) -> a + "&" + b).orElse("");
            url += query;
        }

        ResponseEntity<String> resp = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.status(resp.getStatusCode())
                .headers(resp.getHeaders())
                .body(resp.getBody());
    }

    /**
     * 예약 API 호출 → 외부 API로 POST 프록시
     */
    @PostMapping(path = "/reservation", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> reservationProxy(@RequestBody Map<String, Object> payload) {
        String url = bookingApiBase + "/reserve";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> req = new HttpEntity<>(payload, headers);
        ResponseEntity<String> resp = restTemplate.exchange(url, HttpMethod.POST, req, String.class);

        return ResponseEntity.status(resp.getStatusCode())
                .headers(resp.getHeaders())
                .body(resp.getBody());
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
