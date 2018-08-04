import React from 'react';
import {Table, Timeline, Tag, Spin, Icon, Layout, Breadcrumb, Divider, Avatar, Button} from 'antd';
import {orderService} from "../../_services/order.service";

const {Header, Content, Footer, Sider} = Layout;
import CompnSider from "../../_components/compnSider"
import CompnHeader from "../../_components/compnHeader"
import CompnFooter from "../../_components/compnFooter"

import WrappedNewOrderForm from "../../_components/order/_compnNewOrderForm"

// {
//     "id": 1,
//     "order_id": "660001",
//     "added_by_user_name": "testname105",
//     "contract_id": "8800011",
//     "sign_by_user_name": "testname105",
//     "customer_id": "215",
//     "order_type": "normal",
//     "start_date": "2018-08-01",
//     "end_date": "2019-09-01",
//     "total_value": "1890000",
//     "pay_type": "fenqi",
//     "paid_value": "500000",
//     "order_status": "start",
//     "order_status_update_by": "admin",
//     "is_finished": 0,
//     "description": "测试订单",
//     "comment": null,
//     "created_at": "2018-07-24 21:50:36 +0800",
//     "last_update_at": "2018-07-24 21:50:36 +0800",
//     "status": 1
// }
const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
    const columns = [
        {
            title: '订单号',
            dataIndex: 'order_id',
            key: 'order_id'
        },
        {
            title: '合同编号',
            dataIndex: 'contract_id',
            key: 'contract_id'
        },
        {
            title: '负责人',
            dataIndex: 'sign_by_user_name',
            key: 'sign_by_user_name'
        },
        {
            title: '客户',
            dataIndex: 'customer_id',
            key: 'customer_id',
            render: (text) => {
                let company_name = props.customers[text]["company_name"];
                if (company_name) {
                    return (<span>{company_name}</span>)
                } else {
                    return (<span>公司编号:{text}</span>)
                }

            }
        },
        {
            title: '订单类别',
            dataIndex: 'order_type',
            key: 'order_type',
            render: (text) => {
                if (text==='normal') {
                    return (<Tag color="#2db7f5">正式订单</Tag>)
                } else {
                    return (<Tag color="#87d068">打样订单</Tag>)
                }

            }
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at'
        },
        {
            title: '订单状态',
            dataIndex: 'order_status',
            key: 'order_status',
            render: (text) => {
                return (
                    <span>
                    <Tag color="purple">{text}</Tag>
                    </span>)
            }

        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           order_id={record.order_id}>查看详情</a>
                        </span>)
            },
        }];
    if (props.page === 'view_all') {
        return (<div>
            <div>
                <Button type="primary" style={btnStyle} onClick={props.addNewBtnOnclick}>
                    <Icon type="plus"/>
                    <span>新建订单信息</span>
                </Button>
                <Button type="primary" style={btnStyle} onClick={props.reloadBtnOnclick}>
                    <Icon type="reload"/>
                    <span>刷新</span>
                </Button>
            </div>
            <Spin spinning={props.loading}>
                <Table rowKey="id" columns={columns} dataSource={props.orders} size="small"/>
            </Spin>
        </div>)
    } else if (props.page === 'view_one') {
        let order = props.one_order;
        let customer = props.one_customer;
        let contacts = props.one_customer_contacts;
        return (
            <div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backToViewAllBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    {/*//     "order_type": "normal",*/}
                    {/*//     "start_date": "2018-08-01",*/}
                    {/*//     "end_date": "2019-09-01",*/}
                    {/*//     "total_value": "1890000",*/}
                    {/*//     "pay_type": "fenqi",*/}
                    {/*//     "paid_value": "500000",*/}
                    {/*//     "order_status": "start",*/}
                    {/*//     "order_status_update_by": "admin",*/}
                    {/*//     "is_finished": 0,*/}
                    {/*//     "description": "测试订单",*/}
                    {/*//     "comment": null,*/}
                    {/*//     "created_at": "2018-07-24 21:50:36 +0800",*/}
                    {/*//     "last_update_at": "2018-07-24 21:50:36 +0800",*/}
                    {/*//     "status": 1*/}
                    {/*// }*/}
                    <Spin spinning={props.loading}>
                        <div className="col-sm-12 col-md-6">
                            <dl className="dl-horizontal">
                                <dt>订单编号</dt>
                                <dd>{order.order_id}</dd>
                                <dt><span>创建时间</span><Icon type="calendar"/></dt>
                                <dd>{order.created_at}</dd>
                                <dt>合同编号</dt>
                                <dd><a>{order.contract_id}</a></dd>
                                <dt>订单负责人</dt>
                                <dd>{order.sign_by_user_name}</dd>
                                <dt>订单客户</dt>
                                <dd>{customer.company_name}</dd>
                                <dt>订单类型</dt>
                                <dd>{order.order_type}</dd>
                                <dt>订单开始日期</dt>
                                <dd>{order.start_date}</dd>
                                <dt>订单结束日期</dt>
                                <dd>{order.end_date}</dd>
                                <dt>客户付款方式</dt>
                                <dd>{order.pay_type}</dd>
                                <dt>订单总额</dt>
                                <dd>{order.total_value}</dd>
                                <dt>已支付</dt>
                                <dd>{order.paid_value}</dd>
                                <dt>订单当前状态</dt>
                                <dd>{order.order_status}</dd>
                                <dt>订单描述</dt>
                                <dd>{order.description}</dd>
                                <dd><Button type="primary" icon="edit" style={btnStyle}
                                            onClick={props.editOrderBtnOnclick}>更新</Button>
                                </dd>
                            </dl>
                            <Divider orientation={"left"}>
                                <span>客户信息</span>
                                <Icon type="file-text"/>
                            </Divider>
                            <dl className="dl-horizontal">
                                <dt><span>公司名称</span><Icon type="copyright"/></dt>
                                <dd><h4>{customer["company_name"]}</h4></dd>
                                <dt>
                                    <span>公司所在地</span>
                                    <Icon type="environment-o"/>
                                </dt>
                                <dd>{customer["company_location"]}</dd>
                                <dt>
                                    <span>公司税号</span>
                                    <Icon type="safety" style={{color: "#52c41a"}}/>
                                </dt>
                                <dd>{customer["company_tax_number"]}</dd>
                                <dt>
                                    <span>公司法人</span>
                                    <Icon type="user"/>
                                </dt>
                                <dd>{customer["company_legal_person"]}</dd>
                                <dt>
                                    <span>公司主营业务</span><Icon type="global"/>
                                </dt>
                                <dd>{customer["company_main_business"]}</dd>
                                <dt>
                                    <span>公司网站</span><Icon type="link"/>
                                </dt>
                                <dd>
                                    <a target={"_blank"} href={customer["company_description"]}>
                                        {customer["company_description"]}
                                    </a>
                                </dd>
                                <dt><span>公司电话</span><Icon type="phone"/></dt>
                                <dd>{customer["company_tel_number"]}</dd>
                                <dt><span>公司邮箱</span><Icon type="mail"/></dt>
                                <dd>{customer["company_email"]}</dd>
                                <dt>备注</dt>
                                <dd>{customer["comment"]}</dd>
                            </dl>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <Divider orientation={"left"}><span>订单跟踪记录</span><Icon type="clock-circle-o" /></Divider>
                            <Timeline pending="订单进行中......" reverse={true}>
                                <Timeline.Item>签订订单合同 2018-06-01</Timeline.Item>
                                <Timeline.Item color="red">客户款项支付全款 2018-07-01</Timeline.Item>
                                <Timeline.Item>订单开始生产 2018-07-03</Timeline.Item>
                            </Timeline>
                        </div>
                    </Spin>
                </div>
            </div>
        )
    } else if (props.page === 'add_new') {
        return (<div>
            <div>
                <Button type="primary" style={btnStyle} onClick={props.backToViewAllBtnOnclick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                <WrappedNewOrderForm/>
            </div>
        </div>)
    } else if (props.page === 'update_one') {

    }
};
export default class PageOrder extends React.Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading: true,
            breadcrumb: '所有订单',
            page: 'view_all',// view_all/view_one/add_new/update_one
            orders: [],
            one_order: {},
            customers: {},
            one_customer: {},
            one_customer_contacts: [],
            one_ask_price: {},
            ask_prices: [],
        };

        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this)
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this)
        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this)
        this.handleBackToViewAllBtnOnclick = this.handleBackToViewAllBtnOnclick.bind(this)
        this.handleEditOrderBtnOnclick = this.handleEditOrderBtnOnclick.bind(this)

        orderService.getOrders().then(data => {
            this.setState({
                orders: data['orders'],
                customers: data["customers"],
                breadcrumb: "所有订单 共" + data['orders'].length + "条",
                loading: false
            });
        });
    };

    handleAddNewBtnOnclick() {
        this.setState({page: "add_new", breadcrumb: '添加新订单'});
    }

    handleReloadBtnOnclick() {
        this.setState({loading: true});
        orderService.getOrders().then(data => {
            this.setState({
                orders: data['orders'],
                customers: data["customers"],
                breadcrumb: "所有订单 共" + data['orders'].length + "条",
                loading: false
            });
        });
    }

    handleCheckDetailOnclick(e) {
        this.setState({loading: true});
        let order_id = e.target.attributes.order_id.value;
        orderService.getOrderById(order_id).then(data => {
            this.setState({
                page: "view_one",
                one_order: data['order'],
                one_customer: data['customer'],
                one_customer_contacts: data['contacts'],
                loading: false,
                breadcrumb: '订单详情:' + order_id,
            });
        });
    }

    handleBackToViewAllBtnOnclick() {
        this.setState({page: "view_all", breadcrumb: '所有订单'});
    }

    handleEditOrderBtnOnclick() {
        this.setState({page: "update_one", breadcrumb: '更新订单'});
    }

    render() {
        return (

            <Layout style={{background: '#fff', height: '100%'}}>
                <CompnSider defaultMenuKey={['order_page']} defaultOpenKeys={['order_m']}
                            menuItemOnclick={this.handleMenuItemOnclick}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="shopping-cart"/>
                                    <span>订单管理</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent page={this.state.page}
                                         loading={this.state.loading}
                                         orders={this.state.orders}
                                         one_order={this.state.one_order}
                                         customers={this.state.customers}
                                         one_customer={this.state.one_customer}
                                         one_customer_contacts={this.state.one_customer_contacts}
                                         addNewBtnOnclick={this.handleAddNewBtnOnclick}
                                         reloadBtnOnclick={this.handleReloadBtnOnclick}
                                         checkDetailOnclick={this.handleCheckDetailOnclick}
                                         backToViewAllBtnOnclick={this.handleBackToViewAllBtnOnclick}
                                         editOrderBtnOnclick={this.handleEditOrderBtnOnclick}

                            />
                        </div>
                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        )
    }
}