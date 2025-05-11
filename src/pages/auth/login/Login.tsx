import {useLogin} from "../../../shared/api";
import {Button, Form, Input, Typography} from "antd";
import {useState} from "react";
import {LoginRequestDto} from "../../../shared/api/auth/types.ts";
import {Link, useNavigate} from "react-router";

export function Login() {
    const {loginRequest, loginLoading} = useLogin()
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (values: LoginRequestDto) => {
        setError(false)
        try {
            await loginRequest(values)
            await navigate('/')
        } catch {
            setError(true)
        }
    }
    return (
        <div>
            <Typography.Title level={3}>Вход</Typography.Title>
            <Form layout='vertical' onFinish={handleLogin}>
                <Form.Item name='username' label='Логин'>
                    <Input name='username'/>
                </Form.Item>
                <Form.Item name='password' label='Пароль'>
                    <Input name='password' type='password'/>
                </Form.Item>
                {error && <div><Typography.Text>Неправильный логин или пароль</Typography.Text></div>}
                <Button block type='primary' loading={loginLoading} htmlType='submit'>Войти</Button>
                <Typography.Text>Нет аккаунта? <Link to='/auth/register'>Регистрация</Link></Typography.Text>
            </Form>
        </div>
    )
}