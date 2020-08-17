<template>
    <div>
        <el-page-header @back="goBack" :content="userInfo.username+'的个人主页'"></el-page-header>

    </div>
</template>

<script>
    import Config from "@/config";

    export default {
        name: "UserInfo",
        data() {
            return {
                userInfo: {
                    username: 'test',
                    email: 'test@test.com',
                    sex: 0,
                    mood: 'test mood hahahahaha',
                    tel: '136xxxxxxxx',
                    age: 21
                },
            }
        },
        methods: {
            goBack() {
                this.$router.push({
                    name: 'WorkingSpace'
                })
            }
        },
        created: function () {
            this.userInfo.username = this.$route.params.username
            this.isLoading = true
            this.$axios.post('', JSON.stringify({username: this.userInfo.username}),Config.axiosHeaders).then(res => {
                if (res.data.success) {
                    this.userInfo.username = res.data.username
                    this.userInfo.email = res.data.email
                    this.userInfo.age = res.data.age
                    this.userInfo.sex = res.data.sex
                    this.userInfo.mood = res.data.mood
                    this.userInfo.tel = res.data.tel
                    this.userInfo.avatarUrl = Config.baseUrl.substring(0, Config.baseUrl.length - 1) + res.data.url
                } else {
                    this.$notify(res.data.exc)
                }
            }).catch(err => {
                console.log(err)
                this.$notify('网络出现了些问题？')
            })
            this.isLoading = false
        }
    }
</script>

<style scoped>

</style>