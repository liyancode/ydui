import React from 'react';
import {Form, Input, DatePicker, Select, Popconfirm, Spin, Button, } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

import {contractService} from '../../_services/contract.service';
import moment from "moment/moment";

const { TextArea } = Input;
class EditContractForm extends React.Component {
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
        // # ---- contract
        // # {
        //                  "id": 1,
        //                      "contract_id": "880001",
        //                      "added_by_user_name": "testname105",
        //                      "sign_by_user_name": "testname105",
        //                      "customer_id": "215",
        //                      "sign_at": "2018-07-01",
        //                      "start_date": "2018-07-10",
        //                      "end_date": "2019-05-01",
        //                      "total_value": "1500000",
        //                      "description": "这是一个测试合同",
        //                      "contract_status": 1,
        //                      "comment": "测试",
        //                      "created_at": "2018-07-23 22:54:33 +0800",
        //                      "last_update_at": "2018-07-23 22:54:33 +0800",
        //                      "status": 1
        //     #         }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let contract = {
                    "id": this.props.contract.id,
                    "contract_id": this.props.contract.contract_id,
                    "added_by_user_name": this.props.contract.added_by_user_name,
                    "sign_by_user_name": values["sign_by_user_name"],
                    "customer_id": values["customer_id"],
                    "sign_at": values["sign_at"],
                    "start_date": values["start_date"],
                    "end_date": values["end_date"],
                    "total_value": values["total_value"],
                    "total_value_currency": values["total_value_currency"],
                    "description": values["description"],
                    "contract_status": this.props.contract.contract_status,
                    "comment": this.props.contract.comment,
                    "status": 1
                };
                contractService.addOneContract(contract).then(data => {
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
        let contract=this.props.contract;

        let my_customers = this.props.my_customers;
        let currency_list = this.props.currency_list;
        let can_sign_contract_users = this.props.can_sign_contract_users;
        
        let currencySelectorOptions = [];
        for (let k in currency_list) {
            currencySelectorOptions.push(<Option key={k} value={k}>{currency_list[k]}</Option>)
        }
        const currencySelector = getFieldDecorator('total_value_currency', {
            initialValue: contract.total_value_currency,
        })(
            <Select>
                {currencySelectorOptions}
            </Select>
        );

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
            initialValue: contract.customer_id,
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

        let can_sign_contract_usersSelectOptions = [];
        for (let idx in can_sign_contract_users) {
            can_sign_contract_usersSelectOptions.push(
                <Option key={idx} value={can_sign_contract_users[idx].user_name}>
                {can_sign_contract_users[idx].full_name+
                    "("+
                    can_sign_contract_users[idx].user_name+")"}
                </Option>
            )
        }
        const can_sign_contract_usersSelect = getFieldDecorator('sign_by_user_name', {
            rules: [{
                required: true, message: '请输入合同负责人!',
            }],
            initialValue: contract.sign_by_user_name,
        })(
            <Select
                showSearch
                placeholder="合同负责人"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {can_sign_contract_usersSelectOptions}
            </Select>
        );

        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="合同负责人"
                    >
                        {can_sign_contract_usersSelect}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="签定客户"
                    >
                        {customerSelect}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="合同签署日期"
                    >
                        {getFieldDecorator('sign_at', {
                            rules: [{
                                required: true, message: '请输入合同签署日期!',
                            }],
                            initialValue: moment(contract.sign_at, "YYYY-MM-DD"),
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="合同开始日期"
                    >
                        {getFieldDecorator('start_date', {
                            rules: [{
                                required: true, message: '请输入合同开始日期!',
                            }],
                            initialValue: moment(contract.start_date, "YYYY-MM-DD"),
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="合同结束日期"
                    >
                        {getFieldDecorator('end_date', {
                            rules: [{
                                required: true, message: '请输入合同结束日期!',
                            }],
                            initialValue: moment(contract.end_date, "YYYY-MM-DD"),
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="合同总额"
                    >
                        {getFieldDecorator('total_value', {
                            rules: [{
                                required: true, message: '请输入订单总额!',
                            }],
                            initialValue: contract.total_value,
                        })(
                            <Input addonBefore={currencySelector}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="合同说明"
                    >
                        {getFieldDecorator('description', {
                            rules: [{
                                required: true, message: '请输入合同描述信息!',
                            }],
                            initialValue: contract.description,
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

const WrappedEditContractForm = Form.create()(EditContractForm);
export default WrappedEditContractForm;