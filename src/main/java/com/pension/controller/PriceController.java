package com.pension.controller;

import com.pension.service.priceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Controller
public class PriceController {
    private final RestTemplate restTemplate;

    /** application.properties 에 세팅된 외부 API 기본 URL */
    @Value("${booking.api.base}")
    private String bookingApiBase;

    @Autowired
    public PriceController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Autowired
    priceService priceService;

    @RequestMapping("/controlPrice")
    public Object controlPrice(@RequestParam(value = "roomType", required = false) String roomType,
                               @RequestParam(value = "selectSpecific", required = false) String selectSpecific,
                               Model model){

        List<Map<String, Object>> slctRoomPrice = priceService.slctRoomPrice(roomType, selectSpecific);
        List<Map<String, Object>> slctPeriod = priceService.slctPeriod();

        if(roomType != null){
            return ResponseEntity.ok(slctRoomPrice.getFirst());
        }else model.addAttribute("roomPrice",slctRoomPrice);

        model.addAttribute("slctPeriod",slctPeriod);

        return "controlPrice";
    }

    @RequestMapping("/savePrice")
    public void savePrice (@RequestParam Map<String, String> params){
        priceService.savePrice(params);
    }

    @RequestMapping("/savePeriod")
    public void  savePeriod(@RequestParam(value = "periodNum", required = false) String periodNum,
                            @RequestParam(value = "periodNm", required = false) String periodNm,
                            @RequestParam(value = "periodStart", required = false) String periodStart,
                            @RequestParam(value = "periodEnd", required = false) String periodEnd){
        priceService.savePeriod(periodNum, periodNm, periodStart, periodEnd);
    }

    @RequestMapping("/dltPeriod")
    public void  savePeriod(@RequestParam(value = "periodNum") String periodNum){
        priceService.dltPeriod(periodNum);
    }
}
