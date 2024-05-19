package com.jiny.backend.ctl;

import com.jiny.backend.dto.BoardDto;
import com.jiny.backend.svc.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class BoardController {
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    @Autowired
    private BoardService boardService;

    @GetMapping(value = "/board")
    public ResponseEntity<Map> getBoardList(@RequestParam(value = "p_num", required = false) Integer p_num) {
        if(p_num == null || p_num <= 0) p_num = 1;

        return boardService.getBoardList(p_num);
    }

    @PostMapping("/board")
    public int createBoard(@RequestBody BoardDto board) {
        return boardService.createBoard(board);
    }

    @GetMapping("/board/{no}")
    public ResponseEntity<BoardDto> getBoardByNo(@PathVariable Integer no) {
        return boardService.getBoard(no);
    }

    @PutMapping("/board/{no}")
    public int updateBoardByNo(
            @PathVariable Integer no, @RequestBody BoardDto board) {

        return boardService.updateBoard(no, board);
    }

    @DeleteMapping("/board/{no}")
    public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(
            @PathVariable Integer no) {

        return boardService.deleteBoard(no);
    }



}
