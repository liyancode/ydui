import React from 'react';
import {Icon, Divider, Tag} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {invenrotyService} from "../../_services/inventory.service"

export default class PageRawMaterial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subPage: 'rm',
            loading: true,
            items: [],
            one_item: {},
            inventory_types: [],
        }
        // subPage: 'rm'
        invenrotyService.getAllSubTypes(this.state.subPage).then(data => {
            // {
            //     "inventory_types": [
            //     {
            //         "inventory_type_parent": "rm",
            //         "inventory_type_name": "å\u008E\u009Fæ\u009D\u0090æ\u0096\u009901",
            //         "added_by_user_name": "admin",
            //         "last_update_at": "2018-11-12 21:56:21 +0800",
            //         "inventory_type_id": "rm_001",
            //         "description": null,
            //         "created_at": "2018-11-12 21:56:21 +0800",
            //         "id": 1,
            //         "status": 1
            //     },
            //     {
            //         "inventory_type_parent": "rm",
            //         "inventory_type_name": "å\u008E\u009Fæ\u009D\u0090æ\u0096\u009902",
            //         "added_by_user_name": "admin",
            //         "last_update_at": "2018-11-13 10:55:45 +0800",
            //         "inventory_type_id": "rm_002",
            //         "description": null,
            //         "created_at": "2018-11-13 10:55:45 +0800",
            //         "id": 2,
            //         "status": 1
            //     }
            // ]
            // }

            console.log(data);
        });

        invenrotyService.getAllByTypeParent(this.state.subPage).then(data => {
            console.log(data);
            this.setState({
                loading: false,
                items: data.inventories,
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
    };

    func_update_items() {
        this.setState({loading: true});
        invenrotyService.getAllByTypeParent(this.state.subPage).then(data => {
            console.log(data);
            this.setState({
                loading: false,
                items: data.inventories,
            })
        });
    }

    func_update_one_item(inventory_id) {
        this.setState({loading: true});
        invenrotyService.getOneByInventoryId(inventory_id).then(data => {
            this.setState({
                loading: false,
                one_item: data,
            })
        })
    }

    func_delete_one_item(id) {
        // this.setState({loading: true});
        // invenrotyService.getOneItemById(id).then(data => {
        //     this.setState({
        //         loading:false,
        //         one_ask_price: data,
        //     })
        // })
    }

    func_sub_title() {
        return (
            <h4 style={{display: "inline"}}>
                <Icon type="database"/>
                <span>仓储管理</span>
            </h4>
        )
    }

    //{"id":2,
    // "inventory_id":"177002",
    // "inventory_type_id":"rm_001",
    // "inventory_name":"????002",
    // "inventory_count":10,
    // "inventory_unit":"?",
    // "description":null,
    // "added_by_user_name":"admin",
    // "updated_by_user_name":"admin",
    // "created_at":"2018-11-12 22:17:17 +0800",
    // "last_update_at":"2018-11-12 22:17:17 +0800","status":1}
    func_item_table_columns(props) {
        return [
            {
                title: '编号',
                dataIndex: 'inventory_id',
                key: 'inventory_id'
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
            },  {
                title: '名称',
                dataIndex: 'inventory_name',
                key: 'inventory_name',
            }, {
                title: '库存数量',
                dataIndex: 'inventory_count',
                key: 'inventory_count',
            },{
                title: '最后更新',
                dataIndex: 'last_update_at',
                key: 'last_update_at',
            },{
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            },{
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (<span>
            <a href="javascript:;" onClick={props.checkDetailOnclick}
               id={record.inventory_id}>查看详情</a>
            </span>)
                },
            }]
    }

    func_content_view_one() {
        let one_item = this.state.one_item;

        return (
            <div className="col-sm-12 col-md-6">
                <Divider orientation={"left"}><span>原料信息</span><Icon type="file"/></Divider>
                <table className="table table-bordered table-condensed">
                    <tbody>
                    <tr>
                        <td>编号</td>
                        <td>{one_item["inventory_id"]}</td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{one_item["created_at"]}</td>
                    </tr>
                    <tr>
                        <td>名称</td>
                        <td>{one_item["inventory_name"]}</td>
                    </tr>
                    <tr>
                        <td>库存</td>
                        <td>{one_item["inventory_count"]}</td>
                    </tr>
                    <tr>
                        <td>最近更新的人</td>
                        <td>{one_item["updated_by_user_name"]}</td>
                    </tr>
                    <tr>
                        <td>最近更新时间</td>
                        <td>{one_item["last_update_at"]}</td>
                    </tr>
                    <tr>
                        <td>描述</td>
                        <td>{one_item["description"]}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    func_content_create_one() {
        return (
            <div>创建新询价</div>
        );
    }

    func_content_edit_one() {
        let one_item = this.state.one_item;
        console.log(one_item);
        return (
            <div>编辑原料{one_item.id}</div>
        );
    }

    render() {
        return (
            <CompnPageContent
                loading={this.state.loading}
                breadcrumbKeyWord="原料记录"
                items={this.state.items}
                one_item={this.state.one_item}
                update_items={this.func_update_items}
                update_one_item={this.func_update_one_item}
                update_one_item_by_key={"id"}
                delete_one_item={this.func_delete_one_ask_price}
                _compnViewOne={this.func_content_view_one}
                _compnCreateOne={this.func_content_create_one}
                _compnEditOne={this.func_content_edit_one}
                item_table_columns={this.func_item_table_columns}
                subTitle={this.func_sub_title}
                siderDefaultMenuKey={['wh_rm']}
                siderDefaultOpenKeys={['wh_m']}
            />
        )
    }
}