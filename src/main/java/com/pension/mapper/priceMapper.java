package com.pension.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface priceMapper {
    List<Map<String, Object>> slctRoomPrice(String roomType, String selectSpecific);
    List<Map<String, Object>> slctPeriod();
    void savePeriod(String periodNum, String periodNm, String periodStart, String periodEnd);
    void dlctPeriod(String periodNum);
    void savePrice(Map<String, String> params);
}
