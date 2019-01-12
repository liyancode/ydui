import React from 'react';
import {Form, Input, Select, Popconfirm, Spin, Button,} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

import {serviceWarehouse} from '../../../_services/service.warehouse';
import {invenrotyService} from "../../../_services/inventory.service";

class _formEditWHInventory extends React.Component {
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
                let one_item=this.props.one_item
                let wh_inventory = {
                    "id": one_item.id,
                    "created_by": one_item.created_by,
                    "last_update_by":one_item.last_update_by,
                    "status": one_item.status,
                    "comment": values["comment"],
                    "wh_inventory_id": one_item.wh_inventory_id,
                    "wh_inventory_type": one_item.wh_inventory_type,
                    "wh_location": values["wh_location"],
                    "wh_inner_location": values["wh_inner_location"],
                    "principal": values["principal"],
                    "name": one_item.name,
                    "specification": one_item.specification,
                    "description": values["description"],
                    "count": values["count"],
                    "count_unit": values["count_unit"],
                    "unit_price": values["unit_price"],
                    "auxiliary_count": values["auxiliary_count"],
                    "auxiliary_count_unit": values["auxiliary_count_unit"],
                    "other": values["other"],
                };
                serviceWarehouse.updateWHInventory(wh_inventory).then(data => {
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
        const one_item=this.props.one_item

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
            initialValue: one_item.wh_location,
        })(
            <Select>
                <Option value="yaodi">耀迪仓库</Option>
                <Option value="other">其他仓库</Option>
            </Select>
        );

        const typeSelector = getFieldDecorator('wh_inventory_type', {
            initialValue: one_item.wh_inventory_type,
        })(
            <Select disabled={true}>
                <Option value="yuanliao">原料</Option>
                <Option value="peibu">胚布</Option>
                <Option value="chengpin">成品</Option>
                <Option value="zhuji">助剂</Option>
            </Select>
        );

        const countUnitSelector = getFieldDecorator('count_unit', {
            initialValue: one_item.count_unit,
        })(
            <Select>
                <Option value="meter">米</Option>
                <Option value="sqrm">平方米</Option>
                <Option value="kg">千克</Option>
                <Option value="jian">件</Option>
                <Option value="tiao">条</Option>
            </Select>
        );

        const auxiliaryCountUnitSelector = getFieldDecorator('auxiliary_count_unit', {
            initialValue: one_item.auxiliary_count_unit,
        })(
            <Select>
                <Option value="meter">米</Option>
                <Option value="sqrm">平方米</Option>
                <Option value="kg">千克</Option>
                <Option value="jian">件</Option>
                <Option value="tiao">条</Option>
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
                            initialValue: one_item.name,
                            rules: [{
                                required: true, message: '请输入公司名原料名称!',
                            }],
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="规格"
                    >
                        {getFieldDecorator('specification', {
                            initialValue: one_item.specification,
                            rules: [{
                                required: true, message: '请输入规格!',
                            }],
                        })(
                            <Input disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="单价(元)"
                    >
                        {getFieldDecorator('unit_price', {
                            initialValue: new Number(one_item.unit_price).toString(),
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
                            initialValue: new Number(one_item.count).toString(),
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
                            initialValue: new Number(one_item.auxiliary_count).toString(),
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
                            initialValue: one_item.description,
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
                            initialValue: one_item.principal,
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
                            initialValue: one_item.wh_inner_location,
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
                            initialValue: one_item.comment,
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

const WrappedFormFormEditWHInventory = Form.create()(_formEditWHInventory);
export default WrappedFormFormEditWHInventory;