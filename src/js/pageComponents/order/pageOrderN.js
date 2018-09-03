import React from 'react';
import {Icon, Divider, Tag,Steps} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {orderService} from "../../_services/order.service"
import {customerService} from "../../_services/customer.service"
import {contractService} from "../../_services/contract.service"

import {commonService} from "../../_services/common.service"
import {orderRelatedConstrants} from "../../_helpers/orderRelatedConstrants"

import WrappedNewOrderForm from "../../_components/order/_compnNewOrderForm"
import WrappedEditOrderForm from "../../_components/order/_compnEditOrderForm"

const Step = Steps.Step;

export default class PageOrderN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orders: [],
            one_order: {},
            users: {},
            one_user:{},
            customers: {},
            my_customers: [],
            one_customer:{},
            one_contract:{},
            my_contracts: [],
            currency_list: orderRelatedConstrants.currency_list
        }

        orderService.getOrders().then(data => {
            this.setState({
                loading: false,
                orders: data.orders,
            })
            let user_names_set = new Set();
            let customer_ids_set = new Set();
            let orders = data.orders;
            for (let idx in orders) {
                user_names_set.add(orders[idx].added_by_user_name);
                user_names_set.add(orders[idx].sign_by_user_name);
                customer_ids_set.add(orders[idx].customer_id)
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
            customerService.getAllByUsername(localStorage.getItem('user_name')).then(data => {
                this.setState({
                    my_customers: data.customers
                });
            });

            contractService.getAll().then(data => {
                console.log(data);
                this.setState({
                    my_contracts: data
                });
            });
        });

        this.func_update_orders = this.func_update_orders.bind(this);
        this.func_update_one_order = this.func_update_one_order.bind(this);
        this.func_delete_one_order = this.func_delete_one_order.bind(this);
        this.func_sub_title = this.func_sub_title.bind(this);
        this.func_item_table_columns = this.func_item_table_columns.bind(this);
        this.func_content_view_one = this.func_content_view_one.bind(this);
        this.func_content_create_one = this.func_content_create_one.bind(this);
        this.func_content_edit_one = this.func_content_edit_one.bind(this);
        this.func_order_status_tag = this.func_order_status_tag.bind(this);
        this.func_order_type_tag = this.func_order_type_tag.bind(this);

    };

    func_update_orders() {
        this.setState({loading: true});
        orderService.getOrders().then(data => {
            this.setState({
                loading: false,
                orders: data.orders,
            })
        })
    }

    func_update_one_order(id) {
        this.setState({loading: true})

        orderService.getOrderById(id).then(data => {
            let customer = this.state.customers[data.order["customer_id"]];
            if (customer !== undefined) {
                this.setState({
                    one_customer:customer
                });
            }
            this.setState({
                loading: false,
                one_order: data.order,
            })
        })
    }

    func_delete_one_order() {
        this.setState({loading: true});
        orderService.deleteOrder(this.state.one_order.order_id).then(data=>{
            this.setState({
                loading: false,
            })
            this.func_update_orders();
        });
    }



    func_sub_title() {
        return (
            <h4 style={{display: "inline"}}>
                <Icon type="team"/>
                <span>订单管理</span>
            </h4>
        )
    }

    func_order_status_tag(order_status) {
        let tg;
        switch (order_status) {
            case 'start':
                tg = <Tag>未开始生产<Icon type="minus-circle-o"/></Tag>
                break;
            case 'producing':
                tg = <Tag color="#40a9ff">生产中<Icon type="loading"/>...</Tag>
                break;
            case 'produced':
                tg = <Tag color="blue">生产完成，等待交付<Icon type="check-circle-o"/></Tag>
                break;
            case 'delivering':
                tg = <Tag color="#faad14">交付中<Icon type="loading"/>...</Tag>
                break;
            case 'delivered':
                tg = <Tag color="orange">交付完成<Icon type="check-circle-o"/></Tag>
                break;
            case 'tail':
                tg = <Tag color="#f5222d">待支付尾款<Icon type="loading"/>...</Tag>
                break;
            case 'end':
                tg = <Tag color="#52c41a"><Icon type="like"/>订单完结<Icon type="check-circle-o"/></Tag>
                break;
            default:
                tg = <Tag>未知<Icon type="minus-circle-o"/></Tag>
                break;
        }
        return <span>{tg}</span>
    }

    func_order_type_tag(order_type) {
        let tg;
        switch (order_type) {
            case 'normal':
                tg = <Tag color="#2db7f5">正式订单</Tag>
                break;
            case 'demo':
                tg = <Tag color="#87d068">打样订单</Tag>
                break;
            default:
                tg = <Tag>未知<Icon type="minus-circle-o"/></Tag>
                break;
        }
        return <span>{tg}</span>
    }

    func_item_table_columns(props) {
        return [
            {
                title: '订单号',
                dataIndex: 'order_id',
                key: 'order_id'
            },
            {
                title: '合同编号',
                dataIndex: 'contract_id',
                key: 'contract_id'
            },
            {
                title: '负责人',
                dataIndex: 'sign_by_user_name',
                key: 'sign_by_user_name',
                render: (text, record) => {
                    let full_name;
                    let contract;
                    for(let idx in this.state.my_contracts){
                        if(this.state.my_contracts[idx].contract_id===record["contract_id"]){
                            contract=this.state.my_contracts[idx]
                        }
                    }
                    if(contract){
                        let user = this.state.users[contract["sign_by_user_name"]];
                        if (user) {
                            full_name = user.employee_info.full_name;
                        } else {
                            full_name = "用户名: " + contract["sign_by_user_name"];
                        }
                    }else{
                        full_name = "用户名: 未知"
                    }

                    return (
                        full_name
                    )
                }
            },
            {
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
            },
            {
                title: '订单类别',
                dataIndex: 'order_type',
                key: 'order_type',
                render: (text) => {
                    return this.func_order_type_tag(text)
                }
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at'
            },
            {
                title: '订单状态',
                dataIndex: 'order_status',
                key: 'order_status',
                render: (text) => {
                    return this.func_order_status_tag(text)
                }

            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (<span>
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           id={record.order_id}>查看详情</a>
                        </span>)
                },
            }
        ]
    }

    func_content_view_one() {
        let one_item = this.state.one_order;
        let company_name;
        let customer = this.state.customers[one_item["customer_id"]];
        if (customer !== undefined) {
            // this.setState({
            //     one_customer:customer
            // });
            company_name = customer.company_name;
        } else {
            company_name = "公司名未知，客户ID:" + one_item["customer_id"];
        }

        let added_by_user_full_name;
        let user = this.state.users[one_item["added_by_user_name"]];
        if (user) {
            added_by_user_full_name = user.employee_info.full_name;
        } else {
            added_by_user_full_name = "用户名: " + one_item["added_by_user_name"];
        }

        let sign_by_user_full_name;
        let user2 = this.state.users[one_item["sign_by_user_name"]];
        if (user2) {
            sign_by_user_full_name = user2.employee_info.full_name;
        } else {
            sign_by_user_full_name = "用户名: " + one_item["sign_by_user_name"];
        }

        let currency = '*';
        if (one_item["total_value_currency"]) {
            currency = this.state.currency_list[one_item["total_value_currency"].toLowerCase()];
        }

        let paid_currency = '*';
        if (one_item["paid_value_currency"]) {
            paid_currency = this.state.currency_list[one_item["paid_value_currency"].toLowerCase()];
        }

        let customer_info = <div>未知公司信息</div>
        if (customer !== undefined) {
            customer_info = <table className="table table-bordered table-condensed">
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
                </tbody>
            </table>
        }
        return (
            <div className="col-sm-12 col-md-6">
                <Divider orientation={"left"}><span>订单信息</span><Icon type="team"/></Divider>
                <h4>订单当前状态：{this.func_order_status_tag(one_item["order_status"])}</h4>
                <table className="table table-bordered table-condensed">
                    <tbody>
                    <tr>
                        <td>订单编号</td>
                        <td>{one_item["order_id"]}</td>
                    </tr>
                    <tr>
                        <td>创建者</td>
                        <td>{added_by_user_full_name}</td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{one_item["created_at"]}</td>
                    </tr>
                    <tr>
                        <td>合同编号</td>
                        <td>{one_item["contract_id"]}</td>
                    </tr>
                    <tr>
                        <td>订单负责人</td>
                        <td>{sign_by_user_full_name}</td>
                    </tr>
                    <tr>
                        <td style={{minWidth: 120}}>订单客户</td>
                        <td>{company_name}</td>
                    </tr>
                    <tr>
                        <td>订单类型</td>
                        <td>{this.func_order_type_tag(one_item["order_type"])}</td>
                    </tr>
                    {/*<tr>*/}
                        {/*<td>订单当前状态</td>*/}
                        {/*<td>{this.func_order_status_tag(one_item["order_status"])}</td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td>订单期限</td>
                        <td>{one_item["start_date"]}到{one_item["end_date"]}</td>
                    </tr>
                    <tr>
                        <td>客户付款方式</td>
                        <td>{one_item["pay_type"]}</td>
                    </tr>
                    <tr>
                        <td>订单总额</td>
                        <td>{currency}{one_item["total_value"]}</td>
                    </tr>
                    <tr>
                        <td>已支付金额</td>
                        <td>{paid_currency}{one_item["paid_value"]}</td>
                    </tr>
                    <tr>
                        <td>其他说明</td>
                        <td>{one_item["description"]}</td>
                    </tr>
                    </tbody>
                </table>
                <Divider orientation={"left"}>
                    <span>客户信息</span>
                    <Icon type="file-text"/>
                </Divider>
                {customer_info}
            </div>
        );
    }

    func_content_create_one() {
        return (
            <WrappedNewOrderForm
                my_customers={this.state.my_customers}
                my_contracts={this.state.my_contracts}
                currency_list={this.state.currency_list}
            />
        );
    }

    func_content_edit_one() {
        return (
            <WrappedEditOrderForm
                one_order={this.state.one_order}
                one_customer={this.state.one_customer}
                currency_list={this.state.currency_list}
            />
        );
    }

    render() {
        return (
            <CompnPageContent
                loading={this.state.loading}
                breadcrumbKeyWord="订单"
                items={this.state.orders}
                one_item={this.state.one_order}
                update_items={this.func_update_orders}
                update_one_item={this.func_update_one_order}
                update_one_item_by_key={"order_id"}
                delete_one_item={this.func_delete_one_order}
                _compnViewOne={this.func_content_view_one}
                _compnCreateOne={this.func_content_create_one}
                _compnEditOne={this.func_content_edit_one}
                item_table_columns={this.func_item_table_columns}
                subTitle={this.func_sub_title}
                siderDefaultMenuKey={['order_page']}
                siderDefaultOpenKeys={['order_m']}
            />
        )
    }
}