import React from 'react';
import {Icon, Steps, Timeline, Divider, Button, Progress} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {serviceCustomer} from "../../_services/service.customer"

import WrappedFormNewCustomer from "./form/_formNewCustomer";
import WrappedFormEditCustomer from "./form/_formEditCustomer";

const Step = Steps.Step;
export default class PageCRMMy extends React.Component {
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
            subPage: subpage,
            breadcrumbKeyWord: breadcrumbKeyWord,
            loading: true,
            items: [],
            one_item: {},
        }

        serviceCustomer.getCustomers(localStorage.getItem('user_name'), subpage).then(data => {
            this.setState({
                items: data["customers"],
                loading: false
            });
        });

        this.func_update_items = this.func_update_items.bind(this);
        this.func_update_one_item = this.func_update_one_item.bind(this);
        this.func_delete_one_item = this.func_delete_one_item.bind(this);
        this.func_sub_title = this.func_sub_title.bind(this);
        this.func_item_table_columns = this.func_item_table_columns.bind(this);
        this.func_content_view_one = this.func_content_view_one.bind(this);
        this.func_content_create_one = this.func_content_create_one.bind(this);
        this.func_content_edit_one = this.func_content_edit_one.bind(this);
        this.func_content_header = this.func_content_header.bind(this);
    };

    func_update_items() {
        this.setState({loading: true});
        serviceCustomer.getCustomers(localStorage.getItem('user_name'), this.state.subPage).then(data => {
            this.setState({
                items: data["customers"],
                loading: false
            });
        });
    }

    func_update_one_item(customer_id) {
        this.setState({loading: true});
        serviceCustomer.getByCustomerId(customer_id).then(data => {
            this.setState({
                loading: false,
                one_item: data,
            })
        })
    }

    func_delete_one_item() {
        this.setState({loading: true});
        serviceCustomer.deleteByCustomerId(this.state.one_item.customer_id).then(data => {
            this.setState({
                loading: false,
            })
            this.func_update_items();
        });
    }

    func_sub_title() {
        return (
            <h4 style={{display: "inline"}}>
                <Icon type="database"/>
                <span>仓储管理</span>
            </h4>
        )
    }

    func_item_table_columns(props) {
        return [
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
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           id={record.customer_id}>查看详情</a>
                        </span>)
                },
            }]
    }

    func_content_view_one() {
        const btnStyle = {
            marginRight: '8px',
            marginBottom: '12px'
        }
        let one_item = this.state.one_item;

        let customer = one_item["customer"];
        let contacts = one_item["contacts"];
        let conatct_info_div = [];
        for (let i = 0; i < contacts.length; i++) {
            let contact_i = contacts[i];
            conatct_info_div.push(
                <table className="table table-bordered" key={i}>
                    <tbody>
                    <tr>
                        <td>姓名</td>
                        <td>{contact_i["fullname"] + " " + ((contact_i["gender"] === 1) ? "先生" : "女士")}</td>
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
                            <Button type="danger" icon="delete" style={btnStyle}>删除</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        }
        return (
            <div>
            <div className="col-sm-12 col-md-6">
                <Divider orientation={"left"}><span>客户信息</span><Icon type="file"/></Divider>
                <dl className="dl-horizontal">
                    <dt>客户编号</dt>
                    <dd>{customer["customer_id"]}</dd>
                    <dt>创建者</dt>
                    <dd>{customer["added_by_user_name"]}</dd>
                    <dt><span>创建时间</span><Icon type="calendar"/></dt>
                    <dd>{customer["created_at"]}</dd>
                </dl>
                <Divider orientation={"left"}>
                    <span>公司详情</span>
                    <Icon type="profile"/>
                </Divider>
                <table className="table table-bordered table-condensed">
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
                        <td style={{minWidth:120}}><span>公司主营业务</span><Icon type="global"/></td>
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
                        <td style={{minWidth:120}}>备注</td>
                        <td>{customer["comment"]}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Button type="primary" icon="edit" style={btnStyle}
                                    onClick={props.editCustomerBtnOnclick}>更新</Button></td>
                    </tr>
                    </tbody>
                </table>
                <Divider orientation={"left"}><span>公司联系人</span><Icon type="team"/></Divider>
                {conatct_info_div}
                <Divider><Button type="primary" icon="user-add" style={btnStyle}>添加新联系人</Button></Divider>
            </div>
                <div className="col-sm-12 col-md-6">
                    <div className={"text-center"}><Button type="primary" icon="edit"
                                                           style={btnStyle}>添加跟进记录</Button></div>
                    <Divider orientation={"left"}><span>客户当前跟进状态</span><Icon type="loading"/></Divider>
                    <Steps current={2} size={"small"}>
                        <Step title="信息录入" description="前期沟通阶段"/>
                        <Step title="潜在客户" description="潜在合作可能"/>
                        <Step title="意向合作" description="已有合作意向" icon={<Icon type="loading"/>}/>
                        <Step title="意向订单" description="已达成意向订单"/>
                        <Step title="正式订单" description="已达成正式订单"/>
                        {/*<Step title="完成合作" description="已经成功合作" />*/}
                    </Steps>
                    <br/>
                    <Divider orientation={"left"}><span>客户跟进历史记录</span><Icon type="area-chart"/></Divider>
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
            </div>
        );
    }

    func_content_create_one() {
        return (
            <WrappedFormNewCustomer/>
        );
    }

    func_content_edit_one() {
        return (
            <WrappedFormEditCustomer
                customer={this.state.one_item["customer"]}
            />
        );
    }

    func_content_header() {

        return <div></div>
    }

    render() {
        return (
            <CompnPageContent
                loading={this.state.loading}
                breadcrumbKeyWord={this.state.breadcrumbKeyWord}
                items={this.state.items}
                one_item={this.state.one_item}
                update_items={this.func_update_items}
                update_one_item={this.func_update_one_item}
                update_one_item_by_key={"customer_id"}
                delete_one_item={this.func_delete_one_item}
                _compnViewOne={this.func_content_view_one}
                _compnCreateOne={this.func_content_create_one}
                _compnEditOne={this.func_content_edit_one}
                item_table_columns={this.func_item_table_columns}
                subTitle={this.func_sub_title}
                siderDefaultMenuKey={[this.state.subPage]}
                siderDefaultOpenKeys={['crm']}
                contentHeader={this.func_content_header}
            />
        )
    }
}