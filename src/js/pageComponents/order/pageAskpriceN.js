import React from 'react';
import {Icon, Divider, Tag} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {askPriceService} from "../../_services/askprice.service"

const _contentViewOne = (props) => {
    let one_item = props.one_item;

    return (
        <div className="col-sm-12 col-md-6">
            <Divider orientation={"left"}><span>询价信息</span><Icon type="team"/></Divider>
            <table className="table table-bordered table-condensed">
                <tbody>
                <tr>
                    <td>编号</td>
                    <td>{one_item["ask_price_id"]}</td>
                </tr>
                <tr>
                    <td>创建时间</td>
                    <td>{one_item["created_at"]}</td>
                </tr>
                <tr>
                    <td>客户</td>
                    <td>{one_item["customer_id"]}</td>
                </tr>
                <tr>
                    <td>审批人</td>
                    <td>{one_item["approve_by_user_name"]}
                    </td>
                </tr>
                <tr>
                    <td>审批状态</td>
                    <td>{one_item["approve_status"]}</td>
                </tr>
                <tr>
                    <td>询价描述</td>
                    <td>{one_item["description"]}</td>
                </tr>
                <tr>
                    <td>最后更新</td>
                    <td>{one_item["last_update_at"]}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

const _contentCreateOne = (props) => {
    return (
        <div>创建新询价</div>
    );
};

const _contentEditOne = (props) => {
    let one_item = props.one_item;
    console.log(one_item);
    return (
        <div>编辑询价</div>
    );
};

const item_table_columns = (props) => {
    return [
        {
            title: '编号',
            dataIndex: 'ask_price_id',
            key: 'ask_price_id'
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
        }, {
            title: '客户编号',
            dataIndex: 'customer_id',
            key: 'customer_id',
        }, {
            title: '询价描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '审批人',
            dataIndex: 'approve_by_user_name',
            key: 'approve_by_user_name',
        }, {
            title: '审批状态',
            dataIndex: 'approve_status',
            key: 'approve_status',
            render: (text) => {
                if (text === 'waiting') {
                    return (
                        <span>
                    <Tag color="geekblue">等待审批</Tag>
                    </span>
                    )
                } else if (text === 'pass') {
                    return (
                        <span>
                    <Tag color="green">审批通过</Tag>
                    </span>
                    )
                } else {
                    return (
                        <span>
                    <Tag color="red">审批拒绝</Tag>
                    </span>
                    )
                }

            }
        }, {
            title: '最后更新',
            dataIndex: 'last_update_at',
            key: 'last_update_at',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
            <a href="javascript:;" onClick={props.checkDetailOnclick}
               id={record.id}>查看详情</a>
            </span>)
            },
        }]
};

const subTitle = (
    <h4 style={{display: "inline"}}>
        <Icon type="team"/>
        <span>询价管理</span>
    </h4>
)

export default class PageAskPriceN extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <CompnPageContent
                breadcrumbKeyWord="询价"
                service={askPriceService}
                _compnViewOne={_contentViewOne}
                _compnCreateOne={_contentCreateOne}
                _compnEditOne={_contentEditOne}
                item_table_columns={item_table_columns}
                subTitle={subTitle}
                siderDefaultMenuKey={['ask_price_page']}
                siderDefaultOpenKeys={['order_m']}
            />
        )
    }
}