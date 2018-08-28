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
                    <Table rowKey="id" columns={props.item_table_columns({checkDetailOnclick:props.checkDetailOnclick})}
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
            loading: true,
            page: childPageConstrants.viewAll,//view_one/add_new/view_all/edit_user
            breadcrumb: '全部' + props.breadcrumbKeyWord + '信息',
            breadcrumbKeyWord: props.breadcrumbKeyWord,
            service: props.service,
            _compnViewOne: props._compnViewOne,
            _compnCreateOne: props._compnCreateOne,
            _compnEditOne: props._compnEditOne,
            siderDefaultMenuKey:props.siderDefaultMenuKey,
            siderDefaultOpenKeys:props.siderDefaultOpenKeys,
            subTitle:props.subTitle,
            items: [],
            one_item: {},
            item_table_columns: props.item_table_columns,
        }

        props.service.getAll().then(data => {
            this.setState({
                items: data,
                loading: false,
                breadcrumb: '全部' + this.state.breadcrumbKeyWord + '信息 共 ' + data.length + ' 条'
            });
        });

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
            breadcrumb: '添加' + this.state.breadcrumbKeyWord + '信息'
        });
    }

    handleReloadBtnOnclick() {
        this.setState({loading: true});
        this.state.service.getAll().then(data => {
            this.setState({
                page: childPageConstrants.viewAll,
                items: data,
                loading: false,
                breadcrumb: '全部' + this.state.breadcrumbKeyWord + '信息 共 ' + data.length + ' 条'
            });
        });
    }

    handleCheckDetailOnclick(e) {
        this.setState({loading: true});
        // let user_name = e.target.attributes.user_name.value;
        let id = e.target.attributes.id.value;
        this.state.service.getOneItemById(id).then(data => {
            this.setState({
                page: childPageConstrants.viewOne,
                breadcrumb: this.state.breadcrumbKeyWord + '详细信息',
                one_item: data,
                loading: false
            });
        });
    }

    handleBackViewOneBtnOnclick() {
        this.setState({
            page: childPageConstrants.viewAll,
            breadcrumb: '全部' + this.state.breadcrumbKeyWord + '信息 共 ' + this.state.items.length + ' 条'
        });
    }

    handleEditOneBtnOnclick() {
        this.setState({
            page: childPageConstrants.editOne,
            breadcrumb: '更新' + this.state.breadcrumbKeyWord + '信息'
        });
    }

    handleDeleteOneBtnOnclick() {
        this.setState({loading: true});
        // let user_id = this.state.one_user.user["user_id"];
        let id = this.state.one_item["id"];
        this.state.service.deleteOneItemById(id).then(data => {
            this.handleReloadBtnOnclick();
        });
    }

    handleBackEditOneBtnOnclick() {
        this.setState({loading: true});
        let id = this.state.one_item["id"];
        this.state.service.getOneItemById(id).then(data => {
            this.setState({
                page: childPageConstrants.viewOne,
                breadcrumb: this.state.breadcrumbKeyWord + '详细信息',
                one_item: data,
                loading: false
            });
        });
    }


    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={this.state.siderDefaultMenuKey} defaultOpenKeys={this.state.siderDefaultOpenKeys}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <div className="page-header">
                                {this.state.subTitle}
                                <Breadcrumb style={{display: "inline"}}>
                                    <Breadcrumb.Item> </Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.breadcrumb}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <PageContent
                                loading={this.state.loading}
                                page={this.state.page}
                                breadcrumbKeyWord={this.state.breadcrumbKeyWord}
                                items={this.state.items}
                                one_item={this.state.one_item}
                                item_table_columns={this.state.item_table_columns}
                                _compnViewOne={this.state._compnViewOne}
                                _compnCreateOne={this.state._compnCreateOne}
                                _compnEditOne={this.state._compnEditOne}
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