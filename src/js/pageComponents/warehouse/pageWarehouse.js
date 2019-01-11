import React from 'react';
import {Popconfirm, Icon, Steps, Table, Layout, Tag, Divider, Spin, Button, Progress, Breadcrumb} from 'antd';

const {Content,} = Layout;
import CompnSider from "../../_components/compnSider";
import CompnHeader from "../../_components/compnHeader";

// import WrappedFormNewCustomer from "./form/_formNewCustomer";
// import WrappedFormNewCustomerContact from "./form/_formNewCustomerContact";
// import WrappedFormEditCustomer from "./form/_formEditCustomer";
// import WrappedFormEditContact from "./form/_formEditContact";
import WrappedFormNewWHRawMaterial from "./form/_formNewWHRawMaterial";
import WrappedFormEditWHRawMaterial from "./form/_formEditWHRawMaterial";

import {serviceWarehouse} from '../../_services/service.warehouse';

const Step = Steps.Step;

function sortFollowupArr(a, b) {
    return a.last_update_at > b.last_update_at ? 1 : -1
}

//potential潜在/intentional有意向合作/intentional_order意向订单/formal_order正式订单
function whLocationMap(whLocation) {
    let tg;
    switch (whLocation) {
        case 'shengze':
            tg = <Tag color="#2db7f5">苏州盛泽仓库</Tag>
            break;
        case 'other':
            tg = <Tag color="#87d068">其他仓库</Tag>
            break;
        case 'intentional_order':
            tg = <Tag color="#87d068">已下意向订单</Tag>
            break;
        case 'formal_order':
            tg = <Tag color="#87d068">已下正式订单</Tag>
            break;
        default:
            tg = <Tag>未知<Icon type="minus-circle-o"/></Tag>
            break;
    }
    return <span>{tg}</span>
}

function recordTypeMap(recordType) {
    let tg;
    switch (recordType) {
        // case 'inbound':
        //     tg = <Tag color="#2db7f5">入库记录</Tag>
        //     break;
        // case 'outbound':
        //     tg = <Tag color="#87d068">出库记录</Tag>
        //     break;
        // case 'update':
        //     tg = <Tag color="#87d068">手动更新库存记录</Tag>
        //     break;
        case 'inbound':
            tg = "入库记录"
            break;
        case 'outbound':
            tg = "出库记录"
            break;
        case 'update':
            tg = "手动更新库存记录"
            break;
        default:
            tg = "未知"
            break;
    }
    // return <span style={{display:"inline"}}>{tg}</span>
    return tg;
}

function eNumber(eStr){
    return new Number(eStr).toString()
}



const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
    if (props.page) {
        let page = props.page;
        if (page === 'view_all') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.addNewBtnOnclick}>
                        <Icon type="plus"/>
                        <span>添加原料信息</span>
                    </Button>
                    <Button type="primary" style={btnStyle} onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                </div>
                <Spin spinning={props.loading}>
                    <Table rowKey="id" columns={props.table_columns}
                           dataSource={props.items} size="small"/>
                </Spin>
            </div>)
        } else if (page === 'view_one') {
            let limit=10;
            let wh_raw_material=props.one_item;
            let one_item_history = props.one_item_history.sort(sortFollowupArr).reverse();
            let hist_logs=[]
            let log
            for (let i = 0; i < one_item_history.length&&limit>0; i++,limit--) {
                log = one_item_history[i];
                hist_logs.push(<p
                    key={log.id}>{log.last_update_at.split('+')[0] + " "+log.last_update_by+ " "+recordTypeMap(log.record_type)}</p>)
            }
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddNewBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Spin spinning={props.loading}>
                        <div className="col-sm-12 col-md-6">
                            <Divider orientation={"left"}>
                                <Icon type="profile"/>
                                <span>原料{wh_raw_material["wh_id_sub"]}详细信息 创建者:{wh_raw_material["created_by"]} 创建时间:{wh_raw_material["created_at"].split('+')[0]}</span>
                            </Divider>
                            <table className="table table-bordered table-condensed">
                                <tbody>
                                <tr>
                                    <td>原料名称</td>
                                    <td><h4>{wh_raw_material["name"]}</h4></td>
                                </tr>
                                <tr>
                                    <td>规格</td>
                                    <td>{wh_raw_material["specification"]}</td>
                                </tr>
                                <tr>
                                    <td>库存数量</td>
                                    <td>{eNumber(wh_raw_material["count"])+" "+wh_raw_material["count_unit"]}</td>
                                </tr>
                                <tr>
                                    <td>单价</td>
                                    <td>{eNumber(wh_raw_material["unit_price"])}元</td>
                                </tr>
                                <tr>
                                    <td>重量</td>
                                    <td>{eNumber(wh_raw_material["weight"])+" "+wh_raw_material["weight_unit"]}</td>
                                </tr>
                                <tr>
                                    <td>负责人</td>
                                    <td>{wh_raw_material["principal"]}</td>
                                </tr>
                                <tr>
                                    <td>所在仓库</td>
                                    <td>{whLocationMap(wh_raw_material["wh_location"])}</td>
                                </tr>
                                <tr>
                                    <td>位置</td>
                                    <td>{wh_raw_material["wh_inner_location"]}</td>
                                </tr>
                                <tr>
                                    <td>描述</td>
                                    <td>{wh_raw_material["description"]}</td>
                                </tr>
                                <tr>
                                    <td>备注</td>
                                    <td>{wh_raw_material["comment"]}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><Button type="primary" icon="edit" style={btnStyle}
                                                onClick={props.editWHRawMaterialBtnOnClick}>更新</Button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h5>变更记录</h5>
                            {hist_logs}
                        </div>
                    </Spin>
                </div>
            </div>)

        } else if (page === 'add_new') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddNewBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormNewWHRawMaterial/>
            </div>)
        } else if (page === 'edit_raw_material') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromEditWHRawMaterialBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <WrappedFormEditWHRawMaterial one_item={props.one_item}/>
            </div>);
        } else if (page === 'edit_contact') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromEditCustomerBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                {/*<WrappedFormEditContact contact={props.one_contact} customer={props.one_customer["customer"]}/>*/}
            </div>);
        } else if (page === 'add_new_contact') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddContactBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                {/*<WrappedFormNewCustomerContact customer={props.one_customer["customer"]}/>*/}
            </div>);
        }
    } else {

    }
}
export default class PageWarehouse extends React.Component {
    constructor(props) {
        super(props);
        let subpage = '', breadcrumbKeyWord = '';
        // if (props.location.pathname.indexOf('_my') > 0) {
        //     subpage = 'crm_my';
        //     breadcrumbKeyWord = '我的客户';
        // } else if (props.location.pathname.indexOf('_all') > 0) {
        //     subpage = 'crm_all';
        //     breadcrumbKeyWord = '所有客户';
        // }
        this.state = {
            loading: true,
            page: 'view_all',//view_one/add_new/view_all/edit_customer/edit_contact
            breadcrumb: breadcrumbKeyWord,
            subPage: subpage,
            one_customer: null,
            one_customer_followups: [],
            one_contact: null,
            customers: [],
            followup_view: 'view',
            items:[],
            one_item:{},
            one_item_history:[],
            _raw_material_table_columns:[
                {
                    title: '编号',
                    dataIndex: 'wh_id_sub',
                    key: 'wh_id_sub',
                    sorter: (a, b) => a.wh_id_sub - b.wh_id_sub? 1 : -1,
                },
                {
                    title: '原料名称',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: (a, b) => a.name > b.name ? 1 : -1,
                },
                {
                    title: '规格',
                    dataIndex: 'specification',
                    key: 'specification',
                    sorter: (a, b) => a.specification > b.specification ? 1 : -1,
                },
                {
                    title: '单价',
                    dataIndex: 'unit_price',
                    key: 'unit_price',
                    sorter: (a, b) => a.unit_price > b.unit_price ? 1 : -1,
                    render: (text, record) => {
                        return eNumber(record.unit_price)+"元"
                    },
                },
                {
                    title: '库存剩余',
                    dataIndex: 'count',
                    key: 'count',
                    sorter: (a, b) => a.count > b.count ? 1 : -1,
                    render: (text, record) => {
                        return eNumber(record.count)+record.count_unit
                    },
                },
                {
                    title: '管理员',
                    dataIndex: 'principal',
                    key: 'principal',
                },
                {
                    title: '所在仓库',
                    key: 'wh_location',
                    sorter: (a, b) => a.followup_status > b.followup_status ? 1 : -1,
                    render: (text, record) => {
                        return whLocationMap(record.wh_location)
                    },
                }, {
                    title: '最后更新时间',
                    dataIndex: 'last_update_at',
                    key: 'last_update_at',
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.last_update_at > b.last_update_at ? 1 : -1,
                    render: (text, record) => {
                        return (record.last_update_at.split('+')[0])
                    },
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;" onClick={this.handleCheckDetailOnclick}
                           wh_id_sub={record.wh_id_sub}>查看详情</a>
                        </span>)
                    },
                }]
        }

        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this);
        this.handleBackFromAddNewBtnOnclick = this.handleBackFromAddNewBtnOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);
        this.handleEditWHRawMaterialBtnOnclick = this.handleEditWHRawMaterialBtnOnclick.bind(this);
        this.handleEditContactBtnOnclick = this.handleEditContactBtnOnclick.bind(this);
        this.handleBackFromEditWHRawMaterialBtnOnclick = this.handleBackFromEditWHRawMaterialBtnOnclick.bind(this);
        this.handleFollowUpAddBtnOnclick = this.handleFollowUpAddBtnOnclick.bind(this);
        this.handleBackFromAddNewFollowup = this.handleBackFromAddNewFollowup.bind(this);
        this.handleBackFromAddContactBtnOnclick = this.handleBackFromAddContactBtnOnclick.bind(this);
        this.handleAddContactBtnOnclick = this.handleAddContactBtnOnclick.bind(this);
        this.handleDeleteContactBtnOnclick = this.handleDeleteContactBtnOnclick.bind(this);

        serviceWarehouse.getWHRawMaterialAll().then(data => {
            this.setState({items: data, loading: false});
        });
    }

    handleCheckDetailOnclick(e) {
        let wh_id_sub = e.target.attributes.wh_id_sub.value;
        this.setState({loading:true});
        serviceWarehouse.getWHRawMaterialByWhIdSub(wh_id_sub).then(data => {
            serviceWarehouse.getWHRawMaterialHistoryListByWhIdSub(wh_id_sub).then(data1=>{
                this.setState({
                    page: "view_one",
                    breadcrumb: '原料详情: ' + wh_id_sub,
                    one_item: data,
                    one_item_history:data1,
                    loading: false
                });
            })
        });
    }

    handleAddNewBtnOnclick() {
        this.setState({page: "add_new", breadcrumb: '新建原料信息'});
    }

    handleBackFromAddNewBtnOnclick() {
        this.setState({page: "view_all", breadcrumb: '原料管理'});
    }

    handleReloadBtnOnclick() {
        this.setState({loading: true});
        serviceWarehouse.getWHRawMaterialAll().then(data => {
            this.setState({items: data, loading: false});
        });
    };

    handleEditWHRawMaterialBtnOnclick() {
        this.setState({
            page: "edit_raw_material",
            breadcrumb: '更新原料信息: ' + this.state.one_item.wh_id_sub
        });
    };

    handleBackFromEditWHRawMaterialBtnOnclick() {
        let wh_id_sub = this.state.one_item.wh_id_sub
        this.setState({loading:true});
        serviceWarehouse.getWHRawMaterialByWhIdSub(wh_id_sub).then(data => {
            serviceWarehouse.getWHRawMaterialHistoryListByWhIdSub(wh_id_sub).then(data1=>{
                this.setState({
                    page: "view_one",
                    breadcrumb: '原料详情: ' + wh_id_sub,
                    one_item: data,
                    one_item_history:data1,
                    loading: false
                });
            })
        });
    }

    handleEditContactBtnOnclick(e) {
        let contact_id = e.target.attributes.contact_id.value;
        let contacts = this.state.one_customer["contacts"];
        let contact = null;
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].id == contact_id) {
                contact = contacts[i];
                break;
            }
        }

        this.setState({
            page: "edit_contact",
            one_contact: contact,
            breadcrumb: '更新客户联系人信息: ' + this.state.one_customer["customer"]["customer_id"]
        });
    }

    handleFollowUpAddBtnOnclick() {
        this.setState({
            followup_view: "add"
        });
    }

    handleBackFromAddNewFollowup() {
        // serviceCustomer.getCustomerFollowupsByCIdUname(this.state.one_customer.customer.customer_id, localStorage.getItem('user_name')).then(data1 => {
        //     this.setState({
        //         one_customer_followups: data1["customer_followups"],
        //         followup_view: "view"
        //     });
        // });
    }

    handleBackFromAddContactBtnOnclick() {
        // let customer_id = this.state.one_customer["customer"]["customer_id"];
        // serviceCustomer.getByCustomerId(customer_id).then(data => {
        //     serviceCustomer.getCustomerFollowupsByCIdUname(customer_id, localStorage.getItem('user_name')).then(data1 => {
        //         this.setState({
        //             page: "view_one",
        //             breadcrumb: '客户详情: ' + customer_id,
        //             one_customer: data,
        //             one_customer_followups: data1["customer_followups"],
        //             loading: false
        //         });
        //     });
        // });
    }

    handleAddContactBtnOnclick() {
        this.setState({
            page: "add_new_contact",
            breadcrumb: '添加新的公司联系人: ' + this.state.one_customer["customer"]["customer_id"]
        });
    }

    handleDeleteContactBtnOnclick(e) {
        // let id = e.target.getAttribute("id")
        // if(confirm("删除联系人信息？")){
        //     this.setState({
        //         loading: true
        //     });
        //     serviceCustomer.deleteCustomerContactById(id).then(data2=>{
        //         if(data2!=null){
        //             let customer_id = this.state.one_customer.customer.customer_id;
        //             // this.setState({page: "view_one",loading:true,breadcrumb:'客户详情: '+customer_id});
        //             serviceCustomer.getByCustomerId(customer_id).then(data => {
        //                 serviceCustomer.getCustomerFollowupsByCIdUname(customer_id, localStorage.getItem('user_name')).then(data1 => {
        //                     this.setState({
        //                         one_customer: data,
        //                         one_customer_followups: data1["customer_followups"],
        //                         loading: false
        //                     });
        //                 });
        //             });
        //         }else{
        //             this.setState({
        //                 loading: false
        //             });
        //         }
        //     });
        // }
    }

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['wh_rm']} defaultOpenKeys={['wh_m']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="global"/>
                                    <span>库存管理</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent page={this.state.page}
                                         one_customer={this.state.one_customer}
                                         one_contact={this.state.one_contact}
                                         one_customer_followups={this.state.one_customer_followups}
                                         table_columns={this.state._raw_material_table_columns}
                                         items={this.state.items}
                                         one_item={this.state.one_item}
                                         one_item_history={this.state.one_item_history}
                                         customers={this.state.customers}
                                         loading={this.state.loading}
                                         addNewBtnOnclick={this.handleAddNewBtnOnclick}
                                         backFromAddNewBtnOnclick={this.handleBackFromAddNewBtnOnclick}
                                         editCustomerBtnOnclick={this.handleEditCustomerBtnOnclick}
                                         editContactBtnOnclick={this.handleEditContactBtnOnclick}
                                         reloadBtnOnclick={this.handleReloadBtnOnclick}
                                         backFromEditCustomerBtnOnclick={this.handleBackFromEditCustomerBtnOnclick}
                                         followUpAddBtnOnclick={this.handleFollowUpAddBtnOnclick}
                                         followup_view={this.state.followup_view}
                                         backFromAddNewFollowup={this.handleBackFromAddNewFollowup}
                                         backFromAddContactBtnOnclick={this.handleBackFromAddContactBtnOnclick}
                                         addContactBtnOnclick={this.handleAddContactBtnOnclick}
                                         deleteContactBtnOnclick={this.handleDeleteContactBtnOnclick}
                                         editWHRawMaterialBtnOnClick={this.handleEditWHRawMaterialBtnOnclick}
                                         backFromEditWHRawMaterialBtnOnclick={this.handleBackFromEditWHRawMaterialBtnOnclick}
                            />
                        </div>
                    </Content>
                    {/*<CompnFooter color={'#333'}/>*/}
                </Layout>
            </Layout>
        )
    }
}
