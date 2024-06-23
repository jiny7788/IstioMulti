package com.jiny.backend.svc;

import com.jiny.backend.dto.UserDto;
import com.jiny.backend.map.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService  {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserMapper userMapper;

    public ResponseEntity<Map> getUserList() {
        Map result = null;

        try {
            List<UserDto> list = userMapper.getAllUsers();
            if (list == null || list.size() == 0) {
                return null;
            }

            result = new HashMap<>();
            result.put("list", list);

        } catch (Exception e) {
            logger.error("getUserList error : {}", e);
        }

        return ResponseEntity.ok(result);
    }

    public int createUser(UserDto user) {
        logger.info("createUser called : {}", user);

        return userMapper.save(user);
    }

    public ResponseEntity<UserDto> getUser(String id) {
        UserDto user = null;
        try {
            user = userMapper.findById(id);
        } catch (Exception e) {
            ResponseEntity.noContent();
        }

        return ResponseEntity.ok(user);
    }

    public int updateUser(String id, UserDto user) {
        logger.info("updateUser called : {}", user);

        return userMapper.update(user);
    }

    public ResponseEntity<Map<String, Boolean>> deleteUser(String id) {
        UserDto user = new UserDto();
        user.setUserId(id);

        int result = userMapper.delete(user);

        return ResponseEntity.ok(Map.of("success", result > 0));
    }
}
