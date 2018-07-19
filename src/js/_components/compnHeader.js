import React from 'react';
import {Layout, Divider, Menu, Badge, Icon, Button} from 'antd';

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
        <Header style={{background: '#fff', padding: 0,borderBottom: '1px solid #eee'}}>
                    <span>
                        {/*<Dropdown overlay={logout_menu} trigger={['click']}>*/}
                        {/*<a className="ant-dropdown-link" href="#">*/}
                        {/*<Badge><Avatar style={{backgroundColor: '#87d068'}} shape="square" size="default"*/}
                        {/*icon="user"/></Badge>*/}
                        {/*</a>*/}
                        {/*</Dropdown>*/}
                        {/*<Avatar style={{backgroundColor: '#87d068'}} shape="square" size="default"*/}
                        {/*icon="user"/>*/}
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
                        {/*<Divider type="vertical"/>*/}
                        {/*<Badge count={25} />*/}
                    </span>
        </Header>
    );
};
export default CompnHeader;