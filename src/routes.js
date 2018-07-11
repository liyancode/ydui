import React from 'react';

import Navbar from './js/componentNavbar';
import Sidebar from './js/componentSidebar';
import Main from "./js/componentMain";

const PrimaryLayout = () => (
    <div>
        <Navbar/>
        <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <Main/>
            </div>
        </div>
    </div>
);

export default PrimaryLayout;
