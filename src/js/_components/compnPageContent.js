import React from 'react';
import {Popconfirm, Icon, Spin, Layout, Table, Breadcrumb, Button} from 'antd';

const {Content} = Layout;

import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

import {childPageConstrants} from "../_helpers/childPageConstrants"

const PageContent = (props) => {
    const btnStyle = {
        marginRight: '8px',
        marginBottom: '12px'
    }
    if (props.page) {
        let page = props.page;
        let one_item = props.one_item;
        let breadcrumbKeyWord = props.breadcrumbKeyWord;

        if (page === childPageConstrants.viewAll) {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.addNewBtnOnclick}>
                        <Icon type="plus"/>
                        <span>添加{breadcrumbKeyWord}信息</span>
                    </Button>
                    <Button type="primary" style={btnStyle} onClick={props.reloadBtnOnclick}>
                        <Icon type="reload"/>
                        <span>刷新</span>
                    </Button>
                </div>
                <Spin spinning={props.loading} tip="加载中..." size="large">
                    <Table rowKey="id" columns={props.item_table_columns({items:props.items,checkDetailOnclick:props.checkDetailOnclick})}
                           dataSource={props.items} size="small"/>
                </Spin>
            </div>);
        } else if (page === childPageConstrants.viewOne) {
            return (<div>
                <div>
                    <Button type="primary" style={btnStyle} onClick={props.backViewOneBtnOnclick}>
                        <Icon type="left"/>
                        <span>返回</span>
                    </Button>
                    <Button type="primary" style={btnStyle} onClick={props.editOneBtnOnclick}>
                        <Icon type="edit"/>
                        <span>更新该{breadcrumbKeyWord}信息</span>
                    </Button>
                    <Popconfirm title="确认删除？" onConfirm={props.deleteOneBtnOnclick}
                                okText="是" cancelText="否">
                        <Button type="danger" style={btnStyle}>
                            <Icon type="user-delete"/>
                            <span>删除该{breadcrumbKeyWord}信息</span>
                        </Button>
                    </Popconfirm>
                </div>
                <div>
                    {props._compnViewOne({one_item:one_item})}
                </div>
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
                    {/*<WrappedNewUserForm/>*/}
                    {props._compnCreateOne()}
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
                    {/*<WrappedEditUserForm one_user={props.one_user}/>*/}
                    {props._compnCreateOne({one_item:one_item})} />
                </div>)
        }
    } else {
        return (<div>未知页面</div>);
    }
}

export default class CompnPageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: childPageConstrants.viewAll,//view_one/add_new/view_all/edit_user
            breadcrumb: '全部' + props.breadcrumbKeyWord + '信息',
        }

        this.handleAddNewBtnOnclick = this.handleAddNewBtnOnclick.bind(this);
        this.handleReloadBtnOnclick = this.handleReloadBtnOnclick.bind(this);
        this.handleCheckDetailOnclick = this.handleCheckDetailOnclick.bind(this);
        this.handleBackViewOneBtnOnclick = this.handleBackViewOneBtnOnclick.bind(this);
        this.handleEditOneBtnOnclick = this.handleEditOneBtnOnclick.bind(this);
        this.handleDeleteOneBtnOnclick = this.handleDeleteOneBtnOnclick.bind(this);
        this.handleBackEditOneBtnOnclick = this.handleBackEditOneBtnOnclick.bind(this);
    }

    handleAddNewBtnOnclick() {
        this.setState({
            page: childPageConstrants.createOne,
            breadcrumb: '添加' + this.props.breadcrumbKeyWord + '信息'
        });
    }

    handleReloadBtnOnclick() {
        this.props.update_items();
    }

    handleCheckDetailOnclick(e) {
        this.setState({page: childPageConstrants.viewOne,breadcrumb: this.props.breadcrumbKeyWord + '详细信息',});
        let id = e.target.attributes.id.value;
        this.props.update_one_item(id);
    }

    handleBackViewOneBtnOnclick() {
        this.setState({
            page: childPageConstrants.viewAll,
            breadcrumb: '全部' + this.props.breadcrumbKeyWord + '信息 共 ' + this.props.items.length + ' 条'
        });
    }

    handleEditOneBtnOnclick() {
        this.setState({
            page: childPageConstrants.editOne,
            breadcrumb: '更新' + this.props.breadcrumbKeyWord + '信息'
        });
    }

    handleDeleteOneBtnOnclick() {
        this.props.delete_one_item();
    }

    handleBackEditOneBtnOnclick() {
        this.setState({page: childPageConstrants.viewOne,breadcrumb: this.props.breadcrumbKeyWord + '详细信息',});
        let id = this.props.one_item["id"];
        this.props.update_one_item(id);
    }


    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={this.props.siderDefaultMenuKey} defaultOpenKeys={this.props.siderDefaultOpenKeys}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                {this.props.subTitle()}
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent
                                loading={this.props.loading}
                                page={this.state.page}
                                breadcrumbKeyWord={this.props.breadcrumbKeyWord}
                                items={this.props.items}
                                one_item={this.props.one_item}
                                item_table_columns={this.props.item_table_columns}
                                _compnViewOne={this.props._compnViewOne}
                                _compnCreateOne={this.props._compnCreateOne}
                                _compnEditOne={this.props._compnEditOne}
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
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        );
    }
}