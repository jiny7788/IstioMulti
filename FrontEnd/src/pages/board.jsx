import { Helmet } from 'react-helmet-async';
import { BoardList } from 'src/sections/board/list';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function BoardPage() {
  const { type, pageno } = useParams();

  return (
    <>
      <Helmet>
        <title> Library Board | Jiny's FrontEnd Study Site </title>
      </Helmet>

      <BoardList type={type} pageno={pageno}/>
    </>
  );
}
