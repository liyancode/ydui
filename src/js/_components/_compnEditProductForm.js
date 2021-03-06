import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
import {productService} from '../_services/product.service';

class EditProductForm extends React.Component {
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
                let productMeta = this.props.one_product['product'];
                let product = {
                    "id": productMeta.id,
                    "product_id":productMeta.product_id,
                    "added_by_user_name": productMeta.added_by_user_name,
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
                productService.updateProduct(product).then(data => {
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
        let product = this.props.one_product['product'];
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} className="col-sm-12 col-md-6">
                    <FormItem
                        {...formItemLayout}
                        label="产品名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入产品名称!',
                            }],
                            initialValue: product['name']
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="英文名"
                    >
                        {getFieldDecorator('description', {
                            rules: [],
                            initialValue: product['description']
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
                            initialValue: product['product_type_id']
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
                            initialValue: product['measurement_unit']
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
                            initialValue: product['specification']
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
                            initialValue: product['raw_material_ids']
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
                            initialValue: product['features']
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
                            initialValue: product['use_for']
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
                            initialValue: product['comment']
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

const WrappedEditProductForm = Form.create()(EditProductForm);
export default WrappedEditProductForm;