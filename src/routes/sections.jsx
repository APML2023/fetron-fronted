import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const FleetPage = lazy(() => import('src/pages/fleet'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Driver = lazy(()=>import('src/pages/driver'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        {
          path: 'fleets',
          element: (
            ""
          ),
          // children: [
          //   { path: "all", element: {} },
          //   { path: "available", element: {} },
          //   { path: "enroute-for-pickup", element: {} },
          //   { path: "at-enroute", element: {} },
          //   { path: "intransit", element: {} },
          //   { path: "unloading", element: {} },
          //   { path: "Completed", element: {} }
          // ]
        },
        {path:"fleetMonitoring",element: (
          <FleetPage>
            <Suspense>
              <Outlet />
            </Suspense>
          </FleetPage>
        ),
        children: [
          { path: "all", element: {} },
          { path: "available", element: {} },
          { path: "enroute-for-pickup", element: {} },
          { path: "at-enroute", element: {} },
          { path: "intransit", element: {} },
          { path: "unloading", element: {} },
          { path: "Completed", element: {} }
        ]
      },
        {path:"loadAssignment",element:{}},
        { path: 'products', element: <ProductsPage/> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path:"master",
      element:(""),
      children:[
        {path:"driver",
      element:<Driver/>
      }
      ]
    },
    {
      path: 'login',
      element:<LoginPage />,
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

  return routes;
}
