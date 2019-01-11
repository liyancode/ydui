import React from 'react';
import {Form, Input, Select, Popconfirm, Spin, Button,DatePicker} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

import {serviceWarehouse} from '../../../_services/service.warehouse';

class _formNewWHRawMaterialHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            autoCompleteResult: [],
            inOrOut:"outbound",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.inOrOutSelectorChange = this.inOrOutSelectorChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //#--- customized property
        //             dest_obj.wh_id = meta_hash["wh_id"]
        //             dest_obj.wh_id_sub = meta_hash["wh_id_sub"]
        //             dest_obj.record_type = meta_hash["record_type"]
        //             dest_obj.update_what = meta_hash["update_what"]
        //             dest_obj.order_contract_id = meta_hash["order_contract_id"]
        //             dest_obj.inbound_count = meta_hash["inbound_count"]
        //             dest_obj.inbound_weight = meta_hash["inbound_weight"]
        //             dest_obj.inbound_unit_price = meta_hash["inbound_unit_price"]
        //             dest_obj.inbound_total_price = meta_hash["inbound_total_price"]
        //             dest_obj.inbound_from = meta_hash["inbound_from"]
        //             dest_obj.inbound_principal = meta_hash["inbound_principal"]
        //             dest_obj.inbound_at = meta_hash["inbound_at"]
        //             dest_obj.outbound_count = meta_hash["outbound_count"]
        //             dest_obj.outbound_weight = meta_hash["outbound_weight"]
        //             dest_obj.outbound_unit_price = meta_hash["outbound_unit_price"]
        //             dest_obj.outbound_total_price = meta_hash["outbound_total_price"]
        //             dest_obj.outbound_to = meta_hash["outbound_to"]
        //             dest_obj.outbound_principal = meta_hash["outbound_principal"]
        //             dest_obj.outbound_at = meta_hash["outbound_at"]
        //             dest_obj.other = meta_hash["other"]
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let tmp=values["wh_id_sub"].split('_')
                let wh_raw_material_hist = {
                    "id": -1,
                    "wh_id": tmp[0]+"_"+tmp[1],
                    "wh_id_sub": values["wh_id_sub"],
                    "record_type": values["record_type"],
                    "inbound_count": values["count"],
                    "inbound_weight": values["weight"],
                    "inbound_unit_price": values["unit_price"],
                    "inbound_total_price": values["total_price"],
                    "inbound_from": values["to_or_from"],
                    "inbound_principal": values["principal"],
                    "inbound_at": values["at"],
                    "outbound_count": values["count"],
                    "outbound_weight": values["weight"],
                    "outbound_unit_price": values["unit_price"],
                    "outbound_total_price": values["total_price"],
                    "outbound_to": values["to_or_from"],
                    "outbound_principal": values["principal"],
                    "outbound_at": values["at"],
                    "created_by": "",
                    "last_update_by": "",
                    "other": "",
                    "comment": values["comment"],
                    "status": 1,
                };
                serviceWarehouse.addWHRawMaterialHistory(wh_raw_material_hist).then(data => {
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
        let inOrOut=e;
        this.setState({inOrOut:inOrOut})
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
        const inOrOut=this.props.inOrOut;//inbound/outbound
        const prefixCN=inOrOut==="outbound"?"出库":"入库"

        const inOrOutSelector = getFieldDecorator('record_type', {
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
                        label="记录类型"
                    >
                        {inOrOutSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="原料ID"
                    >
                        {getFieldDecorator('wh_id_sub', {
                            rules: [{
                                required: true, message: '请输入原料id',
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
                        label="数量"
                    >
                        {getFieldDecorator('count', {
                            rules: [{
                                required: true, message: '请输入数量!',
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
                        label="总价"
                    >
                        {getFieldDecorator('total_price', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={this.state.inOrOut==="inbound"?"来源":"去向"}
                    >
                        {getFieldDecorator('to_or_from', {
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
                        label={this.state.inOrOut==="inbound"?"入库时间":"出库时间"}
                    >
                        {getFieldDecorator('at', {
                            rules: [{
                                required: true,message: '请输入时间!',
                            }],
                        })(
                            <DatePicker/>
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

const WrappedFormNewWHRawMaterialHistory = Form.create()(_formNewWHRawMaterialHistory);
export default WrappedFormNewWHRawMaterialHistory;