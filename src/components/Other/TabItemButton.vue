<template>
	<button class="pb-2.5 cursor-pointer hover:text-blue-c-400 hover:border-blue-c-400 box-border"
			 :class="styles">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: "TabItemButton",
	props : {
		targetTabValue : String,
		currentTabValue : String
	},
	computed : {
		styles(){
			return {
				"text-blue-c-500 border-blue-c-500 border-b-2" : this.targetTabValue == this.currentTabValue,
				"text-gray-c-500 border-gray-c-500 border-b" : this.targetTabValue != this.currentTabValue,
			}
		}
	}
}
</script>

<style scoped>

</style>