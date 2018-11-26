import React from 'react';
import {Layout, Divider, Avatar, Icon,Badge} from 'antd';

const {Header} = Layout;
import {userService} from "../_services/user.service";

import moment from 'moment'
const CompnHeader = (props) => {
    moment.locale();
    return (
        <Header style={{background: '#fff',padding: 0,borderBottom: '1px solid #eee'}}>
                    <span>
                        <Divider type="vertical"/>
                        <a href={'#/hr_myinfo'}><Avatar shape="square" size="small" style={{ backgroundColor: '#87d068' }} icon="user"/></a>
                        {/*<Icon type="user" />*/}
                        <span>{" "+localStorage.getItem('user_name')}</span>
                        <Divider type="vertical"/>

                        <a href={'#'}>
                            <Badge dot>
                                <Icon type="mail" />
                            </Badge>
                        </a>
                        <Divider type="vertical"/>
                        <span>{moment().format('ll')}</span>

                        <a type="danger" title={"登出"} style={{color:'#f5222d',float:'right',marginRight:40}}
                           onClick={() => {
                               userService.logout();
                           }}><span>退出 </span><Icon type="logout" /></a>
                    </span>
        </Header>
    );
};
export default CompnHeader;