<template>
	<div :style="{height: spaceHeight}" style="margin: 10px;">
		<el-scrollbar id='SearchResult' style="height: 100%">
		
<!-- 
									使用两个ResultCard是为了修复组件复用的bug
-->
		<div v-if='!isTrash'>
		<ResultCard v-for="(doc,index) in docList" :key="index" :doc='doc' :docType='docType'></ResultCard>
		</div>
		
		<div v-if='isTrash'>
		<ResultCardforTrash v-for="(doc,index) in docList" :key="index" :doc='doc'></ResultCardforTrash>
		</div>
		
		</el-scrollbar>

	</div>
</template>

<script>
	/*
	* 传入字符串
	* docType: 'isDefault' or 'isTrash' ...
	*/
   
import ResultCard from './ResultCard.vue'	
import ResultCardforTrash from'./ResultCardforTrash.vue'
	
export default {
	name: 'SearchResult',
	props: {
		docList: Array,
		docType: String,
	},
	data () {
		return{
			spaceHeight: window.innerHeight - 100 + 'px',
			isTrash: false
		}
	},
	components: {
		ResultCard, ResultCardforTrash
	},
	created() {
		if (this.docType === 'isTrash'){
			this.isTrash = true
		} else {
			this.isTrash = false
		}
	},
	watch: {
		docType: function() {
			console.log('docType in SearchResult: ' + this.docType)
			if (this.docType === 'isTrash'){
				this.isTrash = true
			} else {
				this.isTrash = false
			}
		}
	},
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
