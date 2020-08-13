<template>
	<div >
		<el-container>
			<el-header style="padding: 0">
				<MenuBar/>
			</el-header>
			
			<el-container>
				<el-aside width="200px" id="aside_left">
					<AsideMenu/>
				</el-aside>
				<el-main>
		
					<h1>Team_id: {{ Team_id }}</h1>
		
				</el-main>
			</el-container>
				
		</el-container>
	</div>
</template>

<script>
	import MenuBar from "@/components/MenuBar";
	import AsideMenu from "@/components/AsideMenu";
	
	export default {
		name: "TeamSpace",
		components: {AsideMenu, MenuBar},
		inject:['reload'],
		data() {
			return {
				Team_id: ''
			}
		},
		methods: {},
		created() {
			this.Team_id = this.$route.params.Team_id
		},
		beforeRouteUpdate (to, from, next) {
			console.log(to, from, next)
			next()
			this.reload()
		},
	}
</script>

<style scoped>
	#aside_left {
		border-right: 1px solid #DEDFE6;
		height: auto;
		padding: 10px;
	}
</style>
