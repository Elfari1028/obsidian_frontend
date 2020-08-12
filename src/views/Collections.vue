<template>
    <div>
        <el-container>
            <el-header style="padding: 0">
                <MenuBar/>
            </el-header>
            <el-container>
                <el-aside width="200px" id="aside_left">
                    <AsideMenu/>
                </el-aside>
                <el-main>


                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import MenuBar from "@/components/MenuBar";
    import AsideMenu from "@/components/AsideMenu";

    export default {
        name: "Collections",
        components: {AsideMenu, MenuBar},
        data() {
            return {
            }
        },
        methods: {},
        created() {
            console.log(this.$route.path)
        }
    }
</script>

<style scoped>
    #aside_left {
        border-right: 1px solid #DEDFE6;
        height: auto;
        padding: 10px;
    }
</style>