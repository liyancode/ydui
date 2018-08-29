import React from 'react';
import {Icon, Divider, Tag} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {askPriceService} from "../../_services/askprice.service"
import {commonService} from "../../_services/common.service"

export default class PageAskPriceN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            ask_prices: [],
            one_ask_price: {},
            users: {},
            customers: {}
        }

        askPriceService.getAll().then(data => {
            this.setState({
                loading: false,
                ask_prices: data,
            })
            let user_names_set = new Set();
            let customer_ids_set = new Set();
            for (let idx in data) {
                user_names_set.add(data[idx].added_by_user_name);
                user_names_set.add(data[idx].approve_by_user_name);
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

        this.func_update_ask_prices = this.func_update_ask_prices.bind(this);
        this.func_update_one_ask_price = this.func_update_one_ask_price.bind(this);
        this.func_delete_one_ask_price = this.func_delete_one_ask_price.bind(this);
        this.func_sub_title = this.func_sub_title.bind(this);
        this.func_item_table_columns = this.func_item_table_columns.bind(this);
        this.func_content_view_one = this.func_content_view_one.bind(this);
        this.func_content_create_one = this.func_content_create_one.bind(this);
        this.func_content_edit_one = this.func_content_edit_one.bind(this);
    };

    func_update_ask_prices() {
        this.setState({loading: true});
        askPriceService.getAll().then(data => {
            this.setState({
                loading: false,
                ask_prices: data,
            })
        })
    }

    func_update_one_ask_price(id) {
        this.setState({loading: true});
        askPriceService.getOneItemById(id).then(data => {
            this.setState({
                loading: false,
                one_ask_price: data,
            })
        })
    }

    func_delete_one_ask_price(id) {
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
                <span>询价管理</span>
            </h4>
        )
    }

    func_item_table_columns(props) {
        return [
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
                title: '客户',
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
            }, {
                title: '询价描述',
                dataIndex: 'description',
                key: 'description',
            }, {
                title: '审批人',
                dataIndex: 'approve_by_user_name',
                key: 'approve_by_user_name',
                render: (text, record) => {
                    let user_full_name;
                    let user = this.state.users[record["approve_by_user_name"]];
                    if (user) {
                        user_full_name = user.employee_info.full_name;
                    } else {
                        user_full_name = "用户名: " + record["approve_by_user_name"];
                    }

                    return (
                        user_full_name
                    )
                }
            }, {
                title: '审批状态',
                dataIndex: 'approve_status',
                key: 'approve_status',
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
                title: '最后更新',
                dataIndex: 'last_update_at',
                key: 'last_update_at',
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (<span>
            <a href="javascript:;" onClick={props.checkDetailOnclick}
               id={record.id}>查看详情</a>
            </span>)
                },
            }]
    }

    func_content_view_one() {
        let one_item = this.state.one_ask_price;

        let company_name;
        let customer = this.state.customers[one_item["customer_id"]];
        if (customer) {
            company_name = customer.company_name;
        } else {
            company_name = "公司名未知，客户ID:" + one_item["customer_id"];
        }

        let user_full_name;
        let user = this.state.users[one_item["approve_by_user_name"]];
        if (user) {
            user_full_name = user.employee_info.full_name;
        } else {
            user_full_name = "用户名: " + one_item["approve_by_user_name"];
        }

        let approve_status;
        if (one_item["approve_status"] === 'waiting') {
            approve_status = <span>
                    <Tag color="geekblue">等待审批<Icon type="clock-circle" /></Tag>
                    </span>
        } else if (one_item["approve_status"] === 'pass') {
            approve_status = <span>
                    <Tag color="green">审批通过<Icon type="check-circle" /></Tag>
                    </span>
        } else {
            approve_status = <span>
                    <Tag color="red">审批拒绝<Icon type="exclamation-circle" /></Tag>
                    </span>
        }

        return (
            <div className="col-sm-12 col-md-6">
                <Divider orientation={"left"}><span>询价信息</span><Icon type="team"/></Divider>
                <table className="table table-bordered table-condensed">
                    <tbody>
                    <tr>
                        <td>编号</td>
                        <td>{one_item["ask_price_id"]}</td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{one_item["created_at"]}</td>
                    </tr>
                    <tr>
                        <td style={{minWidth:80}}>客户</td>
                        <td>{company_name}</td>
                    </tr>
                    <tr>
                        <td>审批人</td>
                        <td>{user_full_name}
                        </td>
                    </tr>
                    <tr>
                        <td>审批状态</td>
                        <td>{approve_status}</td>
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
                breadcrumbKeyWord="询价"
                items={this.state.ask_prices}
                one_item={this.state.one_ask_price}
                update_items={this.func_update_ask_prices}
                update_one_item={this.func_update_one_ask_price}
                delete_one_item={this.func_delete_one_ask_price}
                _compnViewOne={this.func_content_view_one}
                _compnCreateOne={this.func_content_create_one}
                _compnEditOne={this.func_content_edit_one}
                item_table_columns={this.func_item_table_columns}
                subTitle={this.func_sub_title}
                siderDefaultMenuKey={['ask_price_page']}
                siderDefaultOpenKeys={['order_m']}
            />
        )
    }
}