import React from 'react';
import {Form, Input, Select, Popconfirm, Spin, Button,DatePicker} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

import {serviceWarehouse} from '../../../_services/service.warehouse';
import {invenrotyService} from "../../../_services/inventory.service";

class _formNewWHInventoryBatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            autoCompleteResult: [],
            inOutCn:"出库"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.inOrOutSelectorChange = this.inOrOutSelectorChange.bind(this);
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
        //             dest_obj.wh_inventory_batch_id = meta_hash["wh_inventory_batch_id"]
        //             dest_obj.wh_inventory_id = meta_hash["wh_inventory_id"]
        //             dest_obj.wh_inventory_type = meta_hash["wh_inventory_type"]
        //             dest_obj.wh_location = meta_hash["wh_location"]
        //             dest_obj.wh_inner_location = meta_hash["wh_inner_location"]
        //             dest_obj.production_order_id = meta_hash["production_order_id"]
        //             dest_obj.principal = meta_hash["principal"]
        //             dest_obj.batch_number = meta_hash["batch_number"]
        //             dest_obj.batch_at = meta_hash["batch_at"]
        //             dest_obj.batch_type = meta_hash["batch_type"]
        //             dest_obj.batch_from = meta_hash["batch_from"]
        //             dest_obj.batch_to = meta_hash["batch_to"]
        //             dest_obj.batch_status = meta_hash["batch_status"]
        //             dest_obj.count = meta_hash["count"]
        //             dest_obj.count_unit = meta_hash["count_unit"]
        //             dest_obj.unit_price = meta_hash["unit_price"]
        //             dest_obj.auxiliary_count = meta_hash["auxiliary_count"]
        //             dest_obj.auxiliary_count_unit = meta_hash["auxiliary_count_unit"]
        //             dest_obj.other = meta_hash["other"]
        //
        //             dest_obj
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });
                let wh_inventory=this.props.wh_inventory;
                let wh_inventory_batch = {
                    "id": -1,
                    "created_by": "",
                    "last_update_by": "",
                    "status": 1,
                    "comment": values["comment"],
                    "wh_inventory_batch_id": "",
                    "wh_inventory_id":wh_inventory.wh_inventory_id,
                    "wh_inventory_type": wh_inventory.wh_inventory_type,
                    "wh_location": values["wh_location"],
                    "wh_inner_location": values["wh_inner_location"],
                    "production_order_id": values["production_order_id"],
                    "principal": values["principal"],
                    "batch_number": values["batch_number"],
                    "batch_at": values["batch_at"],
                    "batch_type": values["batch_type"],
                    "batch_from": values["batch_from"],
                    "batch_to": values["batch_to"],
                    "batch_status": values["batch_status"],
                    "count": values["count"],
                    "count_unit": wh_inventory.count_unit,
                    "unit_price":values["unit_price"],
                    "auxiliary_count": values["auxiliary_count"],
                    "auxiliary_count_unit": values["auxiliary_count_unit"],
                    "other": values["other"],
                };

                serviceWarehouse.addWHInventoryBatch(wh_inventory_batch).then(data => {
                    this.setState({loading: false});
                });
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    inOrOutSelectorChange(e){
        if(e==="inbound"){
            this.setState({inOutCn: "入库"});
        }else{
            this.setState({inOutCn: "出库"});
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const one_wh_inventory=this.props.wh_inventory
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
                <Option value="yuanliao">原料</Option>
                <Option value="peibu">胚布</Option>
                <Option value="chengpin">成品</Option>
                <Option value="zhuji">助剂</Option>
            </Select>
        );

        const countUnitSelector = getFieldDecorator('count_unit', {
            initialValue: 'meter',
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
            initialValue: 'meter',
        })(
            <Select>
                <Option value="meter">米</Option>
                <Option value="sqrm">平方米</Option>
                <Option value="kg">千克</Option>
                <Option value="jian">件</Option>
                <Option value="tiao">条</Option>
            </Select>
        );

        const inOrOutSelector = getFieldDecorator('batch_type', {
            initialValue: 'outbound',
        })(
            <Select onChange={this.inOrOutSelectorChange}>
                <Option value="outbound">出库记录</Option>
                <Option value="inbound">入库记录</Option>
            </Select>
        );

        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label={"入库/出库？"}
                    >
                        {inOrOutSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="库存编号"
                    >
                        {one_wh_inventory.wh_inventory_id}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                    >
                        {one_wh_inventory.name}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="规格"
                    >
                        {one_wh_inventory.specification}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.state.inOutCn+"批次编号(与单据一致)"}
                    >
                        {getFieldDecorator('batch_number', {
                            rules: [{
                                required: true, message: '请输入'+this.state.inOutCn+'批次编号(与单据一致)!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.state.inOutCn+"外部回执单批次编号"}
                    >
                        {getFieldDecorator('other', {
                            rules: [{
                                required: true, message: '请输入'+this.state.inOutCn+'外部回执单批次编号!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.state.inOutCn==="入库"?"采购公司":"收货公司"}
                    >
                        {getFieldDecorator('batch_from', {
                            rules: [{
                                required: true, message: '请输入'+this.state.inOutCn+'去向!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.state.inOutCn}
                    >
                        {getFieldDecorator('batch_to', {
                            rules: [{
                                required: true, message: '请输入'+this.state.inOutCn+'来源!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.state.inOutCn+"时间"}
                    >
                        {getFieldDecorator('batch_at', {
                            rules: [{
                                required: true, message: '请输入'+this.state.inOutCn+"时间！",
                            }],
                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.state.inOutCn+"单位"}
                    >
                        {countUnitSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.state.inOutCn+"数"}
                    >
                        {getFieldDecorator('count', {
                            rules: [{
                                required: true, message: '请输入'+this.state.inOutCn+'数!',
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
                        label={this.state.inOutCn+"辅助计数"}
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
                        label={this.state.inOutCn+"辅助计数单位"}
                    >
                        {auxiliaryCountUnitSelector}
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
                        label="仓库"
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

const WrappedFormFormNewWHInventoryBatch = Form.create()(_formNewWHInventoryBatch);
export default WrappedFormFormNewWHInventoryBatch;