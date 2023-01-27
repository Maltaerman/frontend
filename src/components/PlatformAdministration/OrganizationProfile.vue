<template>
	<div class="p-9 mobile:py-6 mobile:px-4 h-full overflow-y-auto" v-if="organization">
		<div>
			<router-link to="/admin/organizations">
				<span class="text-body-1 font-semibold cursor-pointer align-middle">
					<svg  class="inline-block mr-4 fill-gray-c-800 rotate-180" width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 13.7071C-0.0976311 13.3166 -0.0976312 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L8.41421 7L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071Z"/>
					</svg>
					{{ $t('organizationProfile.organization') }}
				</span>
			</router-link>
		</div>

		<div class="rounded-lg border border-gray-c-300 p-4 mt-6 mb-8 flex mobile:flex-col justify-between gap-4">
			<div>
				<div>
					<div class="mobile:text-center">
						<p class="text-h2 font-semibold text-gray-c-800">{{organization.name}}</p>
						<p class="text-h3 text-blue-c-500" v-if="organization.website">
							<a :href="`http://${organization.website}`" target="_blank">
								{{organization.website}}
							</a>
						</p>
					</div>
				</div>
				<div class="mt-4 text-body-1 mobile:text-center">
					<p class="font-semibold mb-1">{{ $t('organizationProfile.creationDate') }}</p>
					<p class="text-gray-c-600">{{GetOrgJoinDate()}}</p>
				</div>
			</div>
			<div class="font-medium flex gap-2 justify-center">
				<button-text-1 class="group p-2 align-middle h-min" @click="ShowEditModal">
					<svg class="inline-block mt-[-3px] mr-1.5" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1213 1.70705C14.9497 0.535475 13.0503 0.535477 11.8787 1.70705L0.878679 12.707C0.31607 13.2697 0 14.0327 0 14.8284V18.9999H4.17157C4.96722 18.9999 5.73028 18.6839 6.29289 18.1213L17.2929 7.12126C18.4645 5.94969 18.4645 4.0502 17.2929 2.87862L16.1213 1.70705ZM13.2929 3.12126C13.6834 2.73074 14.3166 2.73074 14.7071 3.12126L15.8787 4.29284C16.2692 4.68336 16.2692 5.31652 15.8787 5.70705L15 6.58573L12.4142 3.99994L13.2929 3.12126ZM11 5.41416L2.29289 14.1213C2.10536 14.3088 2 14.5632 2 14.8284L2 16.9999H4.17157C4.43679 16.9999 4.69114 16.8946 4.87868 16.707L13.5858 7.99994L11 5.41416Z" fill="#2E60B3"/>
					</svg>
					{{$t('general.edit')}}
				</button-text-1>
				<button-text-1 color="red" class="p-2 h-min" @click="RemoveClick">
					<svg class="inline-block mt-[-3px] mr-1.5 fill-red-c-500" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z"/>
					</svg>
          {{ $t('general.delete') }}
				</button-text-1>
			</div>
		</div>

		<div class="flex flex-wrap gap-4 items-center">
			<div class="text-body-2 font-semibold mobile:grow h-min">{{ $t('organizationProfile.employees') }} ({{organization.participants.length}})</div>
			<button-1 class="block mobile:grow h-min" @click.stop="ShowUserInviteModal">
				<img class="inline-block mb-0.5 mr-1.5" src="/src/assets/Organizations/addUser.svg" alt="">
				<span>{{ $t('organizationProfile.addEmployee') }}</span>
			</button-1>
		</div>

		<div class="mt-4 overflow-x-auto" v-if="organization.participants.length>0">
			<table class="w-full mobile:w-[720px]">
				<thead>
					<tr class="bg-gray-c-100 text-gray-c-400 text-h3">
						<th class="table-col-head">
              {{ $t('organizationProfile.name') }}
						</th>
						<th class="table-col-head">
              {{ $t('organizationProfile.email') }}
						</th>
						<th class="px-2 py-[17px] font-semibold text-center">
              {{ $t('organizationProfile.status') }}
						</th>
						<th class="table-col-head">
              {{ $t('organizationProfile.lastActivity') }}
						</th>
						<th>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="shadow-cs2" v-for="worker in organization.participants">
						<td class="table-col-row-item">
							<span v-if="worker.username">{{worker.username}}</span>
							<span v-else>-</span>
						</td>
						<td class="table-col-row-item">
							<span v-if="worker.email">{{worker.email}}</span>
							<span v-else>-</span>
						</td>
						<td>
							<button-tag :button-state="GetCurrentUserStatusStyle(worker.email_confirmed, worker.is_active)"
													class="hover:bg-white cursor-default mx-auto block">
								{{GetCurrentUserStatusText(worker.email_confirmed, worker.is_active)}}
							</button-tag>
						</td>
						<td class="table-col-row-item">
							<span v-if="worker.last_activity">{{GetDateTime(worker.last_activity)}}</span>
							<span v-else>-</span>
						</td>
						<td>
							<button class="mx-auto block" @click="showRemoveUserConfirm(worker)">
								<img src="/src/assets/delete.svg">
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

<!--	Edit organization modal-->
	<ModalTemplate :is-modal-visible="isEditModalVisible" :is-hide-on-click="true"
								 class-list="grid place-items-center px-4"
								 :close-func="CloseEditModal">
		<div @click.stop class="bg-white w-[480px] rounded-lg relative mobile:w-full relative p-6 mx-auto max-h-screen overflow-y-auto">
			<button class="absolute top-6 right-6 cursor-pointer"
							@click="CloseEditModal">
				<img src="/src/assets/close.svg">
			</button>
			<div class="text-h2 text-center font-semibold ">
				Редагування
			</div>
			<div class="flex flex-col gap-4 mt-4 mb-6">
				<div>
					<p class="text-h4 text-gray-c-500">{{ $t('dashboard.organizationName') }}</p>
					<input1 v-model="editingOrgName" class="w-full mt-1 outline-none" :placeholder="$t('dashboard.namePlaceholder')"/>
				</div>
				<div>
					<p class="text-h4 text-gray-c-500">{{ $t('dashboard.website') }}</p>
					<input1 v-model="editingOrgSite" class="w-full mt-1 outline-none" placeholder="organization.com"/>
				</div>
			</div>

			<div class="flex gap-4">
				<button2 class="w-full" @click.stop="CloseEditModal">
          {{ $t('general.cancel') }}
				</button2>
				<button-1 class="w-full" @click.stop="EditOrg">
          {{ $t('general.edit') }}
				</button-1>
			</div>
			<Loader v-if="isEditModalLoaderVisible" class="rounded-lg"/>
		</div>
	</ModalTemplate>
<!--	-->
<!--Invite user modal-->
	<ModalTemplate :is-modal-visible="isUserInviteModalVisible" :is-hide-on-click="true"
								 :close-func="CloseUserInviteModal" class-list="grid place-items-center px-4">
		<div class="bg-white w-[480px] rounded-lg relative mobile:w-full relative p-6 mx-auto max-h-screen overflow-y-auto"
		@click.stop>
			<button class="absolute top-6 right-6 cursor-pointer"
							@click="CloseUserInviteModal">
				<img src="/src/assets/close.svg">
			</button>
			<div class="text-h2 text-center font-semibold ">
        {{ $t('organizationProfile.addEmployee') }}
			</div>
			<div class="text-h3 text-gray-c-600 mt-2 mb-4">
        {{ $t('organizationProfile.employeeEnvelope') }}
			</div>
			<div class="flex flex-col gap-4 mt-4 mb-2">
				<input1 v-model="organization.name" disabled class="w-full" placeholder="Назва"/>
				<input1 v-for="(item,index) in invitedUsersList" v-model="invitedUsersList[index]" placeholder="Email" class="outline-none"/>
			</div>

			<div>
				<button-text-1 v-if="isAddInviteButtVisible" class="group p-2 font-medium" @click="AddUserInvite" >
					<svg class="inline-block mr-2" width="14" height="14" viewBox="0 0 14 14" fill="#2E60B2" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44771 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55229 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6H8V1Z"/>
					</svg>
          {{ $t('organizationProfile.addMore') }}
				</button-text-1>
			</div>

			<button-1 class="w-full mt-6" @click.stop="SendUserInvites" :disabled="!isSendInviteButtEnable">
        {{ $t('organizationProfile.sendInvite') }}
			</button-1>
			<Loader v-if="isUserInviteModalLoaderVisible" class="rounded-lg"/>
		</div>
	</ModalTemplate>
<!---->
<!--Remove organization modal-->
	<RemoveOrgModal :is-visible="isRemovedModalVisible"
									:organization="organization" :close-func="closeRemoveModal"
									:on-remove-success="onRemoveSuccess"/>
<!---->
	<ConfirmModal :is-visible="ConfirmModal.visible" :question="ConfirmModal.question"
	:accept-button-func="ConfirmModal.accept" :cancel-button-func="ConfirmModal.decline"
	:close-func="ConfirmModal.decline" :title="ConfirmModal.title"/>
	<Loader v-if="isLoaderVisible"/>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ButtonText1 from "../Buttons/Button_text_1.vue";
import dateFormatter from "../mixins/dateFormatter.js";
import ButtonTag from "../Buttons/ButtonTag.vue";
import ModalTemplate from "../Modals/ModalTemplate.vue";
import input1 from "../Inputs/Input-1.vue"
import Button2 from "../Buttons/Button_2.vue";
import Loader from "../Loader.vue";
import api from "../../http_client/index.js";
import RemoveOrgModal from "./RemoveOrgModal.vue";
import ConfirmModal from "../Modals/ConfirmModal.vue";

export default {
	name: "OrganizationProfile",
	components: {
		ConfirmModal,
		Button2,
		ModalTemplate,
		ButtonTag,
		ButtonText1,
		input1,
		Loader,
		RemoveOrgModal,
	},
	mixins : [dateFormatter],
	data () {
		return {
			organization : null,
			isEditModalVisible : false,
			isEditModalLoaderVisible : false,
			editingOrgName : "",
			editingOrgSite : "",
			invitedUsersList : [""],
			isUserInviteModalVisible : false,
			isUserInviteModalLoaderVisible : false,
			isRemovedModalVisible : false,
			isLoaderVisible : true,
			onErrorMessageClose : ()=>{},
			ConfirmModal : {
				question : "",
        title : "",
				accept : ()=>{},
				decline : ()=>{},
				visible : false
			}
		}
	},
	methods : {
		GetOrgJoinDate(){
			return this.GetDateString(this.organization.created_at)
		},
		GetCurrentUserStatusStyle(mailConf, isActive){
			if(mailConf && isActive)
				return "positive";
			else if(mailConf && !isActive)
				return "negative";
			else if(!mailConf && !isActive)
				return "inactive";
			else
				return "negative";

		},
		GetCurrentUserStatusText(mailConf, isActive){
			if(mailConf && isActive)
				return this.$t('general.active');
			else if(mailConf && !isActive)
				return this.$t('general.banned')
			else if(!mailConf && !isActive)
				return this.$t('general.pending');
			else
				return this.$t('general.error');
		},
		ShowEditModal(){
			this.editingOrgName = this.organization.name;
			this.editingOrgSite = this.organization.website
			this.isEditModalVisible = true;
		},
		CloseEditModal(){
			this.isEditModalVisible = false;
			this.isEditModalLoaderVisible = false;
			this.editingOrgName = "";
			this.editingOrgSite = "";
		},
		AddUserInvite(){
			if(this.invitedUsersList.length<5)
				this.invitedUsersList.push("");
			else
				this.$toast.info(this.$t("organizationProfile.maxInviteMess"))
		},
		ShowUserInviteModal(){
			if(!this.invitedUsersList || this.invitedUsersList.length<=0)
				this.invitedUsersList = [""]
			this.isUserInviteModalVisible = true;
		},
		CloseUserInviteModal(){
			this.isUserInviteModalVisible = false;
			this.isUserInviteModalLoaderVisible = false;
		},
		async EditOrg(){
			this.isEditModalLoaderVisible = true;

			await api.organizations.editOrganization(this.organization.id, this.editingOrgName, this.editingOrgSite, "")
				.then(res => {
					this.organization = res.data;
					this.CloseEditModal();
          this.$toast.success(this.$t("organizationProfile.orgUpdateSuccess", {orgNane : this.organization.name}));
				})
				.catch(err=>{
          let ErrorMessage = this.$t('general.errorMessage');
					if(err.response.status == 400)
						ErrorMessage = this.$t('dashboard.organizationExist', {orgName : this.createOrgName});
					this.CloseEditModal();
          this.$toast.error(ErrorMessage);
				})
		},
		async SendUserInvites(){
			this.isUserInviteModalLoaderVisible = true;
			await api.organizations.sendUserInvite(this.organization.id, this.invitedUsersList)
				.then(res=>{
					console.log(res)
					this.organization = res.data;
					this.CloseUserInviteModal()
					this.invitedUsersList = [""];
          this.$toast.success(this.$t('organizationProfile.successInvite'))
				}).catch(err =>{
					this.CloseUserInviteModal();
          this.$toast.error(this.$t('general.errorMessage'))
					//throw err
				})
		},
		RemoveClick(){
			this.isRemovedModalVisible = true;
		},
		closeRemoveModal(){
			this.isRemovedModalVisible = false;
		},
		onRemoveSuccess(){
			this.$router.push("/admin/organizations");
		},
		showRemoveUserConfirm(worker){
			this.ConfirmModal.question = this.$t('organizationProfile.deleteUserQuestion',{userName : worker.username});
      this.ConfirmModal.title = this.$t("organizationProfile.deleteUserTitle");
			this.ConfirmModal.accept = ()=>this.removeWorker(worker);
			this.ConfirmModal.decline = ()=>this.ConfirmModal.visible = false;
			this.ConfirmModal.visible = true;
		},
		async getOrganization(){
			this.isLoaderVisible = true;
			await api.organizations.getOrgById(this.$route.params.id)
				.then(res=>{
					this.organization = res.data;
					this.isLoaderVisible = false;
				})
				.catch(err=>{
					this.isLoaderVisible = false;
          this.$toast.error(this.$t("general.errorMessage"),  {
            duration : false,
            onClose : ()=> this.$router.push("/admin/organizations")
          })
				})
		},
		async removeWorker(worker){
			this.ConfirmModal.visible = false;
			this.isLoaderVisible = true;
			await api.organizations.removeOrganizationMember(this.organization.id, worker.id)
				.then(res=>{
					this.organization.participants = res.data.participants
					this.isLoaderVisible = false;
          this.$toast.success(this.$t("organizationProfile.userRemovedSuccess", {userName : worker.username}))
				})
				.catch(err=>{
					this.isLoaderVisible = false;
          this.$toast.error(this.$t("organizationProfile.userRemovedError", {userName : worker.username}))
        })
		}
	},
	computed : {
		isAddInviteButtVisible () {
			return this.invitedUsersList.length<5
		},
		isSendInviteButtEnable(){
			return this.invitedUsersList.some(x=>x.length>6);
		}
	},
	created() {
		this.getOrganization();
	}
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
	.table-col-head{
		@apply px-2 py-[17px] font-semibold text-left
	}
	.table-col-row-item{
		@apply px-2 py-[17px] text-h3 text-gray-c-800
	}
</style>
