import React from 'react';
import {Form, Input, DatePicker, Radio, Select, Popconfirm, Spin, Tag, Button, AutoComplete, Icon} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

import {orderService} from '../../_services/order.service';
import moment from "moment/moment";

const {TextArea} = Input;

class EditOrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // {
//     "id": 1,
//     "order_id": "660001",
//     "added_by_user_name": "testname105",
//     "contract_id": "8800011",
//     "sign_by_user_name": "testname105",
//     "customer_id": "215",
//     "order_type": "normal",
//     "start_date": "2018-08-01",
//     "end_date": "2019-09-01",
//     "total_value": "1890000",
//     "pay_type": "fenqi",
//     "paid_value": "500000",
//     "order_status": "start",
//     "order_status_update_by": "admin",
//     "is_finished": 0,
//     "description": "测试订单",
//     "comment": null,
//     "created_at": "2018-07-24 21:50:36 +0800",
//     "last_update_at": "2018-07-24 21:50:36 +0800",
//     "status": 1
// }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let order = {
                    "id": this.props.one_order.id,
                    "order_id": this.props.one_order.order_id,
                    "added_by_user_name": this.props.one_order.added_by_user_name,
                    "sign_by_user_name": this.props.one_order.sign_by_user_name,
                    "order_status": values["order_status"],
                    "order_status_update_by": this.props.one_order.order_status_update_by,
                    "is_finished": this.props.one_order.is_finished,
                    "comment": this.props.one_order.comment,
                    "contract_id": this.props.one_order.contract_id,
                    "customer_id": this.props.one_order.customer_id,
                    "order_type": values["order_type"],
                    "start_date": values["start_date"],
                    "end_date": values["end_date"],
                    "total_value": values["total_value"],
                    "total_value_currency": values["total_value_currency"],
                    "pay_type": values["pay_type"],
                    "paid_value": values["paid_value"],
                    "paid_value_currency": values["paid_value_currency"],
                    "description": values["description"],
                    "status": 1,
                };
                orderService.updateOrder(order).then(data => {
                    this.setState({loading: false});
                });
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    render() {

        let one_order=this.props.one_order;
        let one_customer=this.props.one_customer;

        let my_customers = this.props.my_customers;
        let my_contracts = this.props.my_contracts;

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const orderTypeSelector = getFieldDecorator('order_type', {
            initialValue: one_order.order_type,
        })(
            <Select>
                <Option value="normal">正式订单</Option>
                <Option value="demo">打样订单</Option>
            </Select>
        );

        //start,producing,produced,delivering,delivered,tail,end
        const orderStatusSelector = getFieldDecorator('order_status', {
            initialValue: one_order.order_status,
        })(
            <Select>
                <Option value="start"><Tag>未开始生产<Icon type="minus-circle-o" /></Tag></Option>
                <Option value="producing"><Tag color="#40a9ff">生产中<Icon type="loading"/>...</Tag></Option>
                <Option value="produced"><Tag color="blue">生产完成，等待交付<Icon type="check-circle-o" /></Tag></Option>
                <Option value="delivering"><Tag color="#faad14">交付中<Icon type="loading"/>...</Tag></Option>
                <Option value="delivered"><Tag color="orange">交付完成<Icon type="check-circle-o" /></Tag></Option>
                <Option value="tail"><Tag color="#f5222d">待支付尾款<Icon type="loading"/>...</Tag></Option>
                <Option value="end"><Tag color="#52c41a"><Icon type="like" />订单完结<Icon type="check-circle-o" /></Tag></Option>
            </Select>
        );

        const payTypeSelector = getFieldDecorator('pay_type', {
            initialValue: one_order.pay_type,
        })(
            <Select>
                <Option value="fenqi">先定金，再尾款</Option>
                <Option value="one_time">全款</Option>
            </Select>
        );


        let currency_list = this.props.currency_list;
        let currencySelectorOptions = [];
        for (let k in currency_list) {
            currencySelectorOptions.push(<Option key={k} value={k}>{currency_list[k]}</Option>)
        }

        const currencySelector = getFieldDecorator('total_value_currency', {
            initialValue: one_order.total_value_currency,
        })(
            <Select>
                {currencySelectorOptions}
            </Select>
        );

        const currencySelectorPaid = getFieldDecorator('paid_value_currency', {
            initialValue: one_order.paid_value_currency,
        })(
            <Select>
                {currencySelectorOptions}
            </Select>
        );



        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="合同编号"
                    >
                        {getFieldDecorator('contract_id', {
                            rules: [{
                                required: true, message: '合同编号!',
                            }],
                            initialValue:one_order.contract_id+'['+one_customer.company_name+']'
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="客户名称"
                    >
                        {getFieldDecorator('customer_id', {
                            rules: [{
                                required: true, message: '客户名称!',
                            }],
                            initialValue:one_customer.company_name
                        })(
                            <Input disabled={true} placeholder={one_customer.company_name}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="订单类型"
                    >
                        {orderTypeSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="订单当前状态"
                    >
                        {orderStatusSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="订单开始日期"
                    >
                        {getFieldDecorator('start_date', {
                            rules: [{
                                required: true, message: '请输入订单开始日期!',
                            }],
                            initialValue:moment(one_order.start_date, "YYYY-MM-DD")
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="订单结束日期"
                    >
                        {getFieldDecorator('end_date', {
                            rules: [{
                                required: true, message: '请输入订单结束日期!',
                            }],
                            initialValue:moment(one_order.end_date, "YYYY-MM-DD")
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="订单总额"
                    >
                        {getFieldDecorator('total_value', {
                            rules: [{
                                required: true, message: '请输入订单总额!',
                            }],
                            initialValue:one_order.total_value
                        })(
                            <Input addonBefore={currencySelector}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="订单款项支付方式"
                    >
                        {payTypeSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="已支付金额"
                    >
                        {getFieldDecorator('paid_value', {
                            rules: [{
                                required: true, message: '请输入已支付金额!',
                            }],
                            initialValue:one_order.paid_value
                        })(
                            <Input addonBefore={currencySelectorPaid}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="订单说明"
                    >
                        {getFieldDecorator('description', {
                            rules: [],
                            initialValue:one_order.description
                        })(
                            <TextArea rows={4}/>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认提交？" onConfirm={this.handleSubmit}
                                    okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const WrappedEditOrderForm = Form.create()(EditOrderForm);
export default WrappedEditOrderForm;