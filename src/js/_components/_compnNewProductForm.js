import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;

import {productService} from '../_services/product.service';

class NewProductForm extends React.Component {
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

        //     "products": [
//     {
//         "id": 1,
//         "product_id": "20001",
//         "added_by_user_name": "testname05",
//         "name": "芳纶ribstop 220G作训服面料",
//         "product_type_id": "7001",
//         "measurement_unit": "米",
//         "specification": "ribstop 220G",
//         "raw_material_ids": "1",
//         "features": null,
//         "use_for": "训练服服装",
//         "description": null,
//         "comment": null,
//         "created_at": "2018-07-15 17:31:02 +0800",
//         "last_update_at": "2018-07-15 17:31:02 +0800",
//         "status": 1
//     },
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let product = {
                    "id": -1,
                    "added_by_user_name": "",
                    "name": values["name"],
                    "product_type_id": values["product_type_id"],
                    "measurement_unit": values["measurement_unit"],
                    "specification": values["specification"],
                    "raw_material_ids": values["raw_material_ids"],
                    "features": values["features"],
                    "use_for": values["use_for"],
                    "description": values["description"],
                    "comment": values["comment"],
                    "status": 1,
                };
                productService.addProduct(product).then(data => {
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
                        label="产品名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入产品名称!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="产品类型"
                    >
                        {getFieldDecorator('product_type_id', {
                            rules: [{
                                required: true, message: '请选择产品类型!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
              产品计量单位&nbsp;
                                <Tooltip title="例如:米，Kg">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        )}
                    >
                        {getFieldDecorator('measurement_unit', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="产品型号规格"
                    >
                        {getFieldDecorator('specification', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="主要原料"
                    >
                        {getFieldDecorator('raw_material_ids', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="产品特性"
                    >
                        {getFieldDecorator('features', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="产品用途"
                    >
                        {getFieldDecorator('use_for', {
                            rules: [],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="产品详细描述"
                    >
                        {getFieldDecorator('description', {
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

const WrappedNewProductForm = Form.create()(NewProductForm);
export default WrappedNewProductForm;