<template>
	<label class="input-1 block flex flex-nowrap gap-2"
	:class="{'border-blue-c-500' : isFocused}">
		<div class="h-full w-5">
			<SVG_search class="mt-0.5 w-full h-auto fill-gray-c-500"/>
		</div>
		<input @focusin="OnFocus(true)" @focusout="OnFocus(false)"
					 :placeholder="placeholder" type="text" class="outline-none w-full"
					 v-model="modelValue">
	</label>
</template>

<script>
import SVG_search from "../ComponentsSVG/Icons/SVG_search.vue";
export default {
	name: "InputSearch",
	components: {SVG_search},
	props : {
		modelValue : String,
		placeholder : String,
	},
	data (){
		return {
			isFocused : false
		}
	},
	methods : {
		OnFocus(value){
			this.isFocused = value;
		},
	},
	watch : {
		modelValue(val){
			this.$emit("update:modelValue",val)
		}
	}
}
</script>

<style scoped>

</style>