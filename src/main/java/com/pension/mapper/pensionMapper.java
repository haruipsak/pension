package com.pension.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface pensionMapper {
    ArrayList<String> selectAdmin(String userId, String userPw);

    List<Map<String, Object>> room();
}
