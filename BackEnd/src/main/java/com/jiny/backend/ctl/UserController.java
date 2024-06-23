package com.jiny.backend.ctl;

import com.jiny.backend.dto.BoardDto;
import com.jiny.backend.dto.UserDto;
import com.jiny.backend.svc.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping(value = "/user")
    public ResponseEntity<Map> getUserList() {
        return userService.getUserList();
    }

    @PostMapping("/user")
    public int createUser(@RequestBody UserDto user) {
        return userService.createUser(user);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        return userService.getUser(id);
    }

    @PutMapping("/user/{id}")
    public int updateUserById(
            @PathVariable String id, @RequestBody UserDto user) {

        return userService.updateUser(id, user);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUserById(@PathVariable String id) {
        return userService.deleteUser(id);
    }

}