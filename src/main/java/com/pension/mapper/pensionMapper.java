package com.pension.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface pensionMapper {
    ArrayList<String> selectAdmin(String userId, String userPw);
    List<Map<String, Object>> slctRoomPrice(String roomType, String selectSpecific);
    void savePrice(String roomType, String roomPrice, String roomSPrice, String roomUPrice, String roomSfPrice);
    List<Map<String, Object>> slctPeriod();
    public void savePeriod(String beachOpenDate, String beachCloseDate, String festivalOpenDate, String festivalCloseDate, String specialStart, String specialEnd);
}
