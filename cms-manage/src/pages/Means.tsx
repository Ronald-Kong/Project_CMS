import React,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message, Upload  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import "./css/means.less"
import { InfoGetApi,InfoChangeApi } from '../request/api';
import { connect } from 'react-redux';


const getBase64 = (img:any, callback:any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file:any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('请上传JPG或者PNG格式的图片');
  }

  const isLt2M = file.size / 1024 /1024 /1024  < 200;

  if (!isLt2M) {
    message.error('图片需要小于200KB');
  }

  return isJpgOrPng && isLt2M;
};


interface MeansProps{
  increaseKey:Function
}

const Means:React.FC<MeansProps>=(props)=>{
  const navigate=useNavigate();

  useEffect(()=>{
    InfoGetApi().then((res:any)=>{
      if(res.errCode===0)
      {
        message.success(res.message)
      }
      else
      message.error("您的登录已过期，请重新登录")
    })
  },[])

  const onFinish=(values:any)=>{
    console.log(values)
    if(values.username!==undefined&&values.password!==undefined&&values.username.trim()!==""&&values.password.trim()!=="")
    { 
      InfoChangeApi({username:values.username,password:values.password}).then(
        (res:any)=>{
          if(res.errCode===0)
          {message.success("修改成功，即将为您跳转到登录界面")
           setTimeout(()=>{
            navigate("/login");
           },2000);
          }
          else
          message.error(res.message)
        }
      )
    }
    else
    {
      message.error("用户名或密码不能为空")
    }
  }

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url:any) => {
        setLoading(false);
        setImageUrl(url);
        localStorage.setItem("avatar",info.file.response.data.filePath)
        props.increaseKey();
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传新头像
      </div>
    </div>
  );

  return (
    <div className='container-box'>
       <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFinish}
      initialValues={{}}
      autoComplete="off"
      style={{width:"400px"}}
    >
      <Form.Item
        label="修改用户名:"
        name="username"
        required={true}
      >
        <Input placeholder='请输入新用户名'/>
      </Form.Item>

      <Form.Item
        label="修 改 密 码:"
        name="password"
        required={true}
      >
        <Input.Password placeholder='请输入新密码'/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers={{"token":localStorage.getItem("token")||""}}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
    </div>
  )
}

const mapDispatchToProps=(dispatch:any)=>{
  return {
    increaseKey:()=>{
      dispatch({type:"increase"})
    }
  }
}

export default connect(null,mapDispatchToProps)(Means)