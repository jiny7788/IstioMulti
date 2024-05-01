package com.jiny.backend.dto;

import java.util.Date;
import lombok.Data;

@Data
public class BoardDto {
    private Integer no;
    private String type;
    private String title;
    private String contents;
    private Integer memberNo;
    private Date createdTime;
    private Date updatedTime;
    private Integer likes;
    private Integer counts;
}
