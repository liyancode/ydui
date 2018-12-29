import React from 'react';
import {Upload, Icon, Spin, Layout, Table, Breadcrumb, Tag, Divider, Button, Popconfirm} from 'antd';

const {Content,} = Layout;
import {userService} from "../../_services/user.service";
import {serviceUser} from "../../_services/service.user";


import CompnSider from "../../_components/compnSider"
import CompnHeader from "../../_components/compnHeader"
import CompnFooter from "../../_components/compnFooter"

import {childPageConstrants} from "../../_helpers/childPageConstrants"

import WrappedFormNewUser from "./form/_formNewUser";
import WrappedFormEditUser from "./form/_formEditUser";

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
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id > b.id ? 1 : -1,
        },
        {
            title: '用户名',
            dataIndex: 'user_name',
            key: 'user_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.user_name > b.user_name ? 1 : -1,
        },
        {
            title: '姓名',
            dataIndex: 'full_name',
            key: 'full_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.full_name > b.full_name ? 1 : -1,
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.gender > b.gender ? 1 : -1,
            render: (text, record) => (
                record["gender"] === 0 ?
                    <div><Icon type="woman" style={{color: 'pink'}}/><span>女</span></div>
                    : <div><Icon type="man" style={{color: 'blue'}}/><span>男</span></div>)
        },
        {
            title: '部门',
            dataIndex: 'department_name',
            key: 'department_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.department_name > b.department_name ? 1 : -1,
        },
        {
            title: '职位',
            dataIndex: 'title',
            key: 'title',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.title > b.title ? 1 : -1,
        },
        {
            title: '入职时间',
            dataIndex: 'onboard_date',
            key: 'onboard_date',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.onboard_date > b.onboard_date ? 1 : -1,
        },
        {
            title: '当前状态',
            dataIndex: 'employee_status',
            key: 'employee_status',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.employee_status > b.employee_status ? 1 : -1,
            render: (text, record) => (
                positionStatusTag[record["employee_status"]]
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           user_name={record["user_name"]}>详细信息</a>
                        </span>)
            },
        }
    ]
    if (props.page) {
        let page = props.page;

        if (page === childPageConstrants.viewAll) {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.addNewBtnOnclick}>
                        <Icon type="user-add"/>
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
            let user_employee_info = props.one_user.user_employee_info;
            let user_private_info = props.one_user.user_private_info;
            let user_department = props.one_user.user_department;

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
                            <Icon type="user-delete"/>
                            <span>删除该员工信息</span>
                        </Button>
                    </Popconfirm>
                </div>
                <Spin spinning={props.loading} tip="加载中..." size="large">
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
                                    src={"/public/assets/products_img/" + user_private_info['id'] + "/" + user_private_info['id'] + ".jpg"}
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

        } else if (page === childPageConstrants.createOne) {
            return (
                <div>
                    <div>
                        <Button type="primary" style={btnStyle} onClick={props.backViewOneBtnOnclick}>
                            <Icon type="left"/>
                            <span>返回</span>
                        </Button>
                    </div>
                    <WrappedFormNewUser all_user_departments={props.all_user_departments}/>
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
                    <WrappedFormEditUser one_user={props.one_user} all_user_departments={props.all_user_departments}/>
                </div>)
        }
    } else {
        return (<div>未知页面</div>);
    }
}
export default class PageUserAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: childPageConstrants.viewAll,//view_one/add_new/view_all/edit_user
            breadcrumb: '全部员工信息',
            users: [],
            one_user: {},
            user_account:{},
            user_employee_info: {},
            user_private_info: {},
            user_department: {},
            all_user_departments: []
        }
        serviceUser.getUserListForAdmin().then(data => {
            this.setState({
                users: data,
                loading: false,
                breadcrumb: '全部员工信息 共 ' + data.length + ' 条'
            });
        });
        serviceUser.getAllUserDepartment().then(data => {
            this.setState({
                all_user_departments: data,
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
        serviceUser.getUserListForAdmin().then(data => {
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

        serviceUser.getUserFullInfoByUsername(user_name).then(data=>{
            this.setState({
                page: childPageConstrants.viewOne,
                breadcrumb: '员工详细信息: ' + user_name,
                user_account:data.user_account,
                user_employee_info: data.user_employee_info,
                user_private_info: data.user_private_info,
                user_department: data.user_department,
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

    handleEditOneBtnOnclick() {
        this.setState({
            page: childPageConstrants.editOne,
            breadcrumb: '更新员工信息: ' + this.state.user_account['user_name']
        });
    }

    handleDeleteOneBtnOnclick() {
        this.setState({loading: true});
        let user_name = this.state.user_account["user_name"];
        serviceUser.deleteUserAccountByUsername(user_name).then(data=>{
            this.handleReloadBtnOnclick();
        })
    }

    handleBackEditOneBtnOnclick() {
        this.setState({loading: true});
        let user_name = this.state.user_account["user_name"];
        serviceUser.getUserFullInfoByUsername(user_name).then(data=>{
            this.setState({
                page: childPageConstrants.viewOne,
                breadcrumb: '员工详细信息: ' + user_name,
                user_account:data.user_account,
                user_employee_info: data.user_employee_info,
                user_private_info: data.user_private_info,
                user_department: data.user_department,
                loading: false
            });
        });
    }


    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['hr_allusers']} defaultOpenKeys={['hr_m', 'hr_m_admin']}/>
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
                                users={this.state.users}
                                one_user={{
                                    user_account: this.state.user_account,
                                    user_employee_info: this.state.user_employee_info,
                                    user_private_info: this.state.user_private_info,
                                    user_department: this.state.user_department,
                                }}
                                all_user_departments={this.state.all_user_departments}
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
                    {/*<CompnFooter color={'#333'}/>*/}
                </Layout>
            </Layout>
        );
    }
}