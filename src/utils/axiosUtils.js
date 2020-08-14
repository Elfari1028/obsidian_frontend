import axios from 'axios'
import store from "@/vuex/store";

export const baseUrl = 'http://127.0.0.1:8000/'
const infoUrl = baseUrl + 'account/my_status/'

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

export function updateStatus() {
    axios.post(infoUrl).then(res => {
        console.log(res.data)
        if (!res.data.success) {
            console.log("未登录")
            store.dispatch("userLogin", false)
            store.dispatch("userInfo", "")
            sessionStorage.removeItem("USER_STATUS")
            return false
        } else {
            console.log("已登录"+res.data.username)
            store.dispatch("userLogin", true)
            store.dispatch("userInfo", res.data.username)
            console.log("检测:"+store.getters.getUsername)
            sessionStorage.setItem("USER_STATUS", "isLogin")
            return true
        }
    })
}