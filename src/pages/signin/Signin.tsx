
import { Form, Input, Button, Typography, Card, Result } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '../../features/Interceptor';
import { useState } from 'react';



type SignInType = {
    email: string,
    password: string,
}

const { Title, Text} = Typography;

const Signin = () => {
    const [loginStatus, setloginStatus] = useState("none")
    const navigate = useNavigate()
    const onFinish = async (values: SignInType) => {
        try {
            const payload = { ...values, password: String(values.password) };
            const response = await axiosInstance.post('/auth/login', payload);
            if (response.status == 200 || response.status === 201) {
                // console.log(response.data)
                sessionStorage.setItem("token", response.data.access_token)
                setloginStatus('success')
                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000)

            } else {
                setloginStatus('error')
                console.log("An error occured")
            }
        } catch (error) {
            setloginStatus('error')
            console.log("An error occured")
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
            <Card style={{ width: 450, padding: 20, borderRadius: 30 }}>
                {loginStatus === 'success' ? (
                    <Result
                        status="success"
                        title="Successfully Logged In!"
                        subTitle="Redirecting you to the dashboard..."
                    />
                ) : loginStatus === 'error' ? (
                    <Result
                        status="error"
                        title="Login Failed"
                        subTitle="Please check your credentials and try again."
                        extra={[
                            <Button  color="default" variant="solid" key="retry" onClick={() => setloginStatus('none')}>
                                Try Again
                            </Button>,
                        ]}
                    />
                ) : (
                    <>
                        <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                        <Form
                            name="signon"
                            onFinish={onFinish}
                            layout="vertical"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                label={<span style={{ fontSize: 18 }}>Email</span>}
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Email" style={{ fontSize: 16 }} />
                            </Form.Item>

                            <Form.Item
                                label={<span style={{ fontSize: 18 }}>Password</span>}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" style={{ fontSize: 16 }} />
                            </Form.Item>

                            <Form.Item>
                                <Button  color="default" variant="solid" htmlType="submit" block style={{ fontSize: 18, height: 42, marginTop: "20px" , borderRadius:"25px"}}>
                                    Log In
                                </Button>
                            </Form.Item>
                        </Form>
                        <Text style={{ display: "block", textAlign: 'center', fontSize: 16 }}>Don't have an account?<Link to="/signup">Sign up</Link></Text>
                    </>
                )}
            </Card>

        </div>
    );
};

export default Signin;


