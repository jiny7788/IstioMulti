import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Jiny's FrontEnd Study Site </title>
      </Helmet>

      <AppView />
    </>
  );
}
