import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

import {customerService} from '../_services/customer.service';

class EditContactForm extends React.Component {
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
                let contactData = {
                    "id": this.props.contact.id,
                    "customer_id": this.props.customer["customer_id"],
                    "added_by_user_name": null,
                    "fullname": values["contact_fullname"],
                    "gender": values["contact_gender"],
                    "title": values["contact_title"],
                    "email": values["contact_email"],
                    "phone_number": values["contact_phone_number"],
                    "other_contact_info": null,
                    "comment": null,
                    "status": 1
                };
                customerService.updateContact(contactData).then(data => {
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

        const contactGenderRadio = getFieldDecorator('contact_gender', {
            initialValue: this.props.contact.gender,
        })(
            <RadioGroup>
                <Radio value={0}>女士</Radio>
                <Radio value={1}>先生</Radio>
            </RadioGroup>
        );
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <Divider>{this.props.customer.company_name}</Divider>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                    >
                        {getFieldDecorator('contact_fullname', {
                            rules: [{
                                required: true, message: '请输入联系人姓名!',
                            }],
                            initialValue:this.props.contact.fullname
                        })(
                            <Input addonAfter={contactGenderRadio}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职务"
                    >
                        {getFieldDecorator('contact_title', {
                            rules: [],
                            initialValue:this.props.contact.title
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="电话"
                    >
                        {getFieldDecorator('contact_phone_number', {
                            rules: [],
                            initialValue:this.props.contact.phone_number
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('contact_email', {
                            rules: [{
                                required: true, message: '请输入联系人邮箱!',
                            }],
                            initialValue:this.props.contact.email
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

const WrappedEditContactForm = Form.create()(EditContactForm);
export default WrappedEditContactForm;