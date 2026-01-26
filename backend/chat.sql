-- Active: 1764325004798@@127.0.0.1@3306@chat
create database chat CHARACTER set = 'utf8' COLLATE = 'utf8_hungarian_ci';

create table files (
    fileId VARCHAR(255) not null primary key UNIQUE,
    fileName varchar(255) not null,
    uploadTime TIMESTAMP default CURRENT_TIMESTAMP(),
    mimeType varchar(100),
    fileSize INTEGER not null

)


delete from users;
alter table users AUTO_INCREMENT = 1;

create table users (userId int AUTO_INCREMENT PRIMARY key,
email varchar(100) not null UNIQUE,
password varchar(255) not null,
avatar varchar(255) null,
Foreign Key (avatar) REFERENCES files(fileId) on delete CASCADE);

create table userFiles (
    userId integer not null,
    fileId varchar(255),
    Foreign Key (fileId) REFERENCES files(fileId) on delete cascade,
    Foreign Key (userId) REFERENCES users(userId) on delete cascade
);



create trigger insert_user BEFORE insert on users
for each row set new.password = pwd_encrypt(new.password);

create FUNCTION pwd_encrypt(pwd varchar(100))
RETURNS VARCHAR(255) DETERMINISTIC
RETURN SHA2(concat(pwd,'sozas'),256);


create function login(email VARCHAR(100),pwd VARCHAR(100))
RETURNS integer DETERMINISTIC
BEGIN
declare ok integer;
set ok = 0;
select userId into ok from users where users.email = email and users.password =  pwd_encrypt(pwd);
RETURN ok;
End;

insert into users values (null, "teszt1@gmail.com","titok",null),
(null,"teszt2@gmail.com","jelszo",null)

select login("teszt2@gmail.com","jelszo");

create table chatroom (
    roomId integer AUTO_INCREMENT PRIMARY key,
    name VARCHAR(25) not null,
    owner integer not null,
    Foreign Key (owner) REFERENCES users(userId) on delete CASCADE
) 

create table messages (
    messageId integer AUTO_INCREMENT primary key,
    message varchar(50) not null,
    messageType varchar(50) default "text" not null,
    fileId VARCHAR(255) default null,
    sender integer not null,
    roomId integer not null,
    Foreign Key (sender) REFERENCES users(userId) on delete CASCADE,
    Foreign Key (roomId) REFERENCES chatroom(roomId) on delete CASCADE,
    Foreign Key (messageType) REFERENCES messageTypes(type) on delete cascade,
    Foreign key (fileId) REFERENCES files(fileId) on delete cascade
)

create table messageTypes (
    type varchar(50) primary key UNIQUE
)
