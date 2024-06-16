import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BoardService from '../../../apis/BoardService';
import TextEditor from '../../../components/text-editor/TextEditor';

export default function BoardRead(props) {
    let {no, pageno} = props;
    const [type, setType] = useState("자유게시판");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [memberNo, setMebmerNo] = useState(0);
    const navigate = useNavigate();

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
    };
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onChange = (data) => {
        setContents(data);
        //console.log("onChange => " + data);
    }

    const goToList = () => {
        navigate(`/dashboard/board/${pageno}`);
    }

    const goToUpdate = () => {
        navigate(`/dashboard/boardwrite/${no}/${pageno}`);
    }

    const deleteView = () => {
        if (
            window.confirm(
              "정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다."
            )
          ) {
            BoardService.deleteBoard(no).then((res) => {
                if(res.status === 200) {
                    console.log("deleteBoard => " + JSON.stringify(res.data));
                    navigate(`/dashboard/board`);
                } else {
                    console.log("deleteBoard error => " + JSON.stringify(res.data));
                    alert("글 삭제에 실패하였습니다.");
                }
            });
        }
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
                    <MenuItem value={"자유게시판"}>자유게시판</MenuItem>
                    <MenuItem value={"질문과 답변"}>질문과 답변</MenuItem>
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
                <TextEditor value={contents} onChange={onChange} readOnly={true}/>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Container maxWidth={false}>
                    <Button variant="outlined" onClick={() => goToList() }>글 목록으로 이동</Button>{" "}
                    <Button variant="outlined" onClick={() => goToUpdate() }>글 수정</Button>{" "}
                    <Button variant="outlined" onClick={() => deleteView()}>글 삭제</Button>     
                </Container>          
            </Box>
        </Container>
        </>
    );
}

