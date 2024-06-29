package com.jiny.backend.svc;

import com.jiny.backend.dto.BoardDto;
import com.jiny.backend.map.BoardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoardService {
    private static final Logger logger = LoggerFactory.getLogger(BoardService.class);

    @Autowired
    private BoardMapper boardMapper;

    public int findAllCount(String type) {
        return boardMapper.count(type);
    }

    public ResponseEntity<Map> getBoardList(String type, Integer p_num, Integer count_per_page) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, count_per_page, 5); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        List<BoardDto> list = boardMapper.findFromTo(type, pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findAllCount(type));
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    public int createBoard(BoardDto board) {
        logger.info("createBoard called : {}", board);

        return boardMapper.save(board);
    }

    public ResponseEntity<BoardDto> getBoard(Integer no) {
        BoardDto board = null;
        try {
            board = boardMapper.findById(no);
        } catch (Exception e) {
            ResponseEntity.noContent();
        }

        return ResponseEntity.ok(board);
    }

    public int updateBoard(Integer no, BoardDto updatedBoard) {
        BoardDto board = null;

        board = boardMapper.findById(no);
        board.setType(updatedBoard.getType());
        board.setTitle(updatedBoard.getTitle());
        board.setContents(updatedBoard.getContents());
        board.setUpdatedTime(new Date());

        return boardMapper.update(board);
    }

    public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer no) {
        BoardDto board = boardMapper.findById(no);


        boardMapper.delete(board);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : ["+no+"]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
