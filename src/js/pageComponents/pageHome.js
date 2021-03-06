import React from 'react';
import {Card, Icon, Tag, Layout, Spin, Divider, Button} from 'antd';

const {Content, Footer} = Layout;
import CompnSider from "../_components/compnSider"
import CompnHeader from "../_components/compnHeader"
import CompnFooter from "../_components/compnFooter"
import Highcharts from 'highcharts/highstock';

const PageContent = (props) => {
    const hc_style = {
        height: '240px'
    };
    return (
        <Spin spinning={props.loading}>
            <div className="col-sm-12 col-md-8">
                {/*<div className="row">*/}
                {/*<Divider orientation={"left"}><span>订单信息统计</span><Icon type="area-chart" /></Divider>*/}
                {/*<div className="col-sm-12 col-md-6">*/}
                {/*<div id="home_hc03" style={hc_style}></div>*/}
                {/*</div>*/}
                {/*<div className="col-sm-12 col-md-6">*/}
                {/*<div id="home_hc04" style={hc_style}></div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="row">*/}
                {/*<Divider orientation={"left"}><span>客户信息统计</span><Icon type="area-chart" /></Divider>*/}
                {/*<div className="col-sm-12 col-md-6">*/}
                {/*<div id="home_hc01" style={hc_style}></div>*/}
                {/*</div>*/}
                {/*<div className="col-sm-12 col-md-6">*/}
                {/*<div id="home_hc02" style={hc_style}></div>*/}
                {/*</div>*/}
                {/*</div>*/}
                <Divider orientation={"left"}><span>消息通知</span><Icon type="bell"/></Divider>
                <Card>
                    <p>国务院办公厅关于2018年

                    部分节假日安排的通知

                        国办发明电〔2017〕12号</p>
                    <p>各省、自治区、直辖市人民政府，国务院各部委、各直属机构：</p>

                    <p>经国务院批准，现将2018年元旦、春节、清明节、劳动节、端午节、中秋节和国庆节放假调休日期的具体安排通知如下。</p>

                    <p>一、元旦：1月1日放假，与周末连休。</p>

                    <p>二、春节：2月15日至21日放假调休，共7天。2月11日（星期日）、2月24日（星期六）上班。</p>

                    <p>三、清明节：4月5日至7日放假调休，共3天。4月8日（星期日）上班。</p>

                    <p>四、劳动节：4月29日至5月1日放假调休，共3天。4月28日（星期六）上班。</p>

                    <p>五、端午节：6月18日放假，与周末连休。</p>

                    <p>六、中秋节：9月24日放假，与周末连休。</p>

                    <p>七、国庆节：10月1日至7日放假调休，共7天。9月29日（星期六）、9月30日（星期日）上班。</p>

                    <p>节假日期间，各地区、各部门要妥善安排好值班和安全、保卫等工作，遇有重大突发事件，要按规定及时报告并妥善处置，确保人民群众祥和平安度过节日假期。</p>
                    <p>国务院办公厅

                        2017年11月30日</p>
                </Card>
            </div>
            <div className="col-sm-12 col-md-offset-1 col-md-3">
                <Divider orientation={"left"}><span>系统动态</span><Icon type="clock-circle-o"/></Divider>
                <Divider dashed/>
                <p>张三 添加了一条新的订单信息 <Tag color="green">2018-07-28 10:15</Tag><Icon type="notification"/></p>
                {/*<Divider dashed />*/}
                <p>李四 更新了2条客户信息 <Tag color="green">2018-07-28 9:25</Tag><Icon type="notification"/></p>
                {/*<Divider dashed />*/}
                <p>王五 添加了一条新的订单信息 <Tag color="green">2018-07-27 15:10</Tag><Icon type="notification"/></p>
                {/*<Divider dashed />*/}
                <p>赵六 添加了一条新的订单信息 <Tag color="green">2018-07-26 12:19</Tag><Icon type="notification"/></p>
                {/*<Divider dashed />*/}
                <p>钱峰 添加了一条新的订单信息 <Tag color="green">2018-07-26 10:11</Tag><Icon type="notification"/></p>
                <p>张三 添加了一条新的订单信息 <Tag color="green">2018-07-26 10:15</Tag><Icon type="notification"/></p>
                {/*<Divider dashed />*/}
                <p>李四 更新了2条客户信息 <Tag color="green">2018-07-25 9:25</Tag><Icon type="notification"/></p>
                {/*<Divider dashed />*/}
                <p>王五 添加了一条新的订单信息 <Tag color="green">2018-07-24 15:10</Tag><Icon type="notification"/></p>
                {/*<Divider dashed />*/}
                <p>赵六 添加了一条新的订单信息 <Tag color="green">2018-07-24 12:19</Tag><Icon type="notification"/></p>
                {/*<Divider dashed />*/}
                <p>钱峰 添加了一条新的订单信息 <Tag color="green">2018-07-23 10:11</Tag><Icon type="notification"/></p>
                <p>...更多</p>
            </div>
        </Spin>
    );

}
export default class PageHome extends React.Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading: false,
        }
    }

    // componentDidMount(){
    //     var chart1 = new Highcharts.Chart({
    //         chart: {
    //             renderTo: 'home_hc01',
    //         },
    //         title: {
    //             text: '客户数量统计'
    //         },
    //         xAxis: {
    //             type: 'datetime'
    //         },
    //         series: [{
    //             name: '客户数量',
    //             data: [149, 149,149,149,150,151,153,155,157,160,161,161,161,161,162,162,163,163,164,164,165,165,165,166,166,166,166,167],
    //             pointStart: Date.UTC(2018, 6, 1),
    //             pointInterval: 3600 * 1000*24 // one hour
    //         }]
    //     });
    //     var chart2 = new Highcharts.Chart({
    //         chart: {
    //             renderTo: 'home_hc02',
    //             type: 'column'
    //         },
    //         title: {
    //             text: '销售跟踪客户数量排行'
    //         },
    //         xAxis: {
    //             type: 'category',
    //             labels: {
    //                 rotation: -45  // 设置轴标签旋转角度
    //             }
    //         },
    //
    //         legend: {
    //             enabled: false
    //         },
    //         tooltip: {
    //             pointFormat: '创建客户数: <b>{point.y} </b>'
    //         },
    //         series: [{
    //             name: '客户数',
    //             data: [
    //                 ['赵一', 24],
    //                 ['钱去', 23],
    //                 ['孙二', 20],
    //                 ['李三基', 16],
    //                 ['周里', 16],
    //                 ['吴烟', 15],
    //                 ['郑存', 14],
    //                 ['王思琪', 13],
    //                 ['冯五', 13],
    //                 ['陈佳佳', 12],
    //             ],
    //             dataLabels: {
    //                 enabled: true,
    //                 rotation: -90,
    //                 color: '#FFFFFF',
    //                 align: 'right',
    //                 format: '{point.y}', // :.1f 为保留 1 位小数
    //                 y: 10
    //             }
    //         }]
    //     });
    //     var chart3 = new Highcharts.Chart({
    //         chart: {
    //             renderTo: 'home_hc03',
    //         },
    //         title: {
    //             text: '订单数量统计'
    //         },
    //         xAxis: {
    //             type: 'datetime'
    //         },
    //         series: [{
    //             name: '订单数量',
    //             data: [44, 48,48,49,50,50,50,51,52,60,61,65,66,67,67,68,68,68,69,71,72,73,74,75,71,72,73,74,75],
    //             pointStart: Date.UTC(2018, 6, 1),
    //             pointInterval: 3600 * 1000*24 // one hour
    //         }]
    //     });
    //
    //     var chart3 = new Highcharts.Chart({
    //         chart: {
    //             plotBackgroundColor: null,
    //             plotBorderWidth: null,
    //             plotShadow: false,
    //             type: 'pie',
    //             renderTo: 'home_hc04',
    //         },
    //         title: {
    //             text: '过去6个月各产品所占销售比重'
    //         },
    //         tooltip: {
    //             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //         },
    //         plotOptions: {
    //             pie: {
    //                 allowPointSelect: true,
    //                 cursor: 'pointer',
    //                 dataLabels: {
    //                     enabled: true,
    //                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    //                     style: {
    //                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    //                     }
    //                 }
    //             }
    //         },
    //         series: [{
    //             name: 'Brands',
    //             colorByPoint: true,
    //             data: [{
    //                 name: '净化J型(YD-J-SWQN)',
    //                 y: 31.41,
    //                 sliced: true,
    //                 selected: true
    //             }, {
    //                 name: '芳纶ribstop 220G作训服面料',
    //                 y: 30.0
    //             },{
    //                 name: '暖通T型(YD-T-S1)',
    //                 y: 11.84
    //             }, {
    //                 name: '净化J型(YD-J-SWQN)',
    //                 y: 10.85
    //             }, {
    //                 name: '不燃F型(YD-FS/2/Q)',
    //                 y: 4.67
    //             }, {
    //                 name: '支撑R型(YD-RS-1)',
    //                 y: 4.18
    //             }, {
    //                 name: '保温复合Z型',
    //                 y: 1.64
    //             }, {
    //                 name: '负离子Q型',
    //                 y: 1.6
    //             }, {
    //                 name: 'QQ',
    //                 y: 1.2
    //             }, {
    //                 name: 'Other',
    //                 y: 2.61
    //             }]
    //         }]
    //     });
    // }
    render() {
        return (
            <Layout style={{height: '100%'}}>
                <CompnSider defaultMenuKey={['0']}/>
                <Layout>
                    <CompnHeader/>
                    <Content>
                        <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                            <h4 className="page-header">
                                <Icon type="home"/>
                                <span>首页</span>
                            </h4>
                            <PageContent loading={this.state.loading}/>
                        </div>

                    </Content>
                    <CompnFooter color={'#333'}/>
                </Layout>
            </Layout>
        )
    }
}