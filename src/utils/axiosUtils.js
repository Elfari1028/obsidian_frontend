import axios from 'axios'
import store from "@/vuex/store";
import config from "@/config.js"

export async function updateStatus() {
    await axios.post(config.infoUrl).then(async res => {
        console.log(res.data)
        if (!res.data.success) {
            console.log("未登录")
            store.dispatch("userLogin", false)
            store.dispatch("userInfo", "")
            sessionStorage.removeItem("USER_STATUS")
            return false
        } else {
            console.log("已登录" + res.data.username)
            store.dispatch("userLogin", true)
            await axios.get('account/get_avatar/').then(result => {
                store.dispatch("userInfo", {
                    username: res.data.username,
                    avatarUrl: config.baseUrl.substring(0, config.baseUrl.length - 1) + result.data.url
                })
            })
            console.log("检测:" + store.getters.getUsername)
            sessionStorage.setItem("USER_STATUS", "isLogin")
            return true
        }
    })
    return false
}