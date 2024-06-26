import { Helmet } from 'react-helmet-async';
import { BoardRead } from 'src/sections/board/read';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function BoardReadPage() {
  const { type, no, pageno } = useParams();

  return (
    <>
      <Helmet>
        <title> Library Board | Jiny's FrontEnd Study Site </title>
      </Helmet>

      <BoardRead type={type} no={no} pageno={pageno}/>
    </>
  );
}
