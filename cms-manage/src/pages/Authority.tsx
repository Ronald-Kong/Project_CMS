import React,{useState,useEffect,useRef}from 'react'
import { Space, Table, Tag,Button, message} from 'antd';
import "./css/authority.less"
import { InfoGetApi,UserGetApi,AuthorityChangeApi } from '../request/api';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { connect } from 'react-redux';

interface AuthorityProps{
  myKey:number,
  increaseKey:Function
}

interface DataType{
  username:string;
  tag:string;
}



const Authority:React.FC<AuthorityProps>=(props)=> {
  const [data,setData]=React.useState<DataType[]>([]);
  const [pagination,setPagination]=React.useState<TablePaginationConfig>({current:1,pageSize:5,total:5,position:["bottomCenter"]})
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
      render: (_:any,  {tag}:any ) => (
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
      render: (_:any, {tag,name}:any) => (
        <Space size="middle">
          {
            tag==="管理员"?"":(tag==="不可编辑"?<Button type="primary" onClick={()=>{changeAuthority(name)}}>提升权限</Button>:<Button type="primary" danger onClick={()=>{changeAuthority(name)}}>收回权限</Button>)
          }
        </Space>
      ),
    },
  ];

  const changeAuthority=(name:string)=>{
    AuthorityChangeApi({username:name}).then(()=>{
      props.increaseKey();
    })
  }

  useEffect(()=>{
    InfoGetApi().then((res:any)=>{
      if(res.errCode===0)
      {
        setPlayer(res.data.player);
        if(res.data.player==="admin")
        {message.success("亲爱的管理员您好,欢迎您来调整权限")
         UserGetApi().then((res:any)=>{
          const new_arr=res.map((item:any)=>{
            const new_item:any={};
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
    InfoGetApi().then((res:any)=>{
      if(res.errCode===0)
      {
        setPlayer(res.data.player);
        if(res.data.player==="admin")
        {
         UserGetApi().then((res:any)=>{
          const new_arr=res.map((item:any)=>{
            const new_item :any={};
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


  const changePage=(newPagination:any)=>{
    setPagination(newPagination);
    refPagination.current=newPagination;
  }


  return (
    (player===""||data.length===0)?
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

const mapStateToProps=(state:number)=>{
  return {
      myKey:state
  }
}

const mapDispatchToProps=(dispatch:any)=>{
  return {
    increaseKey:()=>{
      dispatch({type:"increase"})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Authority);

