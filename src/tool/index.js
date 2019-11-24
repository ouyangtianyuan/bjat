import axios from './http';
const imageUrl = 'http://47.95.8.179:8888/bjat/file/upload';
const moment = require('moment');
const localStore = {
    set: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    get: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    del: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    }
}
const Session = {
    //存
    set: function (key, value) {
        return sessionStorage.setItem(key, JSON.stringify(value));
    },
    //读
    get: function (key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    //删
    del: function (key) {
        return sessionStorage.removeItem(key);
    },
    //阅后即焚
    read: function (key) {
        var res = this.get(key);
        this.del(key);
        return res;
    }
}
const selectAjax = function ({
    url, //地址
    data = {}, //请求参数
    type = "GET", //请求类型
    label, //显示文本字段
    value, //显示value字段
    done = null //回调函数
}) {
    var list = []
    type = type.toLowerCase()

    if (type == 'get') {
        data = {
            params: data
        }
    }
    axios[type](url, data).then(function (res) {
        if (res && res.length) {
            list = res.map(ele => {
                if (label) {
                    return {
                        label: ele[label],
                        value: ele[value]
                    }
                } else {
                    return {
                        label: ele,
                        value: ele
                    }
                }

            })
            if (done) {
                done(list)
            }
        }
    })
}
const preloading = function () {
    selectAjax({
        url: "/loadingOrderHead/getCustomerList",
        label: "customerName",
        value: "id",
        done: function (res) {
            Session.set('customer', res)
        }
    });
    selectAjax({
        url: "/loadingOrderHead/getMediumList",
        label: "typeName",
        value: "id",
        done: function (res) {
            Session.set('typeName', res)
        }
    });
    selectAjax({
        url: "/loadingOrderHead/getStationList",
        label: "siteName",
        value: "id",
        done: function (res) {
            Session.set('siteName', res)
        }
    });
    selectAjax({
        url: "loadingOrderHead/getStatusList?param=ZH",
        label: "statusName",
        value: "id",
        done: function (res) {
            Session.set('ZHstatus', res)
        }
    });
    selectAjax({
        url: "loadingOrderHead/getLoadingFactoryNameList",
        done: function (res) {
            Session.set('factoryName', res)
        }
    });
}
const autoGenerate = function (type) {
    switch (type) {
        case 'orderNumber':
            let tail = (new Date()).valueOf().toString();
            tail = tail.slice(tail.length - 3)
            return 'PO' + moment().format('YYYYMMDDmmss') + tail;
        default:
            return '生成失败，请检查传参';
    }
}
export {
    localStore,
    selectAjax,
    autoGenerate,
    Session,
    imageUrl,
    preloading
}