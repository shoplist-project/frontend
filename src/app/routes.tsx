import {
    createBrowserRouter,
} from "react-router";
import {AuthLayer, Shoplists, Shoplist, Registration ,Login} from "../pages";
import {NotAuthLayer} from "../pages/auth/NotAuthLayer.tsx";

export const Router = createBrowserRouter([
    {
      path: '/auth',
      Component: NotAuthLayer,
        children: [
            {
                path: '/auth/login',
                Component: Login
            },
            {
                path: '/auth/register',
                Component: Registration
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayer,
        children: [
            {
                index: true,
                path: '/',
                Component: Shoplists
            },
            {
                path: 'shoplists',
                Component: Shoplists
            },
            {
                path: 'shoplists/:id',
                Component: Shoplist
            }
        ]
    }
])