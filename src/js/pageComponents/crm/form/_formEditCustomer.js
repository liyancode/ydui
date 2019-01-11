import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, message, Spin, Popconfirm, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

import {serviceCustomer} from '../../../_services/service.customer';

class _formEditCustomer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
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
        //     #             "id": 1,
//     #             "customer_id": "201",
//     #             "added_by_user_name": "testname104",
//     #             "company_name": "测试公司名称001",
//     #             "company_location": "china",
//     #             "company_tax_number": null,
//     #             "company_legal_person": null,
//     #             "company_main_business": null,
//     #             "company_tel_number": null,
//     #             "company_email": null,
//     #             "company_description": null,
//     #             "comment": null,
//     #             "status": 1

        // contact
        // {
        //     "id": 3,
        //     "customer_id": "203",
        //     "added_by_user_name": "tu02",
        //     "fullname": "tufn02",
        //     "gender": 1,
        //     "title": null,
        //     "email": null,
        //     "phone_number": null,
        //     "other_contact_info": null,
        //     "comment": null,
        //     "created_at": "2018-07-08 22:53:53 +0800",
        //     "last_update_at": "2018-07-08 22:53:53 +0800",
        //     "status": 1
        // },

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let customerData = {
                    "id": -1,
                    "customer_id": this.props.customer["customer_id"],
                    "added_by_user_name": "",
                    "company_name": this.props.customer["company_name"],
                    "company_location": values["company_location"],
                    "company_tax_number": values["company_tax_number"],
                    "company_legal_person": values["company_legal_person"],
                    "company_main_business": values["company_main_business"],
                    "company_tel_number": values["company_tel_number"],
                    "company_email": values["company_email"],
                    "company_description": values["company_description"],
                    "comment": values["comment"],
                    "status": 1,
                };
                serviceCustomer.updateCustomer(customerData).then(data => {
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

    handleNo() {

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
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        let customer = this.props.customer;
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="公司名称"
                    >
                        {getFieldDecorator('company_name', {
                            rules: [{
                                required: true, message: '请输入公司名!',
                            }],
                            initialValue: customer['company_name']
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司所在地"
                    >
                        {getFieldDecorator('company_location', {
                            rules: [{
                                required: true, message: '请输入公司所在地!',
                            }],
                            initialValue: customer['company_location']
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
              公司税号&nbsp;
                                <Tooltip title="中国的公司有统一税号">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        )}
                    >
                        {getFieldDecorator('company_tax_number', {
                            rules: [],
                            initialValue: customer['company_tax_number']
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司法人"
                    >
                        {getFieldDecorator('company_legal_person', {
                            rules: [],
                            initialValue: customer['company_legal_person']
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司主营业务"
                    >
                        {getFieldDecorator('company_main_business', {
                            rules: [],
                            initialValue: customer['company_main_business']
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司网站"
                    >
                        {getFieldDecorator('company_description', {
                            rules: [],
                            initialValue: customer['company_description']
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="网址"
                            >
                                <Input/>
                            </AutoComplete>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司电话"
                    >
                        {getFieldDecorator('company_tel_number', {
                            rules: [],
                            initialValue: customer['company_tel_number']
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司邮箱"
                    >
                        {getFieldDecorator('company_email', {
                            rules: [],
                            initialValue: customer['company_email']
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司备注"
                    >
                        {getFieldDecorator('comment', {
                            rules: [],
                            initialValue: customer['comment']
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认提交更新？" onConfirm={this.handleSubmit}
                                    onCancel={this.handleNo} okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交更新</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const WrappedFormEditCustomer = Form.create()(_formEditCustomer);
export default WrappedFormEditCustomer;