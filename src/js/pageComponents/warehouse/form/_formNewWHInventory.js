import React from 'react';
import {Form, Input, Select, Popconfirm, Spin, Button,} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

import {serviceWarehouse} from '../../../_services/service.warehouse';
import {_WH_Config} from '../_wh_config';

class _formNewWHInventory extends React.Component {
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
        //#--- common property
        //             dest_obj.id = meta_hash["id"]
        //             dest_obj.created_by = meta_hash["created_by"]
        //             dest_obj.last_update_by = meta_hash["last_update_by"]
        //             dest_obj.status = meta_hash["status"]
        //             dest_obj.comment = meta_hash["comment"]
        //             #--- customized property
        //             dest_obj.wh_inventory_id = meta_hash["wh_inventory_id"]
        //             dest_obj.wh_inventory_type = meta_hash["wh_inventory_type"]
        //             dest_obj.wh_location = meta_hash["wh_location"]
        //             dest_obj.wh_inner_location = meta_hash["wh_inner_location"]
        //             dest_obj.principal = meta_hash["principal"]
        //             dest_obj.name = meta_hash["name"]
        //             dest_obj.specification = meta_hash["specification"]
        //             dest_obj.description = meta_hash["description"]
        //             dest_obj.count = meta_hash["count"]
        //             dest_obj.count_unit = meta_hash["count_unit"]
        //             dest_obj.unit_price = meta_hash["unit_price"]
        //             dest_obj.auxiliary_count = meta_hash["auxiliary_count"]
        //             dest_obj.auxiliary_count_unit = meta_hash["auxiliary_count_unit"]
        //             dest_obj.other = meta_hash["other"]
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let wh_inventory = {
                    "id": -1,
                    "created_by": "",
                    "last_update_by": "",
                    "status": 1,
                    "comment": values["comment"],
                    "wh_inventory_id": "",
                    "wh_inventory_type": values["wh_inventory_type"],
                    "wh_location": values["wh_location"],
                    "wh_inner_location": values["wh_inner_location"],
                    "principal": values["principal"],
                    "name": values["name"],
                    "specification": values["specification"],
                    "description": values["description"],
                    "count": values["count"],
                    "count_unit": values["count_unit"],
                    "unit_price": values["unit_price"],
                    "auxiliary_count": values["auxiliary_count"],
                    "auxiliary_count_unit": values["auxiliary_count_unit"],
                    "other": values["other"],
                };
                serviceWarehouse.addWHInventory(wh_inventory).then(data => {
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
            initialValue: 'yaodi',
        })(
            <Select>
                <Option value="yaodi">耀迪仓库</Option>
                <Option value="other">其他仓库</Option>
            </Select>
        );

        const typeSelector = getFieldDecorator('wh_inventory_type', {
            initialValue: 'yuanliao',
        })(
            <Select>
                {_WH_Config._inventory_type_options()}
            </Select>
        );

        const countUnitSelector = getFieldDecorator('count_unit', {
            initialValue: 'meter',
        })(
            <Select>
                {_WH_Config._measure_unit_options()}
            </Select>
        );

        const auxiliaryCountUnitSelector = getFieldDecorator('auxiliary_count_unit', {
            initialValue: 'meter',
        })(
            <Select>
                {_WH_Config._measure_unit_options()}
            </Select>
        );
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="类别"
                    >
                        {typeSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
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
                        label="单价(元)"
                    >
                        {getFieldDecorator('unit_price', {
                            rules: [{
                                required: false, message: '请输入单价!',
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
                        label="库存单位"
                    >
                        {countUnitSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="辅助计数"
                    >
                        {getFieldDecorator('auxiliary_count', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="辅助计数单位"
                    >
                        {auxiliaryCountUnitSelector}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="详细描述"
                    >
                        {getFieldDecorator('description', {
                            rules: [],
                        })(
                            <TextArea rows={3}/>
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

const WrappedFormFormNewWHInventory = Form.create()(_formNewWHInventory);
export default WrappedFormFormNewWHInventory;