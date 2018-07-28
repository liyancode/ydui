import React from 'react';
import {render} from 'react-dom';
import {HashRouter, Router, Route,Switch} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';


import './3rdparty/bootstrap-3.3.7-dist/css/bootstrap.min.css'

//
// import 'jquery'
// import './3rdparty/bootstrap-3.3.7-dist/js/bootstrap.min.js'
// import './_global.less'
import {PrivateRoute} from './js/PrivateRoute'

import Login from './js/login'
import PageHome from "./js/pageComponents/pageHome"
import PageFin from "./js/pageComponents/pageFin";
import PageCRM from "./js/pageComponents/pageCRM";
import PageWereHouse from "./js/pageComponents/pageWereHouse";
import PageHR from "./js/pageComponents/pageHR";

import './css/style.css';
import PageProduct from "./js/pageComponents/pageProduct";
import PageAskPrice from "./js/pageComponents/order/pageAskprice";
import PageContract from "./js/pageComponents/order/pageContract";
import PageOrder from "./js/pageComponents/order/pageOrder";

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
        return (
            <HashRouter>
                <Switch>
                    <PrivateRoute exact path="/" component={PageHome}/>
                    <PrivateRoute path="/hr" component={PageHR}/>
                    <PrivateRoute path="/crm" component={PageCRM}/>
                    <PrivateRoute path="/ask_price" component={PageAskPrice}/>
                    <PrivateRoute path="/contract" component={PageContract}/>
                    <PrivateRoute path="/order" component={PageOrder}/>
                    <PrivateRoute path="/product" component={PageProduct}/>
                    <PrivateRoute path="/fin" component={PageFin}/>
                    <PrivateRoute path="/werehouse" component={PageWereHouse}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </HashRouter>
        );
    }
}

render(<LocaleProvider locale={zhCN}><App/></LocaleProvider>, document.getElementById('app'));