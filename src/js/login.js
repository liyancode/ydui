import React from 'react';
import WrappedHorizontalLoginForm from './HorizontalLoginForm'
import {userService} from "./_services/user.service"
import {Layout,Form, Icon, Input, Button} from 'antd'

const {Header, Content, Footer} = Layout;

export default class Login extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            user_name: "",
            user_pwd: ""
        };
    };

    render() {
        return (
            <Layout className="layout login-layout" style={{height: '100%',background:'transparent'}}>
                <Content style={{padding: '0 50px'}} className='login-wrapper-container'>
                    <h3 style={{color: '#fff'}}>React Demo project ></h3>
                    <WrappedHorizontalLoginForm />
                </Content>
            </Layout>
        )
    }

}