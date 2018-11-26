import React from 'react';
import {Icon, Divider, Tag, Radio, Button} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {finService} from "../../_services/fin.service"
import {commonService} from "../../_services/common.service"
import {askPriceService} from "../../_services/askprice.service"
import {contractService} from "../../_services/contract.service"

const RadioGroup = Radio.Group;

export default class PageFinApproval extends React.Component {
    constructor(props) {
        super(props);
        let subpage = '', breadcrumbKeyWord = '';
        if (props.location.pathname.indexOf('_ask_price') > 0) {
            subpage = 'fap_ask_price';
            breadcrumbKeyWord = '询价';
        } else if (props.location.pathname.indexOf('_contract') > 0) {
            subpage = 'fap_contract';
            breadcrumbKeyWord = '合同';
        } else if (props.location.pathname.indexOf('_order') > 0) {
            subpage = 'fap_order';
            breadcrumbKeyWord = '订单';
        }
        this.state = {
            subPage: subpage,
            breadcrumbKeyWord: breadcrumbKeyWord,
            status_select: 'all',
            loading: true,
            items: [],
            one_item: {},
            inventory_types: [],
            waiting_count: 0,
            ref_item: {},
            customers: {},
            users: {},
        }
        // subPage: 'rm'
        finService.getFinApprovalsByType(this.state.subPage).then(data => {
            this.setState({
                loading: false,
                items: data.fin_approvals,
            })
        });

        commonService.getFinApprovalCountByStatus('waiting').then(data => {
            this.setState({
                waiting_count: data.count,
            })
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
        this.onChangeStatusRadio = this.onChangeStatusRadio.bind(this);
        this.func_status_tag = this.func_status_tag.bind(this);
        this.func_approve = this.func_approve.bind(this);
    };

    func_update_items() {
        this.setState({loading: true});
        if (this.state.status_select === 'all') {
            finService.getFinApprovalsByType(this.state.subPage).then(data => {
                this.setState({
                    loading: false,
                    items: data.fin_approvals,
                })
            });
        } else {
            this.setState({loading: true});
            finService.getFinApprovalsByTypeAndResult(this.state.subPage, this.state.status_select).then(data => {
                this.setState({
                    loading: false,
                    items: data.fin_approvals,
                })
            });
        }
        commonService.getFinApprovalCountByStatus('waiting').then(data => {
            this.setState({
                waiting_count: data.count,
            })
        });
    }

    func_update_one_item(fin_approval_id) {
        this.setState({loading: true});
        finService.getFinApprovalByFinApprovalID(fin_approval_id).then(data => {
            this.setState({
                loading: false,
                one_item: data,
            })
            if (this.state.subPage.indexOf('ask_price') > 0) {
                askPriceService.getOneItemByAskPriceId(data.ref_id).then(data1 => {
                    this.setState({
                        ref_item: data1,
                    })
                    let user_names_set = new Set();
                    let customer_ids_set = new Set();
                    user_names_set.add(data1.added_by_user_name);
                    user_names_set.add(data1.approve_by_user_name);
                    customer_ids_set.add(data1.customer_id);
                    let user_names = Array.from(user_names_set).toString();
                    if (user_names.length > 0) {
                        commonService.getUsersByUsernames(user_names).then(data => {
                            this.setState({
                                users: data,
                            })
                        });
                    }
                    let customer_ids = Array.from(customer_ids_set).toString();
                    if (customer_ids.length > 0) {
                        commonService.getCustomersByCustomerIds(customer_ids).then(data => {
                            this.setState({
                                customers: data,
                            })
                        });
                    }
                });
            } else if (this.state.subPage.indexOf('contract') > 0) {
                contractService.getOneByContractId(data.ref_id).then(data2 => {
                    this.setState({
                        ref_item: data2,
                    })
                });
            }
        });
        commonService.getFinApprovalCountByStatus('waiting').then(data => {
            this.setState({
                waiting_count: data.count,
            })
        });
    }

    func_delete_one_item() {
        this.setState({loading: true});
        finService.deleteOneFinApproval(this.state.one_item.fin_approval_id).then(data => {
            this.setState({
                loading: false,
            })
            this.func_update_items();
        });
        commonService.getFinApprovalCountByStatus('waiting').then(data => {
            this.setState({
                waiting_count: data.count,
            })
        });
    }

    func_sub_title() {
        return (
            <h4 style={{display: "inline"}}>
                <Icon type="database"/>
                <span>财务审批</span>
            </h4>
        )
    }

    func_status_tag(status) {
        if (status === 'waiting') {
            return (
                <span>
                    <Tag color="geekblue">等待审批<Icon type="clock-circle"/></Tag>
                    </span>
            )
        } else if (status === 'pass') {
            return (
                <span>
                    <Tag color="green">审批通过<Icon type="check-circle"/></Tag>
                    </span>
            )
        } else {
            return (
                <span>
                    <Tag color="red">审批拒绝<Icon type="exclamation-circle"/></Tag>
                    </span>
            )
        }
    }

    func_approve(e){
        let result=e.target.getAttribute('result');
        let fa=this.state.one_item;
        if(result&&fa.approval_result!==result){
            if(result==='pass'){
                fa.approval_result='pass';
            }else if(result==='no'){
                fa.approval_result='no';
            }
            this.setState({loading: true});
            finService.updateOneFinApproval(fa).then(data=>{
                this.setState({
                    loading: false,
                })
                this.func_update_one_item(fa.fin_approval_id)
            });
        }
    }
// {
//     "ref_id": "880001",
//     "updated_by_user_name": "admin",
//     "approval_result": "waiting",
//     "added_by_user_name": "admin",
//     "fin_approval_id": "1230003",
//     "last_update_at": "2018-11-24 10:51:25 +0800",
//     "created_at": "2018-11-24 10:51:25 +0800",
//     "comment": null,
//     "id": 4,
//     "type": "contract",
//     "status": 1
// }
    func_item_table_columns(props) {
        return [
            {
                title: '编号',
                dataIndex: 'fin_approval_id',
                key: 'fin_approval_id',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.fin_approval_id > b.fin_approval_id?1:-1,
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.created_at > b.created_at?1:-1,
            }, {
                title: this.state.breadcrumbKeyWord + '编号',
                dataIndex: 'ref_id',
                key: 'ref_id',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.ref_id > b.ref_id?1:-1,
            }, {
                title: '状态',
                dataIndex: 'approval_result',
                key: 'approval_result',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.approval_result > b.approval_result?1:-1,
                render: (text) => {
                    if (text === 'waiting') {
                        return (
                            <span>
                    <Tag color="geekblue">等待审批<Icon type="clock-circle"/></Tag>
                    </span>
                        )
                    } else if (text === 'pass') {
                        return (
                            <span>
                    <Tag color="green">审批通过<Icon type="check-circle"/></Tag>
                    </span>
                        )
                    } else {
                        return (
                            <span>
                    <Tag color="red">审批拒绝<Icon type="exclamation-circle"/></Tag>
                    </span>
                        )
                    }
                }
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (<span>
            <a href="javascript:;" onClick={props.checkDetailOnclick}
               id={record.fin_approval_id}>查看详情</a>
            </span>)
                },
            }]
    }

    func_content_view_one() {
        let one_item = this.state.one_item;
        let detail_info = '';
        if (this.state.subPage.indexOf('ask_price') > 0) {
            let one_item = this.state.ref_item;

            let company_name;
            let customer = this.state.customers[one_item["customer_id"]];
            if (customer) {
                company_name = customer.company_name;
            } else {
                company_name = "公司名未知，客户ID:" + one_item["customer_id"];
            }

            let user_full_name;
            let user = this.state.users[one_item["added_by_user_name"]];
            if (user) {
                user_full_name = user.employee_info.full_name;
            } else {
                user_full_name = "用户名: " + one_item["added_by_user_name"];
            }
            detail_info = (
                <div className="col-sm-12">
                    <Divider orientation={"left"}><span>询价信息</span><Icon type="team"/></Divider>
                    <table className="table table-bordered table-condensed">
                        <tbody>
                        <tr>
                            <td>编号</td>
                            <td>{one_item["ask_price_id"]}</td>
                        </tr>
                        <tr>
                            <td>创建人</td>
                            <td>{user_full_name}</td>
                        </tr>
                        <tr>
                            <td>创建时间</td>
                            <td>{one_item["created_at"]}</td>
                        </tr>
                        <tr>
                            <td style={{minWidth: 80}}>客户</td>
                            <td>{company_name}</td>
                        </tr>
                        <tr>
                            <td>询价描述</td>
                            <td>{one_item["description"]}</td>
                        </tr>
                        <tr>
                            <td>最后更新</td>
                            <td>{one_item["last_update_at"]}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else if (this.state.subPage.indexOf('contract') > 0) {

        }

        return (
            <div className="col-sm-12 col-md-6">
                <Divider orientation={"left"}><span>审批</span><Icon type="file"/></Divider>
                <table className="table table-bordered table-condensed">
                    <tbody>
                    <tr>
                        <td>编号</td>
                        <td>{one_item["fin_approval_id"]}</td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{one_item["created_at"]}</td>
                    </tr>
                    <tr>
                        <td>最近更新的人</td>
                        <td>{one_item["updated_by_user_name"]}</td>
                    </tr>
                    <tr>
                        <td>最近更新时间</td>
                        <td>{one_item["last_update_at"]}</td>
                    </tr>
                    <tr>
                        <td>描述</td>
                        <td>{one_item["comment"]}</td>
                    </tr>
                    <tr>
                        <td>状态</td>
                        <td>{this.func_status_tag(one_item.approval_result)}</td>
                    </tr>
                    <tr>
                        <td>操作</td>
                        <td>
                            <Button type="primary" onClick={this.func_approve} result={'pass'}>审批通过</Button>
                            &nbsp;
                            <Button type={"danger"} onClick={this.func_approve} result={'no'}>审批拒绝</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                {detail_info}
            </div>
        );
    }

    func_content_create_one() {
        return (
            <h3>通过其他页面添加</h3>
        );
    }

    func_content_edit_one() {
        return (
            <h3>改进中。。。</h3>
        );
    }

    onChangeStatusRadio(e) {
        let status = e.target.value;
        this.setState({
            status_select: status,
        });
        this.setState({loading: true});
        if (status === 'all') {
            finService.getFinApprovalsByType(this.state.subPage).then(data => {
                this.setState({
                    loading: false,
                    items: data.fin_approvals,
                })
            });
        } else {
            this.setState({loading: true});
            finService.getFinApprovalsByTypeAndResult(this.state.subPage, status).then(data => {
                this.setState({
                    loading: false,
                    items: data.fin_approvals,
                })
            });
        }
        commonService.getFinApprovalCountByStatus('waiting').then(data => {
            this.setState({
                waiting_count: data.count,
            })
        });
    }

    func_content_header() {

        return (
            <RadioGroup onChange={this.onChangeStatusRadio} value={this.state.status_select}>
                <Radio value={'all'}>所有</Radio>
                <Radio value={'waiting'}><Tag color="geekblue">等待审批<Icon type="clock-circle"/></Tag></Radio>
                <Radio value={'pass'}><Tag color="green">审批通过<Icon type="check-circle"/></Tag></Radio>
                <Radio value={'no'}><Tag color="red">审批拒绝<Icon type="exclamation-circle"/></Tag></Radio>
            </RadioGroup>
        );
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
                update_one_item_by_key={"fin_approval_id"}
                delete_one_item={this.func_delete_one_item}
                _compnViewOne={this.func_content_view_one}
                _compnCreateOne={this.func_content_create_one}
                _compnEditOne={this.func_content_edit_one}
                item_table_columns={this.func_item_table_columns}
                subTitle={this.func_sub_title}
                siderDefaultMenuKey={[this.state.subPage]}
                siderDefaultOpenKeys={['fin_m']}
                contentHeader={this.func_content_header}
                fin_approval_count={this.state.waiting_count}
                _btnTag_Add={false}
                _btnTag_Delete={false}
                _btnTag_Update={false}
            />
        )
    }
}