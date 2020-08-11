<template>
    <div>
        <el-container>
            <el-header style="padding: 0">
                <MenuBar/>
            </el-header>
            <el-container>
                <el-aside width="200px" id="aside">
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
        name: "UserCenter",
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
    #aside{
        border-right: 1px solid #DEDFE6;
        height: 100%;
        min-height: 600px;
        padding: 10px;
    }
</style>