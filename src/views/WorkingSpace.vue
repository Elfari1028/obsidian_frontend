<template>
    <div>
        <el-container>
            <el-header style="padding: 0">
                <MenuBar/>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <AsideMenu :index='asideDefaultActive'/>
                </el-aside>
                <el-main>
                    <WorkBench/>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import MenuBar from "@/components/MenuBar";
    import AsideMenu from "@/components/AsideMenu";
    import WorkBench from "@/components/WorkBench";

    export default {
        name: "WorkingSpace",
        components: {WorkBench, AsideMenu, MenuBar},
        data() {
            return {
                asideDefaultActive: '1'
            }
        },
        methods: {},
        created() {
            console.log(this.$route.path)
        }
    }
</script>

<style scoped>

</style>