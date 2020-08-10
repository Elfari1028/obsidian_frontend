<template>
    <div>
        <el-button @click="logOut">注销
        </el-button>
        <el-button @click="test">测试
        </el-button>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "WorkingSpace",
        methods: {
            logOut() {
                this.$axios.post('/account/logout1/').then(res => {
                    if (res.data.status === 0) {
                        this.$message({
                            type: "success",
                            message: "注销成功！",
                            duration: '2000'
                        })
                        sessionStorage.removeItem("USER_STATUS")
                        this.$router.push('/Login')
                    }

                })
            },
            test() {
                axios.post('http://127.0.0.1:8000/account/my_status/').then(res => {
                    console.log(res)
                    if (res.data.status !== 0) {
                        console.log("未登录")
                        sessionStorage.removeItem("USER_STATUS");
                    } else {
                        console.log("已登录")
                        this.$store.dispatch("userLogin", true);
                        sessionStorage.setItem("USER_STATUS", "isLogin");
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>