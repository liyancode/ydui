import React from 'react';
import {Layout, Divider, Badge, Icon} from 'antd';

const {Header} = Layout;
import {userService} from "../_services/user.service";

const CompnHeader = (props) => {
    return (
        <Header style={{background: '#fff',padding: 0,borderBottom: '1px solid #eee'}}>
                    <span>
                        <Divider type="vertical"/>
                        <Icon type="user" />
                        <span>{localStorage.getItem('user_name')}</span>
                        <Divider type="vertical"/>
                        <Icon type="bell" />
                        <a href={'#'}>
                            <Badge count={25} />
                        </a>
                        <Divider type="vertical"/>
                        <a type="danger" title={"退出"}
                           onClick={() => {
                               userService.logout();
                           }}>退出</a>
                    </span>
        </Header>
    );
};
export default CompnHeader;