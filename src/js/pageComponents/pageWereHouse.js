import React from 'react';
import {Card, Icon, Tag,Layout, Menu, Badge, Avatar,Button} from 'antd';
const {Content} = Layout;
import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

const PageWereHouse=(props)=> {
    return (
        <Layout style={{height: '100%'}}>
            <CompnSider defaultMenuKey={['6']}/>
            <Layout>
                <CompnHeader/>
                <Content>
                    <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                        <h4 className="page-header">
                            <Icon type="database"/>
                            <span>仓储管理</span>
                        </h4>
                    </div>
                </Content>
                <CompnFooter color={'#333'}/>
            </Layout>
        </Layout>
    )
}

export default PageWereHouse;