package com.jiny.backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Configuration
public class BackEndConfig {
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
