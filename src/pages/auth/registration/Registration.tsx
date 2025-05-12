import {useRegister} from "../../../shared/api";
import {Button, Form, Input, Typography} from "antd";
import {useState} from "react";
import { RegistrationRequestDto} from "../../../shared/api/auth/types.ts";
import {Link, useNavigate} from "react-router";

export function Registration() {
    const {registerRequest, registerLoading} = useRegister()
    const [error, setError] = useState<null | string>(null)
    const navigate = useNavigate()
    const handleRegister = async (values: RegistrationRequestDto & {passwordAgain: string}) => {
        if (values.passwordAgain !== values.password) {
            setError('Пароли не совпадают')
            return
        }
        setError(null)
        try {
            await registerRequest(values)
            await navigate('/auth/login')

        } catch {
            setError('Логин занят')
        }
    }
    return (
        <div>
            <Typography.Title level={3}>Регистрация</Typography.Title>
            <Form layout='vertical' onFinish={handleRegister}>
                <Form.Item name='username' label='Логин'>
                    <Input name='username'/>
                </Form.Item>
                <Form.Item name='password' label='Пароль'>
                    <Input name='password' type='password'/>
                </Form.Item>
                <Form.Item name='passwordAgain' label='Повторите пароль'>
                    <Input name='passwordAgain' type='password'/>
                </Form.Item>
                {error && <div><Typography.Text>{error}</Typography.Text></div>}
                <Button block type='primary' loading={registerLoading} htmlType='submit'>Зарегистрироваться</Button>
                <Typography.Text>Есть аккаунт? <Link to='/auth/login'>Войти</Link></Typography.Text>
            </Form>
        </div>
    )
}