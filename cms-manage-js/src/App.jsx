import React,{useState} from 'react'
import "./assets/base.css"
import {Button,Layout} from "antd"
import {Outlet} from "react-router-dom"
import LogoImg from "./assets/logo.jpg"
import FD from './Components/FD'
import MyMenu from './Components/MyMenu'
import MyBreadcrumb from "./Components/MyBreadcrumb"
import "./App.less"


export default function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const [key,setKey]=useState(1);
  return (
    <div>
    <Layout id="app">
      <Header className="header">
        <img src={LogoImg} alt="" className='logo' />
        <FD ></FD>
      </Header>
      <Layout className='inner'>
        <Sider className='sider' width="200px"><MyMenu></MyMenu></Sider>

        <Content className="content">
          <MyBreadcrumb className="crumb"/>
          <Outlet key={key} setKey={setKey}/>
        </Content>
      </Layout>
      <Footer className="footer">Respect | Copyright &copy; 2022 Author 荣颜</Footer>
    </Layout>
    </div>
  )
}
