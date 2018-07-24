import React from 'react';
import { Tabs, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

const tabs = [
  { title: '附近'},
  { title: '全部'},
  { title: '智能排序'},
];

export default class TabExample extends React.Component {
  render() {
    return <Tabs tabs={tabs}
      initialPage={0}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
    </Tabs>
  }
};
