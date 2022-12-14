import React,{useEffect,useState,useRef}from 'react'
import { Button,PageHeader,Modal,Form,Input, message } from 'antd';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import moment from "moment"
import E from "wangeditor"
import "./css/edit.less"
import {ArticleAddApi,ArticleGetApi,ArticleUpdateApi} from "../request/api.js"

let editor=null;

export default function Edit() {
  const params=useParams();

  let pathname=useLocation().pathname;

  const [content,setContent]=useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [defaultTitle,setDefaultTitle]=useState("");

  const [defaultSubTitle,setDefaultSubTitle]=useState("");

  const navigate=useNavigate();


  const formRef=useRef();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    formRef.current.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish=(values)=>{
    const {title,subTitle}=values
    if(params.id)
    {
      ArticleUpdateApi({title,subTitle,content,id:params.id}).then((res)=>{
        if(res.errCode===0)
        {
          message.success(res.message);
          navigate("/list");
        }
        else
        {
          message.error(res.message);
        }
      })
    }
    else
    {
      ArticleAddApi({title,subTitle,content}).then(
        (res)=>{
          if(res.errCode===0)
          {
            message.success(res.message);
            navigate("/list");
          }
          else
          {
            message.error(res.message);
          }
        }
      )
    }
    setIsModalVisible(false);
  }


  useEffect(()=>{
    setDefaultTitle("");
    setDefaultSubTitle("");
    editor=new E("#editor")
    editor.config.onchange=(newHtml)=>{
      setContent(newHtml);
    }
    editor.create();
    if(params.id){
      ArticleGetApi({id:params.id}).then((res)=>{
        if(res.errCode===0)
        {
          let {title,subTitle,content}=res.data;
          setDefaultTitle(title);
          setDefaultSubTitle(subTitle);
          editor.txt.html(content);
        }
      })
    }

    return ()=>{
      editor.destroy();
    }
  },[pathname])



  return (
  <div>
    <PageHeader
      ghost={false}
      onBack={params.id?() => window.history.back():null}
      title="????????????"
      subTitle={"???????????????"+moment(new Date()).format("YYYY-MM-DD")}
      extra={
        <Button key="1" type="primary" onClick={showModal}>
          ????????????
        </Button>}
    >
    </PageHeader>

    <Modal zIndex={99999} title="???????????????????????????" visible={isModalVisible}  onOk={handleOk}
        onCancel={handleCancel}
    footer={[
      <Button key="back" onClick={handleCancel}>
        ??????
      </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        ??????
      </Button>,
    ]}>

    <Form
      name="basic"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      autoComplete="off"
      ref={formRef}
      onFinish={onFinish}
      initialValues={{title:defaultTitle,subTitle:defaultSubTitle}}
    >
      <Form.Item
        label="??????"
        name="title"
        rules={[{ required: true, message: '???????????????' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="?????????"
        name="subTitle"
      >
        <Input />
      </Form.Item>
    </Form>

    </Modal>

    <div id="editor">
    </div>
  </div>
  )
}
