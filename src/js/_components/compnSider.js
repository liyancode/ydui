import React from 'react';
import {Icon, Layout, Menu,Badge} from 'antd';
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
            <SubMenu
                key="hr_m"
                title={<span><Icon type="team" /><span>员工档案</span></span>}
            >
                <Menu.Item key="hr_myinfo">
                    <Link to='/hr_myinfo' replace>
                        <Icon type="user"/>
                        <span>我的信息</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        )
    } else if (hr_autho === 'rw') {
        menu_items.push(
            <SubMenu
                key="hr_m"
                title={<span><Icon type="team" /><span>员工档案</span></span>}
            >
                <Menu.Item key="hr_myinfo">
                    <Link to='/hr_myinfo' replace>
                        <Icon type="user"/>
                        <span>我的信息</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="hr_allusers">
                    <Link to='/hr_allusers' replace>
                        <Icon type="team" />
                        <span>所有员工</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        )
    }

    //--- order
    let order_autho = user_authority['order']
    if (order_autho === 'r') {

    } else if (order_autho === 'rw') {
        menu_items.push(
            <SubMenu
                key="order_m"
                title={<span><Icon type="table" /><span>订单管理</span></span>}
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
        menu_items.push(
            <SubMenu
                key="crm"
                title={<span><Icon type="table" /><span>客户管理</span></span>}
            >
                <Menu.Item key="crm_my">
                    <Link to='/crm_my' replace>
                        <Icon type="contacts"/>
                        <span>我的客户</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        )
    } else if (crm_autho === 'rw') {
        menu_items.push(
            <SubMenu
                key="crm"
                title={<span><Icon type="table" /><span>客户管理</span></span>}
            >
                <Menu.Item key="crm_my">
                    <Link to='/crm_my' replace>
                        <Icon type="contacts"/>
                        <span>我的客户</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="crm_all">
                    <Link to='/crm_all' replace>
                        <Icon type="contacts"/>
                        <span>所有客户</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        )
    }

    //--- fin
    let fa_count=0;
    if(props.fin_approval_count){
        fa_count=props.fin_approval_count;
    }
    let fin_autho = user_authority['fin']
    if (fin_autho === 'r') {

    } else if (fin_autho === 'rw') {
        menu_items.push(
            <SubMenu
                key="fin_m"
                title={<span><Icon type="table" /><span>财务审批</span>&nbsp;<Badge count={fa_count}/></span>}
            >
                <Menu.Item key="fap_ask_price">
                    <Link to='/fap_ask_price' replace>
                        <Icon type="contacts"/>
                        <span>询价审批</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
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
            <SubMenu
                key="wh_m"
                title={<span><Icon type="database" /><span>仓储管理</span></span>}
            >
                <Menu.Item key="wh_rm">
                    <Link to='/wh_rm' replace>
                        <Icon type="file"/>
                        <span>原材料</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="wh_sfp">
                    <Link to='/wh_sfp' replace>
                        <Icon type="appstore-o" />
                        <span>半成品</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="wh_fp">
                    <Link to='/wh_fp' replace>
                        <Icon type="shopping-cart" />
                        <span>成品</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
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
                <div style={{fontSize:18}}>
                    <img src={require("../../assets/img/yd_logo.png")} style={{height:36}}/>
                    <span style={{color: '#fff'}}>耀迪·管理助手</span>
                </div>
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