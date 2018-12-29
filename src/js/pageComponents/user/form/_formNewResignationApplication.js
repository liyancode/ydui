import React from 'react';
import {Form, Input, Popconfirm, Spin, Button, DatePicker} from 'antd';

const FormItem = Form.Item;

import {serviceUser} from '../../../_services/service.user';

class _formNewResignationApplication extends React.Component {
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
                    "type": "resignation",
                    "application_id": "",
                    "approve_by": "",
                    "user_name": "",
                    "approve_status": "wait",
                    "description": "resignation",
                };
                serviceUser.addUserApplication(user_application).then(data => {
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
                {/*<h4>辞职申请</h4>*/}
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>

                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('description', {
                            rules: [{
                                required: false, message: '请填写详细描述!',
                            }],
                        })(
                            <div >
                                <h4 style={{textAlign:"center"}}>辞职申请书</h4>

                                <p>江苏耀迪新材料有限公司（苏州致豪新材料科技有限公司）：</p>

                                <p>本人系江苏耀迪新材料有限公司（苏州致豪新材料科技有限公司）的员工，因本人另有发展需要，特向贵公司提出辞职申请！
                                    特此申请！</p>
                            </div>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Popconfirm title="确认提交？" onConfirm={this.handleSubmit}
                                    okText="是" cancelText="否">
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Popconfirm>
                    </FormItem>
                </Form>
                <p>提交之后，请打印纸质离职申请书，签字并找公司负责人盖章！</p>
            </Spin>
        );
    }
}

const WrappedFormNewResignationApplication = Form.create()(_formNewResignationApplication);

export default WrappedFormNewResignationApplication;