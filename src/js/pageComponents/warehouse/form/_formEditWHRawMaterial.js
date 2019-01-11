import React from 'react';
import {Form, Input, Select, Popconfirm, Spin, Button,} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

import {serviceWarehouse} from '../../../_services/service.warehouse';

class _formNewWHRawMaterial extends React.Component {
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
        //{
        //     "other": null,
        //     "count": "0.221E3",
        //     "created_at": "2019-01-11 00:23:24 +0800",
        //     "specification": "test_21",
        //     "description": "for test",
        //     "weight": "0.442E3",
        //     "unit_price": "0.251E1",
        //     "created_by": "admin",
        //     "wh_inner_location": "r1w2",
        //     "principal": "admin",
        //     "last_update_by": "admin",
        //     "wh_id": "WH_RM74ECFB1C6EBBB2BC",
        //     "weight_unit": "kg",
        //     "last_update_at": "2019-01-11 00:23:24 +0800",
        //     "name": "rm test 01",
        //     "count_unit": "jian",
        //     "comment": null,
        //     "wh_location": "shengze",
        //     "id": 5,
        //     "wh_id_sub": "WH_RM74ECFB1C6EBBB2BC_2.51_KJ",
        //     "status": 1
        // }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let wh_raw_material = {
                    "id": -1,
                    "other": "",
                    "count": values["count"],
                    "specification": values["specification"],
                    "description": values["description"],
                    "weight": values["weight"],
                    "unit_price": values["unit_price"],
                    "created_by": "",
                    "wh_inner_location": values["wh_inner_location"],
                    "principal": values["principal"],
                    "last_update_by": "",
                    "wh_id": "",
                    "weight_unit": values["weight_unit"],
                    "name": values["name"],
                    "count_unit": values["count_unit"],
                    "comment": values["comment"],
                    "wh_location": values["wh_location"],
                    "wh_id_sub": values["wh_id_sub"],
                    "status": 1,
                };
                serviceWarehouse.addWHRawMaterial(wh_raw_material).then(data => {
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
        const whLocationSelector = getFieldDecorator('wh_location', {
            initialValue: 'shengze',
        })(
            <Select>
                <Option value="shengze">苏州盛泽仓库</Option>
                <Option value="other">其他</Option>
            </Select>
        );
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="原料名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入公司名原料名称!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="规格"
                    >
                        {getFieldDecorator('specification', {
                            rules: [{
                                required: true, message: '请输入规格!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="单价"
                    >
                        {getFieldDecorator('unit_price', {
                            rules: [{
                                required: true, message: '请输入单价!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="库存数"
                    >
                        {getFieldDecorator('count', {
                            rules: [{
                                required: true, message: '请输入库存数!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="库存数单位"
                    >
                        {getFieldDecorator('count_unit', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="重量"
                    >
                        {getFieldDecorator('weight', {
                            rules: [{
                                required: true, message: '请输入重量!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="重量单位"
                    >
                        {getFieldDecorator('weight_unit', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="原料描述"
                    >
                        {getFieldDecorator('description', {
                            rules: [],
                        })(
                            <TextArea rows={2}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="负责人"
                    >
                        {getFieldDecorator('principal', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="原料仓库"
                    >
                        {whLocationSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="仓库内部位置"
                    >
                        {getFieldDecorator('wh_inner_location', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注说明"
                    >
                        {getFieldDecorator('comment', {
                            rules: [{
                                required: false,
                            }],
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

const WrappedFormNewWHRawMaterial = Form.create()(_formNewWHRawMaterial);
export default WrappedFormNewWHRawMaterial;