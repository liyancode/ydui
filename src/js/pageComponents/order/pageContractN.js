import React from 'react';
import {Icon, Divider, Tag} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {contractService} from "../../_services/contract.service"
import {commonService} from "../../_services/common.service"

export default class PageContractN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            contracts: [],
            one_contract: {},
            users: {},
            customers: {}
        }

        contractService.getAll().then(data => {
            this.setState({
                loading: false,
                contracts: data,
            })
            let user_names_set = new Set();
            let customer_ids_set = new Set();
            for (let idx in data) {
                user_names_set.add(data[idx].added_by_user_name);
                user_names_set.add(data[idx].sign_by_user_name);
                customer_ids_set.add(data[idx].customer_id)
            }
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

        this.func_update_contracts = this.func_update_contracts.bind(this);
        this.func_update_one_contract = this.func_update_one_contract.bind(this);
        this.func_delete_one_contract = this.func_delete_one_contract.bind(this);
        this.func_sub_title = this.func_sub_title.bind(this);
        this.func_item_table_columns = this.func_item_table_columns.bind(this);
        this.func_content_view_one = this.func_content_view_one.bind(this);
        this.func_content_create_one = this.func_content_create_one.bind(this);
        this.func_content_edit_one = this.func_content_edit_one.bind(this);
    };

    func_update_contracts() {
        this.setState({loading: true});
        contractService.getAll().then(data => {
            this.setState({
                loading: false,
                contracts: data,
            })
        })
    }

    func_update_one_contract(id) {
        this.setState({loading: true});
        contractService.getOneItemById(id).then(data => {
            this.setState({
                loading: false,
                one_contract: data,
            })
        })
    }

    func_delete_one_contract(id) {
        // this.setState({loading: true});
        // askPriceService.getOneItemById(id).then(data => {
        //     this.setState({
        //         loading:false,
        //         one_ask_price: data,
        //     })
        // })
    }

    func_sub_title() {
        return (
            <h4 style={{display: "inline"}}>
                <Icon type="team"/>
                <span>合同管理</span>
            </h4>
        )
    }

    func_item_table_columns(props) {
        return [
            {
                title: '合同编号',
                dataIndex: 'contract_id',
                key: 'contract_id'
            },
            {
                title: '记录创建者',
                dataIndex: 'added_by_user_name',
                key: 'added_by_user_name',
                render: (text, record) => {
                    let full_name;
                    let user = this.state.users[record["added_by_user_name"]];
                    if (user) {
                        full_name = user.employee_info.full_name;
                    } else {
                        full_name = "用户名: " + record["added_by_user_name"];
                    }
                    return (
                        full_name
                    )

                }
            },
            {
                title: '合同负责人',
                dataIndex: 'sign_by_user_name',
                key: 'sign_by_user_name',
                render: (text, record) => {
                    let full_name;
                    let user = this.state.users[record["sign_by_user_name"]];
                    if (user) {
                        full_name = user.employee_info.full_name;
                    } else {
                        full_name = "用户名: " + record["sign_by_user_name"];
                    }
                    return (
                        full_name
                    )

                }
            },
            {
                title: '签订客户',
                dataIndex: 'customer_id',
                key: 'customer_id',
                render: (text, record) => {
                    let customer, company_name;
                    customer = this.state.customers[record['customer_id']];
                    if (customer) {
                        company_name = customer.company_name;
                    } else {
                        company_name = "公司名未知，客户ID:" + record['customer_id']
                    }
                    return (
                        company_name
                    )

                }
            },
            {
                title: '签订时间',
                dataIndex: 'sign_at',
                key: 'sign_at'
            },
            {
                title: '合同当前状态',
                dataIndex: 'contract_status',
                key: 'contract_status'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (<span>
                        <a href="javascript:;"
                           onClick={props.checkDetailOnclick}
                           id={record["id"]}>详细信息</a>
                        </span>)
                },
            }
        ]
    }

    func_content_view_one() {
        let one_item = this.state.one_contract;

        let company_name;
        let customer = this.state.customers[one_item["customer_id"]];
        if (customer) {
            company_name = customer.company_name;
        } else {
            company_name = "公司名未知，客户ID:" + one_item["customer_id"];
        }

        let approve_by_user_full_name;
        let user = this.state.users[one_item["added_by_user_name"]];
        if (user) {
            approve_by_user_full_name = user.employee_info.full_name;
        } else {
            approve_by_user_full_name = "用户名: " + one_item["added_by_user_name"];
        }

        let sign_by_user_full_name;
        let user2 = this.state.users[one_item["sign_by_user_name"]];
        if (user2) {
            sign_by_user_full_name = user2.employee_info.full_name;
        } else {
            sign_by_user_full_name = "用户名: " + one_item["sign_by_user_name"];
        }

        // let approve_status;
        // if (one_item["approve_status"] === 'waiting') {
        //     approve_status = <span>
        //             <Tag color="geekblue">等待审批<Icon type="clock-circle"/></Tag>
        //             </span>
        // } else if (one_item["approve_status"] === 'pass') {
        //     approve_status = <span>
        //             <Tag color="green">审批通过<Icon type="check-circle"/></Tag>
        //             </span>
        // } else {
        //     approve_status = <span>
        //             <Tag color="red">审批拒绝<Icon type="exclamation-circle"/></Tag>
        //             </span>
        // }

        return (
            <div className="col-sm-12 col-md-6">
                <Divider orientation={"left"}><span>合同信息</span><Icon type="team"/></Divider>
                <table className="table table-bordered table-condensed">
                    <tbody>
                    <tr>
                        <td>合同编号</td>
                        <td>{one_item["contract_id"]}</td>
                    </tr>
                    <tr>
                        <td>记录创建者</td>
                        <td>{approve_by_user_full_name}</td>
                    </tr>
                    <tr>
                        <td>合同负责人</td>
                        <td>{sign_by_user_full_name}</td>
                    </tr>
                    <tr>
                        <td>签订客户</td>
                        <td>{company_name}
                        </td>
                    </tr>
                    <tr>
                        <td>签订时间</td>
                        <td>{one_item["sign_at"]}</td>
                    </tr>
                    <tr>
                        <td>合同当前状态</td>
                        <td>{one_item["contract_status"]}</td>
                    </tr>
                    <tr>
                        <td>合同期限</td>
                        <td>{one_item["start_date"]}到{one_item["end_date"]}</td>
                    </tr>
                    <tr>
                        <td>合同金额</td>
                        <td>{one_item["total_value"]}</td>
                    </tr>
                    <tr>
                        <td>其他说明</td>
                        <td>{one_item["description"]}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    func_content_create_one() {
        return (
            <div>创建新询价</div>
        );
    }

    func_content_edit_one() {
        let one_item = this.state.one_ask_price;
        console.log(one_item);
        return (
            <div>编辑询价{one_item.id}</div>
        );
    }

    render() {
        return (
            <CompnPageContent
                loading={this.state.loading}
                breadcrumbKeyWord="合同"
                items={this.state.contracts}
                one_item={this.state.one_contract}
                update_items={this.func_update_contracts}
                update_one_item={this.func_update_one_contract}
                delete_one_item={this.func_delete_one_contract}
                _compnViewOne={this.func_content_view_one}
                _compnCreateOne={this.func_content_create_one}
                _compnEditOne={this.func_content_edit_one}
                item_table_columns={this.func_item_table_columns}
                subTitle={this.func_sub_title}
                siderDefaultMenuKey={['contract_page']}
                siderDefaultOpenKeys={['order_m']}
            />
        )
    }
}