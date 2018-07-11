import React from 'react';
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class NewCustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleConfirmBlur=this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword=this.compareToFirstPassword.bind(this);
        this.validateToNextPassword=this.validateToNextPassword.bind(this);
        this.handleWebsiteChange=this.handleWebsiteChange.bind(this);
    }

    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword (rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword (rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleWebsiteChange(value)  {
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

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        // # {
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
// #         }
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '800px'}}>
                <FormItem
                    {...formItemLayout}
                    label="公司名称"
                >
                    {getFieldDecorator('companyName', {
                        rules: [{
                            required: true, message: '请输入公司名!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="公司所在地"
                >
                    {getFieldDecorator('companyLocation', {
                        rules: [{
                            required: true, message: '请输入公司所在地!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              公司税号&nbsp;
                            <Tooltip title="中国的公司有统一税号">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('companyTaxNumber', {
                        rules: [],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="公司法人"
                >
                    {getFieldDecorator('companyLegalPerson', {
                        rules: [],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="公司主营业务"
                >
                    {getFieldDecorator('companyMainBusiness', {
                        rules: [],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="公司网站"
                >
                    {getFieldDecorator('companyDescription', {
                        rules: [],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="网址"
                        >
                            <Input/>
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="公司电话"
                >
                    {getFieldDecorator('companyTelNumber', {
                        rules: [],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="公司邮箱"
                >
                    {getFieldDecorator('companyEmail', {
                        rules: [],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="公司备注"
                >
                    {getFieldDecorator('companyComment', {
                        rules: [],
                    })(
                        <Input/>
                    )}
                </FormItem>
                {/*<FormItem*/}
                    {/*{...formItemLayout}*/}
                    {/*label="Phone Number"*/}
                {/*>*/}
                    {/*{getFieldDecorator('phone', {*/}
                        {/*rules: [{required: true, message: 'Please input your phone number!'}],*/}
                    {/*})(*/}
                        {/*<Input addonBefore={prefixSelector} style={{width: '100%'}}/>*/}
                    {/*)}*/}
                {/*</FormItem>*/}

                {/*<FormItem*/}
                    {/*{...formItemLayout}*/}
                    {/*label="Captcha"*/}
                    {/*extra="We must make sure that your are a human."*/}
                {/*>*/}
                    {/*<Row gutter={8}>*/}
                        {/*<Col span={12}>*/}
                            {/*{getFieldDecorator('captcha', {*/}
                                {/*rules: [{required: true, message: 'Please input the captcha you got!'}],*/}
                            {/*})(*/}
                                {/*<Input/>*/}
                            {/*)}*/}
                        {/*</Col>*/}
                        {/*<Col span={12}>*/}
                            {/*<Button>Get captcha</Button>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</FormItem>*/}
                {/*<FormItem {...tailFormItemLayout}>*/}
                    {/*{getFieldDecorator('agreement', {*/}
                        {/*valuePropName: 'checked',*/}
                    {/*})(*/}
                        {/*<Checkbox>I have read the <a href="">agreement</a></Checkbox>*/}
                    {/*)}*/}
                {/*</FormItem>*/}
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNewCustomerForm = Form.create()(NewCustomerForm);
export default WrappedNewCustomerForm;