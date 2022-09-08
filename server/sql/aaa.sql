mysql -uroot -pkfz19990203

#显示数据库
show databases;

#创建数据库
create database xxxxxx;

#删库跑路
drop databse xxxxxxx;

#使用xxxx数据库
use xxxxxxx;

#创建表
create table xxx(
    id int primary key auto_increment,
    username varchar(30) comment "用户名",
    password varchar(30) comment "密码"
);

#查看表
show tables;

#删除表
drom table xxxx;

#描述表
describe xxxx;

#增加表数据
 insert into user values(null,"李四","456");

#查询表数据
 #查询表中所有数据
  select * from user
 #查询表中名字为张三的用户的所有数据
  select * from user where username="张三";
 #查询表中名字为张三的用户的密码
  select password from user where username="张三";

#更新表数据(更新李四的密码为9999)
  update user set password="9999" where username="李四";

#删除表数据(删除user中用户名叫李四的这条数据)
  delete from user where username="李四";