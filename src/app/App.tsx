import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router";
import {Router} from "./routes.tsx";

const client = new QueryClient()

export function App() {
    return (
        <>
            <QueryClientProvider client={client}>
                <RouterProvider router={Router}/>
            </QueryClientProvider>
        </>
    )
}

