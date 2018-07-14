import React from 'react';
import {Card, Icon, Tag, Table, Layout, Menu, Divider, Spin, Button, Progress, Breadcrumb} from 'antd';

const {Content, Footer} = Layout;
import CompnSider from "../_components/compnSider";
import CompnHeader from "../_components/compnHeader";
import CompnFooter from "../_components/compnFooter";

import WrappedNewCustomerForm from "../_components/_compnNewCustomerForm";

import {customerService} from '../_services/customer.service';

const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
    if (props.page) {
        let page = props.page;
        if (page === 'view_all') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.addNewBtnOnclick}>
                        <Icon type="plus"/>
                        <span>新建客户信息</span>
                    </Button>
                    <Button type="primary" style={btnStyle} onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                </div>
                <Spin spinning={props.loading}>
                    <Table rowKey="id" columns={props.customer_table_columns}
                           dataSource={props.customers} size="middle"/>
                </Spin>
            </div>)
        } else if (page === 'view_one') {
            let customer = props.one_customer["customer"];
            let contacts = props.one_customer["contacts"];
            let conatct_info_div=[];
            for(let i=0;i< contacts.length;i++){
                let contact_i=contacts[i];
                conatct_info_div.push(
                    <Card  key={i}>
                    <dl className="dl-horizontal">
                        <dt>姓名</dt>
                        <dd>{contact_i["fullname"]+" "+((contact_i["gender"]==1)?"先生":"女士")}</dd>
                        <dt>职务</dt>
                        <dd>{contact_i["title"]}</dd>
                        <dt>电话</dt>
                        <dd>{contact_i["phone_number"]}</dd>
                        <dt>邮箱</dt>
                        <dd>{contact_i["email"]}</dd>
                    </dl></Card>);
            }
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddNewBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Spin spinning={props.loading}>
                        <div className="col-sm-12 col-md-6">
                            <Divider orientation={"left"}>详细信息</Divider>
                            <dl className="dl-horizontal">
                                <dt>客户编号</dt>
                                <dd>{customer["customer_id"]}</dd>
                                <dt>创建者</dt>
                                <dd>{customer["added_by_user_name"]}</dd>
                                <dt>创建时间</dt>
                                <dd>{customer["created_at"]}</dd>
                                <dt>公司名称</dt>
                                <dd>{customer["company_name"]}</dd>
                                <dt>公司所在地</dt>
                                <dd>{customer["company_location"]}</dd>
                                <dt>公司税号</dt>
                                <dd>{customer["company_tax_number"]}</dd>
                                <dt>公司法人</dt>
                                <dd>{customer["company_legal_person"]}</dd>
                                <dt>公司主营业务</dt>
                                <dd>{customer["company_main_business"]}</dd>
                                <dt>公司网站</dt>
                                <dd>{customer["company_description"]}</dd>
                                <dt>公司电话</dt>
                                <dd>{customer["company_tel_number"]}</dd>
                                <dt>公司邮箱</dt>
                                <dd>{customer["company_email"]}</dd>
                                <dt>备注</dt>
                                <dd>{customer["comment"]}</dd>
                            </dl>
                            <Divider orientation={"left"}>公司联系人</Divider>
                            {conatct_info_div}
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <Divider orientation={"left"}>客户当前跟进状态</Divider>
                            <Divider orientation={"left"}>客户跟进历史记录</Divider>
                        </div>
                    </Spin>
                </div>
            </div>)

        } else if (page === 'add_new') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddNewBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedNewCustomerForm/>
            </div>)
        } else {

        }
    } else {

    }
}
export default class PageCRM extends React.Component {
// # {
//     #             "id": 1,
//     #             "customer_id": "201",
//     #             "added_by_user_name": "testname104",
//     #             "company_name": "测试公司名称001",
//     #             "company_location": "china",
//     #             "company_tax_number": null,
//     #             "company_legal_person": null,
//     #             "company_main_business": null,
//     #             "company_tel_number": null,
//     #             "company_email": null,
//     #             "company_description": null,
//     #             "comment": null,
//     #             "status": 1
// #         }
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: 'view_all',//view_one/add_new
            breadcrumb: '我的客户',
            one_customer: null,
            customers: [],
            customer_table_columns: [
                {
                    title: '客户编号',
                    dataIndex: 'customer_id',
                    key: 'customer_id'
                },
                {
                    title: '创建者',
                    dataIndex: 'added_by_user_name',
                    key: 'added_by_user_name',
                }, {
                    title: '创建时间',
                    dataIndex: 'created_at',
                    key: 'created_at',
                }, {
                    title: '公司名称',
                    dataIndex: 'company_name',
                    key: 'company_name',
                }, {
                    title: '公司法人',
                    dataIndex: 'company_legal_person',
                    key: 'company_legal_person',
                }, {
                    title: '公司所在地',
                    dataIndex: 'company_location',
                    key: 'company_location',
                }, {
                    title: '跟进状态',
                    key: 'progress',
                    render: (text, record) => {
                        return (<span>
                        <Progress percent={45} size="small" status="active"/>
                        </span>)
                    },
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;" onClick={this.handleCheckDetailOnclick}
                           customer_id={record.customer_id}>查看详情</a>
                            {/*<Divider type="vertical"/>*/}
                            {/*<a href="javascript:;">Delete</a>*/}
                            {/*<Divider type="vertical"/>*/}
                            {/*<a href="javascript:;" className="ant-dropdown-link">*/}
                            {/*More actions <Icon type="down"/>*/}
                            {/*</a>*/}
                        </span>)
                    },
                }]
        }

        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this);
        this.handleBackFromAddNewBtnOnclick = this.handleBackFromAddNewBtnOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);

        customerService.getAllByUsername(localStorage.getItem('user_name')).then(data => {
            this.setState({customers: data["customers"], loading: false});
        });
    }

    handleCheckDetailOnclick(e) {
        let customer_id = e.target.attributes.customer_id.value
        // this.setState({page: "view_one",loading:true,breadcrumb:'客户详情: '+customer_id});
        customerService.getByCustomerId(customer_id).then(data => {
            this.setState({page: "view_one", breadcrumb: '客户详情: ' + customer_id, one_customer: data, loading: false});
        });
    }

    handleAddNewBtnOnclick() {
        this.setState({page: "add_new", breadcrumb: '新建客户信息'});
    }

    handleBackFromAddNewBtnOnclick() {
        this.setState({page: "view_all", breadcrumb: '我的客户'});
    }

    handleReloadBtnOnclick() {
        this.setState({loading: true});
        customerService.getAllByUsername(localStorage.getItem('user_name')).then(data => {
            this.setState({customers: data["customers"], loading: false});
        });
    };

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['3']}/>
                <Layout>
                    <CompnHeader/>
                    <Content style={{margin: '12px 12px 0'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="contacts"/>
                                    <span>客户关系</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent page={this.state.page}
                                         one_customer={this.state.one_customer}
                                         customer_table_columns={this.state.customer_table_columns}
                                         customers={this.state.customers}
                                         loading={this.state.loading}
                                         addNewBtnOnclick={this.handleAddNewBtnOnclick}
                                         backFromAddNewBtnOnclick={this.handleBackFromAddNewBtnOnclick}
                                         reloadBtnOnclick={this.handleReloadBtnOnclick}
                            />
                        </div>
                    </Content>
                    <CompnFooter/>
                </Layout>
            </Layout>
        )
    }
}
