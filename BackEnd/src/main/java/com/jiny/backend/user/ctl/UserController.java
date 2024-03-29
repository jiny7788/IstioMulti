package com.jiny.backend.user.ctl;

import com.jiny.backend.user.dto.CommonResponse;
import com.jiny.backend.user.svc.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping(value = "/get_userlist")
    public @ResponseBody CommonResponse getUserList() throws Exception {
        return CommonResponse.ok(userService.getUserList());
    }
}