import axios from 'axios'
import store from "../vuex/store";

const baseUrl = 'http://127.0.0.1:8000/account/'
const loginUrl = baseUrl + '/login'
const myShortInfoUrl = baseUrl + 'my_status/'
const registerUrl = baseUrl + 'register1/'

const config = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

export function loginAxiosPost(data) {
    return axios.post(loginUrl, JSON.stringify(data), config)
        .then((res) => {
            console.log(res)
            return true
        }).catch((err) => {
            console.log(err)
            return false
        })
}

export function updateUserStatus() {
    console.log("====updateUserStatus====")
    return axios.get(myShortInfoUrl)
        .then(res => {
            console.log("user short info");
            console.log("aha")
            console.log(res.data.status);
            if (res.data.status === 0) {
                store.commit('SET_USER_INFO',
                    {
                        userid: res.data.id, username: res.data.username
                    });
                store.commit('SET_LOGIN_STATUS', true)
            } else {
                store.commit('REMOVE_LOGIN_STATUS')
            }

        }).catch(() => {
            console.log("----networkErr----")

        })
}

export function registerAxiosPost(data) {
    return axios.post(registerUrl, JSON.stringify(data), config)
        .then(res => {
            console.log(res);
            loginAxiosPost({
                username: data.username,
                password: data.password
            }).then(() => {
                updateUserStatus()
            })
        })
}