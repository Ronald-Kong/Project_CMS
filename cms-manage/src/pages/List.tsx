import React,{useEffect,useState} from 'react'
import "./css/list.less"
import { Space, Table, Tag,Button, message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { ArticleListApi,ArticleDeleteApi } from '../request/api';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import moment from "moment"

interface MyTitleProps{
  id:string,
  title:string,
  subTitle:string
}

const MyTitle:React.FC<MyTitleProps>=(props)=>{
  return (
    <div>
    <Link to={"/article/"+props.id}>{props.title}</Link>
    <p>{props.subTitle}</p>
    </div>
  )
}



export default function List() {

  const [arr,setArr]=useState([
  ])

  const [pagination,setPagination]=React.useState<TablePaginationConfig>({current:1,pageSize:5,total:5,position:["bottomCenter"]})
  
  const navigate=useNavigate();

  const getArticleList=(current:any,pageSize:any)=>{
    ArticleListApi({num:current,count:pageSize}).then(
      (res:any)=>{
        if(res.errCode===0)
        { 
          setPagination({current,pageSize,total:res.data.total,position:["bottomCenter"]});
          let new_arr:any=[];
          res.data.arr.map((item:any)=>{
            const obj={
              key:item.id,
              date:moment(item.date).format("YYYY-MM-DD HH:mm:ss"),
              myTitle:<MyTitle id={item.id} title={item.title} subTitle={item.subTitle}/>,
            }
            new_arr.push(obj);
          });
          setArr(new_arr);
        }
      }
    )
  }

  
  useEffect(()=>{
    getArticleList(pagination.current,pagination.pageSize);
  },[])

  const changePage=(newPagination:any)=>{
    getArticleList(newPagination.current,newPagination.pageSize);
  }

  const deleteArticle=(id:any)=>{
    ArticleDeleteApi({id}).then(
      (res:any)=>{
        if(res.errCode===0)
        {
          message.success(res.message);
          getArticleList(pagination.current,pagination.pageSize);
        }
        else
        message.error(res.message)
      }
    )
  }


  const columns = [
    {
      
      dataIndex: 'myTitle',
      key: 'myTitle',
      render: (text:any) => (
        text
      ),
      width:"60%",
    },
    {
      dataIndex: 'date',
      key: 'date',
    },
    {
      key: 'action',
      render: (text:any, record:any,index:any) => (
        <Space size="middle">
          <Button type="primary" onClick={()=>{navigate("/edit/"+record.key)}}>编辑</Button>
          <Button type="primary" danger onClick={()=>{deleteArticle(record.key)}}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    arr.length===0?
    <div>
      <br />
      <p>数据正在加载中，请稍候~</p>
    </div>
    :
    <div className='container'>
      <Table 
      className='table'
      columns={columns} 
      dataSource={arr} 
      showHeader={false} 
      pagination={pagination}
      onChange={changePage}
      />
    </div>
  )
}
