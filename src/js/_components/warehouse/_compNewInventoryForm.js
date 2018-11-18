import React from 'react';
import {Form, Input, Tooltip, Icon, Radio, Select, Popconfirm, Spin, Divider, Button, AutoComplete} from 'antd';
const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;

import {invenrotyService} from '../../_services/inventory.service';

class NewInventoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            confirmDirty: false,
            inventory_types:props['inventory_types'],
            autoCompleteResult: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //{"id":2,
        // "inventory_id":"177002",
        // "inventory_type_id":"rm_001",
        // "inventory_name":"????002",
        // "inventory_count":10,
        // "inventory_unit":"?",
        // "description":null,
        // "added_by_user_name":"admin",
        // "updated_by_user_name":"admin",
        // "created_at":"2018-11-12 22:17:17 +0800",
        // "last_update_at":"2018-11-12 22:17:17 +0800","status":1}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let inventory = {
                    "id": -1,
                    "inventory_id": "",
                    "inventory_type_id": values["inventory_type_id"],
                    "inventory_name": values["inventory_name"],
                    "inventory_count": values["inventory_count"],
                    "inventory_unit": values["inventory_unit"],
                    "description": values["description"],
                    "added_by_user_name":"",
                    "updated_by_user_name":"",
                    "status": 1,
                };
                invenrotyService.addOneInvenroty(inventory).then(data => {
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

        // {
        //     "inventory_types": [
        //     {
        //         "inventory_type_parent": "rm",
        //         "inventory_type_name": "å\u008E\u009Fæ\u009D\u0090æ\u0096\u009901",
        //         "added_by_user_name": "admin",
        //         "last_update_at": "2018-11-12 21:56:21 +0800",
        //         "inventory_type_id": "rm_001",
        //         "description": null,
        //         "created_at": "2018-11-12 21:56:21 +0800",
        //         "id": 1,
        //         "status": 1
        //     },
        //     {
        //         "inventory_type_parent": "rm",
        //         "inventory_type_name": "å\u008E\u009Fæ\u009D\u0090æ\u0096\u009902",
        //         "added_by_user_name": "admin",
        //         "last_update_at": "2018-11-13 10:55:45 +0800",
        //         "inventory_type_id": "rm_002",
        //         "description": null,
        //         "created_at": "2018-11-13 10:55:45 +0800",
        //         "id": 2,
        //         "status": 1
        //     }
        // ]
        // }

        //---- inventory_types selector -----
        let inventory_types=this.state.inventory_types;

        let type_select_options = [];
        for (let i = 0; i < inventory_types.length; i++) {
            let type_i = inventory_types[i]
            type_select_options.push(
                <Option value={type_i["inventory_type_id"]} key={i}>{type_i["inventory_type_name"]}</Option>
            );
        }
        const inventoryTypeSelector = getFieldDecorator('inventory_type_id', {
            initialValue: inventory_types[0]["inventory_type_id"],
        })(
            <Select>
                {type_select_options}
            </Select>
        );

        //{"id":2,
        // "inventory_id":"177002",
        // "inventory_type_id":"rm_001",
        // "inventory_name":"????002",
        // "inventory_count":10,
        // "inventory_unit":"?",
        // "description":null,
        // "added_by_user_name":"admin",
        // "updated_by_user_name":"admin",
        // "created_at":"2018-11-12 22:17:17 +0800",
        // "last_update_at":"2018-11-12 22:17:17 +0800","status":1}
        return (
            <Spin spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="原料类型"
                    >
                        {inventoryTypeSelector}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="原料名称"
                    >
                        {getFieldDecorator('inventory_name', {
                            rules: [{
                                required: true, message: '请输入原料名称!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="原料库存数量"
                    >
                        {getFieldDecorator('inventory_count', {
                            rules: [{
                                required: true, message: '请输入原料库存数量!',defaultValue:0,
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
              原料计量单位&nbsp;
                                <Tooltip title="例如:米，Kg">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        )}
                    >
                        {getFieldDecorator('inventory_unit', {
                            rules: [{
                                required: true, message: '请输入原料计量单位!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="描述信息"
                    >
                        {getFieldDecorator('description', {
                            rules: [],
                        })(
                            <TextArea rows={4}/>
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

const WrappedNewInventoryForm = Form.create()(NewInventoryForm);

export default WrappedNewInventoryForm;