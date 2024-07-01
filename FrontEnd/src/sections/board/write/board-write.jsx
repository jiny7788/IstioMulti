import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BoardService from '../../../apis/BoardService';
import TextEditor from '../../../components/text-editor/TextEditor';
import { useRouter } from 'src/routes/hooks';
import { AuthContext } from '../../../context/auth';

export default function BoardWrite() {
    const {userId}  = useContext(AuthContext);
    const { type, no, pageno } = useParams();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (no) {
            BoardService.getOneBoard(no).then((res) => {
                let board = res.data;
                setTitle(board.title);
                setContents(board.contents);
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
            writer: userId,
        };

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