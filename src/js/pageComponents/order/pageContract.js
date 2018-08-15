import React from 'react';
import {Table, Spin, Tag, Tabs, Icon, Layout, Breadcrumb, Divider, Upload, Button,message} from 'antd';
import {orderService} from "../../_services/order.service";
import { authHeader } from '../../_helpers/auth-header';

const {Header, Content, Footer, Sider} = Layout;
const Dragger = Upload.Dragger;
import CompnSider from "../../_components/compnSider"
import CompnHeader from "../../_components/compnHeader"
import CompnFooter from "../../_components/compnFooter"

const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
    const columns = [
        {
            title: '合同编号',
            dataIndex: 'contract_id',
            key: 'contract_id'
        },
        {
            title: '负责人',
            dataIndex: 'sign_by_user_name',
            key: 'sign_by_user_name'
        },
        {
            title: '客户',
            dataIndex: 'customer_id',
            key: 'customer_id',
            // render: (text) => {
            //     let company_name = props.customers[text]["company_name"];
            //     if (company_name) {
            //         return (<span>{company_name}</span>)
            //     } else {
            //         return (<span>公司编号:{text}</span>)
            //     }
            //
            // }
        },
        {
            title: '签署日期',
            dataIndex: 'start_date',
            key: 'start_date'
        },
        {
            title: '合同状态',
            dataIndex: 'contract_status',
            key: 'contract_status',
            render: (text) => {
                return (
                    <span>
                    <Tag color="purple">{text}</Tag>
                    </span>)
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
                        <a href="javascript:;" onClick={props.checkDetailOnclick}
                           contract_id={record.contract_id}>查看详情</a>
                        </span>)
            },
        }];
    const fp_props = {
        name: 'file',
        multiple: true,
        action: '/api/orders/upload_file',
        headers:authHeader(),
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
    if (props.page === 'view_all') {
        return (<div>
            <div>
                <Button type="primary" style={btnStyle} onClick={props.addNewBtnOnclick}>
                    <Icon type="plus"/>
                    <span>新建合同信息</span>
                </Button>
                <Button type="primary" style={btnStyle} onClick={props.reloadBtnOnclick}>
                    <Icon type="reload"/>
                    <span>刷新</span>
                </Button>
            </div>
            <Spin spinning={props.loading}>
                <Table rowKey="id" columns={columns} dataSource={props.contracts} size="small"/>
            </Spin>
        </div>)
    } else if (props.page === 'view_one') {
        return (<div>
            <div className="col-sm-12 col-md-6">
                <Button type="primary" style={btnStyle} onClick={props.backToViewAllBtnOnclick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                <div className="row">
                    <Divider orientation={"left"}><span>合同书面信息</span><Icon type="book"/></Divider>
                    <div className="col-sm-12 col-md-6">
                        <img src={require("../../../assets/img/products_img/lenovo1.jpg")}
                             style={{width: '90%', border: 'solid 2px white'}}/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <img src={require("../../../assets/img/products_img/lenovo2.jpg")}
                             style={{width: '90%', border: 'solid 2px white'}}/>
                    </div>
                </div>
            </div>
        </div>);
    } else if (props.page === 'add_new') {
        return (<div>
            <div className="col-sm-12 col-md-6">
                <Button type="primary" style={btnStyle} onClick={props.backToViewAllBtnOnclick}>
                    <Icon type="left"/>
                    <span>返回</span>
                </Button>
                <h3>新建合同信息</h3>
                <Dragger {...fp_props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">单击或拖拽文件到这里上传</p>
                    <p className="ant-upload-hint">可以选择一个或者多个文件</p>
                </Dragger>
            </div>
        </div>);
    }
};
export default class PageContract extends React.Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading: true,
            breadcrumb: '我的合同',
            page: 'view_all',
            contracts: [],
            one_contract: {}
        };

        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this)
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this)
        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this)
        this.handleBackToViewAllBtnOnclick = this.handleBackToViewAllBtnOnclick.bind(this)

        orderService.getContractsByUserName().then(data => {
            this.setState({
                contracts: data['contracts'],
                loading: false,
                breadcrumb: '所有合同, 共' + data['contracts'].length + '条'
            });
        });

    };

    handleAddNewBtnOnclick() {
        this.setState({page: "add_new", breadcrumb: '添加新合同'});
    }

    handleReloadBtnOnclick() {
        this.setState({loading: true});
        orderService.getContractsByUserName().then(data => {
            this.setState({
                contracts: data['contracts'],
                loading: false,
                breadcrumb: '所有合同, 共' + data['contracts'].length + '条'
            });
        });
    }

    handleCheckDetailOnclick(e) {
        this.setState({loading: true});
        let contract_id = e.target.attributes.contract_id.value;
        orderService.getContractById(contract_id).then(data => {
            this.setState({
                page: "view_one",
                one_contract: data['contract'],
                loading: false,
                breadcrumb: '合同详情:' + contract_id,
            });
        });
    }

    handleBackToViewAllBtnOnclick() {
        this.setState({page: "view_all", breadcrumb: '所有订单'});
    }


    render() {
        return (
            <Layout style={{background: '#fff', height: '100%'}}>
                <CompnSider defaultMenuKey={['contract_page']} defaultOpenKeys={['order_m']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                <h4 style={{display: "inline"}}>
                                    <Icon type="shopping-cart"/>
                                    <span>合同管理</span>
                                </h4>
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent
                                page={this.state.page}
                                loading={this.state.loading}
                                contracts={this.state.contracts}
                                one_contract={this.state.one_contract}
                                addNewBtnOnclick={this.handleAddNewBtnOnclick}
                                reloadBtnOnclick={this.handleReloadBtnOnclick}
                                checkDetailOnclick={this.handleCheckDetailOnclick}
                                backToViewAllBtnOnclick={this.handleBackToViewAllBtnOnclick}/>
                        </div>
                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        )
    }
}