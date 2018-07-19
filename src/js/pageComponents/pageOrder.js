import React from 'react';
import {Table, Progress, Tag, Card, Icon, Layout, Menu, Badge, Avatar, Button} from 'antd';
import {orderService} from "../_services/order.service";

const {Header, Content, Footer, Sider} = Layout;
import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

export default class PageOrder extends React.Component{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            columns: [
                {
                    title: '订单号',
                    dataIndex: 'orderID',
                    key: 'orderID'
                },
                {
                    title: '订单类别',
                    dataIndex: 'orderType',
                    key: 'orderType',
                }, {
                    title: '销售员',
                    dataIndex: 'seller',
                    key: 'seller',
                    render: text => <a href="#">{text}</a>,
                }, {
                    title: '客户',
                    dataIndex: 'customer',
                    key: 'customer',
                    render: text => <a href="#">{text}</a>,
                }, {
                    title: '合同编号',
                    dataIndex: 'contractID',
                    key: 'contractID',
                    render: text => <a href="#">{text}</a>,
                }, {
                    title: '订单时间',
                    dataIndex: 'orderStartTime',
                    key: 'orderStartTime',
                }, {
                    title: '订单状态',
                    dataIndex: 'orderStatus',
                    key: 'orderStatus',
                    render: (text) => {
                        return (
                            <span>
                    <Tag color="#87d068">{text}</Tag>
                    </span>
                        )
                    }
                }, {
                    title: '完成进度',
                    key: 'progress',
                    render: (text, record) => {
                        return (<span>
                        <Progress percent={45} size="small" status="active" format={percent => `${percent}天`}/>
                        </span>)
                    },
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;">查看详情</a>
                            {/*<Divider type="vertical"/>*/}
                            {/*<a href="javascript:;">Delete</a>*/}
                            {/*<Divider type="vertical"/>*/}
                            {/*<a href="javascript:;" className="ant-dropdown-link">*/}
                            {/*More actions <Icon type="down"/>*/}
                            {/*</a>*/}
                        </span>)
                    },
                }],
            orders: []
        };
        orderService.getOrders().then(data=>{
            this.setState({ orders: data });
        });
    };

    render() {
        // orderService.getOrders().then(data=>{
        //     this.setState({ orders: data });
        // });
        return (

            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['2']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <h4 className="page-header">
                                <Icon type="shopping-cart"/>
                                <span>订单管理</span>
                            </h4>
                            <Table columns={this.state.columns} dataSource={this.state.orders} size="middle"/>
                        </div>
                    </Content>
                    <CompnFooter/>
                </Layout>
            </Layout>
        )
    }
}