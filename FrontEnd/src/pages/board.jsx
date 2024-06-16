import { Helmet } from 'react-helmet-async';
import { BoardList } from 'src/sections/board/list';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function BoardPage() {
  const { pageno } = useParams();

  return (
    <>
      <Helmet>
        <title> Library Board | Jiny's FrontEnd Study Site </title>
      </Helmet>

      <BoardList pageno={pageno}/>
    </>
  );
}
