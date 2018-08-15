import React from 'react';
import {Layout, Divider, Avatar, Icon,Badge} from 'antd';

const {Header} = Layout;
import {userService} from "../_services/user.service";

const CompnHeader = (props) => {
    // let imgp='';
    // try{
    //     imgp=require("../../img/avt_ymd.jpeg");
    // }catch(err){
    //     console.log(err)
    //     imgp=require("../../img/avt_ym.jpeg");
    // }
    //
    // console.log(imgp);
    return (
        <Header style={{background: '#fff',padding: 0,borderBottom: '1px solid #eee'}}>
                    <span>
                        <Divider type="vertical"/>
                        <a href={'#/hr'}><Avatar shape="square" size="small" src={require("../../assets/img/avt_ym.jpeg")}/></a>
                        {/*<Icon type="user" />*/}
                        <span>{" "+localStorage.getItem('user_name')}</span>
                        <Divider type="vertical"/>

                        <a href={'#'}>
                            <Badge dot>
                                <Icon type="mail" />
                            </Badge>
                        </a>
                        <Divider type="vertical"/>

                        <a type="danger" title={"登出"} style={{color:'#f5222d',float:'right',marginRight:40}}
                           onClick={() => {
                               userService.logout();
                           }}><span>退出 </span><Icon type="logout" /></a>
                    </span>
        </Header>
    );
};
export default CompnHeader;