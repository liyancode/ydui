import React from 'react';
import {Card, Icon, Tag,Layout, Menu, Badge, Avatar,Button} from 'antd';
const {Content, Footer} = Layout;
import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"

const PageHome = (props) => {
    return (
        <Layout style={{height: '100%'}}>
            <CompnSider defaultMenuKey={['0']}/>
            <Layout>
                <CompnHeader/>
                <Content style={{margin: '12px 12px 0'}}>
                    <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                        <h4 className="page-header">
                            <Icon type="home"/>
                            <span>首页</span>
                        </h4>
                    </div>
                </Content>
                <CompnFooter/>
            </Layout>
        </Layout>
    )
}

export default PageHome;