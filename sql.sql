create database hackmol;
use hackmol;
create table  users(emailid varchar(40) primary key, password varchar(30),status int , dos date);
drop table users;
select * from  users;

create table posttask (rid int primary key auto_increment , emailid varchar(50) , namee varchar(100)  , contact varchar(100)  , state varchar(50) , city varchar(100), sercat varchar(300) , UptoDate date , task varchar(300) );

select * from posttask;
