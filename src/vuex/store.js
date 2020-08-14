import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false,
        userInfo: {
            username: '',
            avatarUrl: ''
        }
    },
    getters: {
        isLogin: state => state.isLogin,
        getUsername: state => state.userInfo.username,
        getUserAvatar: state => state.userInfo.avatarUrl
    },
    mutations: {
        USER_STATUS(state, flag) {
            state.isLogin = flag
        },
        USERNAME(state, val) {
            state.userInfo.username = val
        },
        USER_AVATAR(state, val) {
            state.userInfo.avatarUrl = val
        }
    },
    actions: {
        userLogin({commit}, flag) {
            commit("USER_STATUS", flag)
        },
        userInfo({commit}, val) {
            commit("USERNAME", val.username)
            commit("USER_AVATAR", val.avatarUrl)
        },
    }
})


export default store;