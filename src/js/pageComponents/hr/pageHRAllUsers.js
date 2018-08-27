import React from 'react';
import {Popconfirm, Icon, Spin, Layout, Table, Breadcrumb, Tag, Divider, Button} from 'antd';

const {Header, Content, Footer, Sider} = Layout;
import {userService} from "../../_services/user.service";

import CompnSider from "../../_components/compnSider"
import CompnHeader from "../../_components/compnHeader"
import CompnFooter from "../../_components/compnFooter"

import {childPageConstrants} from "../../_helpers/childPageConstrants"
import WrappedNewUserForm from "../../_components/_compnNewUserForm";
import WrappedEditUserForm from "../../_components/_compnEditUserForm";

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
    const users_table_columns = [
        {
            title: '员工ID',
            dataIndex: 'user.user_id',
            key: 'user_id'
        },
        {
            title: '用户名',
            dataIndex: 'user.user_name',
            key: 'user_name'
        },
        {
            title: '姓名',
            dataIndex: 'employee_info.full_name',
            key: 'full_name'
        },
        {
            title: '性别',
            dataIndex: 'employee_info.gender',
            key: 'gender',
            render: (text, record) => (
                record["employee_info"]["gender"] === 0 ?
                    <div><Icon type="woman" style={{color: 'pink'}}/><span>女</span></div>
                    : <div><Icon type="man" style={{color: 'blue'}}/><span>男</span></div>)
        },
        {
            title: '部门',
            dataIndex: 'employee_info.department_id',
            key: 'department_id'
        },
        {
            title: '职位',
            dataIndex: 'employee_info.title',
            key: 'title'
        },
        {
            title: '入职时间',
            dataIndex: 'employee_info.onboard_at',
            key: 'onboard_at'
        },
        {
            title: '当前状态',
            dataIndex: 'employee_info.position_status',
            key: 'position_status',
            render: (text, record) => (
                positionStatusTag[record["employee_info"]["position_status"]]
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           user_name={record.user["user_name"]}>详细信息</a>
                        </span>)
            },
        }
    ]
    if (props.page) {
        let page = props.page;
        let one_user = props.one_user;

        if (page === childPageConstrants.viewAll) {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.addNewBtnOnclick}>
                        <Icon type="plus"/>
                        <span>添加员工信息</span>
                    </Button>
                    <Button type="primary" style={btnStyle} onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                </div>
                <Spin spinning={props.loading} tip="加载中..." size="large">
                    <Table rowKey="user_name" columns={users_table_columns}
                           dataSource={props.users} size="small"/>
                </Spin>
            </div>);
        } else if (page === childPageConstrants.viewOne) {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backViewOneBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Button type="primary" style={btnStyle} onClick={props.editOneBtnOnclick}>
                        <Icon type="edit"/>
                        <span>更新该员工信息</span>
                    </Button>
                    <Popconfirm title="确认删除？" onConfirm={props.deleteOneBtnOnclick}
                                okText="是" cancelText="否">
                        <Button type="danger" style={btnStyle}>
                            <Icon type="delete"/>
                            <span>删除该员工信息</span>
                        </Button>
                    </Popconfirm>
                </div>
                <div>
                    <div className="col-sm-12 col-md-4">
                        <Divider orientation={"left"}><span>个人信息</span><Icon type="solution"/></Divider>
                        <table className="table table-bordered table-condensed">
                            <tbody>
                            <tr>
                                <td>照片</td>
                                <td><img
                                    src={"/public/assets/products_img/" + one_user.user['user_id'] + "/" + one_user.user['user_id'] + ".jpg"}
                                    style={{width: 100, border: 'solid 2px white'}}/>头像
                                </td>
                            </tr>
                            <tr>
                                <td>姓名</td>
                                <td>{one_user.employee_info["full_name"]}</td>
                            </tr>
                            <tr>
                                <td>性别</td>
                                <td>{one_user.employee_info["gender"] === 0 ?
                                    <div><Icon type="woman" style={{color: 'pink'}}/><span>女</span></div> :
                                    <div><Icon type="man" style={{color: 'blue'}}/><span>男</span></div>}</td>
                            </tr>
                            <tr>
                                <td>生日</td>
                                <td><span
                                    className="glyphicon glyphicon-gift"/> {one_user.employee_info["birthday"]}
                                </td>
                            </tr>
                            <tr>
                                <td>籍贯</td>
                                <td>{one_user.employee_info["hometown"]}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <Divider orientation={"left"}><span>工作信息</span><Icon type="team"/></Divider>
                        <table className="table table-bordered table-condensed">
                            <tbody>
                            <tr>
                                <td>员工 ID</td>
                                <td>{one_user.user["user_id"]}</td>
                            </tr>
                            <tr>
                                <td>部门</td>
                                <td>{one_user.employee_info["department_id"]}</td>
                            </tr>
                            <tr>
                                <td>职位</td>
                                <td>{one_user.employee_info["title"]}</td>
                            </tr>
                            <tr>
                                <td>办公地点</td>
                                <td><Icon type="environment-o"/><span>{one_user.employee_info["office"]}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>入职时间</td>
                                <td>{one_user.employee_info["onboard_at"]}</td>
                            </tr>
                            <tr>
                                <td>状态</td>
                                <td>{positionStatusTag[one_user.employee_info["position_status"]]}</td>
                            </tr>
                            <tr>
                                <td>手机<Icon type="mobile"/></td>
                                <td><span> {one_user.employee_info["phone_number"]}</span></td>
                            </tr>
                            <tr>
                                <td>邮箱<Icon type="mail"/></td>
                                <td>{one_user.employee_info["email"]}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>);

        } else if (page === childPageConstrants.createOne) {
            return (
                <div>
                    <div>
                        <Button type="primary" style={btnStyle} onClick={props.backViewOneBtnOnclick}>
                            <Icon type="left"/>
                            <span>返回</span>
                        </Button>
                    </div>
                    <WrappedNewUserForm/>
                </div>)

        } else if (page === childPageConstrants.editOne) {
            return (
                <div>
                    <div>
                        <Button type="primary" style={btnStyle} onClick={props.backEditOneBtnOnclick}>
                            <Icon type="left"/>
                            <span>返回</span>
                        </Button>
                    </div>
                    <WrappedEditUserForm one_user={props.one_user}/>
                </div>)
        }
    } else {
        return (<div>未知页面</div>);
    }
}
// "user": {
//     "id": 2,
//         "user_id": "102",
//         "user_name": "testname102",
//         "password": "***",
//         "authority": "1",
//         "type": "super",
//         "created_at": "2018-07-04 20:52:17 +0800",
//         "last_update_at": "2018-07-04 20:52:17 +0800",
//         "status": 1
// },
// "user_employee_info": {
//     "id": 2,
//         "user_id": "102",
//         "full_name": "梅西",
//         "gender": 1,
//         "birthday": "1987-01-01",
//         "marital_status": "1",
//         "department_id": "d01",
//         "title": "m3",
//         "office": "suzhou",
//         "onboard_at": "2018-06-15",
//         "position_status": "normal",
//         "email": "meixi@yaodichina.cn",
//         "phone_number": "15800006666",
//         "address": "阿根廷",
//         "hometown": "阿根廷",
//         "created_at": "2018-07-07 18:19:37 +0800",
//         "last_update_at": "2018-07-07 18:19:37 +0800",
//         "status": 1
// }
export default class PageHRAllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: childPageConstrants.viewAll,//view_one/add_new/view_all/edit_user
            breadcrumb: '全部员工信息',
            users: [],
            one_user: {}
        }
        userService.getAll().then(data => {
            this.setState({
                users: data,
                loading: false,
                breadcrumb: '全部员工信息 共 ' + data.length + ' 条'
            });
        });

        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);
        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleBackViewOneBtnOnclick = this.handleBackViewOneBtnOnclick.bind(this);
        this.handleEditOneBtnOnclick = this.handleEditOneBtnOnclick.bind(this);
        this.handleDeleteOneBtnOnclick = this.handleDeleteOneBtnOnclick.bind(this);
        this.handleBackEditOneBtnOnclick = this.handleBackEditOneBtnOnclick.bind(this);
    }

    handleAddNewBtnOnclick() {
        this.setState({page: childPageConstrants.createOne, breadcrumb: '添加员工信息'});
    }

    handleReloadBtnOnclick() {
        this.setState({loading: true});
        userService.getAll().then(data => {
            this.setState({
                page: childPageConstrants.viewAll,
                users: data,
                loading: false,
                breadcrumb: '全部员工信息 共 ' + data.length + ' 条'
            });
        });
    }

    handleCheckDetailOnclick(e) {
        this.setState({loading: true});
        let user_name = e.target.attributes.user_name.value;
        userService.getUserByUsername(user_name).then(data => {
            this.setState({
                page: childPageConstrants.viewOne,
                breadcrumb: '员工详细信息: ' + user_name,
                one_user: data,
                loading: false
            });
        });
    }

    handleBackViewOneBtnOnclick() {
        this.setState({
            page: childPageConstrants.viewAll,
            breadcrumb: '全部员工信息 共 ' + this.state.users.length + ' 条'
        });
    }

    handleEditOneBtnOnclick(){
        this.setState({
            page: childPageConstrants.editOne,
            breadcrumb: '更新员工信息: ' + this.state.one_user.user['user_name']
        });
    }

    handleDeleteOneBtnOnclick(){
        this.setState({loading: true});
        let user_id = this.state.one_user.user["user_id"];
        userService.deleteUser(user_id).then(data => {
            this.handleReloadBtnOnclick();
        });
    }

    handleBackEditOneBtnOnclick(){
        this.setState({loading: true});
        let user_name = this.state.one_user.user["user_name"];
        userService.getUserByUsername(user_name).then(data => {
            this.setState({
                page: childPageConstrants.viewOne,
                breadcrumb: '员工详细信息: ' + user_name,
                one_user: data,
                loading: false
            });
        });
    }


    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['hr_allusers']} defaultOpenKeys={['hr_m']}/>
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
                                users={this.state.users}
                                one_user={this.state.one_user}
                                addNewBtnOnclick={this.handleAddNewBtnOnclick}
                                reloadBtnOnclick={this.handleReloadBtnOnclick}
                                checkDetailOnclick={this.handleCheckDetailOnclick}
                                backViewOneBtnOnclick={this.handleBackViewOneBtnOnclick}
                                editOneBtnOnclick={this.handleEditOneBtnOnclick}
                                deleteOneBtnOnclick={this.handleDeleteOneBtnOnclick}
                                backEditOneBtnOnclick={this.handleBackEditOneBtnOnclick}
                            />
                        </div>
                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        );
    }
}