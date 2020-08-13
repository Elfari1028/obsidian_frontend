import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false,
        username: ''
    },
    getters: {
        isLogin: state => state.isLogin,
        getUsername: state => state.username
    },
    mutations: {
        USER_STATUS(state, flag) {
            state.isLogin = flag
        },
        USERNAME(state, val) {
            state.username = val
        }
    },
    actions: {
        userLogin({commit}, flag) {
            commit("USER_STATUS", flag)
        },
        userInfo({commit}, val) {
            commit("USERNAME", val)
        }
    }
})


export default store;