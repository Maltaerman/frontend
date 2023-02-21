<template>
	<div class="p-9 mobile:py-6 mobile:px-4 h-full overflow-y-auto" v-if="organization">
		<div class="flex row flex-wrap gap-4 justify-between">
			<div class="text-body-2 font-semibold mobile:grow h-min">{{ $t('organizationProfile.aidWorkers') }}</div>
			<button-1 class="block flex items-center mobile:w-full justify-center h-[46px]"
				@click.stop="ShowUserInviteModal">
				<img class="inline-block mb-0.5 mr-1.5" src="/src/assets/Organizations/addUser.svg" alt="">
				<span>{{ $t('organizationProfile.newInvitation') }}</span>
			</button-1>
		</div>
		<div class="flex row flex-wrap gap-4 justify-start  my-4 mb-4 " >
			<!-- Need to be reusable becasue its gonna be used in table roles -->
			<div class="flex flex-row justify-center overflow-visible max-h-[42px] min-w-screen z-50">
				<div class="flex-none">
					<button @click="showDropdownOptions" @click.stop="isDropped = !isDropped"
						class="flex flex-row justify-between mobile:w-full  items-center  w-48 px-2 py-2 text-gray-700 bg-white border-1  border border-gray-c-300 rounded-md shadow focus:outline-none focus:border-blue-500">
						<span class="select-none">{{ activeStatusFilterValue }}</span>

						<img src="/src/assets/dropdown-arrow.svg" class="w-3.5 h-2  transition-all duration-300" :class="{
							'rotate-0': !isDropped,
							'rotate-180': isDropped
						}">
					</button>
					<div id="options" class="hidden w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
						<ul>
							<li v-for="status in statusesList" @click="selectStatusesFilter(status)"
								@click.stop="showDropdownOptions"
				
								class="block px-4 py-2 text-gray-c-800 hover:text-blue-c-500 hover:bg-blue-c-100 hover:text-blue-c-500">
								{{ status }}
							</li>
						</ul>

					</div>
				</div>
			</div>
			<div class="flex flex-wrap justify-start  min-w-screen">
				<div class="border font-normal
							rounded-lg outline-none text-h3
							hover:border-blue-c-400 focus:border-blue-c-500
							disabled:bg-gray-c-100 disabled:hover:border-gray-c-300
							disabled:text-gray-c-500 flex overflow-hidden px-5 flex items-center min-w-[400px] mobile:min-w-full" :class="{
								'border-blue-c-500': isInputFocused,
								'border-gray-c-300': !isInputFocused
							}" @focusin="OnDivFocus(true)" @focusout="OnDivFocus(false)" @click="ActivateInput">

					<svg class="fill-gray-c-500" width="18" height="18" viewBox="0 0 18 18"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0ZM2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7Z" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0ZM2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7Z"
							fill-opacity="0.2" />
					</svg>


					<input ref="inp" class="w-full outline-none px-4 py-2 bg-transparent text-h3"
						@focusin="OnInputFocus(true)" @focusout="OnInputFocus(false)" @click.stop
						:placeholder="$t('dashboard.organizationSearchPlaceholder')"
						v-model="searchController.SearchedOrgName"
						id="inpOrgSearch" />
				</div>

			</div>
		</div>


		<!-- Table of organizations -->
		<div class="mt-4 overflow-x-auto" v-if="organization.participants.length > 0">
			<table class="w-full mobile:w-[720px]">
				<thead>
					<tr class="bg-gray-c-100 text-gray-c-400 text-h3">
						<th class="table-col-head">
							{{ $t('organizationProfile.name') }}
						</th>
						<th class="table-col-head">
							{{ $t('organizationProfile.email') }}
						</th>
						<th class="table-col-head">
							{{ $t('organizationProfile.role') }}
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
					<tr class="shadow-cs2" v-for="worker in visibleParitcipantsList">
						<td class="table-col-row-item">
							<span v-if="worker.username">{{ worker.username }}</span>
							<span v-else>-</span>
						</td>
						<td class="table-col-row-item">
							<span>{{ worker.email || '-' }}</span>
						</td>
						<td class="table-col-row-item">
							<span>{{ worker.organizationRole }}</span>

						</td>
						<td>
							<button-tag :button-state="GetCurrentUserStatusStyle(worker.email_confirmed, worker.is_active)"
								class="hover:bg-white cursor-default mx-auto block">
								{{ GetCurrentUserStatusText(worker.email_confirmed, worker.is_active) }}
							</button-tag>
						</td>

						<td class="table-col-row-item">
							<span v-if="worker.last_activity">{{ GetDateTime(worker.last_activity) }}</span>
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
	<ModalTemplate :is-modal-visible="isEditModalVisible" :is-hide-on-click="true" class-list="grid place-items-center px-4"
		:close-func="CloseEditModal">
		<div @click.stop
			class="bg-white w-[480px] rounded-lg veve mobile:w-full relative p-6 mx-auto max-h-screen overflow-y-auto">
			<button class="absolute top-6 right-6 cursor-pointer" @click="CloseEditModal">
				<img src="/src/assets/close.svg">
			</button>
			<div class="text-h2 text-center font-semibold ">
				Редагування
			</div>
			<div class="flex flex-col gap-4 mt-4 mb-6">
				<div>
					<p class="text-h4 text-gray-c-500">{{ $t('dashboard.organizationName') }}</p>
					<input1 v-model="editingOrgName" class="w-full mt-1 outline-none"
						:placeholder="$t('dashboard.namePlaceholder')" />
				</div>
				<div>
					<p class="text-h4 text-gray-c-500">{{ $t('dashboard.website') }}</p>
					<input1 v-model="editingOrgSite" class="w-full mt-1 outline-none" placeholder="organization.com" />
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
			<Loader v-if="isEditModalLoaderVisible" class="rounded-lg" />
		</div>
	</ModalTemplate>
	<!--	-->
	<!--Invite user modal-->
	<ModalTemplate :is-modal-visible="isUserInviteModalVisible" :is-hide-on-click="true" :close-func="CloseUserInviteModal"
		class-list="grid place-items-center px-4">
		<div class="bg-white w-[480px] rounded-lg relative mobile:w-full relative p-6 mx-auto max-h-screen overflow-y-auto"
			@click.stop>
			<button class="absolute top-6 right-6 cursor-pointer" @click="CloseUserInviteModal">
				<img src="/src/assets/close.svg">
			</button>
			<div class="text-h2 text-center font-semibold ">
				{{ $t('organizationProfile.addEmployee') }}
			</div>
			<div class="text-h3 text-gray-c-600 mt-2 mb-4">
				{{ $t('organizationProfile.employeeEnvelope') }}
			</div>
			<div class="flex flex-col gap-4 mt-4 mb-2">
				<input1 v-model="organization.name" disabled class="w-full" placeholder="Назва" />
				<input1 v-for="(item, index) in invitedUsersList" v-model="invitedUsersList[index]" placeholder="Email"
					class="outline-none" />
			</div>

			<div>
				<button-text-1 v-if="isAddInviteButtVisible" class="group p-2 font-medium" @click="AddUserInvite">
					<svg class="inline-block mr-2" width="14" height="14" viewBox="0 0 14 14" fill="#2E60B2"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44771 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55229 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6H8V1Z" />
					</svg>
					{{ $t('organizationProfile.addMore') }}
				</button-text-1>
			</div>

			<button-1 class="w-full mt-6" @click.stop="SendUserInvites" :disabled="!isSendInviteButtEnable">
				{{ $t('organizationProfile.sendInvite') }}
			</button-1>
			<Loader v-if="isUserInviteModalLoaderVisible" class="rounded-lg" />
		</div>
	</ModalTemplate>
	<!---->
	<!--Remove organization modal-->
	<RemoveOrgModal :is-visible="isRemovedModalVisible" :organization="organization" :close-func="closeRemoveModal"
		:on-remove-success="onRemoveSuccess" />
	<!---->
	<ConfirmModal :is-visible="ConfirmModal.visible" :question="ConfirmModal.question"
		:accept-button-func="ConfirmModal.accept" :cancel-button-func="ConfirmModal.decline"
		:close-func="ConfirmModal.decline" :title="ConfirmModal.title" />
	<Loader v-if="isLoaderVisible" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
import CodeInput from '../Inputs/CodeInput.vue';
import Input1 from '../Inputs/Input-1.vue';
import InputPass from '../Inputs/Input-pass.vue';
import TelInput from '../Inputs/TelInput.vue';
import InputSuggestion from '../Inputs/suggestionInput/Input-suggestion.vue';
import { ORGANIZATION_STATUSES } from './constants';
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
		CodeInput,
		Input1,
		InputPass,
		TelInput,
		InputSuggestion
	},
	mixins: [dateFormatter],
	data() {
		return {
			organization: null,
			isEditModalVisible: false,
			isEditModalLoaderVisible: false,
			editingOrgName: "",
			organizationStatusFilters: [],
			organizationParticipantsVisibleList: [],
			defaultStatusFilterValue: 'All statuses',
			activeStatusFilterValue: 'All statuses',
			searchController: {
				SearchedOrgName: "",
				SearchedOrganizationsList: [],
				isSearchedOrgResult: false,
				cancelController: null
			},
			isInputFocused: false,
			editingOrgSite: "",
			invitedUsersList: [""],
			isUserInviteModalVisible: false,
			isUserInviteModalLoaderVisible: false,
			isRemovedModalVisible: false,
			isLoaderVisible: true,
			isDropped: false,
			onErrorMessageClose: () => { },
			ConfirmModal: {
				question: "",
				title: "",
				accept: () => { },
				decline: () => { },
				visible: false
			}
		}
	},
	methods: {
		GetOrgJoinDate() {
			return this.GetDateString(this.organization.created_at)
		},
		ActivateInput() {
			this.$refs.inp.select()
		},
		
		OnInputFocus(value) {
			this.isInputFocused = value;
		},
		OnDivFocus(arg) {
			this.isInputFocused = arg;
			if (arg)
				this?.$refs?.inp?.focus();
		},
		GetCurrentUserStatusStyle(mailConf, isActive) {
			if (mailConf && isActive)
				return "positive";
			else if (mailConf && !isActive)
				return "negative";
			else if (!mailConf && !isActive)
				return "inactive";
			else
				return "negative";

		},

		GetCurrentUserStatusText(mailConf, isActive) {
			if (mailConf && isActive)
				return this.$t('general.active');
			else if (mailConf && !isActive)
				return this.$t('general.banned')
			else if (!mailConf && !isActive)
				return this.$t('general.pending');
			else
				return this.$t('general.error');
		},
		ShowEditModal() {
			this.editingOrgName = this.organization.name;
			this.editingOrgSite = this.organization.website
			this.isEditModalVisible = true;
		},
		CloseEditModal() {
			this.isEditModalVisible = false;
			this.isEditModalLoaderVisible = false;
			this.editingOrgName = "";
			this.editingOrgSite = "";
		},
		AddUserInvite() {
			if (this.invitedUsersList.length < 5)
				this.invitedUsersList.push("");
			else
				this.$toast.info(this.$t("organizationProfile.maxInviteMess"))
		},
		showDropdownOptions() {
			document.getElementById("options").classList.toggle("hidden");
			// this.isDropped= !this.isDropped
		},
		ShowUserInviteModal() {
			if (!this.invitedUsersList || this.invitedUsersList.length <= 0)
				this.invitedUsersList = [""]
			this.isUserInviteModalVisible = true;
		},
		CloseUserInviteModal() {
			this.isUserInviteModalVisible = false;
			this.isUserInviteModalLoaderVisible = false;
		},
		async EditOrg() {
			this.isEditModalLoaderVisible = true;

			await api.organizations.editOrganization(this.organization.id, this.editingOrgName, this.editingOrgSite, "")
				.then(res => {
					this.organization = res.data;
					this.CloseEditModal();
					this.$toast.success(this.$t("organizationProfile.orgUpdateSuccess", { orgNane: this.organization.name }));
				})
				.catch(err => {
					let ErrorMessage = this.$t('general.errorMessage');
					if (err.response.status == 400)
						ErrorMessage = this.$t('dashboard.organizationExist', { orgName: this.createOrgName });
					this.CloseEditModal();
					this.$toast.error(ErrorMessage);
				})
		},
		async SendUserInvites() {
			this.isUserInviteModalLoaderVisible = true;
			await api.organizations.sendUserInvite(this.organization.id, this.invitedUsersList)
				.then(res => {
					console.log(res)
					this.organization = res.data;
					this.CloseUserInviteModal()
					this.invitedUsersList = [""];
					this.$toast.success(this.$t('organizationProfile.successInvite'))
				}).catch(err => {
					this.CloseUserInviteModal();
					this.$toast.error(this.$t('general.errorMessage'))
					//throw err
				})
		},
		RemoveClick() {
			this.isRemovedModalVisible = true;
		},
		closeRemoveModal() {
			this.isRemovedModalVisible = false;
		},
		onRemoveSuccess() {
			this.$router.push("/admin/organizations");
		},
		showRemoveUserConfirm(worker) {
			this.ConfirmModal.question = this.$t('organizationProfile.deleteUserQuestion', { userName: worker.username });
			this.ConfirmModal.title = this.$t("organizationProfile.deleteUserTitle");
			this.ConfirmModal.accept = () => this.removeWorker(worker);
			this.ConfirmModal.decline = () => this.ConfirmModal.visible = false;
			this.ConfirmModal.visible = true;
		},
		async getOrganization() {
			this.isLoaderVisible = true;
			await api.organizations.getOrgById(this.$route.params.id)
				.then(res => {
					this.organization = res.data;
					this.isLoaderVisible = false;
				})
				.catch(err => {
					this.isLoaderVisible = false;
					this.$toast.error(this.$t("general.errorMessage"), {
						duration: false,
						onClose: () => this.$router.push("/admin/organizations")
					})
				})
		},
		selectStatusesFilter(selectedStatus) {
			this.activeStatusFilterValue = selectedStatus
			this.isDropped = !this.isDropped
		},
		ToggleDrop(boolean) {
			this.isDropped = !boolean
		},
		async removeWorker(worker) {
			this.ConfirmModal.visible = false;
			this.isLoaderVisible = true;
			await api.organizations.removeOrganizationMember(this.organization.id, worker.id)
				.then(res => {
					this.organization.participants = res.data.participants
					this.isLoaderVisible = false;
					this.$toast.success(this.$t("organizationProfile.userRemovedSuccess", { userName: worker.username }))
				})
				.catch(err => {
					this.isLoaderVisible = false;
					this.$toast.error(this.$t("organizationProfile.userRemovedError", { userName: worker.username }))
				})
		}
	},
	computed: {

		visibleParitcipantsList() {
			switch (this.activeStatusFilterValue) {
				case this.defaultStatusFilterValue:
					return this.organization.participants

				default:
					return this.organization.participants.filter(worker => this.GetCurrentUserStatusText(worker.email_confirmed, worker.is_active) === this.activeStatusFilterValue)
			}
		},
		statusesList() {
			const roles = this.organization.participants.map(worker => this.GetCurrentUserStatusText(worker.email_confirmed, worker.is_active))

			return [this.defaultStatusFilterValue, ... new Set(roles)]
		},
		isAddInviteButtVisible() {
			return this.invitedUsersList.length < 5
		},
		isSendInviteButtEnable() {
			return this.invitedUsersList.some(x => x.length > 6);
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

.table-col-head {
	@apply px-2 py-[17px] font-semibold text-left
}

.table-col-row-item {
	@apply px-2 py-[17px] text-h3 text-gray-c-800
}
</style>
