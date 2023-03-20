<template>
	<div class="flex flex-col gap-6">
		<Input1 :label="$t('OrganizationRegistration.orgName')"
						:placeholder="$t('dashboard.organizationName')"
						v-model="modelValue.name"
						:model-value="modelValue.name"
		/>

		<Input1 :label="$t('OrganizationRegistration.site')"
						placeholder="https//:"
						v-model="modelValue.website"
						:model-value="modelValue.website"
		/>

		<Input1 :label="$t('dashboard.address')"
						:placeholder="$t('dashboard.orgAddress')"
						v-model="modelValue.address"
						:model-value="modelValue.address"
		/>

		<div data-org-desc>
			<div class="text-h4 text-gray-c-500">
				{{$t("dashboard.orgDescription")}}
			</div>
			<resize-textarea class="text-area my-2 min-h-[144px]"
											 :placeholder="$t('OrganizationRegistration.OrgDescPlaceholder')"
											 v-model="modelValue.description"
											 ref="orgDesc"
			/>
			<div class="text-h4 text-gray-c-500 text-right">
				{{DescSymbolLimStr}}
			</div>
		</div>

		<div data-org-logo>
			<div class="text-h4 text-gray-c-500">
				{{$t("organizationProfile.logo")}}
			</div>

			<div class="relative h-[160px] my-2 border border-gray-c-300 rounded-xl grid justify-center content-center">
				<div v-if="!logoImgSrc" class="w-[100px] h-[100px] bg-gray-200 rounded-full grid justify-center content-center">
					<div class="text-gray-c-500 font-medium">
						Logo
					</div>
				</div>
				<img v-if="logoImgSrc" :src="logoImgSrc" title="Logo" class="block w-full h-full object-contain">
				<SVG_basket_red v-if="logoImgSrc" class="absolute cursor-pointer top-2 right-2" @click="ClearLogo"/>
			</div>

			<input ref="fileInp" type="file" class="hidden" accept=".jpeg,.png,.jpg" @change.stop="onFileSelect">

			<Button_2 class="w-full" @click="selectFile">
				{{$t("organizationProfile.choseFile")}}
			</Button_2>

		</div>
	</div>
</template>

<script>
import Input1 from "../../Inputs/Input-1.vue";
import Button_2 from "../../Buttons/Button_2.vue";
export default {
	name: "OrgEditInputsGroup",
	components : {
		Input1,
		Button_2
	},
	props : {
		modelValue : Object
	},
	data(){
		return {
			descSymbolLim : 300,
			logoImgSrc : undefined,
		}
	},
	methods : {
		selectFile(){
			this.$refs.fileInp.click();
		},
		onFileSelect(e){
			//this.$emit("update:logo", e.target.files[0])
			this.modelValue.logo = e.target.files[0];
		},
		ClearLogo(){
			//this.$emit("update:logo", undefined)
			this.modelValue.logo = undefined;
		},
	},
	computed :{
		DescSymbolLimStr(){
			if(!this.modelValue || !this.modelValue.description)
				return `0/${this.descSymbolLim} ${this.$t("general.symbols")}`
			else
				return `${this.modelValue.description.length}/${this.descSymbolLim} ${this.$t("general.symbols")}`
		},
	},
	watch : {
		"modelValue.description"(newVal, oldVal){
			if(!newVal)
				return;
			if(newVal.length > this.descSymbolLim) {
				this.modelValue.description = oldVal;
				this.$refs.orgDesc.textareaContent = oldVal;
			}
		},
		"modelValue.logo"(newVal){
			//console.log(newVal)

			this.logoImgSrc = undefined;
			if(!newVal)
				return;
			let reader = new FileReader();

			reader.onload = (event) => {
				this.logoImgSrc = event.target.result;
			};

			reader.readAsDataURL(newVal);
		},
	}
}
</script>

<style scoped>

</style>