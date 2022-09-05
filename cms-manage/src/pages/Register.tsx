import React from 'react'
import { Button, Checkbox, Form, Input,message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link,useNavigate } from "react-router-dom"
import "./css/register.less"
import logo_img from "../assets/logo.jpg"
import {RegisterApi} from "../request/api.js"

export default function Register() {
  const navigate=useNavigate();
  const onFinish = (values:any) => {
    // console.log(password,confirm)
    RegisterApi({
      username:values.username,
      password:values.password
    }).then((res:any)=>{
      if(res.errCode===0)
      {
        message.success("恭喜您注册成功，将为您跳转回登录页面")
        setTimeout(()=>{navigate("/login")},1000);
      }
      else if(res.errCode===1)
      {
        message.error("该用户名已被使用")
      }
    })
  };

  const onFinishFailed = (errorInfo:any) => {
    const {username,password,confirm}=errorInfo.values;
    if(username==="")
    message.error("用户名不能为空")
    else if(password!==confirm)
    message.error("请使两次输入的密码一致")
  };


  return (
    <div className="register">
      <div className="register_box">
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入用户名' size="large" />
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
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入密码' size="large" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入密码不相同！'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请再次输入密码' size="large"/>
          </Form.Item>


          <Form.Item>
            <Link to="/login">已有账号？点击立即登录！</Link>
          </Form.Item>

          <Form.Item>

            <Button type="primary" htmlType="submit" block size="large">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
