<template>
	<div id = 'Test'>
		<p>This is page is for testing.</p>
		
		<MenuBar/>
		
		
		<br><br><br><br>
		<SearchResult></SearchResult>
	</div>
</template>

<script>
import SearchResult from '../components/SearchResult.vue'
import MenuBar from "../components/MenuBar.vue"
	
export default {
	name: 'Test',
	components: {
		SearchResult,
		MenuBar
	}
}
</script>

<style>
</style>
