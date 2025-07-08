package com.pension.service;

import com.pension.mapper.pensionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class pensionService {
    @Autowired
    private pensionMapper pensionMapper;

    public Boolean checkId(String userId, String userPw) {
        ArrayList<String> userList = pensionMapper.selectAdmin(userId, userPw);

        if(userList.size()>0){
            return true;
        }  else return false;
    }

    public List<Map<String, Object>> room() {
        List<Map<String, Object>> room = pensionMapper.room();
        room.forEach(a->{
            String roomType = a.get("roomType").toString();
            if(roomType.contains("coupleRoom")){
                a.put("roomType", "커플룸");
            }else if(roomType.contains("familyTwo")){
                a.put("roomType", "투룸");
            }else if(roomType.contains("familyOne")){
                a.put("roomType", "원룸");
            }else if(roomType.contains("duplexTwo")){
                a.put("roomType", "복층투룸");
            }else if(roomType.contains("duplexOne")){
                a.put("roomType", "복층원룸");
            }
        });
        return room;
    }
}
