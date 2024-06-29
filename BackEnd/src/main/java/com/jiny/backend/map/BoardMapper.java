package com.jiny.backend.map;

import com.jiny.backend.dto.BoardDto;

import java.util.List;

public interface BoardMapper {
    public List<BoardDto> getAllBoards();
    public int save(BoardDto board);
    public BoardDto findById(Integer no);
    public int update(BoardDto board);
    public int delete(BoardDto board);

    public int count(String type);
    public List<BoardDto> findFromTo(String type, int startNum, int countPerPage);
}
