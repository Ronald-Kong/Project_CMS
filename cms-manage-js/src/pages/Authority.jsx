import React,{useState,useEffect,useRef}from 'react'
import { Space, Table, Tag,Button, message} from 'antd';
import "./css/authority.less"
import { InfoGetApi,UserGetApi,AuthorityChangeApi } from '../request/api';
import { connect } from 'react-redux';



function Authority(props) {
  const [data,setData]=useState("");
  const [pagination,setPagination]=useState({current:1,pageSize:5,total:5,position:["bottomCenter"]})
  const [player,setPlayer]=useState("");
  const refPagination=useRef({current:1,pageSize:5,total:5,position:["bottomCenter"]})


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:"60%",
    },
    {
      title: 'Tag',
      key: 'tag',
      dataIndex: 'tag',
      width:"20%",
      render: (_,  {tag} ) => (
        <Space size="middle">
          {
            <Tag color={tag==="管理员"?"gold":(tag==="可编辑"?"green":"red")}>{tag}</Tag>
          }
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width:"20%",
      render: (_, {tag,name}) => (
        <Space size="middle">
          {
            tag==="管理员"?"":(tag==="不可编辑"?<Button type="primary" onClick={()=>{changeAuthority(name)}}>提升权限</Button>:<Button type="primary" danger onClick={()=>{changeAuthority(name)}}>收回权限</Button>)
          }
        </Space>
      ),
    },
  ];

  const changeAuthority=(name)=>{
    AuthorityChangeApi({username:name}).then(()=>{
      props.increaseKey();
    })
  }

  useEffect(()=>{
    InfoGetApi().then((res)=>{
      if(res.errCode===0)
      {
        setPlayer(res.data.player);
        if(res.data.player==="admin")
        {message.success("亲爱的管理员您好,欢迎您来调整权限")
         UserGetApi().then((res)=>{
          const new_arr=res.map((item)=>{
            const new_item={};
            new_item.key=item.id;
            new_item.name=item.username;
            if(item.player==="admin")
            new_item.tag="管理员";
            else if(item.editable===1)
            new_item.tag="可编辑"
            else
            new_item.tag="不可编辑"
            return new_item;
          })
          setData(new_arr);
          setPagination({current:1,pageSize:5,total:new_arr.length,position:["bottomCenter"]})
         })
        }
        else
        message.error("对不起,您无权调整编辑权限")
      }
      else
      message.error("您的登录已过期，请重新登录")
    })
  },[])

  useEffect(()=>{
    InfoGetApi().then((res)=>{
      if(res.errCode===0)
      {
        setPlayer(res.data.player);
        if(res.data.player==="admin")
        {
         UserGetApi().then((res)=>{
          const new_arr=res.map((item)=>{
            const new_item={};
            new_item.key=item.id;
            new_item.name=item.username;
            if(item.player==="admin")
            new_item.tag="管理员";
            else if(item.editable===1)
            new_item.tag="可编辑"
            else
            new_item.tag="不可编辑"
            return new_item;
          })
          setData(new_arr);
         })
        }
      }
      else
      message.error("您的登录已过期，请重新登录")
    })
  },[props.myKey])


  const changePage=(newPagination)=>{
    setPagination(newPagination);
    refPagination.current=newPagination;
  }


  return (
    (player===""||data==="")?
    <div className="authority_blank">
      正在加载,请稍候........
    </div>:
    (
    player==="admin"?
    <div className='authority_container'>
      <Table 
      columns={columns} 
      dataSource={data} 
      showHeader={false} 
      pagination={pagination}
      onChange={changePage}
      />
    </div>
    :
    <div className='normal_authority'>
      不好意思，您无权管理权限
    </div>
    )
  )
}

const mapStateToProps=(state)=>{
  return {
      myKey:state
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    increaseKey:()=>{
      dispatch({type:"increase"})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Authority);

