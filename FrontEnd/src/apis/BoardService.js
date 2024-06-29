import axios from "axios";

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
    getBoards(type, p_num, count_per_page) {
        return axios.get(BOARD_API_BASE_URL + "?type=" + type + "&p_num=" + p_num + "&count_per_page=" + count_per_page);
    }

    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    getOneBoard(no) {
        return axios.get(BOARD_API_BASE_URL + "/" + no);
    }

    updateBoard(no, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + no, board);
    }

    deleteBoard(no) {
        return axios.delete(BOARD_API_BASE_URL + "/" + no);
    }
}

export default new BoardService();