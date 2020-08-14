<template>
	<div :style="{height: spaceHeight}" style="margin: 10px;">
		<el-scrollbar id='SearchResult' style="height: 100%">
			
		<ResultCard v-for="(doc,index) in docList" :key="index" :doc='doc'></ResultCard>
		
		</el-scrollbar>

	</div>
</template>

<script>
import ResultCard from './ResultCard.vue'	
	
export default {
	name: 'SearchResult',
	// props: {
	// 	docList: Array
	// },
	data () {
		return{
			spaceHeight: window.innerHeight - 100 + 'px',
			docList: [
				{
					doc_id: 3321,
					title: 'b',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/8/10 20:03:02'
				},
				{
					doc_id: 3321,
					title: 'a',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/8/01 20:03:02'
				},
				{
					doc_id: 3321,
					title: 'j',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/9/10 20:03:02'
				},
				{
					doc_id: 3321,
					title: 'f',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/8/10 20:04:02'
				},
				{
					doc_id: 3321,
					title: 'w',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/8/11 20:03:02'
				},
				{
					doc_id: 3321,
					title: 'b',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/8/10 20:03:02'
				},
				{
					doc_id: 3321,
					title: 'a',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/8/01 20:03:02'
				},
				{
					doc_id: 3321,
					title: 'j',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/9/10 20:03:02'
				},
				{
					doc_id: 3321,
					title: 'f',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/8/10 20:04:02'
				},
				{
					doc_id: 3321,
					title: 'w',
					team_id: 55443,
					workspace: 'TEAM_DEBUG',
					time: '2020/8/11 20:03:02'
				},
			],
		}
	},
	components: {
		ResultCard
	}
}
</script>
<style>
#SearchResult {
	/* outline: #00ff00 dotted thick; */
	border-radius: 10px;
	border-style: solid;
	border-width: 1px;
	border-color: #DEDFE6;
}
</style>
