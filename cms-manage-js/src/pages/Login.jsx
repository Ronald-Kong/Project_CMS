import React from 'react'
import { Button, Checkbox, Form, Input,message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link,useNavigate} from "react-router-dom"
import "./css/login.less"
import logo_img from "../assets/logo.jpg"
import { LoginApi } from '../request/api';

export default function Login() {
  const navigate=useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
    LoginApi({
      username:values.username,
      password:values.password
    }).then(
      (res)=>{
        if(res.errCode===0)
        {
          message.success("登录成功")
          console.log(res)
          localStorage.setItem("avatar",res.data.avatar);
          localStorage.setItem("player",res.data.player);
          localStorage.setItem("username",res.data.username);
          localStorage.setItem("editable",res.data.editable);
          localStorage.setItem("token",res.data["token"]);
          setTimeout(()=>{navigate("/")},1500)
        }
        else
        {
          message.error("用户名或密码不正确")
        }
      }
    )
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className="login">
      <div className="login_box">
        <img src={logo_img} alt="" className='logo_img' />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入用户名' size="large"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入密码' size="large"/>
          </Form.Item>

          <Form.Item>
            <Link to="/register">还没账号？点击立即注册！</Link>
          </Form.Item>

          <Form.Item>

            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
