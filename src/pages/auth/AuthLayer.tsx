import {useMe} from "../../shared/api";
import {Navigate, useOutlet} from "react-router";
import {Header} from "../Header.tsx";
import {Layout} from "antd";

export function AuthLayer() {
    const {meLoading, meData, meHasError} = useMe()

    const outlet = useOutlet()
    // loader
    if ((meLoading || !meData) && !meHasError) return <></>

    if (meHasError) {
        return <Navigate to={'/auth/login'}/>
    }

    return (
        <Layout style={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
            <Header/>
            <Layout.Content style={{display: 'flex', width: '100vw', justifyContent: 'center', minHeight: '100vh'}}>
                {outlet}
            </Layout.Content>
        </Layout>
    )
}