import { Helmet } from 'react-helmet-async';

import { BoardList } from 'src/sections/board/list';

// ----------------------------------------------------------------------

export default function BoardPage() {
  return (
    <>
      <Helmet>
        <title> Library Board | Jiny's FrontEnd Study Site </title>
      </Helmet>

      <BoardList />
    </>
  );
}
