<template>
	<div id = 'Test'>
		<p>This is page is for testing.</p>
		
		<h1>MemberCard</h1>
		<center><MemberCard Team_id='123'></MemberCard></center>
		
		<h1>GroupManage</h1>
		<center><GroupManage Team_id='123'></GroupManage></center>
		
		<!-- <h1>DocEditor</h1> -->
		<!-- <DocEditor></DocEditor> -->
		
	</div>
</template>

<script>
import MemberCard from '../components/MemberCard.vue'	
import GroupManage from '../components/GroupManage.vue'
// import DocEditor from '../components/DocEditor.vue'
	
export default {
	name: 'Test',
	components: {
		MemberCard,
		GroupManage,
		// DocEditor
	}
}
</script>

<style>
</style>
