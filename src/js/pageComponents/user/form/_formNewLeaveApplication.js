import React from 'react';
import {Form, Input, Popconfirm, Spin, Button, DatePicker} from 'antd';

const {TextArea} = Input;
const FormItem = Form.Item;

import {serviceUser} from '../../../_services/service.user';
const { RangePicker } = DatePicker;
function printDate(date) {
    //var temp = new Date();
    var temp = date;
    var dateStr = padStr(temp.getFullYear()) +
        padStr(1 + temp.getMonth()) +
        padStr(temp.getDate()) +
        padStr(temp.getHours()) +
        padStr(temp.getMinutes()) +
        padStr(temp.getSeconds());
    return dateStr;
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

class _formNewLeaveApplication extends React.Component {
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
        // {
        //     "user_name": "fortest004",
        //     "approve_status": "wait",
        //     "created_at": "2018-12-16 18:04:20 +0800",
        //     "description": "2018-12-17 è¯·å\u0081\u0087ä¸\u0080å¤©",
        //     "type": "leave",
        //     "created_by": "admin",
        //     "application_id": "ap1812160001",
        //     "approve_by": "admin",
        //     "last_update_by": "admin",
        //     "last_update_at": "2018-12-16 18:04:20 +0800",
        //     "comment": null,
        //     "id": 1,
        //     "status": 1
        // }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let user_application = {
                    "id": -1,
                    "created_by": "",
                    "last_update_by": "",
                    "status": 1,
                    "comment": "",
                    "type": "leave",
                    "application_id": "",
                    "approve_by": "",
                    "user_name": "",
                    "approve_status": "wait",
                    "description": "["+printDate(values["timeRange"][0]._d)+","+printDate(values["timeRange"][1]._d)+"]"+values["description"],
                };
                serviceUser.addUserApplication(user_application).then(data=>{
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


        return (
            <Spin spinning={this.state.loading}>
                <h4>请假申请</h4>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="请假时间"
                    >
                        {getFieldDecorator('timeRange', {
                            rules: [
                                {
                                    required: true, message: '请选择请假时间时间!',
                                }
                            ],
                        })(
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['开始时间', '结束时间']}
                            />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="请假原因描述"
                    >
                        {getFieldDecorator('description', {
                            rules: [{
                                required: true, message: '请填写请假描述!',
                            }],
                        })(
                            <TextArea rows={6}/>
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

const WrappedFormNewLeaveApplication = Form.create()(_formNewLeaveApplication);

export default WrappedFormNewLeaveApplication;