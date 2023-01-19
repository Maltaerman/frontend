<template>
	<div v-if="isVisible">
		<ModalTemplate :is-modal-visible="isModalVisible" :is-hide-on-click="true"
									 :close-func="closeThisComponent" class-list="grid place-items-center px-4">
			<div class="bg-white w-[480px] rounded-lg relative mobile:w-full relative p-6 mx-auto max-h-screen overflow-y-auto"
			@click.stop>
				<button class="absolute top-6 right-6 cursor-pointer"
								@click="closeThisComponent">
					<img src="/src/assets/close.svg">
				</button>
				<div class="text-s1 mb-2">
					{{ $t('organizationProfile.deleteOrganization') }}
				</div>
				<div class="text-s1 text-red-c-500 underline">
					"{{organization.name}}"
				</div>
				<div class="text-h3 text-gray-c-600 my-2">
					{{ $t('general.toDeleteType') }}
					<span class="text-h3 text-center text-gray-c-800 font-semibold">
						{{ organization.name.trim() }}
					</span>
				</div>

				<input-1 v-model="inputValue" class="w-full"/>

				<button-1 :disabled="!isRemoveAvailable" class="w-full mt-6" @click.stop="removeOrg">
					Видалити
				</button-1>
				<Loader v-if="isLoaderVisible" class="rounded-lg"/>
			</div>
		</ModalTemplate>
	</div>
</template>

<script>
import ModalTemplate from "../Modals/ModalTemplate.vue";
import input1 from "../Inputs/Input-1.vue"
import Loader from "../Loader.vue";
import api from "../../http_client/index.js";
export default {
	name: "RemoveOrgModal",
	components: {
		ModalTemplate,
		input1,
		Loader
	},
	emits : ["on-remove-success","on-remove-failed"],
	data (){
		return {
			inputValue: "",
			isModalVisible : true,
			isLoaderVisible : false,
		}
	},
	props : {
		organization: Object,
		isVisible : false,
		onRemoveSuccess : Function,
		onRemoveFailed : Function,
		closeFunc : Function,

	},
	methods :{
		closeThisComponent(){
			this.isModalVisible = true,
			this.isLoaderVisible = false,
			this.closeFunc();
		},
		closeSuccess(){
			this.onRemoveSuccess();
			this.closeThisComponent();
		},
		closeError(){
			this.onRemoveFailed();
			this.closeThisComponent();
		},
		async removeOrg(){
			this.isLoaderVisible = true;
			await api.organizations.removeOrganization(this.organization.id)
				.then(res=>{
					this.isModalVisible = false;
					this.isLoaderVisible = false;
          this.$toast.success(this.$t("removeOrgModal.successMess", {orgName : this.organization.name}),
              {
                duration : false,
                onClose : this.closeSuccess,
              })
				})
				.catch(err=>{
					this.isModalVisible = false;
					this.isLoaderVisible = false;
          this.$toast.error(this.$t("removeOrgModal.errorMess", {orgName : this.organization.name}),
              {
                duration : false,
                onClose : this.closeError,
              })
				})
				.finally(()=>{

				});
		}
	},
	computed : {
		isRemoveAvailable  (){
			return this.organization.name.trim() === this.inputValue;
		}
	}
}
</script>

<style scoped>
@tailwind base;
@tailwind utilities;
@tailwind components;

.text-s1{
	@apply text-h2 text-center font-semibold;
}

</style>
