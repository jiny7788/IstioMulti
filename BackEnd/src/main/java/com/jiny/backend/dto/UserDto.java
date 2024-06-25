package com.jiny.backend.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDto {
    private String userId;
    private String userName;
    private String userPassword;
    private Date loginDatetime;
    private String useYn;
    private String accessToken;
    private String refreshToken;
}
