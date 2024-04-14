import { Helmet } from 'react-helmet-async';

import { BoardRead } from 'src/sections/board/read';

// ----------------------------------------------------------------------

export default function BoardReadPage() {
  return (
    <>
      <Helmet>
        <title> Library Board | Jiny's FrontEnd Study Site </title>
      </Helmet>

      <BoardRead />
    </>
  );
}
