import React from 'react';

import Banner from './Banner';
import HeaderCss from '@/styles/header.scss';
import Tab from './Tab';
import SearchBar from './SearchBar';
import List from './List';
import TabBar from './TabBar';



export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            position: "三门峡"
        }
    };
    componentWillReceiveProps() {
        console.log(1111)

    }
    componentDidMount() {
        console.log(111111111);
        const ts = Date.parse(new Date()) / 1000;
        fetch(`/api/WebService.asmx/AcquireSecretKey`, {
            method: 'POST',
            headers: {
                // 'Accept': '*/*',
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Length": 20
            },
            // body: JSON.stringify({
            //     type: 2,
            //     ts: ts,
            // })
            body: {
                type: 2,
                ts: ts,
            }
        }).then(function (data) {
            // return data.json();
        }).then((res) => {
            console.log(res);
        });
    }
    render() {
        return <header className={HeaderCss.header}>
            <Banner></Banner>
            <div className={HeaderCss.position}>{this.state.position}</div>
            <Tab></Tab>
            <SearchBar></SearchBar>
            <List></List>
            <TabBar></TabBar>
        </header>
    }
}
