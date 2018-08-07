import React from 'react';
import {Divider, Icon, Select, Layout, Card, Breadcrumb, Spin, Table, Button} from 'antd';

const {Content} = Layout;
import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

import {productService} from "../_services/product.service"
import WrappedNewProductForm from "../_components/_compnNewProductForm";
import {customerService} from "../_services/customer.service";
//add calculate with input part
const Option = Select.Option;

const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
    let product_types = props.product_types;
    let type_select_options = [];

    for (let i = 0; i < product_types.length; i++) {
        let type_i = product_types[i]
        type_select_options.push(
            <Option value={type_i["product_type_id"]} key={type_i["id"]}>{type_i["name"]}</Option>
        );
    }

    if (props.page) {
        let page = props.page;
        if (page === 'view_all') {

            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.addNewBtnOnclick}>
                        <Icon type="plus"/>
                        <span>新建产品信息</span>
                    </Button>
                    <Button type="primary" style={btnStyle} onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                </div>
                产品分类
                <Select defaultValue={props.one_product_type} style={btnStyle}
                        onChange={props.productTypeSelectChange}>
                    <Option value="all">所有类别</Option>
                    {type_select_options}
                </Select>
                <Spin spinning={props.loading}>
                    <Table rowKey="id" columns={props.product_table_columns}
                           dataSource={props.products} size="small"/>
                </Spin>
            </div>)
        } else if (page === 'add_new') {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromAddNewBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                要添加的产品类别
                <Select defaultValue={props.addNewProductType} style={btnStyle}
                        onChange={props.addNewProductTypeSelectChange}>
                    {type_select_options}
                </Select>
                <WrappedNewProductForm product_type={props.addNewProductType}/>
            </div>)
        } else if (page === 'view_one') {
            let product = props.one_product['product'];
            //     {
//         "id": 1,
//         "product_id": "20001",
//         "added_by_user_name": "testname05",
//         "name": "芳纶ribstop 220G作训服面料",
//         "product_type_id": "7001",
//         "measurement_unit": "米",
//         "specification": "ribstop 220G",
//         "raw_material_ids": "1",
//         "features": null,
//         "use_for": "训练服服装",
//         "description": null,
//         "comment": null,
//         "created_at": "2018-07-15 17:31:02 +0800",
//         "last_update_at": "2018-07-15 17:31:02 +0800",
//         "status": 1
//     },
            return (
                <div>
                    <div>
                        <Button type="primary" style={btnStyle} onClick={props.backFromAddNewBtnOnclick}>
                            <Icon type="left"/>
                            <span>返回</span>
                        </Button>
                        <Spin spinning={props.loading}>
                            <div className="col-sm-12 col-md-6">
                                <dl className="dl-horizontal">
                                    <dt>产品编号</dt>
                                    <dd>{product["product_id"]}</dd>
                                    <dt>创建者</dt>
                                    <dd>{product["added_by_user_name"]}</dd>
                                    <dt><span>创建时间</span><Icon type="calendar"/></dt>
                                    <dd>{product["created_at"]}</dd>
                                    <Divider orientation={"left"}>
                                        <span>产品详情</span>
                                        <Icon type="file-text" />
                                    </Divider>
                                    <dt><span>产品名称</span><Icon type="copyright"/></dt>
                                    <dd><h4>{product["name"]}</h4></dd>
                                    <dt>度量单位</dt>
                                    <dd>{product["measurement_unit"]}</dd>
                                    <dt>规格型号</dt>
                                    <dd>{product["specification"]}</dd>
                                    <dt>产品特性</dt>
                                    <dd>{product["features"]}</dd>
                                    <dt>产品用途</dt>
                                    <dd>{product["use_for"]}</dd>
                                    <dt>详细描述</dt>
                                    <dd>{product["description"]}</dd>
                                    <dt>备注</dt>
                                    <dd>{product["comment"]}</dd>
                                    <dd><Button type="primary" icon="edit" style={btnStyle}
                                                onClick={props.editCustomerBtnOnclick}>更新</Button>
                                    </dd>

                                </dl>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <Divider orientation={"left"}><span>产品样图</span><Icon type="picture" /></Divider>
                                <img src={require("../../img/products_img/pi01.jpg")} style={{ width: 210 ,border:'solid 2px white'}}/>
                                <img src={require("../../img/products_img/pi02.gif")} style={{ width: 210 ,border:'solid 2px white'}}/>
                                <img src={require("../../img/products_img/pi03.gif")} style={{ width: 210 ,border:'solid 2px white'}}/>
                            </div>
                        </Spin>
                    </div>
                </div>
            )
        }
    }
}
// {
//     "products": [
//     {
//         "id": 1,
//         "product_id": "20001",
//         "added_by_user_name": "testname05",
//         "name": "芳纶ribstop 220G作训服面料",
//         "product_type_id": "7001",
//         "measurement_unit": "米",
//         "specification": "ribstop 220G",
//         "raw_material_ids": "1",
//         "features": null,
//         "use_for": "训练服服装",
//         "description": null,
//         "comment": null,
//         "created_at": "2018-07-15 17:31:02 +0800",
//         "last_update_at": "2018-07-15 17:31:02 +0800",
//         "status": 1
//     },
//     {
//         "id": 2,
//         "product_id": "20002",
//         "added_by_user_name": "testname05",
//         "name": "暖通T型(YD-T-S1)",
//         "product_type_id": "7002",
//         "measurement_unit": "米",
//         "specification": "YD-T-S1",
//         "raw_material_ids": "3,4",
//         "features": null,
//         "use_for": "用于普通舒适空调的送风",
//         "description": null,
//         "comment": null,
//         "created_at": "2018-07-15 17:38:27 +0800",
//         "last_update_at": "2018-07-15 17:38:27 +0800",
//         "status": 1
//     }]
// }
export default class PageProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: 'view_all',//view_one/add_new/view_all/edit_product
            breadcrumb: '所有产品',
            one_product: {},
            one_product_type: 'all',
            product_types: [],
            products: [],
            addNewProductType:'70001',
            product_table_columns: [
                {
                    title: '产品编号',
                    dataIndex: 'product_id',
                    key: 'product_id'
                },
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '产品类型',
                    dataIndex: 'product_type_id',
                    key: 'product_type_id',
                }, {
                    title: '计量单位',
                    dataIndex: 'measurement_unit',
                    key: 'measurement_unit',
                }, {
                    title: '规格型号',
                    dataIndex: 'specification',
                    key: 'specification',
                }, {
                    title: '产品用途',
                    dataIndex: 'use_for',
                    key: 'use_for',
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        return (<span>
                        <a href="javascript:;" onClick={this.handleCheckDetailOnclick}
                           product_id={record.product_id}>查看详情</a>
                        </span>)
                    },
                }
            ]
        }

        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);
        this.handleProductTypeSelectChange = this.handleProductTypeSelectChange.bind(this);
        this.typename = this.typename.bind(this);
        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this);
        this.handleBackFromAddNewBtnOnclick = this.handleBackFromAddNewBtnOnclick.bind(this);
        this.handleAddNewProductTypeSelectChange = this.handleAddNewProductTypeSelectChange.bind(this);

        productService.getAll().then(data => {
            this.setState({products: data["products"], breadcrumb: '所有产品'+' 共 '+data["products"].length+' 条',loading: false});
        });

        productService.getAllProductTypes().then(data => {
            this.setState({product_types: data["product_types"], loading: false});
        });
    }

    typename(type_id) {
        for (let i = 0; i < this.state.product_types.length; i++) {
            let type_i = this.state.product_types[i];
            console.log(type_i);
            if (type_i["product_type_id"] === type_id) {
                return this.state.product_types[i]["name"];
            }
        }
        return type_id;
    }

    handleCheckDetailOnclick(e) {
        let product_id = e.target.attributes.product_id.value;
        productService.getByProductId(product_id).then(data => {
            this.setState({page: "view_one", breadcrumb: '产品详情: ' + product_id, one_product: data, loading: false});
        });

    }

    handleReloadBtnOnclick() {
        this.setState({loading: true});
        if (this.state.one_product_type === 'all') {
            productService.getAll().then(data => {
                this.setState({products: data["products"], loading: false});
            });
        } else {
            productService.getByProductTypeId(this.state.one_product_type).then(data => {
                this.setState({products: data["products"], loading: false});
            });
        }
    }

    handleProductTypeSelectChange(e) {
        if (e === 'all') {
            productService.getAll().then(data => {
                this.setState({products: data["products"], loading: false, one_product_type: e, breadcrumb: '所有产品'+' 共 '+data["products"].length+' 条'});
            });
        } else {
            productService.getByProductTypeId(e).then(data => {
                this.setState({
                    products: data["products"],
                    loading: false,
                    one_product_type: e,
                    breadcrumb: '产品类别: ' + this.typename(e)+' 共 '+data["products"].length+' 条'
                });
            });
        }
    }

    handleAddNewBtnOnclick() {
        this.setState({page: "add_new", breadcrumb: '新建产品信息'});
    }

    handleBackFromAddNewBtnOnclick() {
        this.setState({page: "view_all", breadcrumb: '所有产品'+' 共 '+this.state.products.length+' 条'});
    }

    handleAddNewProductTypeSelectChange(e){
        this.setState({addNewProductType: e});
    }

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['5']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="shop"/>
                                    <span>产品管理</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent page={this.state.page}
                                         loading={this.state.loading}
                                         one_product={this.state.one_product}
                                         one_product_type={this.state.one_product_type}
                                         products={this.state.products}
                                         product_types={this.state.product_types}
                                         product_table_columns={this.state.product_table_columns}
                                         addNewProductType={this.state.addNewProductType}
                                         reloadBtnOnclick={this.handleReloadBtnOnclick}
                                         productTypeSelectChange={this.handleProductTypeSelectChange}
                                         addNewBtnOnclick={this.handleAddNewBtnOnclick}
                                         backFromAddNewBtnOnclick={this.handleBackFromAddNewBtnOnclick}
                                         addNewProductTypeSelectChange={this.handleAddNewProductTypeSelectChange}
                            />
                        </div>
                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        )
    }

}