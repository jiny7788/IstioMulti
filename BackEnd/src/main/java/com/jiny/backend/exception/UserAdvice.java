package com.jiny.backend.exception;

import com.jiny.backend.dto.CommonResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserAdvice {
    private static final Logger logger = LoggerFactory.getLogger(UserAdvice.class);

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<CommonResponse> userException(Exception e) {
        return new ResponseEntity<>(CommonResponse.fail(e), HttpStatus.BAD_REQUEST);
    }
}
