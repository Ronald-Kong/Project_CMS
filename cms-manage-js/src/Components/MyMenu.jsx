import { AppstoreOutlined, MailOutlined, SettingOutlined,EditOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {useNavigate,useLocation} from "react-router-dom"
import React,{useState,useEffect} from 'react';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('查看文章列表', 'list', <MailOutlined />),
  getItem('文章编辑', 'edit', <AppstoreOutlined />),
  getItem('修改资料', 'means', <SettingOutlined />),
  getItem('权限管理', 'authority', <EditOutlined />)
];


export default function MyMenu() {

  const navigate=useNavigate();

  let pathname=useLocation().pathname;

  const [key,setKey]=useState(pathname.split("/")[1]);


  const onClick = (e) => {
    setKey(e.key);
    navigate("/"+e.key);
  };
  
  useEffect(()=>{setKey(pathname.split("/")[1])},[pathname])

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 200,
      }}
      selectedKeys={[key]}
      mode="inline"
      items={items}
      theme="dark"
    />
  );
}
