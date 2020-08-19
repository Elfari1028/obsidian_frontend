<template>
    <el-form style="margin-top: 10px;width: 300px">
        <el-form-item>
            <el-input v-model="sourceForm.email" placeholder="val1" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="sourceForm.password" placeholder="val2"
                      show-password @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="info" style="float: right" @click="submit">登录
                <i class="el-icon-arrow-right"></i>
            </el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    import {decryptData, encryptData,} from "@/utils/encryptUtils";

    export default {
        name: "AvatarTest",
        data() {
            return {
                sourceForm: {
                    email: '',
                    password: '',
                },
                resultForm: {},
                testForm: {}
            }
        },
        methods: {
            submit() {
                this.resultForm.email = encryptData(this.sourceForm.email)
                console.log(this.sourceForm.email)
                console.log(this.resultForm.email)
                this.testForm.email = decryptData(this.resultForm.email)
                console.log(this.resultForm.email)
                console.log(this.testForm.email)
            }
        }
    }
</script>

<style scoped>

</style>