import { lazy, Suspense, useContext } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const BoardPage = lazy(() => import('src/pages/board'));
export const BoardReadPage = lazy(() => import('src/pages/boardread'))
export const BoardWritePage = lazy(() => import('src/pages/boardwrite'))
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const {auth, signIn, signOut} = useContext(AuthContext);
  
  let routes = null;

  
  if( auth ) {
    console.log('Login....');
    routes = useRoutes([
      //{
      //  path: '',
      //   element: <LoginPage />,
      //},
      {
        path: '',
        element: (
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ),
        children: [
          { element: <IndexPage />, index: true },
          { path: 'board', element: <BoardPage /> },
          { path: 'board/:pageno', element: <BoardPage /> },
          { path: 'boardread/:no/:pageno', element: <BoardReadPage /> },
          { path: 'boardwrite', element: <BoardWritePage /> }, 
          { path: 'boardwrite/:no/:pageno', element: <BoardWritePage /> },        
          { path: 'user', element: <UserPage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'blog', element: <BlogPage /> },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '404',
        element: <Page404 />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ]);
  } else {
    console.log('Logout....');
    routes = useRoutes([
      {
        path: '',
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '404',
        element: <Page404 />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ]);
  }
  

//  console.log(routes);

  return routes;
}
