import { Helmet } from 'react-helmet-async';

import { BoardWrite } from 'src/sections/board/write';

export default function BoardWritePage() {
    return (
        <>
        <Helmet>
            <title> Library Board | Jiny's FrontEnd Study Site </title>
        </Helmet>

        <BoardWrite />
        </>
    );
}