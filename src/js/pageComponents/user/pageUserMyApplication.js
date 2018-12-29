import React from 'react';
import {Icon, Divider, Tag, Button} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {serviceUser} from "../../_services/service.user"
import {childPageConstrants} from "../../_helpers/childPageConstrants"
import WrappedFormNewLeaveApplication from "./form/_formNewLeaveApplication"
import WrappedFormNewOfficeSuppliesApplication from "./form/_formNewOfficeSuppliesApplication"
import WrappedFormNewResignationApplication from "./form/_formNewResignationApplication"

export default class PageUserMyApplication extends React.Component {
    constructor(props) {
        super(props);
        const user_name = localStorage.getItem('user_name');
        this.state = {
            breadcrumbKeyWord: "",
            page: childPageConstrants.viewAll,
            breadcrumb: '所有申请',
            loading: true,
            items: [],
            one_item: {},
            user_name: user_name,
            create_one_form: '',
            edit_one_form: ''
        }

        serviceUser.getUserApplicationListByUsername(user_name).then(data => {
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
        this.create_btn_click = this.create_btn_click.bind(this);
        this._pageUpdate = this._pageUpdate.bind(this);
        this._breadcrumbUpdate = this._breadcrumbUpdate.bind(this);
    };

    func_update_items() {
        this.setState({loading: true});
        serviceUser.getUserApplicationListByUsername(this.state.user_name).then(data => {
            this.setState({
                loading: false,
                items: data
            })
        });
    }

    func_update_one_item(application_id) {
        this.setState({loading: true});
        serviceUser.getUserApplicationByApplicationId(application_id).then(data => {
            this.setState({
                loading: false,
                one_item: data
            })
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
        const app_types = {
            leave: '请假申请',
            office_supplies: '办公用品申请',
            resignation: '离职申请'
        }
        return [
            {
                title: '申请编号',
                dataIndex: 'application_id',
                key: 'application_id',
                fixed: 'left',
                width: 100,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.application_id > b.application_id ? 1 : -1,
            }, {
                title: '申请类别',
                dataIndex: 'type',
                key: 'type',
                fixed: 'left',
                width: 100,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.type > b.type ? 1 : -1,
                render: (text, record) => {
                    return app_types[record.type]
                }
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.created_at > b.created_at ? 1 : -1,
            }, {
                title: '审批人',
                dataIndex: 'approve_by',
                key: 'approve_by',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.approve_by > b.approve_by ? 1 : -1,
            }, {
                title: '审批状态',
                dataIndex: 'approve_status',
                key: 'approve_status',
                sorter: (a, b) => a.approve_status > b.approve_status ? 1 : -1,
            }, {
                title: '最后更新',
                dataIndex: 'last_update_at',
                key: 'last_update_at',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.last_update_at > b.last_update_at ? 1 : -1,
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 80,
                render: (text, record) => {
                    return (<span>
            <a href="javascript:;" onClick={props.checkDetailOnclick}
               id={record.application_id}>查看详情</a>
            </span>)
                },
            }]
    }

    // {
    //     "user_name": "fortest004",
    //     "approve_status": "wait",
    //     "created_at": "2018-12-16 18:04:20 +0800",
    //     "description": "2018-12-17 è¯·å\u0081\u0087ä¸\u0080å¤©",
    //     "type": "leave",
    //     "created_by": "admin",
    //     "application_id": "ap1812160001",
    //     "approve_by": "admin",
    //     "last_update_by": "admin",
    //     "last_update_at": "2018-12-16 18:04:20 +0800",
    //     "comment": null,
    //     "id": 1,
    //     "status": 1
    // }
    func_content_view_one() {
        let one_item = this.state.one_item;
        if (one_item["type"] === "leave") {
            let description = one_item["description"];
            let descriptionText=description.substring(description.indexOf("]")+1);
            let seDate=description.substring(0, description.indexOf("]") + 1);
            seDate=seDate.replace("[","");
            seDate=seDate.replace("]","");
            let seDateArr=seDate.split(',')
            let startDate=seDateArr[0].substring(0,4)+"-"
                +seDateArr[0].substring(4,6)+"-"
                +seDateArr[0].substring(6,8)+' '
                +seDateArr[0].substring(8,10)+':'+seDateArr[0].substring(10,12)

            let endDate=seDateArr[1].substring(0,4)+"-"
                +seDateArr[1].substring(4,6)+"-"
                +seDateArr[1].substring(6,8)+' '
                +seDateArr[1].substring(8,10)+':'+seDateArr[1].substring(10,12)
            return (<div>
                <div className="col-sm-12 col-md-4">
                    <Divider orientation={"left"}><span>请假申请</span><Icon type="team"/></Divider>
                    <table className="table table-bordered table-condensed">
                        <tbody>
                        <tr>
                            <td>申请编号</td>
                            <td>{one_item["application_id"]}</td>
                        </tr>
                        <tr>
                            <td>提交时间</td>
                            <td>{one_item["created_at"]}</td>
                        </tr>
                        <tr>
                            <td>休假时间</td>
                            <td>{startDate+"到"+endDate}</td>
                        </tr>
                        <tr>
                            <td>申请描述</td>
                            <td>{descriptionText}</td>
                        </tr>
                        <tr>
                            <td>审批人</td>
                            <td>{one_item["approve_by"]}</td>
                        </tr>
                        <tr>
                            <td>审批状态</td>
                            <td>{one_item["approve_status"]}</td>
                        </tr>
                        <tr>
                            <td>最后更新时间</td>
                            <td>{one_item["last_update_at"]}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>);
        } else if (one_item["type"] === "office_supplies") {
            return (<div>
                <div className="col-sm-12 col-md-4">
                    <Divider orientation={"left"}><span>办公用品申请</span><Icon type="team"/></Divider>
                    <table className="table table-bordered table-condensed">
                        <tbody>
                        <tr>
                            <td>申请编号</td>
                            <td>{one_item["application_id"]}</td>
                        </tr>
                        <tr>
                            <td>提交时间</td>
                            <td>{one_item["created_at"]}</td>
                        </tr>
                        <tr>
                            <td>申请描述</td>
                            <td>{one_item["description"]}</td>
                        </tr>
                        <tr>
                            <td>审批人</td>
                            <td>{one_item["approve_by"]}</td>
                        </tr>
                        <tr>
                            <td>审批状态</td>
                            <td>{one_item["approve_status"]}</td>
                        </tr>
                        <tr>
                            <td>最后更新时间</td>
                            <td>{one_item["last_update_at"]}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>);
        } else if (one_item["type"] === "resignation") {
            return (<div>
                <div className="col-sm-12 col-md-4">
                    <Divider orientation={"left"}><span>离职申请</span><Icon type="team"/></Divider>
                    <table className="table table-bordered table-condensed">
                        <tbody>
                        <tr>
                            <td>申请编号</td>
                            <td>{one_item["application_id"]}</td>
                        </tr>
                        <tr>
                            <td>提交时间</td>
                            <td>{one_item["created_at"]}</td>
                        </tr>
                        <tr>
                            <td>申请描述</td>
                            <td><h4 style={{textAlign:"center"}}>辞职申请书</h4>

                                <p>江苏耀迪新材料有限公司（苏州致豪新材料科技有限公司）：</p>

                                <p>本人系江苏耀迪新材料有限公司（苏州致豪新材料科技有限公司）的员工，因本人另有发展需要，特向贵公司提出辞职申请！
                                    特此申请！</p></td>
                        </tr>
                        <tr>
                            <td>审批人</td>
                            <td>{one_item["approve_by"]}</td>
                        </tr>
                        <tr>
                            <td>审批状态</td>
                            <td>{one_item["approve_status"]}</td>
                        </tr>
                        <tr>
                            <td>最后更新时间</td>
                            <td>{one_item["last_update_at"]}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>);
        }
    }

    func_content_create_one() {
        console.log('fdsfafa');
        return this.state.create_one_form;
    }

    func_content_edit_one() {
        return (
            <WrappedEditInventoryForm
                inventory_types={this.state.inventory_types}
                one_inventory={this.state.one_item}
            />
        );
    }

    create_btn_click(e) {
        let btn = e.target.getAttribute("myattr");
        let create_one_form = "";
        if (btn === "leave") {
            create_one_form = <WrappedFormNewLeaveApplication/>
        } else if (btn === "office_supplies") {
            create_one_form = <WrappedFormNewOfficeSuppliesApplication/>
        } else if (btn === "resignation") {
            create_one_form = <WrappedFormNewResignationApplication/>
        }
        this.setState({
            create_one_form: create_one_form,
            page: childPageConstrants.createOne
        })
    }

    _pageUpdate(newPage) {
        this.setState({
            page: newPage
        })
    }

    _breadcrumbUpdate(newBreadcrumb) {

    }


    func_content_header() {
        const btnStyle = {
            marginRight: 8,
            marginBottom: 12
        }
        return <div>
            <Button style={btnStyle} type="primary" icon="plus" myattr={"leave"}
                    onClick={this.create_btn_click}>请假单<Icon type="schedule"/></Button>
            <Button style={btnStyle} icon="plus" myattr={"office_supplies"} onClick={this.create_btn_click}>办公用品申请<Icon
                type="laptop"/></Button>
            <Button style={btnStyle} type="danger" icon="plus" myattr={"resignation"} onClick={this.create_btn_click}>离职申请<Icon
                type="frown"/></Button>
        </div>
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
                siderDefaultMenuKey={['hr_my_application']}
                siderDefaultOpenKeys={['hr_m','hr_m_my']}
                contentHeader={this.func_content_header}
                _btnTag_Add={false}
                _btnTag_Delete={false}
                _btnTag_Update={false}
                _tableColumnRowKey={"application_id"}
                _tableScrollX={{x: 1300}}
                _pageAndBreadcrumb={true}
                _page={this.state.page}
                _pageUpdate={this._pageUpdate}
                _breadcrumb={this.state.breadcrumb}
                _breadcrumbUpdate={this._breadcrumbUpdate}
            />
        )
    }
}