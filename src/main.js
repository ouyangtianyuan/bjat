import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/common.scss";
import VueAMap from "vue-amap";
import axios from './tool/http';
import VueAxios from 'vue-axios';
import 'babel-polyfill';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: "9a107222b4060fd153320036fb8d7e57",
    plugin: [
        "Autocomplete",
        "PlaceSearch",
        "Scale",
        "OverView",
        "MapType",
        "PolyEditor",
        "CircleEditor",
        "ToolBar"
    ],
    // 默认高德 sdk 版本为 1.4.4
    v: "1.4.1"
});
Vue.use(ElementUI)

// Vue.prototype.$http_form = axios_form
Vue.prototype.$http = axios
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.print = (obj, type) => {
    type = type || "log";
    const log = JSON.parse(JSON.stringify(obj));
    console[type](log)
    //用于打印变量，避免省略符号
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')