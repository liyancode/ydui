import React from 'react';
import {Form, Input, DatePicker, Radio, Select, Popconfirm, Spin, Tag, Button, AutoComplete, Icon} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

import {orderService} from '../../_services/order.service';

const {TextArea} = Input;

class NewOrderForm extends React.Component {
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
                    "id": -1,
                    "order_id": "",
                    "added_by_user_name": "",
                    "sign_by_user_name": "",
                    "order_status": values["order_status"],
                    "order_status_update_by": "",
                    "is_finished": 0,
                    "comment": "",
                    "contract_id": values["contract_id"],
                    "customer_id": values["customer_id"],
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
                orderService.addNewOrder(order).then(data => {
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

        //=============customerSelect
        let customerIdCompanynameMap = {}
        let customerSelectOptions = [];
        for (let idx in my_customers) {
            customerSelectOptions.push(
                <Option key={idx} value={my_customers[idx].customer_id}>{my_customers[idx].company_name}</Option>
            )
            customerIdCompanynameMap[my_customers[idx].customer_id] = my_customers[idx].company_name;
        }
        const customerSelect = getFieldDecorator('customer_id', {
            rules: [{
                required: true, message: '请输入客户名称!',
            }],
        })(
            <Select
                showSearch
                placeholder="客户名称"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {customerSelectOptions}
            </Select>
        );

        //=============contractSelect
        let contractSelectOptions = [];
        for (let idx in my_contracts) {
            contractSelectOptions.push(
                <Option key={idx} value={my_contracts[idx].contract_id}>
                    {/*{my_contracts[idx].contract_id} ({customerIdCompanynameMap[my_contracts[idx].customer_id]})*/}
                    {my_contracts[idx].contract_id + ' [' + customerIdCompanynameMap[my_contracts[idx].customer_id] + ']'}
                </Option>
            )
        }
        const contractSelect = getFieldDecorator('contract_id', {
            rules: [{
                required: true, message: '请输入合同编号!',
            }],
        })(
            <Select
                showSearch
                placeholder="合同编号"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {contractSelectOptions}
            </Select>
        );

        const orderTypeSelector = getFieldDecorator('order_type', {
            initialValue: 'normal',
        })(
            <Select>
                <Option value="normal">正式订单</Option>
                <Option value="demo">打样订单</Option>
            </Select>
        );

        //start,producing,produced,delivering,delivered,tail,end
        const orderStatusSelector = getFieldDecorator('order_status', {
            initialValue: 'start',
        })(
            <Select>
                <Option value="start"><Tag>原料采购阶段<Icon type="loading"/>...</Tag></Option>
                <Option value="producing"><Tag color="#40a9ff">外发加工阶段<Icon type="loading"/>...</Tag></Option>
                <Option value="produced"><Tag color="blue">成品入仓阶段<Icon type="check-circle-o" /></Tag></Option>
                <Option value="delivering"><Tag color="#faad14">收款发货阶段<Icon type="loading"/>...</Tag></Option>
                {/*<Option value="delivered"><Tag color="orange">交付完成<Icon type="check-circle-o" /></Tag></Option>*/}
                {/*<Option value="tail"><Tag color="#f5222d">待支付尾款<Icon type="loading"/>...</Tag></Option>*/}
                <Option value="end"><Tag color="#52c41a"><Icon type="like" />订单完结<Icon type="check-circle-o" /></Tag></Option>
            </Select>
        );

        const payTypeSelector = getFieldDecorator('pay_type', {
            initialValue: '先定金，再尾款',
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
            initialValue: 'rmb',
        })(
            <Select>
                {currencySelectorOptions}
            </Select>
        );

        const currencySelectorPaid = getFieldDecorator('paid_value_currency', {
            initialValue: 'rmb',
        })(
            <Select>
                {currencySelectorOptions}
            </Select>
        );

        return (
            <Spin spinning={this.state.loading}>
                <span style={{color: 'red'}}>[注意：新建订单之前要先建合同记录!]</span>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="合同编号"
                    >
                        {contractSelect}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="客户名称"
                    >
                        {customerSelect}
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

const WrappedNewOrderForm = Form.create()(NewOrderForm);
export default WrappedNewOrderForm;