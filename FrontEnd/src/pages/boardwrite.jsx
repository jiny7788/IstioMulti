import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { BoardWrite } from 'src/sections/board/write';

export default function BoardWritePage() {
    const { type, no, pageno } = useParams();
    
    return (
        <>
        <Helmet>
            <title> Library Board | Jiny's FrontEnd Study Site </title>
        </Helmet>

        <BoardWrite type={type} no={no} pageno={pageno}/>
        </>
    );
}