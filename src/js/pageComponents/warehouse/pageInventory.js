import React from 'react';
import {Icon, Divider, Tag} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {invenrotyService} from "../../_services/inventory.service"
import WrappedNewInventoryForm from "../../_components/warehouse/_compNewInventoryForm"
import WrappedEditInventoryForm from "../../_components/warehouse/_compEditInventoryForm"

export default class PageInventory extends React.Component {
    constructor(props) {
        super(props);
        let subpage='',breadcrumbKeyWord='';
        if(props.location.pathname.indexOf('_rm')>0){
            subpage='rm';
            breadcrumbKeyWord='原料库存';
        }else if(props.location.pathname.indexOf('_sfp')>0){
            subpage='sfp';
            breadcrumbKeyWord='半成品库存';
        }else if(props.location.pathname.indexOf('_fp')>0){
            subpage='fp';
            breadcrumbKeyWord='成品库存';
        }
        this.state = {
            subPage: subpage,
            breadcrumbKeyWord:breadcrumbKeyWord,
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
            this.setState({
                loading: false,
                inventory_types: data.inventory_types,
            })
        });

        invenrotyService.getAllByTypeParent(this.state.subPage).then(data => {
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
        this.func_content_header = this.func_content_header.bind(this);
    };

    func_update_items() {
        this.setState({loading: true});
        invenrotyService.getAllByTypeParent(this.state.subPage).then(data => {
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

    func_delete_one_item() {
        this.setState({loading: true});
        invenrotyService.deleteOneInvenroty(this.state.one_item.inventory_id).then(data=>{
            this.setState({
                loading: false,
            })
            this.func_update_items();
        });
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
                key: 'inventory_id',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.inventory_id > b.inventory_id?1:-1,
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.created_at > b.created_at?1:-1,
            },  {
                title: '名称',
                dataIndex: 'inventory_name',
                key: 'inventory_name',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.inventory_name > b.inventory_name?1:-1,
            }, {
                title: '类别',
                dataIndex: 'inventory_type_id',
                key: 'inventory_type_id',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.inventory_type_id > b.inventory_type_id?1:-1,
                render: (text, record) => {
                    let inventory_type_name=null;
                    const inventory_types=this.state.inventory_types;
                    for(var i=0;i<inventory_types.length;i++){
                        if(record["inventory_type_id"]===inventory_types[i].inventory_type_id){
                            inventory_type_name=inventory_types[i].inventory_type_name;
                        }
                    }
                    if(inventory_type_name===null){
                        inventory_type_name='未知';
                    }
                    return (inventory_type_name);
                }
            }, {
                title: '库存数量',
                dataIndex: 'inventory_count',
                key: 'inventory_count',
                sorter: (a, b) => a.inventory_count > b.inventory_count?1:-1,
            },{
                title: '最后更新',
                dataIndex: 'last_update_at',
                key: 'last_update_at',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.last_update_at > b.last_update_at?1:-1,
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
                        <td>类别</td>
                        <td>{one_item["inventory_type_id"]}</td>
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

    func_content_header(){

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
                update_one_item_by_key={"inventory_id"}
                delete_one_item={this.func_delete_one_item}
                _compnViewOne={this.func_content_view_one}
                _compnCreateOne={this.func_content_create_one}
                _compnEditOne={this.func_content_edit_one}
                item_table_columns={this.func_item_table_columns}
                subTitle={this.func_sub_title}
                siderDefaultMenuKey={['wh_'+this.state.subPage]}
                siderDefaultOpenKeys={['wh_m']}
                contentHeader={this.func_content_header}
                _btnTag_Add={true}
                _btnTag_Delete={true}
                _btnTag_Update={true}
            />
        )
    }
}