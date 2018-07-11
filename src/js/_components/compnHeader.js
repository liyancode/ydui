import React from 'react';
import {Layout, Dropdown, Menu, Badge, Avatar, Button} from 'antd';
const {Header} = Layout;
import {userService} from "../_services/user.service";

const CompnHeader = (props) => {
    const logout_menu = (
        <Menu>
            <Menu.Item>
                <Button type="danger" title={"退出"}
                        onClick={() => {
                            userService.logout();
                        }}>退出</Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <Header style={{background: '#fff', padding: 0}}>
                    <span style={{marginRight: 50, float: 'right'}}>
                        <Dropdown overlay={logout_menu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                <Badge><Avatar style={{backgroundColor: '#87d068'}} shape="square" size="default"
                                               icon="user"/></Badge>
                            </a>
                        </Dropdown>
                    </span>
        </Header>
    );
};
export default CompnHeader;