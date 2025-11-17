import './index.scss'; 
import { Card, Form, Input, Button, message } from 'antd';
import logo from '@/assets/logo.png';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish =async (val) => {
    await dispatch(fetchLogin(val)) ;
    navigate('/');
    message.success('登录成功');
  };


  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="logo" />
        <Form
          name="login"
          onFinish={onFinish}
        >
          <Form.Item 
            label="手机号：" 
            name="mobile" 
            rules={
              [
                { required: true, message: '请输入手机号'},
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}
              ]
            }
          >
            <Input size="large" maxLength={11} placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item 
            label="验证码：" 
            name="code" 
            rules={
              [
                { required: true, message: '请输入验证码' },
                { pattern: /^\d{6}$/, message: '请输入6位验证码'}
              ]
            }
          >
            <Input size="large" maxLength={6} placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// 记得导出组件，否则无法在其他地方引入
export default Login;