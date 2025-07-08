package com.pension.service;

import com.pension.mapper.priceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class priceService {
    @Autowired
    private priceMapper priceMapper;

    public List<Map<String, Object>> slctRoomPrice(String roomType, String selectSpecific) {
        List<Map<String, Object>> resultList = priceMapper.slctRoomPrice(roomType, selectSpecific);
        resultList.forEach(a->{
            String room = a.get("roomType").toString();
            if(room.contains("coupleRoom")){
                a.put("roomType", "커플룸");
            }else if(room.contains("familyTwo")){
                a.put("roomType", "투룸");
            }else if(room.contains("familyOne")){
                a.put("roomType", "원룸");
            }else if(room.contains("duplexTwo")){
                a.put("roomType", "복층투룸");
            }else if(room.contains("duplexOne")){
                a.put("roomType", "복층원룸");
            }
        });
        return resultList;
}

    public List<Map<String, Object>> slctPeriod() {
        List<Map<String, Object>> resultList = priceMapper.slctPeriod();
        return resultList;
    }

    public void savePeriod(String periodNum, String periodNm, String periodStart, String periodEnd) {
        if(periodNm.equals("beachOpen")){
            periodNm = "해수욕장 개장";
        }else if(periodNm.equals("mudFest")){
            periodNm = "머드 축제";
        }else {
            periodNm = "특별 가격";
        }
        priceMapper.savePeriod(periodNum, periodNm, periodStart, periodEnd);
    }

    public void dltPeriod(String periodNum) {
        priceMapper.dlctPeriod(periodNum);
    }

    public void savePrice(String roomType, String roomWkPrice, String roomWkndPrice, String roomSWkPrice, String roomSWkndPrice, String roomUWkPrice, String roomUWkndPrice, String roomSfWkPrice, String roomSfWkndPrice) {
        priceMapper.savePrice(roomType, roomWkPrice, roomWkndPrice, roomSWkPrice, roomSWkndPrice, roomUWkPrice,
                roomUWkndPrice, roomSfWkPrice, roomSfWkndPrice);
    }
}
