import React from 'react';
import {render} from 'react-dom';
import {HashRouter, Router, Route,Switch} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import "isomorphic-fetch"

import "@babel/polyfill";

// import { browserHistory,Router, Route,Switch } from 'react-router'

import './assets/3rdparty/bootstrap-3.3.7-dist/css/bootstrap.min.css'

//
// import 'jquery'
// import './3rdparty/bootstrap-3.3.7-dist/js/bootstrap.min.js'
// import './_global.less'
import {authorityHash} from './js/_helpers/authorityConstants.js';
import {PrivateRoute} from './js/PrivateRoute'

import Login from './js/login'
import PageHome from "./js/pageComponents/pageHome"
import PageCRM from "./js/pageComponents/crm/pageCRM";

import './assets/css/style.css';
import PageProduct from "./js/pageComponents/product/pageProduct"
import PageContractN from "./js/pageComponents/order/pageContractN";
import PageAskPriceN from "./js/pageComponents/order/pageAskpriceN";
import PageOrderN from "./js/pageComponents/order/pageOrderN";

import PageInventory from "./js/pageComponents/warehouse/pageInventory";

import PageFinApproval  from "./js/pageComponents/fin/pageFinApproval";

import PageUserMyPage  from "./js/pageComponents/user/pageUserMyPage";
import PageUserMyApplication  from "./js/pageComponents/user/pageUserMyApplication";
import PageUserMyDepartment  from "./js/pageComponents/user/pageUserMyDepartment";
import PageUserAdmin from "./js/pageComponents/user/pageUserAdmin"


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "hr",
            hr_data:{}
        }
        this.handleSidebarLinkOnclick = this.handleSidebarLinkOnclick.bind(this);
    }

    handleSidebarLinkOnclick(e) {
        const target = e.target;
        const link_page = target.getAttribute("link_page");
        this.setState(
            {
                page: link_page // hr/order/crm/finance/warehouse
            }
        );
    }

    render() {
        let private_routes=[];
        const user_authority = authorityHash();
        //--- hr
        if (user_authority['hr'] !== 'n') {
            // private_routes.push(<PrivateRoute path="/hr_myinfo" component={PageHRMyInfo} key='prt_hr_myinfo'/>)
            // if(user_authority['hr']==='rw'){
            //     private_routes.push(<PrivateRoute path="/hr_allusers" component={PageHRAllUsers} key='prt_hr_allusers'/>)
            // }
            private_routes.push(<PrivateRoute path="/hr_myinfo" component={PageUserMyPage} key='prt_hr_myinfo'/>)
            private_routes.push(<PrivateRoute path="/hr_my_application" component={PageUserMyApplication} key='prt_hr_my_application'/>)
            private_routes.push(<PrivateRoute path="/hr_my_department" component={PageUserMyDepartment} key='prt_hr_my_department'/>)
            if(user_authority['hr']==='rw'){
                private_routes.push(<PrivateRoute path="/hr_allusers" component={PageUserAdmin} key='prt_hr_allusers'/>)
            }
        }
        //--- crm
        if (user_authority['crm'] !== 'n') {
            private_routes.push(<PrivateRoute path="/crm_my" component={PageCRM} key='prt_crm_my'/>)
            if(user_authority['crm']==='rw'){
                private_routes.push(<PrivateRoute path="/crm_all" component={PageCRM} key='prt_crm_all'/>)
            }
        }
        // if (user_authority['crm'] !== 'n') {
        //     private_routes.push(<PrivateRoute path="/crm_my" component={PageCRMMy} key='prt_crm_my'/>)
        //     if(user_authority['crm']==='rw'){
        //         private_routes.push(<PrivateRoute path="/crm_all" component={PageCRMMy} key='prt_crm_all'/>)
        //     }
        // }
        //--- order
        if (user_authority['order'] !== 'n') {
            private_routes.push(<PrivateRoute path="/ask_price" component={PageAskPriceN} key='prt_ask_price'/>)
            private_routes.push(<PrivateRoute path="/contract" component={PageContractN} key='prt_contract'/>)
            private_routes.push(<PrivateRoute path="/order" component={PageOrderN} key='prt_order'/>)
        }
        //--- fin
        if (user_authority['fin'] !== 'n') {
            // private_routes.push(<PrivateRoute path="/fin" component={PageFin} key='prt_fin'/>)
            private_routes.push(<PrivateRoute path="/fap_ask_price" component={PageFinApproval} key='prt_fap_ask_price'/>)
        }
        //--- product
        if (user_authority['product'] !== 'n') {
            private_routes.push(<PrivateRoute path="/product_fengguan" component={PageProduct} key='prt_product_fengguan'/>)
            private_routes.push(<PrivateRoute path="/product_mianliao" component={PageProduct} key='prt_product_mianliao'/>)
        }
        //--- warehouse
        if (user_authority['warehouse'] !== 'n') {
            private_routes.push(<PrivateRoute path="/wh_rm" component={PageInventory} key='prt_wh_rm'/>)
            private_routes.push(<PrivateRoute path="/wh_fp" component={PageInventory} key='prt_wh_fp'/>)
            private_routes.push(<PrivateRoute path="/wh_sfp" component={PageInventory} key='prt_wh_sfp'/>)
        }
        return (
            <HashRouter>
                <Switch>
                    <PrivateRoute exact path="/" component={PageHome}/>
                    {private_routes}
                    <Route path="/login" component={Login}/>
                </Switch>
            </HashRouter>
        );
    }
}

render(<LocaleProvider locale={zhCN}><App/></LocaleProvider>, document.getElementById('app'));