import React from 'react';
import {Card, Icon, Tag, Layout, Divider, Breadcrumb, Spin, Upload, Button} from 'antd';

const {Header, Content, Footer, Sider} = Layout;
// import {userService} from "../../_services/user.service";

import CompnSider from "../../_components/compnSider"
import CompnHeader from "../../_components/compnHeader"
import CompnFooter from "../../_components/compnFooter"

import {childPageConstrants} from "../../_helpers/childPageConstrants"
import WrappedFormResetPassword from "./form/_formResetPassword";
import {serviceUser} from "../../_services/service.user";

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
        let user_private_info = props.user_private_info;
        let user_department = props.user_department;
        if (page === childPageConstrants.editOne) {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backViewOneBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormResetPassword one_user={props.user}/>
            </div>);
        } else if (page === childPageConstrants.viewOne) {
            const rsm_props = {
                action: '//jsonplaceholder.typicode.com/posts/',
                onChange({file, fileList}) {
                    if (file.status !== 'uploading') {
                        console.log(file, fileList);
                    }
                },
                defaultFileList: [{
                    uid: '1',
                    name: '我的简历.pdf',
                    status: 'done',
                    response: 'Server Error 500', // custom error message to show
                    url: 'http://file3.data.weipan.cn/62950499/5032ff94579270f1e8de192db7412b51140ef382?ip=1543585425,180.164.238.38&ssig=v%2Fwub0FPy0&Expires=1543586025&KID=sae,l30zoo1wmz&fn=%E4%BC%98%E7%A7%80%E7%AE%80%E5%8E%86%E6%A8%A1%E6%9D%BF.pdf&se_ip_debug=180.164.238.38&from=1221134',
                }],
            };

            return (<div>
                <Spin spinning={props.loading} tip="加载中..." size="large">
                    <div className="col-sm-12 col-md-12">
                        <Button type="danger" style={btnStyle} onClick={props.updatePasswordBtnOnclick}>
                            <Icon type="unlock"/>
                            <span>修改密码</span>
                        </Button>
                        <Icon type="bulb" style={{color: "#00ac47"}}/>
                        <span>修改其他信息，请找管理员。</span>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <Divider orientation={"left"}><span>工作信息</span><Icon type="team"/></Divider>
                        <table className="table table-bordered table-condensed">
                            <tbody>
                            <tr>
                                <td>员工 ID</td>
                                <td>{user_employee_info["id"]}</td>
                            </tr>
                            <tr>
                                <td>部门</td>
                                <td>{user_department["department_name"]}</td>
                            </tr>
                            <tr>
                                <td>职位</td>
                                <td>{user_employee_info["title"]}</td>
                            </tr>
                            <tr>
                                <td>汇报对象</td>
                                <td>{user_employee_info["report_to"]}</td>
                            </tr>
                            <tr>
                                <td>办公地点</td>
                                <td><Icon type="environment-o"/><span>苏州盛泽</span></td>
                            </tr>
                            <tr>
                                <td>入职时间</td>
                                <td>{user_employee_info["onboard_date"]}</td>
                            </tr>
                            <tr>
                                <td>状态</td>
                                <td>{positionStatusTag[user_employee_info['employee_status']]}</td>
                            </tr>
                            <tr>
                                <td>手机<Icon type="mobile"/></td>
                                <td><span> {user_private_info["phone_number"]}</span></td>
                            </tr>
                            <tr>
                                <td>邮箱<Icon type="mail"/></td>
                                <td>{user_private_info["email"]}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
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
                                <td>{user_private_info["full_name"]}</td>
                            </tr>
                            <tr>
                                <td>性别</td>
                                <td>{user_private_info["gender"] === 0 ?
                                    <div><Icon type="woman" style={{color: 'pink'}}/><span>女</span></div> :
                                    <div><Icon type="man" style={{color: 'blue'}}/><span>男</span></div>}</td>
                            </tr>
                            <tr>
                                <td>生日</td>
                                <td><span
                                    className="glyphicon glyphicon-gift"/> {user_private_info["birthday"]}</td>
                            </tr>
                            <tr>
                                <td>籍贯</td>
                                <td>{user_private_info["hometown"]}</td>
                            </tr>
                            <tr>
                                <td>身份证号</td>
                                <td>{user_private_info["personal_id"]}</td>
                            </tr>
                            <tr>
                                <td>微信</td>
                                <td>{user_private_info["wechat"]}</td>
                            </tr>
                            <tr>
                                <td>QQ</td>
                                <td>{user_private_info["qq"]}</td>
                            </tr>
                            <tr>
                                <td>兴趣爱好</td>
                                <td>{user_private_info["hobbies"]}</td>
                            </tr>
                            </tbody>
                        </table>
                        <Upload {...rsm_props}>
                            <Button>
                                <Icon type="upload"/> 上传简历
                            </Button>
                        </Upload>
                    </div>

                </Spin>
            </div>);
        }
    } else {
        return (<div>未知页面</div>);
    }

}
export default class PageUserMyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: childPageConstrants.viewOne,
            breadcrumb: '我的信息',
            user: {},
            user_employee_info: {},
            user_private_info: {},
            user_department: {},
        }
        const user_name = localStorage.getItem('user_name');
        serviceUser.getUserEmployeeInfoByUsername(user_name).then(data => {
            if (data) {
                this.setState({
                    loading: false,
                    user_employee_info: data,
                    user:{user_name:user_name}
                });
                if (data["department_id"] !== '') {
                    serviceUser.getUserDepartmentByDepartmentId(data["department_id"]).then(data_d => {
                        if (data_d) {
                            this.setState({
                                user_department: data_d
                            });
                        }
                    });
                }
            }
        });
        serviceUser.getUserPrivateInfoByUsername(user_name).then(data => {
            if (data) {
                this.setState({
                    user_private_info: data
                });
            }
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
                <CompnSider defaultMenuKey={['hr_myinfo']} defaultOpenKeys={['hr_m','hr_m_my']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="team"/>
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
                                user_private_info={this.state.user_private_info}
                                user_department={this.state.user_department}
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