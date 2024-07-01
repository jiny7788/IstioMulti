import {useState, useEffect, useContext} from 'react';
import { useRouter } from 'src/routes/hooks';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BoardService from '../../../apis/BoardService';
import TextEditor from '../../../components/text-editor/TextEditor';
import { AuthContext } from '../../../context/auth';

export default function BoardRead(props) {
    let {type, no, pageno} = props;
    const {userId}  = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [writer, setWriter] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (no) {
            BoardService.getOneBoard(no).then((res) => {
                let board = res.data;
                setTitle(board.title);
                setContents(board.contents);
                setWriter(board.writer);
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

    const goToList = () => {
        router.push(`/board/${type}/${pageno}`);
    }

    const goToUpdate = () => {
        if (writer !== userId) {
            alert("작성자만 수정할 수 있습니다.");
            return;        
        }

        router.push(`/boardwrite/${type}/${no}/${pageno}`);
    }

    const deleteView = () => {
        if (writer !== userId) {
            alert("작성자만 삭제할 수 있습니다.");
            return;
        }

        if (
            window.confirm(
              "정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다."
            )
          ) {
            BoardService.deleteBoard(no).then((res) => {
                if(res.status === 200) {
                    console.log("deleteBoard => " + JSON.stringify(res.data));
                    router.push(`/board/${type}`);
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
                <TextField
                    required
                    id="outlined-required"
                    label="제목"
                    value={title}
                    onChange={handleTitleChange}
                    fullWidth 
                    disabled
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

