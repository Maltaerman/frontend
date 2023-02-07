<template>
	<div class="bg-blue-c-100 h-2 rounded-xl overflow-hidden">
		<div class="h-full rounded-xl bg-blue-c-500 duration-300 progress"></div>
	</div>
</template>

<script>
export default {
	name: "ProgressBar",
	props : {
		progress : {
			type : Number,
			default : 0
		}
	},
	computed : {
		progressW(){
			if(this.progress<0)
				return "0%";
			else if(this.progress>100)
				return "100%";
			else
				return `${this.progress}%`
		}
	}
}
</script>

<style scoped>
.progress{
	width: v-bind(progressW);
}
</style>