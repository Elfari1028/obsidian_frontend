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
    import {decryption, encryption} from "@/utils/encryptUtils";

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
                encryption(this.sourceForm, this.resultForm)
                console.log(this.sourceForm)
                console.log(this.resultForm)
                decryption(this.resultForm, this.testForm)
                console.log(this.resultForm)
                console.log(this.sourceForm)
            }
        }
    }
</script>

<style scoped>

</style>