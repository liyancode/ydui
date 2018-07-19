import React from 'react';
import {Card, Icon, Tag,Layout, Menu, Badge, Avatar,Button} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

const PageFin=(props)=> {
    return (
        <Layout style={{height: '100%'}}>
            <CompnSider defaultMenuKey={['4']}/>
            <Layout>
                <CompnHeader/>
                <Content>
                    <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                        <h4 className="page-header">
                            <Icon type="pay-circle-o"/>
                            <span>财务管理</span>
                        </h4>
                    </div>
                </Content>
                <CompnFooter/>
            </Layout>
        </Layout>
    )
}

export default PageFin;