import React from 'react';
import {Layout} from 'antd';
const {Footer} = Layout;

const CompnFooter = (props) => {
    return (
        <Footer style={{textAlign: 'center',background:'transparent',color:props.color}}>
            ©2018 江苏耀迪新材料有限公司
        </Footer>
    );
};
export default CompnFooter;