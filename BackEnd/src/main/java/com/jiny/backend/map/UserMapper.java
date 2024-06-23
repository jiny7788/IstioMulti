package com.jiny.backend.map;

import com.jiny.backend.dto.UserDto;

import java.util.List;

public interface UserMapper {
    public List<UserDto> getAllUsers() throws Exception;
    public int save(UserDto user);
    public UserDto findById(String userId);
    public int update(UserDto user);
    public int delete(UserDto user);
}
