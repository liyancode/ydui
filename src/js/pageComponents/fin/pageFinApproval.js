import React from 'react';
import {Icon, Divider, Tag,Radio} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {finService} from "../../_services/fin.service"
import WrappedNewInventoryForm from "../../_components/warehouse/_compNewInventoryForm"
import WrappedEditInventoryForm from "../../_components/warehouse/_compEditInventoryForm"

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
            status_select:'all',
            loading: true,
            items: [],
            one_item: {},
            inventory_types: [],
        }
        // subPage: 'rm'
        finService.getFinApprovalsByType(this.state.subPage).then(data => {
            this.setState({
                loading: false,
                items: data.fin_approvals,
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
    };

    func_update_items() {
        this.setState({loading: true});
        if(this.state.status_select==='all'){
            finService.getFinApprovalsByType(this.state.subPage).then(data => {
                this.setState({
                    loading: false,
                    items: data.fin_approvals,
                })
            });
        }else{
            this.setState({loading: true});
            finService.getFinApprovalsByTypeAndResult(this.state.subPage,this.state.status_select).then(data => {
                this.setState({
                    loading: false,
                    items: data.fin_approvals,
                })
            });
        }
    }

    func_update_one_item(fin_approval_id) {
        this.setState({loading: true});
        finService.getFinApprovalByFinApprovalID(fin_approval_id).then(data => {
            this.setState({
                loading: false,
                one_item: data,
            })
        })
    }

    func_delete_one_item() {
        this.setState({loading: true});
        finService.deleteOneFinApproval(this.state.one_item.fin_approval_id).then(data => {
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
                <span>财务审批</span>
            </h4>
        )
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
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
            }, {
                title: this.state.breadcrumbKeyWord+'编号',
                dataIndex: 'ref_id',
                key: 'ref_id',
            }, {
                title: '状态',
                dataIndex: 'approval_result',
                key: 'approval_result',
                render: (text) => {
                    if (text === 'waiting') {
                        return (
                            <span>
                    <Tag color="geekblue">等待审批<Icon type="clock-circle" /></Tag>
                    </span>
                        )
                    } else if (text === 'pass') {
                        return (
                            <span>
                    <Tag color="green">审批通过<Icon type="check-circle" /></Tag>
                    </span>
                        )
                    } else {
                        return (
                            <span>
                    <Tag color="red">审批拒绝<Icon type="exclamation-circle" /></Tag>
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
                    </tbody>
                </table>
            </div>
        );
    }

    func_content_create_one() {
        return (
            <WrappedNewInventoryForm
                inventory_types={this.state.inventory_types}
            />
        );
    }

    func_content_edit_one() {
        return (
            <WrappedEditInventoryForm
                inventory_types={this.state.inventory_types}
                one_inventory={this.state.one_item}
            />
        );
    }

    onChangeStatusRadio(e){
        let status=e.target.value;
        this.setState({
            status_select: status,
        });
        this.setState({loading: true});
        if(status==='all'){
            finService.getFinApprovalsByType(this.state.subPage).then(data => {
                this.setState({
                    loading: false,
                    items: data.fin_approvals,
                })
            });
        }else{
            this.setState({loading: true});
            finService.getFinApprovalsByTypeAndResult(this.state.subPage,status).then(data => {
                this.setState({
                    loading: false,
                    items: data.fin_approvals,
                })
            });
        }
    }
    func_content_header() {

        return (
            <RadioGroup onChange={this.onChangeStatusRadio} value={this.state.status_select}>
                <Radio value={'all'}>所有</Radio>
                <Radio value={'waiting'}><Tag color="geekblue">等待审批<Icon type="clock-circle" /></Tag></Radio>
                <Radio value={'pass'}><Tag color="green">审批通过<Icon type="check-circle" /></Tag></Radio>
                <Radio value={'no'}><Tag color="red">审批拒绝<Icon type="exclamation-circle" /></Tag></Radio>
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
            />
        )
    }
}