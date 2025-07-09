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

    public List<Map<String, Object>> room(String roomType) {
        List<Map<String, Object>> room1= pensionMapper.room(roomType);
        return room1;
    }

    public void saveHead(Map<String, Object> params) {
        pensionMapper.saveHead(params);
    }
}
