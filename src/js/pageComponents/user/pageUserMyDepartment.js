import React from 'react';
import {Icon, Divider, Tag, Spin} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {serviceUser} from "../../_services/service.user"
import WrappedNewInventoryForm from "../../_components/warehouse/_compNewInventoryForm"
import WrappedEditInventoryForm from "../../_components/warehouse/_compEditInventoryForm"

export default class PageUserMyDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbKeyWord: "",
            loading: true,
            items: [],
            one_item: {user_employee_info: {}, user_department: {}, user_private_info: {}},
            inventory_types: [],
        }
        serviceUser.getUserListByDepartmentId('d001').then(data => {
            this.setState({
                loading: false,
                items: data
            })
        });

        this.func_update_items = this.func_update_items.bind(this);
        this.func_update_one_item = this.func_update_one_item.bind(this);
        this.func_delete_one_item = this.func_delete_one_item.bind(this);
        this.func_sub_title = this.func_sub_title.bind(this);
        this.func_item_table_columns = this.func_item_table_columns.bind(this);
        this.func_content_view_one = this.func_content_view_one.bind(this);
        this.func_content_create_one = this.func_content_create_one.bind(this);
        this.func_content_edit_one = this.func_content_edit_one.bind(this);
        this.func_content_header = this.func_content_header.bind(this);
    };

    func_update_items() {
        this.setState({loading: true});
        serviceUser.getUserListByDepartmentId('d001').then(data => {
            this.setState({
                loading: false,
                user_list: data
            })
        });
    }

    func_update_one_item(user_name) {
        this.setState({loading: true});
        let one_item = this.state.one_item;
        serviceUser.getUserEmployeeInfoByUsername(user_name).then(data => {
            if (data) {
                one_item.user_employee_info = data
                this.setState({
                    loading: false,
                    one_item: one_item
                });
                console.log('func_update_one_item 10-1');
                if (data["department_id"] !== '') {
                    serviceUser.getUserDepartmentByDepartmentId(data["department_id"]).then(data_d => {
                        if (data_d) {
                            one_item.user_department = data_d;
                            this.setState({
                                one_item: one_item
                            });
                            console.log('func_update_one_item 10-2');
                        }
                    });
                }
            }
        });
        serviceUser.getUserPrivateInfoByUsername(user_name).then(data => {
            if (data) {
                one_item.user_private_info = data;
                this.setState({
                    one_item: one_item
                });
            }
        });
    }

    func_delete_one_item() {
        // this.setState({loading: true});
        // invenrotyService.deleteOneInvenroty(this.state.one_item.inventory_id).then(data=>{
        //     this.setState({
        //         loading: false,
        //     })
        //     this.func_update_items();
        // });
    }

    func_sub_title() {
        return (
            <h4 style={{display: "inline"}}>
                <Icon type="database"/>
                <span>员工信息</span>
            </h4>
        )
    }

    // {
    //     "full_name": "Jack",
//     "employee_id": 4,
//     "user_name": "fortest004",
//     "title": "sinor se fdsafa",
//     "level": 1,
//     "report_to": "test001",
//     "employee_status": "normal",
//     "annual_leave_left": 7
// }
    func_item_table_columns(props) {
        const positionStatusTag = {
            'normal': <Tag color="#108ee9">正常在职</Tag>,
            'probation': <Tag color="#2db7f5">试用期内</Tag>,
            'dismiss': <Tag color="#f50">已离职</Tag>,
            'vacation': <Tag color="#87d068">休假中</Tag>,
        }
        return [
            {
                title: '员工号',
                dataIndex: 'employee_id',
                key: 'employee_id',
                fixed: 'left',
                width:80,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.employee_id > b.employee_id ? 1 : -1,
            },
            {
                title: '姓名',
                dataIndex: 'full_name',
                key: 'full_name',
                fixed: 'left',
                width:80,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.full_name > b.full_name ? 1 : -1,
            }, {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.user_name > b.user_name ? 1 : -1,
            }, {
                title: '职位',
                dataIndex: 'title',
                key: 'title',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.title > b.title ? 1 : -1,
            }, {
                title: '汇报对象',
                dataIndex: 'report_to',
                key: 'report_to',
                sorter: (a, b) => a.report_to > b.report_to ? 1 : -1,
            }, {
                title: '当前状态',
                dataIndex: 'employee_status',
                key: 'employee_status',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.employee_status > b.employee_status ? 1 : -1,
                render: (text, record) => {
                    return positionStatusTag[record.employee_status]
                }
            }, {
                title: '剩余年假',
                dataIndex: 'annual_leave_left',
                key: 'annual_leave_left',
                sorter: (a, b) => a.annual_leave_left > b.annual_leave_left ? 1 : -1,
                render: (text, record) => {
                    return record.annual_leave_left + ' 天'
                }
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width:80,
                render: (text, record) => {
                    return (<span>
            <a href="javascript:;" onClick={props.checkDetailOnclick}
               id={record.user_name}>查看详情</a>
            </span>)
                },
            }]
    }

    func_content_view_one() {
        let one_item = this.state.one_item;
        let user_employee_info = one_item.user_employee_info;
        let user_department = one_item.user_department;
        let user_private_info = one_item.user_private_info;

        console.log('func_content_view_one 1');

        const positionStatusTag = {
            'normal': <Tag color="#108ee9">正常在职</Tag>,
            'probation': <Tag color="#2db7f5">试用期内</Tag>,
            'dismiss': <Tag color="#f50">已离职</Tag>,
            'vacation': <Tag color="#87d068">休假中</Tag>,
        }
        return (<div>
            <div className="col-sm-12 col-md-12">
                <Icon type="bulb" style={{color: "#00ac47"}}/>
                <span>如需修改信息，请联系系统管理员。</span>
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
                        <td>手机<Icon type="mobile"/></td>
                        <td><span> {user_private_info["phone_number"]}</span></td>
                    </tr>
                    <tr>
                        <td>邮箱<Icon type="mail"/></td>
                        <td>{user_private_info["email"]}</td>
                    </tr>
                    </tbody>
                </table>
                <span>状态：{positionStatusTag[user_employee_info['employee_status']]}</span>
                <span>年假剩余：{user_employee_info["annual_leave_left"]}天</span>
            </div>
            <div className="col-sm-12 col-md-4">

                <Divider orientation={"left"}><span>个人信息</span><Icon type="solution"/></Divider>
                <table className="table table-bordered table-condensed">
                    <tbody>
                    <tr>
                        <td>照片</td>
                        <td><img
                            src={"/public/assets/products_img/" + user_employee_info['user_name'] + "/" + user_employee_info['user_name'] + ".jpg"}
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
                    {/*<tr>*/}
                        {/*<td>身份证号</td>*/}
                        {/*<td>{user_private_info["personal_id"]}</td>*/}
                    {/*</tr>*/}
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
            </div>
        </div>);
    }

    func_content_create_one() {
        return (
            <WrappedNewInventoryForm
                inventory_types={this.state.inventory_types}
            />
        );
    }

    func_content_edit_one() {
        return (
            <WrappedEditInventoryForm
                inventory_types={this.state.inventory_types}
                one_inventory={this.state.one_item}
            />
        );
    }

    func_content_header() {

        return <div></div>
    }

    render() {
        return (
            <CompnPageContent
                loading={this.state.loading}
                breadcrumbKeyWord={this.state.breadcrumbKeyWord}
                items={this.state.items}
                one_item={this.state.one_item}
                update_items={this.func_update_items}
                update_one_item={this.func_update_one_item}
                update_one_item_by_key={"user_name"}
                delete_one_item={this.func_delete_one_item}
                _compnViewOne={this.func_content_view_one}
                _compnCreateOne={this.func_content_create_one}
                _compnEditOne={this.func_content_edit_one}
                item_table_columns={this.func_item_table_columns}
                subTitle={this.func_sub_title}
                siderDefaultMenuKey={['hr_my_department']}
                siderDefaultOpenKeys={['hr_m']}
                contentHeader={this.func_content_header}
                _btnTag_Add={false}
                _btnTag_Delete={false}
                _btnTag_Update={false}
                _tableColumnRowKey={"employee_id"}
                _tableScrollX={{ x: 1300 }}
            />
        )
    }
}