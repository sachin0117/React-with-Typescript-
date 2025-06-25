
import { Form, Input, Button, Typography, Card, Result } from 'antd';
import { MailOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '../../features/Interceptor';
import { useState } from 'react';



type SignupType = {
  name: string
  email: string,
  password: string,
  avatar: string;
}

const { Title, Text } = Typography;

const Signup = () => {
  const [form] = Form.useForm()
  const [signupStatus, setSignupStatus] = useState("none")
  const navigate = useNavigate()
  const onFinish = async (values: SignupType) => {
    try {
      const payload = { ...values, password: String(values.password), avatar: "https://i.pravatar.cc/150?img=1" };
      const response = await axiosInstance.post('/users', payload);
      if (response.status == 200 || response.status === 201) {
        form.resetFields()
        setSignupStatus("success")
        setTimeout(() => {
          navigate('/')
        }, 1000);

      } else {
        setSignupStatus("success")
      }
    } catch (error) {
      setSignupStatus("success")
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5', border: "rounded" }}>
      <Card style={{ width: 450, padding: 20, borderRadius: 30 }}>
        {
          signupStatus === 'success' ? (
            <Result
              status="success"
              title="Successfully Signed Up!"
              subTitle="Redirecting you to the login page..."
            />
          ) : signupStatus === 'error' ? (
            <Result
              status="error"
              title="Signup Failed"
              subTitle="Please check your details and try again."
              extra={[
                <Button  color="default" variant="solid" key="retry" onClick={() => setSignupStatus('none')}>
                  Try Again
                </Button>,
              ]}
            />
          ) : (
            <>
              <Title level={2} style={{ textAlign: 'center' }}>Create An Account</Title>
              <Form
                form={form}
                name="signon"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label={<span style={{ fontSize: 18 }}>Name</span>}
                  name="name"
                  rules={[
                    { required: true, message: 'Please enter your name!' },
                  ]}

                >
                  <Input prefix={<UserAddOutlined />} placeholder="Name" style={{ fontSize: 16 }} />
                </Form.Item>

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
                {/* <Form.Item
                    label={<span style={{ fontSize: 18 }}>Avatar URL</span>}
                    name="avatar"
                    rules={[{ required: true, message: 'Please input your avatar URL!' }]}>
                    <Input placeholder="Avatar URL" style={{ fontSize: 16 }} />
                  </Form.Item> */}
                <Form.Item>
                  <Button color="default" variant="solid" htmlType="submit" block style={{ fontSize: 18, height: 42, marginTop: "20px", borderRadius:"25px"}}>
                    Create Account
                  </Button>
                </Form.Item>

              </Form>
              <Text style={{ display: "block", textAlign: 'center', fontSize: 16 }}>Already have an account?<Link to="/">Signin</Link></Text>
            </>
          )

        }

      </Card>
    </div>
  );
};

export default Signup;


