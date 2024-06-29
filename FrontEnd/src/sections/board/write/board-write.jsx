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
    const { type, no, pageno } = useParams();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [memberNo, setMebmerNo] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (no) {
            BoardService.getOneBoard(no).then((res) => {
                let board = res.data;
                setTitle(board.title);
                setContents(board.contents);
                setMebmerNo(board.memberNo);
            });
        }
    }
    , [no]);

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
                router.push(`/board/${type}`);
            });
        } else {
            BoardService.updateBoard(no, board).then((res) => {
                router.push(`/board/${type}/${pageno}`);
            });
        }
    }

    const cancel = () => {
        if(!no)
            router.push(`/board/${type}`);
        else
            router.push(`/board/${type}/${pageno}`);
    }

    return (
        <>
        <Container>
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