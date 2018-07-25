import React from 'react';

import Banner from './Banner';
import HeaderCss from '@/styles/header.scss';
import Tab from './Tab';
import SearchBar from './SearchBar';
import List from './List';
import TabBar from './TabBar';
import CryptoJS from 'crypto-js';
import Settings from '../../assets/libs/settings';


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
        let formData = new FormData();
        formData.append('type', '4');
        formData.append('ts', ts);
        console.log(formData);
        fetch(`/api/WebService.asmx/AcquireSecretKey`, {
            method: 'POST',
            // mode:'cors',
            headers: {
                // 'Accept': '*/*',
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Length": 20,
                // credentials: "same-origin"
            },
            cache: "no-cache",
            // body: `type=2&ts=${ts}`,
            body: formData,
        }).then(function (data) {
            if (data.ok) {  
                return data.json();  
            }  
        }).then((res) => {
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
                window.localStorage.setItem('handShake',data);
            }
        }).catch(err=>{
            console.log(err);
        });
    }
    objKeySort(arys) {
        var newkey = Object.keys(arys).sort();
        var newObj = {};
        for (var i = 0; i < newkey.length; i++) {
            newObj[newkey[i]] = arys[newkey[i]];
        }
        return newObj; //返回排好序的新对象
    };
    getAjax(url, datas, fn) {
        var dataCookies = JSON.parse(sessionStorage.getItem("handShake"));
        var keyData = {};
        for (var i in datas) {
            keyData[i] = datas[i];
        }
        keyData['ts'] = Date.parse(new Date()) / 1000 - 0 + JSON.parse(sessionStorage.getItem("handShake")).data.ts;
        keyData['key'] = JSON.parse(sessionStorage.getItem("handShake")).data.key;
        var signData = {};
        for (var i in keyData) {
            signData[i] = keyData[i];
        }
        signData['sec'] = JSON.parse(sessionStorage.getItem("handShake")).data.secret;
        $.ajax({
            type: "get",
            url: '' + this.site + '' + url + '' + $.param(keyData, true) + '&sign=' + _md5($.param(this.objKeySort(signData), true)) + '',
            dataType: 'json',
            success: fn
        });
    };
    postAjax(url, datas, fn) {
        var dataCookies = JSON.parse(sessionStorage.getItem("handShake"));
        datas['ts'] = Date.parse(new Date()) / 1000 - 0 + dataCookies.data.ts;
        var finallyDatas = datas,
            paramSign = '',
            signData = {};
        finallyDatas['key'] = dataCookies.data.key;
        finallyDatas['version'] = '2.0';
        for (var i in finallyDatas) {
            signData[i] = finallyDatas[i];
        }
        signData['sec'] = dataCookies.data.secret;
        for (var i in this.objKeySort(signData)) {
            paramSign += '&' + i + '=' + this.objKeySort(signData)[i];
        }
        finallyDatas['sign'] = _md5(paramSign.substring(1));
        $.ajax({
            type: 'post',
            url: this.site + url,
            data: finallyDatas,
            dataType: 'json',
            success: fn
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
