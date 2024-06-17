import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BoardService from '../../../apis/BoardService';
import TextEditor from '../../../components/text-editor/TextEditor';
import { useRouter } from 'src/routes/hooks';

export default function BoardWrite() {
    const { no, pageno } = useParams();
    const [type, setType] = useState("자유게시판");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [memberNo, setMebmerNo] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (no) {
            BoardService.getOneBoard(no).then((res) => {
                let board = res.data;
                setType(board.type);
                setTitle(board.title);
                setContents(board.contents);
                setMebmerNo(board.memberNo);
            });
        }
    }
    , [no]);

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onChange = (data) => {
        setContents(data);
        //console.log("onChange => " + data);
    }

    const createBoard = () => {
        let board = {
            type: type,
            title: title,
            contents: contents,
            memberNo: memberNo,
        };
        console.log("board => " + JSON.stringify(board));

        if (!no) {
            BoardService.createBoard(board).then((res) => {
                router.push("/dashboard/board");
            });
        } else {
            BoardService.updateBoard(no, board).then((res) => {
                router.push(`/dashboard/board/${pageno}`);
            });
        }
    }

    const cancel = () => {
        if(!no)
            router.push("/dashboard/board");
        else
            router.push(`/dashboard/board/${pageno}`);
    }

    return (
        <>
        <Container>
            <Box>
                <InputLabel>게시판 종류</InputLabel>
                <Select value={type} onChange={handleTypeChange}>
                    <MenuItem value="자유게시판">자유게시판</MenuItem>
                    <MenuItem value="질문과 답변">질문과 답변</MenuItem>
                </Select>
            </Box>
            <Box>
                <TextField
                    label="제목"
                    value={title}
                    onChange={handleTitleChange}
                />
            </Box>
            <Box>
                <TextEditor value={contents} onChange={onChange} readOnly={false}/>
            </Box>
            <Box>
                <Button variant="contained" color="primary" onClick={createBoard}>저장</Button>
                <Button variant="outlined" onClick={cancel}>취소</Button>
            </Box>
        </Container>
        </>
    );
}