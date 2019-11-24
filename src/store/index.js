import Vue from 'vue'
import Vuex from 'vuex'
import {
    localStore
} from '@/tool/index'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        menus: [{
            name: 'index',
            title: '首页'
        }],
        menusIndex: 'index',
        skin: 'skin0'
    },
    mutations: {
        addMenu: function (state, payload) {
            const {
                name,
                title
            } = payload
            const {
                menus
            } = state
            if (!title) {
                throw new Error('系统错误，title不能为空')
            }
            //name是路由name,唯一;title不唯一
            const isExist = menus.filter(function (item) {
                return item.name == name;
            })
            if (isExist.length === 0 || !isExist) {
                menus.push({
                    title,
                    name
                })
                state.menusIndex = menus[menus.length - 1].name
            } else {
                state.menusIndex = isExist[0].name
            }
        },
        clickMenu: function (state, name) {
            state.menusIndex = name
        },
        removeMenu: function (state, name) {
            let index = state.menus.findIndex(item => item.name === name)
            state.menus.splice(index, 1)
            state.menusIndex = state.menus[index - 1].name
        },
        removeAllMenu: function (state) {
            state.menus = state.menus.slice(0, 1)
            state.menusIndex = state.menus[0].name
        },
        removeOtherMenu: function (state) {
            state.menus = state.menus.filter(item => {
                return ['index', state.menusIndex].includes(item.name)
            })
        },
        setSkin: function (state, name) {
            if (name) {
                localStore.set('skin', name)
                state.skin = name
            }
        }
    },
    actions: {},
    modules: {}
})