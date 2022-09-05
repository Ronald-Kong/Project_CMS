import { Breadcrumb } from 'antd';
import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import "./MyBreadcrumb.less"

interface MyBreadcrumbProps{
    className:string
}

const MyBreadcrumb:React.FC<MyBreadcrumbProps> = () => {
    let { pathname } = useLocation(); 
    const [item, setItem] = useState("");
    useEffect(() => {
        switch (pathname.split("/")[1]) {
            case "list":
                setItem("查看文章列表");
                break;
            case "edit":
                setItem("文章编辑");
                break;
            case "means":
                setItem("修改资料");
                break;
            case "authority":
                setItem("权限管理");
                break;
            case "article":
                setItem("文章内容");
                break;
        }
    }, [pathname])


    return (
        <Breadcrumb className='crumb'>
            <Breadcrumb.Item><Link to="/list">主页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{item}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default MyBreadcrumb;