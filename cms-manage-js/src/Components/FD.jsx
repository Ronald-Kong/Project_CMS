import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space,message } from 'antd';
import React,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import defaultAvatar from "../assets/defaultAvatar.jpg"
import "./FD.less"
import {connect} from "react-redux"

 function FD(props) {
    const [username,setUsername]=useState("游客");
    const [avatar,setAvatar]=useState(defaultAvatar);
    const navigate=useNavigate();

    useEffect(()=>{
        const username1=localStorage.getItem("username")
        const avatar1=localStorage.getItem("avatar")
        if(username1)
        setUsername(username1);
        if(avatar1)
        setAvatar("http://localhost:9000/images/"+avatar1)
    },[props.myKey])

    const infoEdit=()=>{
        navigate("/means")
    }

    const logout=()=>{
        localStorage.clear();
        message.success("已成功退出，即将返回登录页面");
        setTimeout(() => {
        navigate("/login");
        }, 1000);
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" onClick={infoEdit} >
                            修改资料
                        </a>
                    ),
                }, 
                {
                    type: 'divider',
                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
                            退出登录
                        </a>
                    ),
                }
            ]}
        />
    );

    return (
        <div >
            <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()} className='FD'>
                    <Space>
                         <img src={avatar} className="default_avatar"/>
                         <span>{username}</span>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}


const mapStateToProps=(state)=>{
    return {
        myKey:state
    }
}


export default connect(mapStateToProps)(FD);