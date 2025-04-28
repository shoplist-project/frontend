import {Avatar, Layout, Typography, ConfigProvider, theme, Dropdown} from "antd";
import './Header.css'
import {UserOutlined} from "@ant-design/icons";
import {useLogout, useMe} from "../shared/api";
import {useNavigate} from "react-router";

export function Header() {
    const {meData} = useMe()

    const {logoutRequest} = useLogout()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutRequest()
        await navigate('/auth/login')
    }
    return (
        <Layout.Header className='header'>
            <Typography.Title level={3} className='logo'><a href='/'>Shop list</a></Typography.Title>
            <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
                <Dropdown trigger='click' menu={{
                    items: [
                        {
                            key: 'logout',
                            onClick: handleLogout,
                            label: 'Выйти'
                        }
                    ]
                }}>
                    <div className='userData'>
                        <Avatar shape='circle' icon={<UserOutlined/>}/>
                        <Typography.Text>{meData?.username}</Typography.Text>
                    </div>
                </Dropdown>
            </ConfigProvider>
        </Layout.Header>
    )
}