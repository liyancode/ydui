import React from 'react';
import {Popconfirm, Icon, Steps, Table, Layout, Tag, Divider, Spin, Button, Radio, Breadcrumb,} from 'antd';

const {Content,} = Layout;
import CompnSider from "../../_components/compnSider";
import CompnHeader from "../../_components/compnHeader";

// import WrappedFormNewCustomer from "./form/_formNewCustomer";
// import WrappedFormNewCustomerContact from "./form/_formNewCustomerContact";
// import WrappedFormEditCustomer from "./form/_formEditCustomer";
// import WrappedFormEditContact from "./form/_formEditContact";
import WrappedFormNewWHRawMaterialHistory from "./form/_formNewWHRawMaterialHistory";
import WrappedFormEditWHRawMaterial from "./form/_formEditWHRawMaterial";

import {serviceWarehouse} from '../../_services/service.warehouse';

const Step = Steps.Step;
const RadioGroup = Radio.Group;

//potential潜在/intentional有意向合作/intentional_order意向订单/formal_order正式订单
function inOrOutTag(in_or_out) {
    let tg;
    switch (in_or_out) {
        case 'inbound':
            tg = <Tag color="#2db7f5">入库记录</Tag>
            break;
        case 'outbound':
            tg = <Tag color="#87d068">出库记录</Tag>
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

function inOrOutCN(in_or_out) {
    let tg;
    switch (in_or_out) {
        case 'inbound':
            tg = "入库"
            break;
        case 'outbound':
            tg = "出库"
            break;
    }
    return tg
}

function eNumber(eStr) {
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
                        <span>添加(入/出)库记录</span>
                    </Button>
                    <Button type="primary" style={btnStyle} onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                </div>
                <div>
                    <RadioGroup onChange={props.onChangeInOutBoundRadio} value={props.in_or_out}>
                    <Radio value={'outbound'}><Tag color="geekblue">出库记录<Icon type="clock-circle"/></Tag></Radio>
                    <Radio value={'inbound'}><Tag color="green">入库记录<Icon type="check-circle"/></Tag></Radio>
                </RadioGroup>
                </div>
                <Spin spinning={props.loading}>
                    <Table rowKey="id" columns={props.table_columns}
                           dataSource={props.items} size="small"/>
                </Spin>
            </div>)
        } else if (page === 'view_one') {
            let one_item = props.one_item;
            let inoutcn=inOrOutCN(one_item.record_type)
            let inoutprefix=one_item.record_type;
            let tmptd=<td>出库去向</td>
            let tofrom="to";
            if(inoutprefix==='inbound'){
                tmptd=<td>入库来源</td>
                tofrom="from"
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
                                <span>{inOrOutTag(one_item.record_type)} 创建者:{one_item["created_by"]} 创建时间:{one_item["created_at"].split('+')[0]}</span>
                            </Divider>
                            <table className="table table-bordered table-condensed">
                                <tbody>
                                <tr>
                                    <td>库存编号</td>
                                    <td><h4>{one_item["wh_id_sub"]}</h4></td>
                                </tr>
                                <tr>
                                    <td>原料名称</td>
                                    <td><h4>{one_item["name"]}</h4></td>
                                </tr>
                                <tr>
                                    <td>规格</td>
                                    <td>{one_item["specification"]}</td>
                                </tr>
                                <tr>
                                    <td>{inoutcn+"数量"}</td>
                                    <td>{eNumber(one_item[inoutprefix+"_count"])}</td>
                                </tr>
                                <tr>
                                    <td>{inoutcn+"时间"}</td>
                                    <td>{one_item[inoutprefix+"_at"].split('+')[0]}</td>
                                </tr>
                                <tr>
                                    {tmptd}
                                    <td>{one_item[inoutprefix+tofrom]}</td>
                                </tr>
                                <tr>
                                    <td>单价</td>
                                    <td>{eNumber(one_item[inoutprefix+"_unit_price"])}元</td>
                                </tr>
                                <tr>
                                    <td>重量</td>
                                    <td>{eNumber(one_item[inoutprefix+"_weight"]) }</td>
                                </tr>
                                <tr>
                                    <td>总价</td>
                                    <td>{eNumber(one_item[inoutprefix+"_total_price"]) }</td>
                                </tr>
                                <tr>
                                    <td>负责人</td>
                                    <td>{one_item[inoutprefix+"_principal"]}</td>
                                </tr>
                                <tr>
                                    <td>备注</td>
                                    <td>{one_item["comment"]}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><Button type="primary" icon="edit" style={btnStyle}
                                                onClick={props.editWHRawMaterialHistoryBtnOnClick}>更新</Button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {/*<div className="col-sm-12 col-md-6">*/}
                            {/*/!*{followup_view_content}*!/*/}
                            {/*<h5>进出记录。。。</h5>*/}
                        {/*</div>*/}
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
                <WrappedFormNewWHRawMaterialHistory/>
            </div>)
        } else if (page === 'edit_raw_material_history') {
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
export default class PageWarehouseBatch extends React.Component {
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
            items: [],
            one_item: {},
            in_or_out: "outbound",
            _inbound_table_columns: [
                {
                    title: '批号',
                    dataIndex: 'batch_number',
                    key: 'batch_number',
                    sorter: (a, b) => a.batch_number - b.batch_number ? 1 : -1,
                },
                {
                    title: '库存类别',
                    dataIndex: 'wh_inventory_type',
                    key: 'wh_inventory_type',
                    sorter: (a, b) => a.wh_inventory_type > b.wh_inventory_type ? 1 : -1,
                },
                {
                    title: '入库批号',
                    dataIndex: 'batch_number',
                    key: 'batch_number',
                    sorter: (a, b) => a.batch_number > b.batch_number ? 1 : -1,
                },
                {
                    title: '入库数量',
                    dataIndex: 'count',
                    key: 'count',
                    sorter: (a, b) => a.inbound_count > b.inbound_count ? 1 : -1,
                    render: (text, record) => {
                        return eNumber(record.inbound_count)
                    },
                },
                // {
                //     title: '入库重量',
                //     dataIndex: 'inbound_weight',
                //     key: 'inbound_weight',
                //     sorter: (a, b) => a.inbound_weight > b.inbound_weight ? 1 : -1,
                //     render: (text, record) => {
                //         return eNumber(record.inbound_weight)
                //     },
                // },
                // {
                //     title: '入库总价',
                //     dataIndex: 'inbound_total_price',
                //     key: 'inbound_total_price',
                //     sorter: (a, b) => a.inbound_total_price > b.inbound_total_price ? 1 : -1,
                //     render: (text, record) => {
                //         return eNumber(record.inbound_total_price)
                //     },
                // },
                {
                    title: '负责人',
                    dataIndex: 'principal',
                    key: 'principal',
                    sorter: (a, b) => a.inbound_principal > b.inbound_principal ? 1 : -1,
                },
                {
                    title: '入库时间',
                    key: 'batch_at',
                    sorter: (a, b) => a.batch_at > b.batch_at ? 1 : -1,
                    render: (text, record) => {
                        return (record.batch_at.split('+')[0])
                    },
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;" onClick={this.handleCheckDetailOnclick}
                           wh_inventory_batch_id={record.wh_inventory_batch_id}>查看详情</a>
                        </span>)
                    },
                }],
            _outbound_table_columns: [
                {
                    title: '批号',
                    dataIndex: 'batch_number',
                    key: 'batch_number',
                    sorter: (a, b) => a.batch_number - b.batch_number ? 1 : -1,
                },
                {
                    title: '库存类别',
                    dataIndex: 'wh_inventory_type',
                    key: 'wh_inventory_type',
                    sorter: (a, b) => a.wh_inventory_type > b.wh_inventory_type ? 1 : -1,
                },
                {
                    title: '出库批号',
                    dataIndex: 'batch_number',
                    key: 'batch_number',
                    sorter: (a, b) => a.batch_number > b.batch_number ? 1 : -1,
                },
                {
                    title: '出库数量',
                    dataIndex: 'count',
                    key: 'count',
                    sorter: (a, b) => a.inbound_count > b.inbound_count ? 1 : -1,
                    render: (text, record) => {
                        return eNumber(record.inbound_count)
                    },
                },
                // {
                //     title: '入库重量',
                //     dataIndex: 'inbound_weight',
                //     key: 'inbound_weight',
                //     sorter: (a, b) => a.inbound_weight > b.inbound_weight ? 1 : -1,
                //     render: (text, record) => {
                //         return eNumber(record.inbound_weight)
                //     },
                // },
                // {
                //     title: '入库总价',
                //     dataIndex: 'inbound_total_price',
                //     key: 'inbound_total_price',
                //     sorter: (a, b) => a.inbound_total_price > b.inbound_total_price ? 1 : -1,
                //     render: (text, record) => {
                //         return eNumber(record.inbound_total_price)
                //     },
                // },
                {
                    title: '负责人',
                    dataIndex: 'principal',
                    key: 'principal',
                    sorter: (a, b) => a.inbound_principal > b.inbound_principal ? 1 : -1,
                },
                {
                    title: '出库时间',
                    key: 'batch_at',
                    sorter: (a, b) => a.batch_at > b.batch_at ? 1 : -1,
                    render: (text, record) => {
                        return (record.batch_at.split('+')[0])
                    },
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;" onClick={this.handleCheckDetailOnclick}
                           wh_inventory_batch_id={record.wh_inventory_batch_id}>查看详情</a>
                        </span>)
                    },
                }],
        }

        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this);
        this.handleBackFromAddNewBtnOnclick = this.handleBackFromAddNewBtnOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);
        this.handleEditWHRawMaterialHistoryBtnOnclick = this.handleEditWHRawMaterialHistoryBtnOnclick.bind(this);
        this.handleEditContactBtnOnclick = this.handleEditContactBtnOnclick.bind(this);
        this.handleBackFromEditWHRawMaterialBtnOnclick = this.handleBackFromEditWHRawMaterialBtnOnclick.bind(this);
        this.handleFollowUpAddBtnOnclick = this.handleFollowUpAddBtnOnclick.bind(this);
        this.handleBackFromAddNewFollowup = this.handleBackFromAddNewFollowup.bind(this);
        this.handleBackFromAddContactBtnOnclick = this.handleBackFromAddContactBtnOnclick.bind(this);
        this.handleAddContactBtnOnclick = this.handleAddContactBtnOnclick.bind(this);
        this.handleOnChangeInOutBoundRadio = this.handleOnChangeInOutBoundRadio.bind(this);

        serviceWarehouse.getWHInventoryBatchListByBatchType("outbound").then(data => {
            this.setState({items: data, loading: false});
        });
    }

    handleCheckDetailOnclick(e) {
        let wh_inventory_batch_id = e.target.attributes.wh_inventory_batch_id.value;
        this.setState({loading: true});
        serviceWarehouse.getWHInventoryBatchByInventoryBatchId(wh_inventory_batch_id).then(data => {
            this.setState({
                page: "view_one",
                breadcrumb: '(入/出)库记录详细',
                one_item: data,
                loading: false
            });
        });
    }

    handleAddNewBtnOnclick() {
        this.setState({page: "add_new", breadcrumb: '添加(入/出)库记录'});
    }

    handleBackFromAddNewBtnOnclick() {
        this.setState({page: "view_all", breadcrumb: '原料(入/出)库记录'});
    }

    handleReloadBtnOnclick() {
        this.setState({loading: true});
        serviceWarehouse.getWHInventoryBatchListByBatchType(this.state.in_or_out).then(data => {
            this.setState({items: data, loading: false});
        });
    };

    handleEditWHRawMaterialHistoryBtnOnclick() {
        this.setState({
            page: "edit_raw_material_history",
            breadcrumb: '更新(入/出)库记录: ' + this.state.one_item.id
        });
    };

    handleBackFromEditWHRawMaterialBtnOnclick() {
        let id = this.state.one_item.id
        this.setState({loading: true});
        serviceWarehouse.getWHRawMaterialHistoryById(id).then(data => {
            this.setState({
                page: "view_one",
                breadcrumb: '(入/出)库记录详细',
                one_item: data,
                loading: false
            });
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
            breadcrumb: '更新(入/出)库记录: ' + this.state.one_customer["customer"]["customer_id"]
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

    handleOnChangeInOutBoundRadio(e) {
        let in_or_out = e.target.value;
        this.setState({
            in_or_out: in_or_out,
            loading: true
        });
        serviceWarehouse.getWHInventoryBatchListByBatchType(in_or_out).then(data => {
            this.setState({items: data, loading: false});
        });
    }

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['wh_inout_history']} defaultOpenKeys={['wh_m']}/>
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
                                         table_columns={
                                             this.state.in_or_out === "inbound" ?
                                                 this.state._inbound_table_columns :
                                                 this.state._outbound_table_columns
                                         }
                                         items={this.state.items}
                                         one_item={this.state.one_item}
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
                                         editWHRawMaterialHistoryBtnOnClick={this.handleEditWHRawMaterialHistoryBtnOnclick}
                                         backFromEditWHRawMaterialBtnOnclick={this.handleBackFromEditWHRawMaterialBtnOnclick}

                                         onChangeInOutBoundRadio={this.handleOnChangeInOutBoundRadio}
                                         in_or_out={this.state.in_or_out}
                            />
                        </div>
                    </Content>
                    {/*<CompnFooter color={'#333'}/>*/}
                </Layout>
            </Layout>
        )
    }
}
