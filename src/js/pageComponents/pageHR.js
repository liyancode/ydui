import React from 'react';
import {Card, Icon, Tag, Layout, Divider, Breadcrumb, Badge, Avatar, Button} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import {userService} from "../_services/user.service";

import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

export default class PageHR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: '我的信息',
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
                            <div>
                            <div className="col-sm-12 col-md-4">
                                <Divider orientation={"left"}><span>个人信息</span><Icon type="solution" /></Divider>
                                <table className="table table-bordered table-condensed">
                                    <tbody>
                                    <tr>
                                        <td>照片</td>
                                        <td><img src={require("../../img/avt_ym.jpeg")} style={{ width: 100 ,border:'solid 2px white'}}/></td>
                                    </tr>
                                    <tr>
                                        <td>姓名</td>
                                        <td>{this.state.user_employee_info["full_name"]}</td>
                                    </tr>
                                    <tr>
                                        <td>性别</td>
                                        <td>{this.state.user_employee_info["gender"]===0?<div><Icon type="woman" style={{color:'pink'}}/><span>女</span></div>:<div><Icon type="man" style={{color:'blue'}} /><span>男</span></div>}</td>
                                    </tr>
                                    <tr>
                                        <td>生日</td>
                                        <td><span
                                            className="glyphicon glyphicon-gift"/> {this.state.user_employee_info["birthday"]}</td>
                                    </tr>
                                    {/*<tr>*/}
                                        {/*<td>婚姻状况</td>*/}
                                        {/*<td>{this.state.user_employee_info["marital_status"]}</td>*/}
                                    {/*</tr>*/}
                                    <tr>
                                        <td>籍贯</td>
                                        <td>{this.state.user_employee_info["hometown"]}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <Divider orientation={"left"}><span>工作信息</span><Icon type="team" /></Divider>
                                <table className="table table-bordered table-condensed">
                                    <tbody>
                                    {/*<tr>*/}
                                        {/*<td>姓名</td>*/}
                                        {/*<td>{this.state.user_employee_info["full_name"]}</td>*/}
                                    {/*</tr>*/}
                                    <tr>
                                        <td>员工 ID</td>
                                        <td>{this.state.user["user_id"]}</td>
                                    </tr>
                                    <tr>
                                        <td>部门</td>
                                        <td>{this.state.user_employee_info["department_id"]}</td>
                                    </tr>
                                    <tr>
                                        <td>职位</td>
                                        <td>{this.state.user_employee_info["title"]}</td>
                                    </tr>
                                    <tr>
                                        <td>办公地点</td>
                                        <td><Icon type="environment-o"/><span>{this.state.user_employee_info["office"]}</span></td>
                                    </tr>
                                    <tr>
                                        <td>入职时间</td>
                                        <td>{this.state.user_employee_info["onboard_at"]}</td>
                                    </tr>
                                    <tr>
                                        <td>状态</td>
                                        <td><Tag
                                            color="#87d068">{this.state.user_employee_info["position_status"]}</Tag></td>
                                    </tr>
                                    <tr>
                                        <td>手机<Icon type="mobile" /></td>
                                        <td><span> {this.state.user_employee_info["phone_number"]}</span></td>
                                    </tr>
                                    <tr>
                                        <td>邮箱<Icon type="mail"/></td>
                                        <td>{this.state.user_employee_info["email"]}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        );
    }
}