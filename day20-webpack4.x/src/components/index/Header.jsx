import React from 'react';

import Banner from './Banner';
import HeaderCss from '@/styles/header.scss';
import PickBar from './PickBar';
import SearchBar from './SearchBar';
import List from './List';
import TabBar from './TabBar';

import CryptoJS from 'crypto-js';

import Settings from '../../../settings/settings';
import { Picker } from 'antd-mobile';


export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            position: "三门峡",
        }
    };
    componentWillReceiveProps() {
        console.log(1111)

    }
    componentDidMount() {
        console.log(111111111);
        const ts = Date.parse(new Date()) / 1000;
        let formData = new FormData();
        formData.append('type', '4');
        formData.append('ts', ts);
        console.log(formData);
        fetch(`/api/WebService.asmx/AcquireSecretKey`, {
            method: 'POST',
            // mode:'cors',
            headers: {},
            cache: "no-cache",
            // body: `type=2&ts=${ts}`,
            body: formData,
        }).then(function (data) {
            if (data.ok) {
                return data.json();
            }
        }).then((res) => {
            console.log(res);
            if (res.msgcode == 1) {
                let key = CryptoJS.enc.Latin1.parse(Settings.key);
                let iv = CryptoJS.enc.Latin1.parse(Settings.iv);
                res.data.key = CryptoJS.AES.decrypt(res.data.key, key, {
                    iv: iv,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8);
                res.data.secret = CryptoJS.AES.decrypt(res.data.secret, key, {
                    iv: iv,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8);
                let data = JSON.stringify(res.data);
                window.sessionStorage.setItem('handShake', data);

            }
        });

    }
    render() {
        return <header className={HeaderCss.header}>
            <Banner></Banner>
            <div className={HeaderCss.position}>{this.state.position}</div>
            <PickBar></PickBar>
            <SearchBar></SearchBar>
            <List></List>
            <TabBar></TabBar>
        </header>
    }
}
