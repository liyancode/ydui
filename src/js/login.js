import React from 'react';
import WrappedHorizontalLoginForm from './HorizontalLoginForm'

import WrappedNormalLoginForm from './loginForm'

import {userService} from "./_services/user.service"
import {Layout,Form, Icon, Input, Button} from 'antd'

const {Header, Content, Footer} = Layout;

import CompnFooter from './_components/compnFooter'

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
                    <div id={'logo_div'} style={{fontSize:21}}>
                        <img src={require("../assets/img/yd_logo.png")} style={{height:40}}/>
                        <span style={{color: '#fff'}}>耀迪·管理助手</span>
                    </div>
                    {/*<WrappedHorizontalLoginForm />*/}
                    <WrappedNormalLoginForm />
                </Content>
                <CompnFooter color={'#f5f5f5'}/>
            </Layout>
        )
    }

}