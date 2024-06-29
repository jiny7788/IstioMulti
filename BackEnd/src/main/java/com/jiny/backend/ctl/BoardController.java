package com.jiny.backend.ctl;

import com.jiny.backend.dto.BoardDto;
import com.jiny.backend.svc.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Map;
import java.nio.file.Paths;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class BoardController {
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    @Autowired
    private BoardService boardService;

    @GetMapping(value = "/board")
    public ResponseEntity<Map> getBoardList(@RequestParam(value = "type", required = false) String type, @RequestParam(value = "p_num", required = false) Integer p_num, @RequestParam(value = "count_per_page", required = false) Integer count_per_page) {
        if(p_num == null || p_num <= 0) p_num = 1;
        if(count_per_page == null || count_per_page <= 0) count_per_page = 5;
        if(type == null || type.equals("")) type = "default";   // 게시판 종류를 선택하지 않은 경우 default로 설정

        return boardService.getBoardList(type, p_num, count_per_page);
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

    @ResponseBody
    @RequestMapping(value = "/fileUpload", method = {RequestMethod.POST, RequestMethod.GET})
    public String fileUpload(Model model,
                             @RequestParam(value="upload", required = false) MultipartFile fileload,
                             HttpServletRequest req) {

        //filename 취득
        String filename = fileload.getOriginalFilename();

        logger.info("fileUpload called : " + filename);

        try {
            String newfilename = uploadCKEditorFile(fileload, "ckeditor");
            String fileUrl = "/api/fileDownload?fileName=" + newfilename;

            //return "{ \"uploaded\" : 1, \"fileName\" : \""+ filename+ "\", \"url\" : \"http://localhost:8090" + fileUrl + "\" }";
            //return "{ \"uploaded\":1,\"urls\":{\"default\":\"http://localhost:8090\"" + fileUrl + "\"}}";
            //return "{ \"uploaded\" : 1, \"fileName\" : \""+ filename+ "\", \"url\" : \"http://localhost:8090" + fileUrl + "\", \"default\":\"http://localhost:8090" +fileUrl+ "\" }";
            return "{\"uploaded\":1, \"url\":\"http://localhost:8080" +fileUrl+ "\"}";
            //return "{\"default\": \"http://localhost:8090" +fileUrl+ "\"}";
        } catch (Exception e) {
            return "{\"error\":true, {\"message\":\"File save error\"}}";
        }
    }

    public String rootPath = Paths.get("/Users/skinfosec/upload-dir").toString();
    public String uploadCKEditorFile(MultipartFile multipartFile, String subPath) throws Exception {
        // 파일 업로드 경로 생성
        String savePath = Paths.get(rootPath, subPath).toString();
        verifyUploadPath(savePath);

        String origFilename = multipartFile.getOriginalFilename();
        if (origFilename == null || "".equals(origFilename)) return null;
        String filename = getUuidFileName(origFilename);
        String filePath = Paths.get(savePath, filename).toString();
        try {
            File file = new File(filePath);
            // 파일 권한 설정(쓰기, 읽기)
            file.setWritable(true);
            file.setReadable(true);
            multipartFile.transferTo(file);
        } catch (Exception e) {
            throw new Exception("[" + multipartFile.getOriginalFilename() + "] failed to save file...");
        }

        return filename;
    }

    public void verifyUploadPath(String path) {
        if (!new File(path).exists()) {
            try { new File(path).mkdir();
            } catch (Exception e) {
                e.getStackTrace();
            }
        }
    }

    public String getUuidFileName(String filename) {
        UUID uuid = UUID.randomUUID();
        StringBuilder sb = new StringBuilder();
        sb.append(FilenameUtils.getBaseName(filename))
                .append("_")
                .append(uuid)
                .append(".").
                append(FilenameUtils.getExtension(filename));
        return sb.toString();
    }

    @RequestMapping("/fileDownload")
    public void ckSubmit(@RequestParam(value="fileName") String fileName,
                         HttpServletRequest request,
                         HttpServletResponse response) {
        File file = getDownloadFile(fileName, "ckeditor");
        try {
            byte[] data = FileUtils.readFileToByteArray(file);
            response.setContentType(getMediaType(fileName).toString());
            response.setContentLength(data.length); response.setHeader("Content-Transfer-Encoding", "binary");
            response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(fileName, "UTF-8") + "\";");
            response.getOutputStream().write(data); response.getOutputStream().flush(); response.getOutputStream().close();
        } catch (IOException e) {
            throw new RuntimeException("파일 다운로드에 실패하였습니다.");
        } catch (Exception e) {
            throw new RuntimeException("시스템에 문제가 발생하였습니다.");
        }
    }

    public File getDownloadFile(String filaName, String subPath) {
        return new File(Paths.get(rootPath, subPath).toString(), filaName);
    }

    public MediaType getMediaType(String filename) {
        String contentType = FilenameUtils.getExtension(filename);
        MediaType mediaType = null;
        if (contentType.equals("png")) { mediaType = MediaType.IMAGE_PNG; }
        else if (contentType.equals("jpeg") || contentType.equals("jpg")) { mediaType = MediaType.IMAGE_JPEG; }
        else if (contentType.equals("gif")) { mediaType = MediaType.IMAGE_GIF; }
        return mediaType;
    }
}
