import React from 'react';
import {Icon, Layout, Menu} from 'antd';
import {authorityHash} from '../_helpers/authorityConstants.js';

const {Sider} = Layout;
import {Link} from 'react-router-dom'

const {SubMenu} = Menu;

const CompnSider = (props) => {

    // 'r' 'rw' 'n'
    // "authorityHash": {
    //     "hr": "rw",
//         "order": "n",
//         "crm": "n",
//         "fin": "n",
//         "product": "n",
//         "warehouse": "n"
// }
    const user_authority = authorityHash();
    let menu_items = [];

    //--- hr
    let hr_autho = user_authority['hr'];
    if (hr_autho === 'r') {
        menu_items.push(
            <Menu.Item key="1">
                <Link to='/hr' replace>
                    <Icon type="user"/>
                    <span>员工档案</span>
                </Link>
            </Menu.Item>
        )
    } else if (hr_autho === 'rw') {
        menu_items.push(
            <Menu.Item key="1">
                <Link to='/hr' replace>
                    <Icon type="user"/>
                    <span>员工档案</span>
                </Link>
            </Menu.Item>
        )
    }

    //--- order
    let order_autho = user_authority['order']
    if (order_autho === 'r') {

    } else if (order_autho === 'rw') {
        menu_items.push(
            <SubMenu
                key="order_m"
                title={<span><Icon type="shopping-cart"/><span>订单管理</span></span>}
            >

                <Menu.Item key="order_page">
                    <Link to='/order' replace>
                        <Icon type="shopping-cart"/>
                        <span>订单</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="contract_page">
                    <Link to='/contract' replace>
                        <Icon type="book"/>
                        <span>合同</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="ask_price_page">
                    <Link to='/ask_price' replace>
                        <Icon type="calculator"/>
                        <span>询价</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        )
    }

    //--- crm
    let crm_autho = user_authority['crm']
    if (crm_autho === 'r') {

    } else if (crm_autho === 'rw') {
        menu_items.push(
            <Menu.Item key="3">
                <Link to='/crm' replace>
                    <Icon type="contacts"/>
                    <span>客户管理</span>
                </Link>
            </Menu.Item>
        )
    }

    //--- fin
    let fin_autho = user_authority['fin']
    if (fin_autho === 'r') {

    } else if (fin_autho === 'rw') {
        menu_items.push(
            <Menu.Item key="4">
                <Link to='/fin' replace>
                    <Icon type="pay-circle-o"/>
                    <span>财务审批</span>
                </Link>
            </Menu.Item>
        )
    }

    //--- product
    let product_autho = user_authority['product']
    if (product_autho === 'r') {

    } else if (product_autho === 'rw') {
        menu_items.push(
            <SubMenu
                key="product_m"
                title={<span><Icon type="shop"/><span>产品管理</span></span>}
            >
                <Menu.Item key="product_mianliao_page">
                    <Link to='/product_mianliao' replace>
                        <Icon type="shopping-cart"/>
                        <span>阻燃类</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="product_fengguan_page">
                    <Link to='/product_fengguan' replace>
                        <Icon type="book"/>
                        <span>风管类</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        )
    }

    //--- warehouse
    let warehouse_autho = user_authority['warehouse']
    if (warehouse_autho === 'r') {

    } else if (warehouse_autho === 'rw') {
        menu_items.push(
            <Menu.Item key="6">
                <Link to='/warehouse' replace>
                    <Icon type="database"/>
                    <span>库存管理</span>
                </Link>
            </Menu.Item>
        )
    }

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
                {menu_items}
            </Menu>
        </Sider>
    );
};
export default CompnSider;