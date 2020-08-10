import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {
            userName: '',
            userId: ''
        },
        lastPath: '',
        loginStatus: '',
    },
    getters: {
        getLastPath(state) {
            return state.lastPath;
        },
        getLoginStatus(state) {
            return state.loginStatus;
        },
        getUserName(state) {
            return state.userInfo.userName;
        },
        getUserId(state) {
            return state.userInfo.userId;
        }
    },
    mutations: {
        SET_LAST_PATH(state, lastPath) {
            state.lastPath = lastPath;
        },
        SET_LOGIN_STATUS(state, status) {
            state.loginStatus = status;
        },
        SET_USER_INFO(state, userInfo) {
            state.userInfo.userId = userInfo.userid;
            state.userInfo.userName = userInfo.username;
        },
        REMOVE_LOGIN_STATUS(state) {
            state.loginStatus = false;
            state.userInfo = {
                userName: '',
                userId: ''
            };
        }
    }
})

export default store;