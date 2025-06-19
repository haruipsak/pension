package com.pension.service;

import com.pension.mapper.pensionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class pensionService {
    @Autowired
    pensionMapper pensionMapper;

    public Boolean checkId(String userId, String userPw) {
        ArrayList<String> userList = new ArrayList<>();
        userList = pensionMapper.selectAdmin(userId, userPw);

        if(userList.size()>0){
            return true;
        }  else return false;
    }
}
