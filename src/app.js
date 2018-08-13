import React from 'react';
import {render} from 'react-dom';
import {HashRouter, Router, Route,Switch} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

// import { browserHistory,Router, Route,Switch } from 'react-router'

import './3rdparty/bootstrap-3.3.7-dist/css/bootstrap.min.css'

//
// import 'jquery'
// import './3rdparty/bootstrap-3.3.7-dist/js/bootstrap.min.js'
// import './_global.less'
import {authorityHash} from './js/_helpers/authorityConstants.js';
import {PrivateRoute} from './js/PrivateRoute'

import Login from './js/login'
import PageHome from "./js/pageComponents/pageHome"
import PageFin from "./js/pageComponents/pageFin";
import PageCRM from "./js/pageComponents/pageCRM";
import PageWereHouse from "./js/pageComponents/pageWereHouse";
import PageHR from "./js/pageComponents/pageHR";

import './css/style.css';
import PageAskPrice from "./js/pageComponents/order/pageAskprice";
import PageContract from "./js/pageComponents/order/pageContract";
import PageOrder from "./js/pageComponents/order/pageOrder";
import PageProductFengguan from "./js/pageComponents/product/pageProductFengguan"
import PageProductMianliao from "./js/pageComponents/product/pageProductMianliao"

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
            private_routes.push(<PrivateRoute path="/hr" component={PageHR} key='prt_hr'/>)
        }
        //--- crm
        if (user_authority['crm'] !== 'n') {
            private_routes.push(<PrivateRoute path="/crm" component={PageCRM} key='prt_crm'/>)
        }
        //--- order
        if (user_authority['order'] !== 'n') {
            private_routes.push(<PrivateRoute path="/ask_price" component={PageAskPrice} key='prt_ask_price'/>)
            private_routes.push(<PrivateRoute path="/contract" component={PageContract} key='prt_contract'/>)
            private_routes.push(<PrivateRoute path="/order" component={PageOrder} key='prt_order'/>)
        }
        //--- fin
        if (user_authority['fin'] !== 'n') {
            private_routes.push(<PrivateRoute path="/fin" component={PageFin} key='prt_fin'/>)
        }
        //--- product
        if (user_authority['product'] !== 'n') {
            private_routes.push(<PrivateRoute path="/product_fengguan" component={PageProductFengguan} key='prt_product_fengguan'/>)
            private_routes.push(<PrivateRoute path="/product_mianliao" component={PageProductMianliao} key='prt_product_mianliao'/>)
        }
        //--- warehouse
        if (user_authority['warehouse'] !== 'n') {
            private_routes.push(<PrivateRoute path="/warehouse" component={PageWereHouse} key='prt_warehouse'/>)
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