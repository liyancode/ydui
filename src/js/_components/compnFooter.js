import React from 'react';
import {Layout,Tag,Icon} from 'antd';
const {Footer} = Layout;

const CompnFooter = (props) => {
    return (
        <Footer style={{textAlign: 'center',background:'transparent',color:props.color}}>
            <Icon type="copyright" /><span>2018 江苏耀迪新材料有限公司&nbsp;&nbsp;</span>
            <Tag><Icon type="safety" style={{color:"#00ac47"}}/>耀迪·管理助手 版本v0.1</Tag>
        </Footer>
    );
};
export default CompnFooter;