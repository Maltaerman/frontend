<template>
	<div class="flex flex-col gap-6">
		<InputPass inp-id="setting-pass" :placeholder="$t('userSettings.password')"
								v-model="modelValue.old_password" :label="$t('userSettings.password')"
							 :validation-message="$t('validations.passNotValid')"
		/>
		<InputPass :label="$t('userSettings.new-password')" inp-id="setting-new-pass" :placeholder="$t('userSettings.new-password')"
								v-model="modelValue.new_password" :validation-message="$t('validations.passNotValid')"/>
	</div>
</template>

<script>
import InputPass from "../Inputs/Input-pass.vue";
import regex from "../mixins/regex.js";
export default {
	name: "ChangePassInputs",
	mixins : [regex],
	components: {InputPass},
	props : {
		modelValue : Object
	},
	data(){
		return {
			isDataValid: false
		}
	},
	methods : {
		Validation(){
			this.isDataValid = this.isPass(this.modelValue.old_password) && this.isPass(this.modelValue.new_password)
			this.$emit("validation", this.isDataValid);
		}
	},
	watch : {
		"modelValue.old_password"(){
			this.Validation();
		},
		"modelValue.new_password"(){
			this.Validation();
		}
	},
}
</script>

<style scoped>

</style>