import React from 'react';
import {Icon,Layout, Menu} from 'antd';
const {Sider} = Layout;
import {Link} from 'react-router-dom'

const { SubMenu } = Menu;

const CompnSider=(props)=> {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo">
                <span>
                    耀迪·管理助手v0.1
                </span>
            </div>
            <Menu theme="dark" mode="inline"
                  defaultSelectedKeys={props.defaultMenuKey}
                  defaultOpenKeys={props.defaultOpenKeys}
            >
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
                <SubMenu
                    key="order_m"
                    title={<span><Icon type="shopping-cart" /><span>订单管理</span></span>}
                >

                    <Menu.Item key="order_page">
                        <Link to='/order' replace>
                            <Icon type="shopping-cart"/>
                            <span>订单</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="contract_page">
                        <Link to='/contract' replace>
                            <Icon type="book" />
                            <span>合同</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="ask_price_page">
                        <Link to='/ask_price' replace>
                            <Icon type="calculator" />
                            <span>询价</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="3">
                    <Link to='/crm' replace>
                        <Icon type="contacts"/>
                        <span>客户管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to='/fin' replace>
                        <Icon type="pay-circle-o"/>
                        <span>财务审批</span>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="product_m"
                    title={<span><Icon type="shop" /><span>产品管理</span></span>}
                >
                    <Menu.Item key="product_mianliao_page">
                        <Link to='/product_mianliao' replace>
                            <Icon type="shopping-cart"/>
                            <span>面料</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="product_fengguan_page">
                        <Link to='/product_fengguan' replace>
                            <Icon type="book" />
                            <span>风管</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="6">
                    <Link to='/werehouse' replace>
                        <Icon type="database"/>
                        <span>库存管理</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};
export default CompnSider;