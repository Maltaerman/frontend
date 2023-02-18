<template>
	<div class="overflow-y-auto">
		<h1 class="w-full py-2 text-2xl text-center">Welcome to test screen</h1>
		<button-text-1 @click="Test1">
			Test
		</button-text-1>
		<button-text-1 @click="Test2">
			ShowModal
		</button-text-1>

<!--		<div class="flex flex-nowrap p-10 gap-10 break-all">
				<OrgEditInputsGroup v-if="modalVisible" v-model="organization" class="w-1/2"/>
			<div class="w-1/2">
				{{OrgStr}}
			</div>
		</div>-->

		<div class="flex flex-nowrap p-10 gap-10 break-all">
			<div class="w-1/2">
			<ChangeMailNameInputs class="mb-6" v-model="userData" @validation="onValidation"/>
			<ChangePassInputs  v-model="userData" @validation="onValidation"/>
			</div>
			<div class="w-1/2">
				{{userData}}
			</div>
		</div>
	</div>
</template>

<script>

import UserInviteModal from "./Modals/UserInviteModal.vue";
import InputSuggest from "./Inputs/suggestionInput/Input-suggestion.vue";
import OrgEditInputsGroup from "./OrganizationLeader/Shared/OrgEditInputsGroup.vue";
import ChangePassInputs from "./User/ChangePassInputs.vue";
import ChangeMailNameInputs from "./User/ChangeMailNameInputs.vue";

export default {
  name: "Test",
  components: {
		ChangeMailNameInputs,
		ChangePassInputs,
		OrgEditInputsGroup,
		InputSuggest,
		UserInviteModal,
	},
  data(){
    return {
      mess : "Message",
			modalVisible : false,
			items: [
				'Golden Retriever t',
				'Cat','Cat','Cat','Cat','Cat','Cat','Cat',
				'Squirrel',
				'Golden Retriever t',
				'Cat',
				'Squirrel',
				'Golden Retriever t',
				'Cat',
				'Squirrel'
			],
			organization : {
				name : "",
				site : "",
				address : "",
				description : "",
				logo : undefined
			},
			userData : {
				mail : "mailtest@gmail.com",
				name : "UserName",
			}
    }
  },
	methods : {
		Test1(){
			this.items = null
		},
		Test2(){
			this.modalVisible = !this.modalVisible;
    },
		HideModal(){
			this.modalVisible = false;
		},
    close(){
      this.$toast.clear();
    },
    changeMessage(){
      this.mess = "qwertyyyyy"
    },
		onValidation(res){
			console.log(res)
		}
	},
	computed : {
		OrgStr(){
			return JSON.stringify(this.organization)
		}
	}
}
</script>

<style>
.fade-enter-active {
  transition: all, 2s, ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
