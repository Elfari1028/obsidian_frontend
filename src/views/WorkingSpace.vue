<template>
    <div>
        <el-button @click="logOut">注销
        </el-button>
    </div>

</template>

<script>
    export default {
        name: "WorkingSpace",
        methods: {
            logOut() {
                this.$axios.post('/account/logout1/').then(() => {
                    this.$message({
                        type:"success",
                        message:"注销成功！",
                        duration: '2000'
                    })
                })
            }
        },
        created() {
            if (!this.$store.getters.getLoginStatus) {
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style scoped>

</style>