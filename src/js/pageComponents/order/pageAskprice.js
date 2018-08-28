import React from 'react';
import {Table, Progress, Tag, Tabs, Icon, Layout, Spin, Divider, Breadcrumb, Button} from 'antd';
import {orderService} from "../../_services/order.service";

const {Header, Content, Footer, Sider} = Layout;
const TabPane = Tabs.TabPane;
import CompnSider from "../../_components/compnSider"
import CompnHeader from "../../_components/compnHeader"
import CompnFooter from "../../_components/compnFooter"

// # {
//     #     "id": 1,
//         #     "ask_price_id": "470001",
//         #     "added_by_user_name": "testname105",
//         #     "customer_id": "214",
//         #     "product_ids": "20001,20002,20003",
//         #     "description": "20001定价100，20003定价120",
//         #     "approve_status": "waiting",
//         #     "approve_by_user_name": null,
//         #     "comment": null,
//         #     "created_at": "2018-07-21 19:50:56 +0800",
//         #     "last_update_at": "2018-07-21 19:50:56 +0800",
//         #     "status": 1
//     # }
const PageContent = (props) => {
    const ask_prices_columns=[
        {
            title: '编号',
            dataIndex: 'ask_price_id',
            key: 'ask_price_id'
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
        }, {
            title: '客户编号',
            dataIndex: 'customer_id',
            key: 'customer_id',
        }, {
            title: '询价描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '审批人',
            dataIndex: 'approve_by_user_name',
            key: 'approve_by_user_name',
        }, {
            title: '审批状态',
            dataIndex: 'approve_status',
            key: 'approve_status',
            render: (text) => {
                if(text==='waiting'){
                    return (
                        <span>
                    <Tag color="geekblue">等待审批</Tag>
                    </span>
                    )
                }else if(text==='pass'){
                    return (
                        <span>
                    <Tag color="green">审批通过</Tag>
                    </span>
                    )
                }else {
                    return (
                        <span>
                    <Tag color="red">审批拒绝</Tag>
                    </span>
                    )
                }

            }
        }, {
            title: '最后更新',
            dataIndex: 'last_update_at',
            key: 'last_update_at',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
            <a href="javascript:;"onClick={props.checkAskPriceDetailOnclick}
               ask_price_id={record.ask_price_id}>查看详情</a>
            </span>)
            },
        }];
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }

    let one_ask_price=props.one_ask_price;

    if(props.page==='view_all_ask_prices'){
        return (<div>
            <div>
                <Button type="primary" style={btnStyle} onClick={props.addNewAskPriceBtnOnclick}>
                    <Icon type="plus"/>
                    <span>新建询价</span>
                </Button>
                <Button type="primary" style={btnStyle} onClick={props.reloadAskPriceBtnOnclick}>
                    <Icon type="reload"/>
                    <span>刷新</span>
                </Button>
            </div>
            <Spin spinning={props.loading}>
                <Table rowKey="id" columns={ask_prices_columns}
                       dataSource={props.ask_prices} size="small"/>
            </Spin>
        </div>);
    }else if(props.page==='add_new_ask_price'){
        return (<div>
            <div>
                <Button type="primary" style={btnStyle} onClick={props.addNewAskPriceBtnOnclick}>
                    <Icon type="plus"/>
                    <span>新建询价</span>
                </Button>
            </div>
            <Spin spinning={props.loading}>
                <Table rowKey="id" columns={ask_prices_columns}
                       dataSource={props.ask_prices} size="small"/>
            </Spin>
        </div>);
    }else if(props.page==='view_one_ask_price'){

        return (<div>
            <div>
                <Button type="primary" style={btnStyle} onClick={props.backToViewAllAskPricesBtnOnclick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
            </div>
            <Spin spinning={props.loading}>
                <div className="col-sm-12 col-md-6">
                    <dl className="dl-horizontal">
                        <dt>编号</dt>
                        <dd>{one_ask_price["ask_price_id"]}</dd>
                        <dt>创建者</dt>
                        <dd>{one_ask_price["added_by_user_name"]}</dd>
                        <dt><span>创建时间</span><Icon type="calendar"/></dt>
                        <dd>{one_ask_price["created_at"]}</dd>
                        <dt>客户编号</dt>
                        <dd>{one_ask_price["customer_id"]}</dd>
                        <dt>询价产品</dt>
                        <dd>{one_ask_price["product_ids"]}</dd>
                        <dt>详细描述</dt>
                        <dd>{one_ask_price["description"]}</dd>
                        <dt>审批人</dt>
                        <dd>{one_ask_price["approve_by_user_name"]}</dd>
                        <dt>审批状态</dt>
                        <dd>{one_ask_price["approve_status"]}</dd>
                        <dt>备注</dt>
                        <dd>{one_ask_price["comment"]}</dd>
                        <dt>最后更新时间</dt>
                        <dd>{one_ask_price["last_update_at"]}</dd>
                        <dd><Button type="primary" icon="edit" style={btnStyle}
                                    onClick={props.editAskPriceBtnOnclick}>更新</Button>
                        </dd>

                    </dl>
                </div>
                <div className="col-sm-12 col-md-6">
                    <Divider orientation={"left"}><span>历史记录</span><Icon type="picture" /></Divider>
                </div>
            </Spin>
        </div>);
    }else if(props.page==='edit_ask_price'){
        return (<div>
            <div>
                <Button type="primary" style={btnStyle} onClick={props.backToViewAllAskPricesBtnOnclick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
            </div>
            编辑
        </div>);
    }
};
export default class PageAskPrice extends React.Component{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading:true,
            breadcrumb: '我的询价',
            page:'view_all',
            page_ask_price:'view_all_ask_prices',
            one_ask_price:{},
            ask_prices:[],
        };

        this.handleAddNewAskPriceBtnOnclick=this.handleAddNewAskPriceBtnOnclick.bind(this);
        this.handleReloadAskPriceBtnOnclick=this.handleReloadAskPriceBtnOnclick.bind(this);
        this.handleBackToViewAllAskPricesBtnOnclick=this.handleBackToViewAllAskPricesBtnOnclick.bind(this);
        this.handleCheckAskPriceDetailOnclick=this.handleCheckAskPriceDetailOnclick.bind(this);
        this.handleEditAskPriceBtnOnclick=this.handleEditAskPriceBtnOnclick.bind(this);
        this.handleMenuItemOnclick=this.handleMenuItemOnclick.bind(this);


        orderService.getAskPricesByUserName().then(data=>{
            this.setState({ ask_prices: data['ask_prices'] ,loading: false});
        });
    };

    handleAddNewAskPriceBtnOnclick(){
        this.setState({ page_ask_price: 'add_new_ask_price'});
    }

    handleReloadAskPriceBtnOnclick(){
        this.setState({ loading: true});
        orderService.getAskPricesByUserName().then(data=>{
            this.setState({ ask_prices: data['ask_prices'] ,loading: false});
        });
    }

    handleBackToViewAllAskPricesBtnOnclick(){
        this.setState({ page_ask_price: 'view_all_ask_prices'});
    }

    handleCheckAskPriceDetailOnclick(e){
        this.setState({ loading: true});
        let ask_price_id = e.target.attributes.ask_price_id.value;
        orderService.getAskPriceById(ask_price_id).then(data => {
            this.setState({page_ask_price: "view_one_ask_price",one_ask_price: data['ask_price'], loading: false});
        });
    }

    handleEditAskPriceBtnOnclick(){
        this.setState({ page_ask_price: 'edit_ask_price'});
    }

    handleMenuItemOnclick(e){
        console.log(e.key)
    }

    render() {
        // orderService.getOrders().then(data=>{
        //     this.setState({ orders: data });
        // });
        return (

            <Layout style={{background: '#fff',height: '100%'}}>
                <CompnSider defaultMenuKey={['ask_price_page']} defaultOpenKeys={['order_m']} menuItemOnclick={this.handleMenuItemOnclick}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="table" />
                                    <span>询价管理</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent
                                loading={this.state.loading}
                                one_ask_price={this.state.one_ask_price}
                                ask_prices={this.state.ask_prices}
                                page={this.state.page_ask_price}
                                checkAskPriceDetailOnclick={this.handleCheckAskPriceDetailOnclick}
                                addNewAskPriceBtnOnclick={this.handleAddNewAskPriceBtnOnclick}
                                reloadAskPriceBtnOnclick={this.handleReloadAskPriceBtnOnclick}
                                backToViewAllAskPricesBtnOnclick={this.handleBackToViewAllAskPricesBtnOnclick}
                                editAskPriceBtnOnclick={this.handleEditAskPriceBtnOnclick}
                            />
                        </div>
                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        )
    }
}