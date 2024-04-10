import { Helmet } from 'react-helmet-async';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | Jiny's FrontEnd Study Site</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
