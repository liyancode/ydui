import React from 'react';
import {Form, Input, DatePicker, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

import {orderService} from '../../_services/order.service';
const { TextArea } = Input;
class NewContractForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
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
                    "order_id":"",
                    "added_by_user_name": "",
                    "sign_by_user_name": "",
                    "order_status": "",
                    "order_status_update_by": "",
                    "is_finished": 0,
                    "comment": "",
                    "contract_id": values["contract_id"],
                    "customer_id": values["customer_id"],
                    "order_type": values["order_type"],
                    "start_date": values["start_date"],
                    "end_date": values["end_date"],
                    "total_value": values["total_value"],
                    "pay_type": values["pay_type"],
                    "paid_value": values["paid_value"],
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

    handleWebsiteChange(value) {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;

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
            initialValue: 'normal',
        })(
            <Select>
                <Option value="normal">正式订单</Option>
                <Option value="demo">打样订单</Option>
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

        const contactGenderRadio = getFieldDecorator('contact_gender', {
            initialValue: 0,
        })(
            <RadioGroup>
                <Radio value={0}>女士</Radio>
                <Radio value={1}>先生</Radio>
            </RadioGroup>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="合同编号"
                    >
                        {getFieldDecorator('contract_id', {
                            rules: [{
                                required: true, message: '请输入合同编号!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="客户编号"
                    >
                        {getFieldDecorator('customer_id', {
                            rules: [{
                                required: true, message: '请输入客户编号!',
                            }],
                        })(
                            <Input/>
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
                            <Input/>
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
                            <Input/>
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

const WrappedNewContractForm = Form.create()(NewContractForm);
export default WrappedNewContractForm;