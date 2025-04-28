import {
    createBrowserRouter,
} from "react-router";
import {AuthLayer, Shoplists, Shoplist} from "../pages";

export const Router = createBrowserRouter([
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