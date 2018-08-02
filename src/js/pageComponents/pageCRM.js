import React from 'react';
import {Card, Icon, Steps, Table, Layout, Timeline, Divider, Spin, Button, Progress, Breadcrumb} from 'antd';

const {Content, Footer} = Layout;
import CompnSider from "../_components/compnSider";
import CompnHeader from "../_components/compnHeader";
import CompnFooter from "../_components/compnFooter";

import WrappedNewCustomerForm from "../_components/_compnNewCustomerForm";
import WrappedEditCustomerForm from "../_components/_compnEditCustomerForm";
import WrappedEditContactForm from "../_components/_compnEditContactForm";

import {customerService} from '../_services/customer.service';

const Step = Steps.Step;

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
                           dataSource={props.customers} size="small"/>
                </Spin>
            </div>)
        } else if (page === 'view_one') {
            let customer = props.one_customer["customer"];
            let contacts = props.one_customer["contacts"];
            let conatct_info_div = [];
            for (let i = 0; i < contacts.length; i++) {
                let contact_i = contacts[i];
                conatct_info_div.push(
                    <dl className="dl-horizontal" key={i}>
                        <dt>姓名</dt>
                        <dd>{contact_i["fullname"] + " " + ((contact_i["gender"] == 1) ? "先生" : "女士")}</dd>
                        <dt><span>职务</span><Icon type="tag-o" /></dt>
                        <dd>{contact_i["title"]}</dd>
                        <dt><span>电话</span><Icon type="mobile" /></dt>
                        <dd>{contact_i["phone_number"]}</dd>
                        <dt><span>邮箱</span><Icon type="mail" /></dt>
                        <dd>{contact_i["email"]}</dd>
                        <dd><Button type="primary" icon="edit" style={btnStyle} contact_id={contact_i["id"]}
                                    onClick={props.editContactBtnOnclick}>更新</Button>
                            <Button type="danger" icon="delete" style={btnStyle}>删除</Button></dd>
                    </dl>
                );
            }
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddNewBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Spin spinning={props.loading}>
                        <div className="col-sm-12 col-md-6">
                            <dl className="dl-horizontal">
                                <dt>客户编号</dt>
                                <dd>{customer["customer_id"]}</dd>
                                <dt>创建者</dt>
                                <dd>{customer["added_by_user_name"]}</dd>
                                <dt><span>创建时间</span><Icon type="calendar" /></dt>
                                <dd>{customer["created_at"]}</dd>
                                <Divider orientation={"left"}>
                                    <span>公司详情</span>
                                    <Icon type="profile" />
                                </Divider>
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
                                <dd><Button type="primary" icon="edit" style={btnStyle}
                                            onClick={props.editCustomerBtnOnclick}>更新</Button>
                                </dd>

                            </dl>
                            <Divider orientation={"left"}><span>公司联系人</span><Icon type="team" /></Divider>
                            {conatct_info_div}
                            <Divider><Button type="primary" icon="user-add" style={btnStyle}>添加新联系人</Button></Divider>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className={"text-center"}><Button type="primary" icon="edit" style={btnStyle}>添加跟进记录</Button></div>
                            <Divider orientation={"left"}><span>客户当前跟进状态</span><Icon type="loading" /></Divider>
                            <Steps current={2} size={"small"}>
                                <Step title="信息录入" description="前期沟通阶段" />
                                <Step title="潜在客户" description="潜在合作可能" />
                                <Step title="意向合作" description="已有合作意向" icon={<Icon type="loading" />}/>
                                <Step title="意向订单" description="已达成意向订单" />
                                <Step title="正式订单" description="已达成正式订单" />
                                {/*<Step title="完成合作" description="已经成功合作" />*/}
                            </Steps>
                            <br/>
                            <Divider orientation={"left"}><span>客户跟进历史记录</span><Icon type="area-chart" /></Divider>
                            <Timeline>
                                <Timeline.Item color="green">邮件沟通，有初步产品合作意向 2018-06-01</Timeline.Item>
                                <Timeline.Item color="green">咨询相关产品信息 2018-03-01</Timeline.Item>
                                <Timeline.Item color="red">
                                    <p>关于阻燃类产品的咨询</p>
                                    <p>电话沟通了双方的基本信息</p>
                                    <p>了解了对方的基本业务场景和需求 2017-09-01</p>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <p>添加信息到系统中</p>
                                    <p>大致了解公司基本情况</p>
                                    <p>潜在客户 2017-07-31</p>
                                </Timeline.Item>
                            </Timeline>
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
        } else if (page === 'edit_customer') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromEditCustomerBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedEditCustomerForm customer={props.one_customer["customer"]}/>
            </div>);
        } else if (page === 'edit_contact') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromEditCustomerBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedEditContactForm contact={props.one_contact} customer={props.one_customer["customer"]}/>
            </div>);
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
            page: 'view_all',//view_one/add_new/view_all/edit_customer/edit_contact
            breadcrumb: '我的客户',
            one_customer: null,
            one_contact: null,
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
        this.handleEditCustomerBtnOnclick = this.handleEditCustomerBtnOnclick.bind(this);
        this.handleEditContactBtnOnclick = this.handleEditContactBtnOnclick.bind(this);
        this.handleBackFromEditCustomerBtnOnclick = this.handleBackFromEditCustomerBtnOnclick.bind(this);

        customerService.getAllByUsername(localStorage.getItem('user_name')).then(data => {
            this.setState({customers: data["customers"], loading: false});
        });
    }

    handleCheckDetailOnclick(e) {
        let customer_id = e.target.attributes.customer_id.value;
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

    handleEditCustomerBtnOnclick() {
        this.setState({
            page: "edit_customer",
            breadcrumb: '更新客户信息: ' + this.state.one_customer["customer"]["customer_id"]
        });
    };

    handleBackFromEditCustomerBtnOnclick() {
        let customer_id = this.state.one_customer["customer"]["customer_id"];
        customerService.getByCustomerId(customer_id).then(data => {
            this.setState({page: "view_one", breadcrumb: '客户详情: ' + customer_id, one_customer: data, loading: false});
        });
    }

    handleEditContactBtnOnclick(e) {
        let contact_id = e.target.attributes.contact_id.value;
        let contacts = this.state.one_customer["contacts"];
        let contact = null;
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].id == contact_id) {
                contact = contacts[i];
                break;
            }
        }

        this.setState({
            page: "edit_contact",
            one_contact: contact,
            breadcrumb: '更新客户联系人信息: ' + this.state.one_customer["customer"]["customer_id"]
        });
    }

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['3']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="contacts"/>
                                    <span>客户管理</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent page={this.state.page}
                                         one_customer={this.state.one_customer}
                                         one_contact={this.state.one_contact}
                                         customer_table_columns={this.state.customer_table_columns}
                                         customers={this.state.customers}
                                         loading={this.state.loading}
                                         addNewBtnOnclick={this.handleAddNewBtnOnclick}
                                         backFromAddNewBtnOnclick={this.handleBackFromAddNewBtnOnclick}
                                         editCustomerBtnOnclick={this.handleEditCustomerBtnOnclick}
                                         editContactBtnOnclick={this.handleEditContactBtnOnclick}
                                         reloadBtnOnclick={this.handleReloadBtnOnclick}
                                         backFromEditCustomerBtnOnclick={this.handleBackFromEditCustomerBtnOnclick}
                            />
                        </div>
                    </Content>
                    <CompnFooter/>
                </Layout>
            </Layout>
        )
    }
}
