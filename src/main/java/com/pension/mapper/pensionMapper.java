package com.pension.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface pensionMapper {
    ArrayList<String> selectAdmin(String userId, String userPw);
}
