import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false,
    },
    getters: {
        isLogin: state => state.isLogin
    },
    mutations: {
        userStatus(state, flag) {
            state.isLogin = flag
        }
    },
    actions: {
        userLogin({commit}, flag) {
            commit("userStatus", flag)
        }
    }
})


export default store;