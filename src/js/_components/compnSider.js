import React from 'react';
import {Icon,Layout, Menu} from 'antd';
const {Sider} = Layout;
import {Link} from 'react-router-dom'

const CompnSider=(props)=> {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={props.defaultMenuKey}>
                <Menu.Item key="0">
                    <Link to='/' replace>
                        <Icon type="home"/>
                        <span>首页</span>
                    </Link>
                </Menu.Item>
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
                    <Link to='/product' replace>
                        <Icon type="shop" />
                        <span>产品管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to='/werehouse' replace>
                        <Icon type="database"/>
                        <span>仓储管理</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};
export default CompnSider;