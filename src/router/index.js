import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import index from '../views/index/index.vue'
import login from '../views/login.vue'
import shipmentList from '../views/shipment/shipmentList.vue'
import shipmentAdd from '../views/shipment/shipmentAdd.vue'
import shipmentEdit from '../views/shipment/shipmentEdit.vue'
import shipmentDetail from '../views/shipment/shipmentDetail.vue'
import shipmentSelect from '../views/shipment/shipmentSelect.vue'
import shipmentSelectDetail from '../views/shipment/shipmentSelectDetail.vue'
import orderList from '../views/order/orderList.vue'
import orderDetail from '../views/order/orderDetail.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
    return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const components = {
    default: index,
    index,
    shipmentList,
    shipmentAdd,
    shipmentEdit,
    orderList,
    orderDetail,
    shipmentSelect,
    shipmentDetail,
    shipmentSelectDetail
}
const routes = [{
    path: '/index',
    component: home,
    children: [{
        path: '/',
        components: components
    }]

}, {
    path: '/',
    component: login
}, {
    path: '/login',
    component: login,
    name: 'login'
}]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router