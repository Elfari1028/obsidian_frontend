<template>
	<div id = 'Test'>
		<p>This is page is for testing.</p>
		
		<h1>MemberCard</h1>
		<center><MemberCard Team_id='123'></MemberCard></center>
		
		<h1>GroupManage</h1>
		<center><GroupManage Team_id='123'></GroupManage></center>
		
		
	</div>
</template>

<script>
import MemberCard from '../components/MemberCard.vue'	
import GroupManage from '../components/GroupManage.vue'
	
export default {
	name: 'Test',
	components: {
		MemberCard,
		GroupManage
	}
}
</script>

<style>
</style>
