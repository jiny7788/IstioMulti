import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function BoardRead() {
    const { no } = useParams();
    const [type, setType] = useState("1");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [memberNo, setMebmerNo] = useState(1);
    const navigate = useNavigate();

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    
    const onContentsChange = (update) => {
        setContents(update);
    };

    const createBoard = () => {
        let board = {
            type: type,
            title: title,
            contents: contents,
            memberNo: memberNo,
        };
        console.log("board => " + JSON.stringify(board));

        if (!no) {
            //BoardService.createBoard(board).then((res) => {
                navigate(`/dashboard/board`);
            //});
        } else {
            //BoardService.updateBoard(no, board).then((res) => {
                navigate(`/dashboard/board`);
            //});
        }
    }

    const cancel = () => {
        navigate(`/dashboard/board`);
    }

    return (
        <>
        <Container maxWidth="lg">
            <Box sx={{ mt: 3 }}>
                <InputLabel id="select-label">Board Type</InputLabel>
                <Select
                    labelId="select-label"
                    id="select-label"
                    value={type}
                    label="Board Type"
                    onChange={handleTypeChange}
                >
                    <MenuItem value={"1"}>자유게시판</MenuItem>
                    <MenuItem value={"2"}>질문과 답변</MenuItem>
                </Select>
            </Box>
            <Box sx={{ mt: 3 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="제목"
                    value={title}
                    onChange={handleTitleChange}
                    fullWidth 
                />
            </Box>
            <Box sx={{ mt: 3 }}>
                Text Editor
            </Box>
            <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={createBoard} >저장</Button>{" "}
                <Button variant="outlined" onClick={cancel}>취소</Button>
            </Box>
        </Container>
        </>
    );
}