import React from 'react';
import {Popconfirm, Icon, Steps, Table, Layout, Tag, Divider, Spin, Button, Progress, Breadcrumb} from 'antd';

const {Content,} = Layout;
import CompnSider from "../../_components/compnSider";
import CompnHeader from "../../_components/compnHeader";

import WrappedFormNewCustomer from "./form/_formNewCustomer";
import WrappedFormNewCustomerContact from "./form/_formNewCustomerContact";
import WrappedFormEditCustomer from "./form/_formEditCustomer";
import WrappedFormEditContact from "./form/_formEditContact";
import WrappedFormNewCustomerFollowup from "./form/_formNewCustomerFollowup";

import {serviceCustomer} from '../../_services/service.customer';

const Step = Steps.Step;

//potential潜在/intentional有意向合作/intentional_order意向订单/formal_order正式订单
function func_followup_status_tag(followup_status) {
    let tg;
    switch (followup_status) {
        case 'potential':
            tg = <Tag color="#2db7f5">潜在客户</Tag>
            break;
        case 'intentional':
            tg = <Tag color="#87d068">有合作意向的客户</Tag>
            break;
        case 'intentional_order':
            tg = <Tag color="#87d068">已下意向订单</Tag>
            break;
        case 'formal_order':
            tg = <Tag color="#87d068">已下正式订单</Tag>
            break;
        default:
            tg = <Tag>未知<Icon type="minus-circle-o"/></Tag>
            break;
    }
    return <span>{tg}</span>
}

function sortFollowupArr(a, b) {
    return a.last_update_at > b.last_update_at ? 1 : -1
}

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
                        <span>添加客户信息</span>
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
                    <table className="table" key={i}>
                        <tbody>
                        <tr>
                            <td>姓名</td>
                            <td>{contact_i["fullname"] + " " + ((contact_i["gender"] == 1) ? "先生" : "女士")}</td>
                        </tr>
                        <tr>
                            <td><span>职务</span><Icon type="tag-o"/></td>
                            <td>{contact_i["title"]}</td>
                        </tr>
                        <tr>
                            <td><span>电话</span><Icon type="mobile"/></td>
                            <td>{contact_i["phone_number"]}</td>
                        </tr>
                        <tr>
                            <td><span>邮箱</span><Icon type="mail"/></td>
                            <td>{contact_i["email"]}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Button type="primary" icon="edit" style={btnStyle} contact_id={contact_i["id"]}
                                        onClick={props.editContactBtnOnclick}>更新</Button>
                                <Button type="danger" icon="delete" style={btnStyle} onClick={props.deleteContactBtnOnclick} id={""+contact_i["id"]+""}>删除</Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                );
            }

            let one_customer_followups = props.one_customer_followups.sort(sortFollowupArr).reverse();
            let followup_logs = [];
            let followup = '';
            let followup_status = 'potential';
            for (let i = 0; i < one_customer_followups.length; i++) {
                followup = one_customer_followups[i];
                followup_logs.push(<p
                    key={followup.id}>{followup.last_update_at.split('+')[0] + followup.followup_method + " " + followup.followup_description}</p>)
                if (i === 0) {
                    followup_status = followup.followup_status;
                }
            }

            let followup_view = props.followup_view;
            let followup_view_content = "";
            if (followup_view === "view") {
                followup_view_content = <div>
                    <div className={"text-center"}>
                        <Button type="primary" icon="edit" style={btnStyle}
                                onClick={props.followUpAddBtnOnclick}>添加跟进记录</Button>
                    </div>
                    <Divider orientation={"left"}><span>客户当前跟进状态</span><Icon type="loading"/></Divider>
                    {func_followup_status_tag(followup_status)}
                    <br/>
                    <Divider orientation={"left"}><span>客户跟进历史记录</span><Icon type="area-chart"/></Divider>
                    {followup_logs}
                </div>
            } else {
                followup_view_content = <div>
                    <div>
                        <Button type="primary" style={btnStyle} onClick={props.backFromAddNewFollowup}>
                            <Icon type="left"/>
                            <span>返回</span>
                        </Button>
                        <h5>添加客户跟进记录</h5>
                    </div>
                    <WrappedFormNewCustomerFollowup one_customer={props.one_customer}/>
                </div>
            }
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddNewBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Spin spinning={props.loading}>
                        <div className="col-sm-12 col-md-6">
                            {/*<dl className="dl-horizontal">*/}
                            {/*<dt>客户编号</dt>*/}
                            {/*<dd>{}</dd>*/}
                            {/*<dt>创建者</dt>*/}
                            {/*<dd>{customer["added_by_user_name"]}</dd>*/}
                            {/*<dt><span>创建时间</span><Icon type="calendar"/></dt>*/}
                            {/*<dd>{customer["created_at"]}</dd>*/}
                            {/*</dl>*/}
                            <Divider orientation={"left"}>
                                <Icon type="profile"/>
                                <span>客户{customer["customer_id"]}详细信息 创建者:{customer["added_by_user_name"]} 创建时间:{customer["created_at"].split('+')[0]}</span>
                            </Divider>
                            <table className="table table-condensed">
                                <tbody>
                                <tr>
                                    <td><span>公司名称</span><Icon type="copyright"/></td>
                                    <td><h4>{customer["company_name"]}</h4></td>
                                </tr>
                                <tr>
                                    <td><span>公司所在地</span>
                                        <Icon type="environment-o"/></td>
                                    <td>{customer["company_location"]}</td>
                                </tr>
                                <tr>
                                    <td><span>公司税号</span>
                                        <Icon type="safety" style={{color: "#52c41a"}}/></td>
                                    <td>{customer["company_tax_number"]}</td>
                                </tr>
                                <tr>
                                    <td><span>公司法人</span>
                                        <Icon type="user"/></td>
                                    <td>{customer["company_legal_person"]}</td>
                                </tr>
                                <tr>
                                    <td style={{minWidth: 120}}><span>公司主营业务</span><Icon type="global"/></td>
                                    <td>{customer["company_main_business"]}</td>
                                </tr>
                                <tr>
                                    <td><span>公司网站</span><Icon type="link"/></td>
                                    <td><a target={"_blank"} href={customer["company_description"]}>
                                        {customer["company_description"]}
                                    </a></td>
                                </tr>
                                <tr>
                                    <td><span>公司电话</span><Icon type="phone"/></td>
                                    <td>{customer["company_tel_number"]}</td>
                                </tr>
                                <tr>
                                    <td><span>公司邮箱</span><Icon type="mail"/></td>
                                    <td>{customer["company_email"]}</td>
                                </tr>
                                <tr>
                                    <td style={{minWidth: 120}}>备注</td>
                                    <td>{customer["comment"]}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><Button type="primary" icon="edit" style={btnStyle}
                                                onClick={props.editCustomerBtnOnclick}>更新</Button></td>
                                </tr>
                                </tbody>
                            </table>
                            <Divider orientation={"left"}><Icon type="team"/><span>公司联系人</span></Divider>
                            {conatct_info_div}
                            <Divider><Button type="primary" icon="user-add" style={btnStyle}
                                             onClick={props.addContactBtnOnclick}>添加新联系人</Button></Divider>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            {followup_view_content}
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
                <WrappedFormNewCustomer/>
            </div>)
        } else if (page === 'edit_customer') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromEditCustomerBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormEditCustomer customer={props.one_customer["customer"]}/>
            </div>);
        } else if (page === 'edit_contact') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromEditCustomerBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormEditContact contact={props.one_contact} customer={props.one_customer["customer"]}/>
            </div>);
        } else if (page === 'add_new_contact') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddContactBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormNewCustomerContact customer={props.one_customer["customer"]}/>
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
        let subpage = '', breadcrumbKeyWord = '';
        if (props.location.pathname.indexOf('_my') > 0) {
            subpage = 'crm_my';
            breadcrumbKeyWord = '我的客户';
        } else if (props.location.pathname.indexOf('_all') > 0) {
            subpage = 'crm_all';
            breadcrumbKeyWord = '所有客户';
        }
        this.state = {
            loading: true,
            page: 'view_all',//view_one/add_new/view_all/edit_customer/edit_contact
            breadcrumb: breadcrumbKeyWord,
            subPage: subpage,
            one_customer: null,
            one_customer_followups: [],
            one_contact: null,
            customers: [],
            followup_view: 'view',
            customer_table_columns: [
                {
                    title: '客户编号',
                    dataIndex: 'customer_id',
                    key: 'customer_id',
                    sorter: (a, b) => a.customer_id - b.customer_id,
                },
                {
                    title: '客户名称',
                    dataIndex: 'company_name',
                    key: 'company_name',
                    sorter: (a, b) => a.company_name > b.company_name ? 1 : -1,
                },
                {
                    title: '公司所在地',
                    dataIndex: 'company_location',
                    key: 'company_location',
                    sorter: (a, b) => a.company_location > b.company_location ? 1 : -1,
                },
                {
                    title: '创建者',
                    dataIndex: 'added_by_user_name',
                    key: 'added_by_user_name',
                },
                {
                    title: '跟进状态',
                    key: 'followup_status',
                    sorter: (a, b) => a.followup_status > b.followup_status ? 1 : -1,
                    render: (text, record) => {
                        return func_followup_status_tag(record.followup_status)
                    },
                }, {
                    title: '最后更新时间',
                    dataIndex: 'followup_last_update_at',
                    key: 'followup_last_update_at',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.followup_last_update_at > b.followup_last_update_at ? 1 : -1,
                    render: (text, record) => {
                        return (record.followup_last_update_at.split('+')[0])
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
        this.handleFollowUpAddBtnOnclick = this.handleFollowUpAddBtnOnclick.bind(this);
        this.handleBackFromAddNewFollowup = this.handleBackFromAddNewFollowup.bind(this);
        this.handleBackFromAddContactBtnOnclick = this.handleBackFromAddContactBtnOnclick.bind(this);
        this.handleAddContactBtnOnclick = this.handleAddContactBtnOnclick.bind(this);
        this.handleDeleteContactBtnOnclick = this.handleDeleteContactBtnOnclick.bind(this);

        serviceCustomer.getCustomers(localStorage.getItem('user_name'), subpage).then(data => {
            this.setState({customers: data["customers"], loading: false});
        });
    }

    handleCheckDetailOnclick(e) {
        let customer_id = e.target.attributes.customer_id.value;
        // this.setState({page: "view_one",loading:true,breadcrumb:'客户详情: '+customer_id});
        serviceCustomer.getByCustomerId(customer_id).then(data => {
            serviceCustomer.getCustomerFollowupsByCIdUname(customer_id, localStorage.getItem('user_name')).then(data1 => {
                this.setState({
                    page: "view_one",
                    breadcrumb: '客户详情: ' + customer_id,
                    one_customer: data,
                    one_customer_followups: data1["customer_followups"],
                    loading: false
                });
            });
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
        serviceCustomer.getCustomers(localStorage.getItem('user_name'), this.state.subPage).then(data => {
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
        serviceCustomer.getByCustomerId(customer_id).then(data => {
            serviceCustomer.getCustomerFollowupsByCIdUname(customer_id, localStorage.getItem('user_name')).then(data1 => {
                this.setState({
                    page: "view_one",
                    breadcrumb: '客户详情: ' + customer_id,
                    one_customer: data,
                    one_customer_followups: data1["customer_followups"],
                    loading: false
                });
            });
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

    handleFollowUpAddBtnOnclick() {
        this.setState({
            followup_view: "add"
        });
    }

    handleBackFromAddNewFollowup() {
        serviceCustomer.getCustomerFollowupsByCIdUname(this.state.one_customer.customer.customer_id, localStorage.getItem('user_name')).then(data1 => {
            this.setState({
                one_customer_followups: data1["customer_followups"],
                followup_view: "view"
            });
        });
    }

    handleBackFromAddContactBtnOnclick() {
        let customer_id = this.state.one_customer["customer"]["customer_id"];
        serviceCustomer.getByCustomerId(customer_id).then(data => {
            serviceCustomer.getCustomerFollowupsByCIdUname(customer_id, localStorage.getItem('user_name')).then(data1 => {
                this.setState({
                    page: "view_one",
                    breadcrumb: '客户详情: ' + customer_id,
                    one_customer: data,
                    one_customer_followups: data1["customer_followups"],
                    loading: false
                });
            });
        });
    }

    handleAddContactBtnOnclick() {
        this.setState({
            page: "add_new_contact",
            breadcrumb: '添加新的公司联系人: ' + this.state.one_customer["customer"]["customer_id"]
        });
    }

    handleDeleteContactBtnOnclick(e) {
        let id = e.target.getAttribute("id")
        if(confirm("删除联系人信息？")){
            this.setState({
                loading: true
            });
            serviceCustomer.deleteCustomerContactById(id).then(data2=>{
                if(data2!=null){
                    let customer_id = this.state.one_customer.customer.customer_id;
                    // this.setState({page: "view_one",loading:true,breadcrumb:'客户详情: '+customer_id});
                    serviceCustomer.getByCustomerId(customer_id).then(data => {
                        serviceCustomer.getCustomerFollowupsByCIdUname(customer_id, localStorage.getItem('user_name')).then(data1 => {
                            this.setState({
                                one_customer: data,
                                one_customer_followups: data1["customer_followups"],
                                loading: false
                            });
                        });
                    });
                }else{
                    this.setState({
                        loading: false
                    });
                }
            });
        }
    }

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={[this.state.subPage]} defaultOpenKeys={['sales_m', 'crm']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="global"/>
                                    <span>客户关系</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent page={this.state.page}
                                         one_customer={this.state.one_customer}
                                         one_contact={this.state.one_contact}
                                         one_customer_followups={this.state.one_customer_followups}
                                         customer_table_columns={this.state.customer_table_columns}
                                         customers={this.state.customers}
                                         loading={this.state.loading}
                                         addNewBtnOnclick={this.handleAddNewBtnOnclick}
                                         backFromAddNewBtnOnclick={this.handleBackFromAddNewBtnOnclick}
                                         editCustomerBtnOnclick={this.handleEditCustomerBtnOnclick}
                                         editContactBtnOnclick={this.handleEditContactBtnOnclick}
                                         reloadBtnOnclick={this.handleReloadBtnOnclick}
                                         backFromEditCustomerBtnOnclick={this.handleBackFromEditCustomerBtnOnclick}
                                         followUpAddBtnOnclick={this.handleFollowUpAddBtnOnclick}
                                         followup_view={this.state.followup_view}
                                         backFromAddNewFollowup={this.handleBackFromAddNewFollowup}
                                         backFromAddContactBtnOnclick={this.handleBackFromAddContactBtnOnclick}
                                         addContactBtnOnclick={this.handleAddContactBtnOnclick}
                                         deleteContactBtnOnclick={this.handleDeleteContactBtnOnclick}
                            />
                        </div>
                    </Content>
                    {/*<CompnFooter color={'#333'}/>*/}
                </Layout>
            </Layout>
        )
    }
}
