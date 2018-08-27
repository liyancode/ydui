import React from 'react';
import {Card, Icon, Tag, Layout, Divider, Breadcrumb, Spin, Avatar, Button} from 'antd';

const {Header, Content, Footer, Sider} = Layout;
import {userService} from "../../_services/user.service";

import CompnSider from "../../_components/compnSider"
import CompnHeader from "../../_components/compnHeader"
import CompnFooter from "../../_components/compnFooter"

import {childPageConstrants} from "../../_helpers/childPageConstrants"
import WrappedResetPasswordForm from "../../_components/_compnResetPasswordForm";

const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }

    const positionStatusTag = {
        'normal': <Tag color="#108ee9">正常在职</Tag>,
        'probation': <Tag color="#2db7f5">试用期内</Tag>,
        'dismiss': <Tag color="#f50">已离职</Tag>,
        'vacation': <Tag color="#87d068">休假中</Tag>,
    }

    if (props.page) {
        let page = props.page;
        let user = props.user;
        let user_employee_info = props.user_employee_info;
        if (page === childPageConstrants.editOne) {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backViewOneBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedResetPasswordForm one_user={props.user}/>
            </div>);
        } else if (page === childPageConstrants.viewOne) {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.updatePasswordBtnOnclick}>
                        <Icon type="unlock"/>
                        <span>修改密码</span>
                    </Button>
                </div>
                <Spin spinning={props.loading} tip="加载中..." size="large">
                    <div className="col-sm-12 col-md-4">

                        <Divider orientation={"left"}><span>个人信息</span><Icon type="solution"/></Divider>
                        <table className="table table-bordered table-condensed">
                            <tbody>
                            <tr>
                                <td>照片</td>
                                <td><img
                                    src={"/public/assets/products_img/" + user['user_id'] + "/" + user['user_id'] + ".jpg"}
                                    style={{width: 100, border: 'solid 2px white'}}/>头像
                                </td>
                            </tr>
                            <tr>
                                <td>姓名</td>
                                <td>{user_employee_info["full_name"]}</td>
                            </tr>
                            <tr>
                                <td>性别</td>
                                <td>{user_employee_info["gender"] === 0 ?
                                    <div><Icon type="woman" style={{color: 'pink'}}/><span>女</span></div> :
                                    <div><Icon type="man" style={{color: 'blue'}}/><span>男</span></div>}</td>
                            </tr>
                            <tr>
                                <td>生日</td>
                                <td><span
                                    className="glyphicon glyphicon-gift"/> {user_employee_info["birthday"]}</td>
                            </tr>
                            <tr>
                                <td>籍贯</td>
                                <td>{user_employee_info["hometown"]}</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="col-sm-12 col-md-4">
                        <Divider orientation={"left"}><span>工作信息</span><Icon type="team"/></Divider>
                        <table className="table table-bordered table-condensed">
                            <tbody>
                            {/*<tr>*/}
                            {/*<td>姓名</td>*/}
                            {/*<td>{this.state.user_employee_info["full_name"]}</td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td>员工 ID</td>
                                <td>{user["user_id"]}</td>
                            </tr>
                            <tr>
                                <td>部门</td>
                                <td>{user_employee_info["department_id"]}</td>
                            </tr>
                            <tr>
                                <td>职位</td>
                                <td>{user_employee_info["title"]}</td>
                            </tr>
                            <tr>
                                <td>办公地点</td>
                                <td><Icon type="environment-o"/><span>{user_employee_info["office"]}</span></td>
                            </tr>
                            <tr>
                                <td>入职时间</td>
                                <td>{user_employee_info["onboard_at"]}</td>
                            </tr>
                            <tr>
                                <td>状态</td>
                                <td>{positionStatusTag[user_employee_info['position_status']]}</td>
                            </tr>
                            <tr>
                                <td>手机<Icon type="mobile"/></td>
                                <td><span> {user_employee_info["phone_number"]}</span></td>
                            </tr>
                            <tr>
                                <td>邮箱<Icon type="mail"/></td>
                                <td>{user_employee_info["email"]}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Spin>
            </div>);
        }
    } else {
        return (<div>未知页面</div>);
    }

}
export default class PageHRMyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: childPageConstrants.viewOne,
            breadcrumb: '我的信息',
            user: {},
            user_employee_info: {}
        }
        userService.getUserByUsername(localStorage.getItem('user_name')).then(data => {
            this.setState({
                loading: false,
                user: data["user"],
                user_employee_info: data["employee_info"]
            });
            localStorage.setItem('user_authority', data['user']['authority'])
        });
        this.handleUpdatePasswordBtnOnclick = this.handleUpdatePasswordBtnOnclick.bind(this);
        this.handleBackViewOneBtnOnclick = this.handleBackViewOneBtnOnclick.bind(this);
    }

    handleUpdatePasswordBtnOnclick() {
        this.setState({
            page: childPageConstrants.editOne
        })
    }

    handleBackViewOneBtnOnclick() {
        this.setState({
            page: childPageConstrants.viewOne
        })
    }

    render() {
        const btnStyle = {
            marginRight: '8px',
            marginBottom: '12px'
        }
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['hr_myinfo']} defaultOpenKeys={['hr_m']}/>
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
                            <PageContent
                                loading={this.state.loading}
                                page={this.state.page}
                                user={this.state.user}
                                user_employee_info={this.state.user_employee_info}
                                updatePasswordBtnOnclick={this.handleUpdatePasswordBtnOnclick}
                                backViewOneBtnOnclick={this.handleBackViewOneBtnOnclick}
                            />
                        </div>
                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        );
    }
}