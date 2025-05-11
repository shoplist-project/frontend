import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router";
import {Router} from "./routes.tsx";
import {ConfigProvider} from "antd";

const client = new QueryClient()

export function App() {
    return (
        <>
            <ConfigProvider>
                <QueryClientProvider client={client}>
                    <RouterProvider router={Router}/>
                </QueryClientProvider>
            </ConfigProvider>
        </>
    )
}

