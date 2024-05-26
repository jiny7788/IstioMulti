import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BoardService from '../../../apis/BoardService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';


export default function BoardRead() {
    const { no } = useParams();
    const [type, setType] = useState("자유게시판");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [memberNo, setMebmerNo] = useState(0);
    const navigate = useNavigate();
    const custom_config = {
        ...Editor.defaultConfig,
        htmlSupport: {                  // html tag들이 filtering되지 않도록 설정한다. 
            allow: [
              {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
              }
            ]
        },
       extraPlugins: [ MyCustomUploadAdapterPlugin ],   // image 파일 upload를 위한 custom upload 등록
    };

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
                console.log("createBoard => " + JSON.stringify(res.data));
                navigate(`/dashboard/board`);
            });
        } else {
            BoardService.updateBoard(no, board).then((res) => {
                console.log("updateBoard => " + JSON.stringify(res.data));
                navigate(`/dashboard/board`);
            });
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
                <CKEditor
                    required
                    editor={Editor}
                    config={custom_config}
                    data={contents}
                    onChange={(event, editor) => {
                        onChange(editor.getData());
                    }}
                />
            </Box>
            <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={createBoard} >저장</Button>{" "}
                <Button variant="outlined" onClick={cancel}>취소</Button>
            </Box>
        </Container>
        </>
    );
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader)
    }
}
  
class MyUploadAdapter {
      constructor(props) {
        this.loader = props;
        // URL where to send files.
        this.url = `http://localhost:8094/fileserver/fileUpload`;
      }
  
      // Starts the upload process.
      upload() {
          return new Promise((resolve, reject) => {
              this._initRequest();
              this._initListeners(resolve, reject);
              this._sendRequest();
          } );
      }
  
      // Aborts the upload process.
      abort() {
          if ( this.xhr ) {
              this.xhr.abort();
          }
      }
  
      // Example implementation using XMLHttpRequest.
      _initRequest() {
          const xhr = this.xhr = new XMLHttpRequest();
  
          xhr.open('POST', this.url, true);
          xhr.responseType = 'json';
          xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
          //xhr.setRequestHeader('Authorization', getToken())
      }
  
      // Initializes XMLHttpRequest listeners.
      _initListeners( resolve, reject ) {
          const xhr = this.xhr;
          const loader = this.loader;
          const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;
  
          xhr.addEventListener( 'error', () => reject( genericErrorText ) );
          xhr.addEventListener( 'abort', () => reject() );
          xhr.addEventListener( 'load', () => {
              const response = xhr.response;
              if ( !response || response.error ) {
                  return reject( response && response.error ? response.error.message : genericErrorText );
              }
  
              // If the upload is successful, resolve the upload promise with an object containing
              // at least the "default" URL, pointing to the image on the server.
              resolve({
                  default: response.url
              });
          } );
  
          if ( xhr.upload ) {
              xhr.upload.addEventListener( 'progress', evt => {
                  if ( evt.lengthComputable ) {
                      loader.uploadTotal = evt.total;
                      loader.uploaded = evt.loaded;
                  }
              } );
          }
      }
  
      // Prepares the data and sends the request.
      _sendRequest() {
          const data = new FormData();        
  
          this.loader.file.then(result => {
            data.append('upload', result);
            this.xhr.send(data);
            }
          )
      }
  
  }