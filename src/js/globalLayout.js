import React from 'react';
import {Link, Redirect, Switch} from 'react-router-dom'
import {Layout, Menu, Breadcrumb, Icon, Badge, Avatar,Button} from 'antd';
import {userService} from "./_services/user.service";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

const GlobalLayout = (props) => {
    return (
        <Layout style={{height: '100%'}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to='/hr' replace>
                            <Icon type="user"/>
                            <span>员工档案</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/order' replace>
                            <Icon type="shopping-cart"/>
                            <span>订单管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to='/crm' replace>
                            <Icon type="contacts"/>
                            <span>客户关系</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to='/fin' replace>
                            <Icon type="pay-circle-o"/>
                            <span>财务审理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to='/warehouse' replace>
                            <Icon type="database"/>
                            <span>仓储管理</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background: '#fff', padding: 0}}>

                    <span style={{marginRight: 24, float: 'right'}}><Button type="primary" shape="circle" icon="logout" onClick={() => {
                        userService.logout();
                    }}/></span>
                    <span style={{marginRight: 24, float: 'right'}}>
                        <Badge count={1}><Avatar shape="square" size="default" icon="user"/></Badge>
                    </span>

                </Header>

                <Content style={{margin: '12px 12px 0'}}>
                    <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                        {/*<Main/>*/}
                        {props.children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default GlobalLayout;