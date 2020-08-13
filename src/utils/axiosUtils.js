import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'
const infoUrl = baseUrl + 'account/my_status/'

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

export function updateStatus() {
    axios.post(infoUrl).then(res => {
        console.log(res.data)
        if (res.data.status !== 0) {
            console.log("未登录")
            this.$store.dispatch("userLogin", false)
            this.$store.dispatch("userInfo", "")
            sessionStorage.removeItem("USER_STATUS")
            return false
        } else {
            console.log("已登录")
            this.$store.dispatch("userLogin", true)
            this.$store.dispatch("userInfo", res.data.username)
            sessionStorage.setItem("USER_STATUS", "isLogin")
            return true
        }
    })
}