import React from 'react';
import {Card, Icon, Tag, Layout, Dropdown, Menu, Badge, Avatar, Button} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import {userService} from "../_services/user.service";

import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

export default class PageHR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            user_employee_info: {}
        }
        userService.getUserByUsername(localStorage.getItem('user_name')).then(data => {
            this.setState({user: data["user"], user_employee_info: data["employee_info"]});
            localStorage.setItem('user_authority',data['user']['authority'])
        });
    }

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['1']}/>
                <Layout>
                    <CompnHeader/>
                    <Content style={{margin: '12px 12px 0'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <h4 className="page-header">
                                <Icon type="user"/>
                                <span>员工档案</span>
                            </h4>
                            <div className="col-sm-12 col-md-6">
                                <Card title="工作信息">
                                    <dl className="dl-horizontal">
                                        <dt>姓名</dt>
                                        <dd>{this.state.user_employee_info["full_name"]}</dd>
                                        <dt>员工 ID</dt>
                                        <dd>{this.state.user["user_id"]}</dd>
                                        <dt>部门</dt>
                                        <dd>{this.state.user_employee_info["department_id"]}</dd>
                                        <dt>职位</dt>
                                        <dd>{this.state.user_employee_info["title"]}</dd>
                                        <dt>办公地点</dt>
                                        <dd><Icon type="environment-o"/><span>{this.state.user_employee_info["office"]}</span>
                                        </dd>
                                        <dt>入职时间</dt>
                                        <dd>{this.state.user_employee_info["onboard_at"]}</dd>
                                        <dt>状态</dt>
                                        <dd><Tag
                                            color="#87d068">{this.state.user_employee_info["position_status"]}</Tag>
                                        </dd>
                                        <dt><Icon type="mobile" /></dt>
                                        <dd><span> {this.state.user_employee_info["phone_number"]}</span>
                                        </dd>
                                        <dt><Icon type="mail"/></dt>
                                        <dd><span> {this.state.user_employee_info["email"]}</span>
                                        </dd>
                                    </dl>
                                </Card>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <Card title="个人信息">
                                    <dl className="dl-horizontal">
                                        <dt>性别</dt>
                                        <dd>{this.state.user_employee_info["gender"]}</dd>
                                        <dt>生日</dt>
                                        <dd><span
                                            className="glyphicon glyphicon-gift"/> {this.state.user_employee_info["birthday"]}
                                        </dd>
                                        <dt>婚姻状况</dt>
                                        <dd>{this.state.user_employee_info["marital_status"]}</dd>
                                        <dt>籍贯</dt>
                                        <dd>{this.state.user_employee_info["hometown"]}</dd>
                                    </dl>
                                </Card>
                            </div>
                        </div>
                    </Content>
                    <CompnFooter/>
                </Layout>
            </Layout>
        );
    }
}