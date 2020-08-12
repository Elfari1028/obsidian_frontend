<template>
    <div class="aside_menu">
        <el-menu :default-active="$route.path"
                 active-text-color="#1A1A1A"
                 text-color="#5E5E5E"
                 @open="handleOpen"
                 @close="handleClose"
                 router
                 mode="vertical">
            <el-menu-item index="/WorkingSpace">
                <i class="el-icon-menu"></i>
                <span slot="title">工作台</span>
            </el-menu-item>
            <el-menu-item index="/History">
                <i class="el-icon-s-order"></i>
                <span slot="title">最近浏览</span>
            </el-menu-item>
            <el-menu-item index="/Collections">
                <i class="el-icon-s-management"></i>
                <span slot="title">我的收藏</span>
            </el-menu-item>

            <el-divider class="divider"></el-divider>

            <el-submenu index="/TeamSpace">
				
                <template slot="title">
                    <i class="el-icon-s-grid"></i>
                    <span>团队空间</span>
                </template>
				
				<el-menu-item-group>
					<span v-for="Team in Team_list" :key=Team.Team_id>
					<el-menu-item v-bind:index="'/TeamSpace/'+Team.Team_id">{{ Team.Team_name }}</el-menu-item>
					</span>
				</el-menu-item-group>

            </el-submenu>
			
            <el-menu-item index="/TrashCan">
                <i class="el-icon-delete-solid"></i>
                <span slot="title">回收站</span>
            </el-menu-item>

            <el-divider class="divider"></el-divider>

            <el-menu-item index="/UserCenter">
                <i class="el-icon-user-solid"></i>
                <span slot="title">个人中心</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "AsideMenu",
		data () {
			return {
				Team_list: [
					{
						Team_id: 1,
						Team_name: '火锅小分队'
					},
					{
						Team_id: 2,
						Team_name: '烧烤小分队'
					}
				]
			}
		},
        methods: {
            handleOpen() {

            },
            handleClose() {

            }
        },
        created()
        {
            console.log(this.$route.path)
        },
    }
</script>

<style>
    .aside_menu{
    }

    .divider {
        margin: 5px 0 !important;
    }

    .el-menu {
        border: 0 !important;
    }
</style>