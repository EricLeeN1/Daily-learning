import React from 'react';
import { Picker, List, Tabs, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import App from '../../assets/libs/require';

export default class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      tabs: [
        { title: '附近' },
        { title: '全部' },
        { title: '智能排序' },
      ],
      cityId: '',
      pickerValue: [],
      manor: [],
      sortList: ['距离最近', '智能排序', '人气最高']
    }
  }
  componentDidMount() {
    let that = this;
    App.getFetch('/ClientService.asmx/GetAllCitys?', {}, function (res) {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      if (res.msgcode == 1) {
        let allCity = res.data;
        allCity.forEach(ele => {
          if (ele.name = "三门峡市") {
            that.setState({
              cityId: ele.id
            });
          }
        });
      }


    });
    App.getFetch('/ClientService.asmx/GetAreasByCityName?', { city: '三门峡市' }, function (res) {
      console.log(res);
      that.setState({
        manor: res.data
      })
    })
  }
  render() {
    return <nav>
      <div>附近</div>
      <div>
        <Picker data={this.state.manor} cols={1} className="forss">
          <List.Item arrow="horizontal">Single</List.Item>
        </Picker>
      </div>
      <div><Picker data={this.state.sortList} extra="智能排序">智能排序</Picker></div>
    </nav>
  }
};
