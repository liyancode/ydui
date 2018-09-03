import React from 'react';
import {Card, Icon, Tag, Layout, Divider, Breadcrumb, Badge, Avatar, Button} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import {userService} from "../_services/user.service";

import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

const PageContent = (props) => {
    if (props.page) {

    }else{
        return (<div>未知页面</div>);
    }
}
export default class PageHRAllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page:'view_all',//view_one/add_new/view_all/edit_user
            breadcrumb: '全部员工信息',
            users: [],
            one_user:{}
        }
        userService.getUserByUsername(localStorage.getItem('user_name')).then(data => {
            this.setState({user: data["user"], user_employee_info: data["employee_info"]});
            localStorage.setItem('user_authority',data['user']['authority'])
        });
        userService.getAll().then(data => {
            this.setState({
                users: data,
                loading:false
            });
        });
    }


    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['1']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="user"/>
                                    <span>员工档案</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent/>
                        </div>
                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        );
    }
}