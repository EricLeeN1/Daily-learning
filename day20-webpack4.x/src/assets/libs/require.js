import md5 from 'md5';
import settings from '../../../settings/settings';
export default {
    objKeySort(arys) {
        let newkey = Object.keys(arys).sort();
        let newObj = {};
        for (let i = 0; i < newkey.length; i++) {
            newObj[newkey[i]] = arys[newkey[i]];
        }
        return newObj; //返回排好序的新对象
    },
    //发送GET请求
    getFetch(url, datas, successFunc, errorFunc) {
        let that = this;
        let paramSign = '';
        let paramKey = '';
        let dataCookies = JSON.parse(window.sessionStorage.getItem("handShake"));
        let keyData = {};
        for (let i in datas) {
            keyData[i] = datas[i];
        }
        keyData['ts'] = Date.parse(new Date()) / 1000 - 0 + dataCookies.ts;
        keyData['key'] = dataCookies.key;
        keyData['version'] = settings.version;
        let signData = {};
        for (let i in keyData) {
            signData[i] = keyData[i];
        }
        signData['sec'] = dataCookies.secret;
        for (let i in that.objKeySort(signData)) {
            paramSign += '&' + i + '=' + that.objKeySort(signData)[i] + '';
        }
        for (let i in that.objKeySort(keyData)) {
            paramKey += '&' + i + '=' + that.objKeySort(keyData)[i] + '';
        }
        let sites = encodeURI('/api' + url + paramKey.substring(1) + '&sign=' + md5(paramSign.substring(1)));
        fetch(sites, {
            method: 'GET'
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    successFunc(data);
                })
            } else if (res.status === 401) {
                console.log('请求失败');
                errorFunc(res);
            }
        }, function (e) {
            console.log('请求失败');
            errorFunc(e);
        })
    },

    //发送POST请求
    postFetch(url, params, successFunc, errorFunc) {
        let formData = new FormData();
        for (let k in params) {
            formData.append(k, params[k]);
        }
        formData.append('oper_id', '11');
        formData.append('oper_name', 'kong');
        let dataCookies = JSON.parse(sessionStorage.getItem("handShake"));
        datas['ts'] = Date.parse(new Date()) / 1000 - 0 + dataCookies.ts;
        let finallyDatas = datas,
            paramSign = '',
            signData = {};
        finallyDatas['key'] = dataCookies.key;
        finallyDatas['version'] = '2.0';
        for (let i in finallyDatas) {
            signData[i] = finallyDatas[i];
        }
        signData['sec'] = dataCookies.secret;
        for (let i in this.objKeySort(signData)) {
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
        fetch('/api' + url, {
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    successFunc(data);
                })
            } else {
                console.log('请求失败');
                errorFunc(res);
            }
        }, function (e) {
            console.log('请求失败');
            errorFunc(e);
        })
    }
}