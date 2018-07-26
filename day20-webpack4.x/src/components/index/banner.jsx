import React from 'react';
import { Carousel } from 'antd-mobile';
import App from '../../assets/libs/require';
import settings from '../../../settings/settings';

class Banner extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: false,
      imgHeight: '200',
      banner: []
    }
  }

  componentWillMount() {
    let that = this;
    App.getFetch('/ClientService.asmx/PhysiognomyAd?', {}, function (res) {
      console.log(res);
      if (res.msgcode == 1) {
        that.setState({
          banner: res.data.ad,
          flag: true
        })
      } else {

      }
    }, function (res) {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })
  }
  
  componentDidMount() {
    
  }
  render() {
    return (
      <Carousel
        autoplay={this.state.flag}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
      >
        {this.state.banner.map(val => (
          <a
            key={val.tid}
            href={val.type == 2 ? val.tid : 'javascript:;'}
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={settings.imgSite + val.logo}
              alt=""
              style={{ width: '100%', verticalAlign: 'top',height:this.state.imgHeight }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  }
}

export default Banner;
