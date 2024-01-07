package com.jiny.backend.user.svc;

import com.jiny.backend.user.dto.CommonResponse;
import com.jiny.backend.user.map.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService  {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserMapper userMapper;

    public CommonResponse getUserList() throws Exception {
        return CommonResponse.ok(userMapper.getUserList());
    }
}
