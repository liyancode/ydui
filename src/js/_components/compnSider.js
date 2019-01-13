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
                title={<span><Icon type="team" /><span>人力资源</span></span>}
            >
                <SubMenu
                    key="hr_m_my"
                    title={<span><Icon type="user" /><span>我的页面</span></span>}
                >
                    <Menu.Item key="hr_myinfo">
                        <Link to='/hr_myinfo' replace>
                            <Icon type="solution"/>
                            <span>个人信息</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="hr_my_application">
                        <Link to='/hr_my_application' replace>
                            <Icon type="audit"/>
                            <span>申请单</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </SubMenu>
        )
    } else if (hr_autho === 'rw') {
        menu_items.push(
            <SubMenu
                key="hr_m"
                title={<span><Icon type="team" /><span>人力资源</span></span>}
            >
                <SubMenu
                    key="hr_m_my"
                    title={<span><Icon type="user" /><span>我的页面</span></span>}
                >
                    <Menu.Item key="hr_myinfo">
                        <Link to='/hr_myinfo' replace>
                            <Icon type="solution"/>
                            <span>个人信息</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="hr_my_application">
                        <Link to='/hr_my_application' replace>
                            <Icon type="audit"/>
                            <span>申请单</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="hr_my_department">
                    <Link to='/hr_my_department' replace>
                        <Icon type="cluster"/>
                        <span>部门信息</span>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="hr_m_admin"
                    title={<span><Icon type="user" /><span>管理员</span></span>}
                >
                    <Menu.Item key="hr_allusers">
                        <Link to='/hr_allusers' replace>
                            <Icon type="team" />
                            <span>员工信息</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="hr_my_application">
                        {/*<Link to='/hr_alldepartments' replace>*/}
                            {/*<Icon type="audit"/>*/}
                            {/*<span>部门信息</span>*/}
                        {/*</Link>*/}
                        <Icon type="audit"/>
                        <span>部门信息</span>
                    </Menu.Item>
                </SubMenu>
            </SubMenu>
        )
    }

    //--- crm
    let crm_autho = user_authority['crm']
    let crm_menu='';
    if (crm_autho === 'r') {
        // menu_items.push(
        //     <SubMenu
        //         key="crm"
        //         title={<span><Icon type="global" /><span>客户关系</span></span>}
        //     >
        //         <Menu.Item key="crm_my">
        //             <Link to='/crm_my' replace>
        //                 <Icon type="contacts"/>
        //                 <span>我的客户</span>
        //             </Link>
        //         </Menu.Item>
        //     </SubMenu>
        // )
        crm_menu=<SubMenu
            key="crm"
            title={<span><Icon type="global" /><span>客户关系</span></span>}
        >
            <Menu.Item key="crm_my">
                <Link to='/crm_my' replace>
                    <Icon type="contacts"/>
                    <span>我的客户</span>
                </Link>
            </Menu.Item>
        </SubMenu>;
    } else if (crm_autho === 'rw') {
        // menu_items.push(
        //     <SubMenu
        //         key="crm"
        //         title={<span><Icon type="global"/><span>客户关系</span></span>}
        //     >
        //         <Menu.Item key="crm_my">
        //             <Link to='/crm_my' replace>
        //                 <Icon type="contacts"/>
        //                 <span>我的客户</span>
        //             </Link>
        //         </Menu.Item>
        //         <Menu.Item key="crm_all">
        //             <Link to='/crm_all' replace>
        //                 <Icon type="table"/>
        //                 <span>所有客户</span>
        //             </Link>
        //         </Menu.Item>
        //     </SubMenu>
        // )
        crm_menu=<SubMenu
            key="crm"
            title={<span><Icon type="global"/><span>客户关系</span></span>}
        >
            <Menu.Item key="crm_my">
                <Link to='/crm_my' replace>
                    <Icon type="contacts"/>
                    <span>我的客户</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="crm_my_askprice">
                <Icon type="contacts"/>
                <span>报价审批</span>
            </Menu.Item>
            <Menu.Item key="crm_all">
                <Link to='/crm_all' replace>
                    <Icon type="table"/>
                    <span>所有客户</span>
                </Link>
            </Menu.Item>
        </SubMenu>;
    }

    //--- order
    let order_autho = user_authority['order']
    let order_menu='';
    if (order_autho === 'r') {

    } else if (order_autho === 'rw') {
        // menu_items.push(
        //     <SubMenu
        //         key="order_m"
        //         title={<span><Icon type="table" /><span>订单管理</span></span>}
        //     >
        //
        //         <Menu.Item key="order_page">
        //             <Link to='/order' replace>
        //                 <Icon type="file-done"/>
        //                 <span>订单</span>
        //             </Link>
        //         </Menu.Item>
        //         <Menu.Item key="contract_page">
        //             <Link to='/contract' replace>
        //                 <Icon type="file-protect"/>
        //                 <span>合同</span>
        //             </Link>
        //         </Menu.Item>
        //         <Menu.Item key="ask_price_page">
        //             <Link to='/ask_price' replace>
        //                 <Icon type="file-search"/>
        //                 <span>询价</span>
        //             </Link>
        //         </Menu.Item>
        //     </SubMenu>
        // )
        order_menu=<SubMenu
            key="order_m"
            title={<span><Icon type="table" /><span>订单管理</span></span>}
        >

            <Menu.Item key="order_page">
                <Link to='/order' replace>
                    <Icon type="file-done"/>
                    <span>面料订单</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="order_page_fg">
                <Icon type="file-protect"/>
                <span>风管订单</span>
            </Menu.Item>
            <Menu.Item key="order_page_cl">
                <Icon type="file-search"/>
                <span>窗帘加工订单</span>
            </Menu.Item>
        </SubMenu>;
    }

    let sale_out=<SubMenu
        key="sale_out_m"
        title={<span><Icon type="table" /><span>销售出货</span></span>}
    >
        <Menu.Item key="sale_out_m_log">
            <Icon type="file-search"/>
            <span>出货记录</span>
        </Menu.Item>
    </SubMenu>;
    let customer_reject=<SubMenu
        key="customer_reject_m"
        title={<span><Icon type="table" /><span>客户退货</span></span>}
    >
        <Menu.Item key="customer_reject_m_log">
            <Icon type="file-search"/>
            <span>退货记录</span>
        </Menu.Item>
    </SubMenu>;
    let component_buy=<SubMenu
        key="component_buy_m"
        title={<span><Icon type="table" /><span>配件请购</span></span>}
    >
        <Menu.Item key="component_buy_m_log">
            <Icon type="file-search"/>
            <span>请购记录</span>
        </Menu.Item>
    </SubMenu>;
    let stats_search=<SubMenu
        key="stats_search_m"
        title={<span><Icon type="table" /><span>统计查询</span></span>}
    >
        <Menu.Item key="stats_search_m_orders">
            <Icon type="file-search"/>
            <span>销售统计</span>
        </Menu.Item>
    </SubMenu>;
    menu_items.push(<SubMenu key="sales_m"
                          title={<span><Icon type="shop"/><span>销售管理</span></span>}>
        {crm_menu}
        {order_menu}
        {sale_out}
        {customer_reject}
        {component_buy}
        {stats_search}
    </SubMenu>)
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
                title={<span><Icon type="audit" /><span>财务管理</span>&nbsp;<Badge count={fa_count}/></span>}
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
                        <Icon type="fire"/>
                        <span>阻燃类</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="product_fengguan_page">
                    <Link to='/product_fengguan' replace>
                        <Icon type="pic-right"/>
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
                <Menu.Item key="wh_yuanliao">
                    <Link to='/wh_yuanliao' replace>
                        <Icon type="file"/>
                        <span>原料管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="wh_peibu">
                    <Link to='/wh_peibu' replace>
                        <Icon type="file"/>
                        <span>胚布管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="wh_chengpin">
                    <Link to='/wh_chengpin' replace>
                        <Icon type="file"/>
                        <span>成品管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="wh_zhuji">
                    <Link to='/wh_zhuji' replace>
                        <Icon type="file"/>
                        <span>助剂管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="wh_fuliao">
                    <Link to='/wh_fuliao' replace>
                        <Icon type="file"/>
                        <span>辅料管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="wh_inventory_batch">
                    <Link to='/wh_inventory_batch' replace>
                        <Icon type="file"/>
                        <span>出入库管理</span>
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