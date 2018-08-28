import React from 'react';
import {Icon, Divider} from 'antd';
import CompnPageContent from "../../_components/compnPageContent";

import {contractService} from "../../_services/contract.service"

const _contentViewOne = (props) => {
    let one_item = props.one_item;

    return (
        <div className="col-sm-12 col-md-6">
            <Divider orientation={"left"}><span>合同信息</span><Icon type="team"/></Divider>
            <table className="table table-bordered table-condensed">
                <tbody>
                <tr>
                    <td>合同编号</td>
                    <td>{one_item["contract_id"]}</td>
                </tr>
                <tr>
                    <td>记录创建者</td>
                    <td>{one_item["added_by_user_name"]}</td>
                </tr>
                <tr>
                    <td>合同负责人</td>
                    <td>{one_item["sign_by_user_name"]}</td>
                </tr>
                <tr>
                    <td>签订客户</td>
                    <td>{one_item["customer_id"]}
                    </td>
                </tr>
                <tr>
                    <td>签订时间</td>
                    <td>{one_item["sign_at"]}</td>
                </tr>
                <tr>
                    <td>合同当前状态</td>
                    <td>{one_item["contract_status"]}</td>
                </tr>
                <tr>
                    <td>合同期限</td>
                    <td>{one_item["start_date"]}到{one_item["end_date"]}</td>
                </tr>
                <tr>
                    <td>合同金额</td>
                    <td>{one_item["total_value"]}</td>
                </tr>
                <tr>
                    <td>其他说明</td>
                    <td>{one_item["description"]}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

const _contentCreateOne = (props) => {
    return (
        <div>创建新合同</div>
    );
};

const _contentEditOne = (props) => {
    let one_item = props.one_item;
    console.log('编辑合同:' + one_item);
    return (
        <div>编辑合同</div>
    );
};

const item_table_columns = (props) => {
    return [
        {
            title: '合同编号',
            dataIndex: 'contract_id',
            key: 'contract_id'
        },
        {
            title: '记录创建者',
            dataIndex: 'added_by_user_name',
            key: 'added_by_user_name'
        },
        {
            title: '合同负责人',
            dataIndex: 'sign_by_user_name',
            key: 'sign_by_user_name'
        },
        {
            title: '签订客户',
            dataIndex: 'customer_id',
            key: 'customer_id'
        },
        {
            title: '签订时间',
            dataIndex: 'sign_at',
            key: 'sign_at'
        },
        {
            title: '合同当前状态',
            dataIndex: 'contract_status',
            key: 'contract_status'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (<span>
                        <a href="javascript:;"
                            onClick={props.checkDetailOnclick}
                           id={record["id"]}>详细信息</a>
                        </span>)
            },
        }
    ]
};

const subTitle = (
    <h4 style={{display: "inline"}}>
        <Icon type="team"/>
        <span>合同管理</span>
    </h4>
)

export default class PageContractN extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <CompnPageContent
                breadcrumbKeyWord="合同"
                service={contractService}
                _compnViewOne={_contentViewOne}
                _compnCreateOne={_contentCreateOne}
                _compnEditOne={_contentEditOne}
                item_table_columns={item_table_columns}
                subTitle={subTitle}
                siderDefaultMenuKey={['contract_page']}
                siderDefaultOpenKeys={['order_m']}
            />
        )
    }
}