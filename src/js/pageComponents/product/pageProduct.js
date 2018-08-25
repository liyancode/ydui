import React from 'react';
import {Divider, Icon, Select, Layout, Upload, message, Button, Breadcrumb, Spin, Table} from 'antd';

const {Content} = Layout;
import CompnSider from "../../_components/compnSider"
import CompnHeader from "../../_components/compnHeader"
import CompnFooter from "../../_components/compnFooter"

import {productService} from "../../_services/product.service"
import WrappedNewProductForm from "../../_components/_compnNewProductForm";
import WrappedEditProductForm from "../../_components/_compnEditProductForm";
import {authHeader} from "../../_helpers/auth-header";
//add calculate with input part
const Option = Select.Option;
const Dragger = Upload.Dragger;

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
                产品类别&nbsp;&nbsp;
                <Select defaultValue={props.one_product_type} style={btnStyle}
                        onChange={props.productTypeSelectChange}>
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
                <WrappedNewProductForm product_type={props.addNewProductType} product_types={props.product_types}/>
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
                                <Divider orientation={"left"}><span>基本信息</span><Icon type="list"/></Divider>
                                <table className="table table-bordered table-condensed">
                                    <tbody>
                                    <tr>
                                        <td style={{minWidth: 80}}>产品编号</td>
                                        <td>{product["product_id"]}</td>
                                    </tr>
                                    <tr>
                                        <td>产品名称</td>
                                        <td><h4>{product["name"]}</h4></td>
                                    </tr>
                                    <tr>
                                        <td>规格型号</td>
                                        <td>{product["specification"]}</td>
                                    </tr>
                                    <tr>
                                        <td>英文名</td>
                                        <td>{product["description"]}</td>
                                    </tr>
                                    <tr>
                                        <td>度量单位</td>
                                        <td>{product["measurement_unit"]}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><Button type="primary" icon="edit" style={btnStyle}
                                                    onClick={props.editProductBtnOnclick}>更新</Button></td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <Divider orientation={"left"}><span>详细信息</span><Icon type="picture"/></Divider>
                                <img
                                    src={"/public/assets/products_img/" + product["product_id"] + "/" + product["product_id"] + ".png"}
                                    style={{width: '95%', border: 'solid 2px white'}}/>
                            </div>
                        </Spin>
                    </div>
                </div>
            )
        } else if (page === 'edit_one') {
            let product = props.one_product['product'];
            const fp_props = {
                name: 'file',
                multiple: false,
                action: '/api/products/product/upload_img/' + product['product_id'],
                headers: authHeader(),
                onChange(info) {
                    const status = info.file.status;
                    if (status !== 'uploading') {
                        console.log(info.file, info.fileList);
                    }
                    if (status === 'done') {
                        message.success(`${info.file.name} 文件上传成功.`);
                    } else if (status === 'error') {
                        message.error(`${info.file.name} 文件上传失败.`);
                    }
                },
            };
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backFromEditBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h4>上传产品详情截图</h4>
                        <Dragger {...fp_props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">单击或拖拽文件到这里上传</p>
                        </Dragger>
                    </div>
                </div>
                <div className="row">
                    <WrappedEditProductForm one_product={props.one_product} product_types={props.product_types}/>
                </div>
            </div>)

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
        let sub_page = props.location.pathname;
        let page_conf = {}
        if (sub_page.indexOf('mianliao') >= 0) {
            page_conf = {
                product_sub_page: 'product_mianliao_page',
                breadcrumb: '阻燃产品',
                product_type_id_minmax: ['7100', '7200']
            }
        } else if (sub_page.indexOf('fengguan') >= 0) {
            page_conf = {
                product_sub_page: 'product_fengguan_page',
                breadcrumb: '风管产品',
                product_type_id_minmax: ['7200', '7300']
            }
        }
        this.state = {
            page_conf: page_conf,
            loading: true,
            page: 'view_all',//view_one/add_new/view_all/edit_product
            breadcrumb: page_conf.breadcrumb,
            one_product: {},
            one_product_type: '',
            product_types: [],
            products: [],
            addNewProductType: '70001',
            product_table_columns: [
                {
                    title: '产品编号',
                    dataIndex: 'product_id',
                    key: 'product_id'
                },
                {
                    title: '产品名称',
                    dataIndex: 'name',
                    key: 'name',

                }, {
                    title: '英文名',
                    dataIndex: 'description',
                    key: 'description',
                },
                {
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
        this.handleBackFromEditBtnOnclick = this.handleBackFromEditBtnOnclick.bind(this);
        this.handleEditProductBtnOnclick = this.handleEditProductBtnOnclick.bind(this);


        productService.getAllProductTypes().then(data => {
            let all_types = data["product_types"];
            let show_types = [];
            let tmp_tp;
            for (let tp_idx in all_types) {
                tmp_tp = all_types[tp_idx];
                if (tmp_tp['product_type_id'] >= this.state.page_conf.product_type_id_minmax[0]
                    && tmp_tp['product_type_id'] < this.state.page_conf.product_type_id_minmax[1]) {
                    show_types.push(tmp_tp)
                }
            }
            this.setState({product_types: show_types});
            if (show_types[0]) {
                productService.getByProductTypeId(show_types[0]['product_type_id']).then(data => {
                    this.setState({
                        products: data["products"],
                        one_product_type: show_types[0]['product_type_id'],
                        breadcrumb: show_types[0]['name'] + ' 共 ' + data["products"].length + ' 条',
                        loading: false
                    });
                });
            }else{
                this.setState({
                    breadcrumb: '没有该类产品',
                    loading: false
                });
            }
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
            productService.getByProductTypeId('7001').then(data => {
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
                this.setState({
                    products: data["products"],
                    loading: false,
                    one_product_type: e,
                    breadcrumb: this.state.page_conf.breadcrumb + ' 共 ' + data["products"].length + ' 条'
                });
            });
        } else {
            productService.getByProductTypeId(e).then(data => {
                this.setState({
                    products: data["products"],
                    loading: false,
                    one_product_type: e,
                    breadcrumb: '产品类别: ' + this.typename(e) + ' 共 ' + data["products"].length + ' 条'
                });
            });
        }
    }

    handleAddNewBtnOnclick() {
        this.setState({page: "add_new", breadcrumb: '新建产品信息'});
    }

    handleBackFromAddNewBtnOnclick() {
        this.setState({page: "view_all", breadcrumb: this.state.page_conf.breadcrumb + ' 共 ' + this.state.products.length + ' 条'});
    }

    handleBackFromEditBtnOnclick() {
        let product_id = this.state.one_product['product'].product_id;
        productService.getByProductId(product_id).then(data => {
            this.setState({page: "view_one", breadcrumb: '产品详情: ' + product_id, one_product: data, loading: false});
        });
    }

    handleEditProductBtnOnclick() {
        this.setState({page: "edit_one", breadcrumb: '编辑产品信息'});
    }

    handleAddNewProductTypeSelectChange(e) {
        this.setState({addNewProductType: e});
    }

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={[this.state.page_conf.product_sub_page]} defaultOpenKeys={['product_m']}/>
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
                                         typeName={this.typename}
                                         backFromAddNewBtnOnclick={this.handleBackFromAddNewBtnOnclick}
                                         editProductBtnOnclick={this.handleEditProductBtnOnclick}
                                         backFromEditBtnOnclick={this.handleBackFromEditBtnOnclick}
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