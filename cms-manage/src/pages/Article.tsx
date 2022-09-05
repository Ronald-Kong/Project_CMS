import React from 'react'
import "./css/article.less"
import { useLocation,useParams } from 'react-router-dom'
import { ArticleGetApi } from '../request/api';
import { useEffect,useState } from 'react';
import { message } from 'antd';


export default function Article() {
  let params=useParams();
  const [title,setTitle]=useState("");
  const [subTitle,setSubTitle]=useState("");
  const [content,setContent]=useState("");

  useEffect(()=>{
    ArticleGetApi(params).then((res:any)=>{
        if(res.errCode===0)
        {   
            setTitle(res.data.title)
            setSubTitle(res.data.subTitle)
            setContent(res.data.content)
        }
        else
        message.error(res.data);
    })
  },[])
  return (
    <div className='container'>
        <div className='title'>{title}</div>
        <div className="subTitle">{subTitle}</div>
        <div className="content" dangerouslySetInnerHTML={{__html:`${content}`}}></div>
    </div>
  )
}
