import React from 'react';
import {Form, Input, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

import {orderService} from '../../_services/order.service';
const { TextArea } = Input

class NewAskPriceForm extends React.Component {
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
        // # {
        //     #     "id": 1,
        //         #     "ask_price_id": "470001",
        //         #     "added_by_user_name": "testname105",
        //         #     "customer_id": "214",
        //         #     "product_ids": "20001,20002,20003",
        //         #     "description": "20001定价100，20003定价120",
        //         #     "approve_status": "waiting",
        //         #     "approve_by_user_name": null,
        //         #     "comment": null,
        //         #     "created_at": "2018-07-21 19:50:56 +0800",
        //         #     "last_update_at": "2018-07-21 19:50:56 +0800",
        //         #     "status": 1
        //     # }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let ask_price = {
                    "id": -1,
                    "ask_price_id": "",
                    "added_by_user_name": "",
                    "customer_id": values["customer_id"],
                    "product_ids": values["product_ids"],
                    "description": values["description"],
                    "approve_by_user_name": values["approve_by_user_name"],
                    "approve_status": "waiting",
                    "comment": values["comment"],
                    "status": 1,
                };
                orderService.addNewAskPrice(ask_price).then(data => {
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
        const my_customers=this.props.my_customers;

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

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
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
                        label="客户名称"
                    >
                        {customerSelect}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="产品"
                    >
                        {getFieldDecorator('product_ids', {
                            rules: [{
                                required: true, message: '请选择产品!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="询价说明"
                    >
                        {getFieldDecorator('description', {
                            rules: [],
                        })(
                            <TextArea rows={4}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="审批人"
                    >
                        {getFieldDecorator('approve_by_user_name', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >
                        {getFieldDecorator('comment', {
                            rules: [],
                        })(
                            <Input/>
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

const WrappedNewAskPriceForm = Form.create()(NewAskPriceForm);
export default WrappedNewAskPriceForm;