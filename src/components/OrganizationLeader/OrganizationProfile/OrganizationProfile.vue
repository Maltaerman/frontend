<template>
	<div class="py-6 px-4 comp:p-9 h-full overflow-y-auto" v-if="organization">
		<div class="flex row flex-wrap gap-4 justify-between items-center pb-6 comp:pb-9">
			<div class="title mobile:grow h-min">
				{{ $t('organizationProfile.employees') }}
			</div>
			<button-1 class="block h-min flex items-center mobile:w-full justify-center gap-1.5"
				@click.stop="ShowUserInviteModal">
				<img class="block mb-0.5" src="/src/assets/Organizations/addUser.svg" alt="">
				<p class="">{{ $t('organizationProfile.newInvitation') }}</p>
			</button-1>
		</div>
		<div class="flex row flex-wrap gap-4 justify-start mb-4">
			<!-- Need to be reusable becasue its gonna be used in table roles -->
			<DropDownSelect v-model="selectedDropOption" :options="dropdownOptions" class="max-h-[42px] min-w-[150px]"/>
			<InputSearch class="comp:max-w-[400px]"  v-model="query" :placeholder="$t('dashboard.organizationSearchPlaceholder')"/>
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
							{{ $t('Roles.Role') }}
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
							<span v-if="worker.username">{{ worker.username ?? '-' }}</span>
						</td>
						<td class="table-col-row-item">
							<span>{{ worker.email || '-' }}</span>
						</td>
						<td class="table-col-row-item">
							<span>{{ worker.organizationRole ?? "Role here" }}</span>
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
	<ConfirmModal :is-visible="ConfirmModal.visible" :question="ConfirmModal.question"
		:accept-button-func="ConfirmModal.accept" :cancel-button-func="ConfirmModal.decline"
		:close-func="ConfirmModal.decline" :title="ConfirmModal.title" />
	<Loader v-if="isLoaderVisible" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ButtonText1 from "../../Buttons/Button_text_1.vue";
import dateFormatter from "../../mixins/dateFormatter.js";
import ButtonTag from "../../Buttons/ButtonTag.vue";
import ModalTemplate from "../../Modals/ModalTemplate.vue";
import input1 from "../../Inputs/Input-1.vue"
import Button2 from "../../Buttons/Button_2.vue";
import Loader from "../../Loader.vue";
import api from "../../../http_client/index.js";
import ConfirmModal from "../../Modals/ConfirmModal.vue";
import CodeInput from '../../Inputs/CodeInput.vue';
import Input1 from '../../Inputs/Input-1.vue';
import InputPass from '../../Inputs/Input-pass.vue';
import TelInput from '../../Inputs/TelInput.vue';
import InputSuggestion from '../../Inputs/suggestionInput/Input-suggestion.vue';
import { ORGANIZATION_STATUSES } from '../../PlatformAdministration/constants.js';
import OrganizationDropdown from '../../PlatformAdministration/shared/OrganizationDropdown.vue';
import InputSearch from "../../Inputs/InputSearch.vue";
import DropDownSelect from "../../Inputs/DropDownSelect.vue";
import regex from "../../mixins/regex.js";

export default {
	name: "OrganizationProfile",
	components: {
		DropDownSelect,
		InputSearch,
		ConfirmModal,
		Button2,
		ModalTemplate,
		ButtonTag,
		ButtonText1,
		input1,
		Loader,
		CodeInput,
		Input1,
		InputPass,
		TelInput,
		InputSuggestion,
		OrganizationDropdown
	},
	mixins: [
		dateFormatter,
		regex
	],
	data() {
		return {
			organization: null,
			query : "",
			organizationStatusFilters: [],
			organizationParticipantsVisibleList: [],
			activeStatusFilterValue: 'All statuses',
			defaultStatusFilterValue: 'All statuses',
			invitedUsersList: [""],
			isUserInviteModalVisible: false,
			isUserInviteModalLoaderVisible: false,
			isLoaderVisible: false,
			onErrorMessageClose: () => { },
			ConfirmModal: {
				question: "",
				title: "",
				accept: () => { },
				decline: () => { },
				visible: false
			},
			selectedDropOption : null
		}
	},
	methods: {
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
		AddUserInvite() {
			if (this.invitedUsersList.length < 5)
				this.invitedUsersList.push("");
			else
				this.$toast.info(this.$t("organizationProfile.maxInviteMess"))
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

		showRemoveUserConfirm(worker) {
			this.ConfirmModal.question = this.$t('organizationProfile.deleteUserQuestion', { userName: worker.username });
			this.ConfirmModal.title = this.$t("organizationProfile.deleteUserTitle");
			this.ConfirmModal.accept = () => this.removeWorker(worker);
			this.ConfirmModal.decline = () => this.ConfirmModal.visible = false;
			this.ConfirmModal.visible = true;
		},
		onStatusFilterChange({selectedStatus}) {
			this.activeStatusFilterValue = selectedStatus
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
		...mapGetters({
			userOrganization : "getUserOrganization"
		}),
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

			return [this.defaultStatusFilterValue, ...new Set(roles)]
		},
		isAddInviteButtVisible() {
			return this.invitedUsersList.length < 5
		},
		isSendInviteButtEnable() {
			return this.invitedUsersList.every(x => this.isMail(x));
		},
		dropdownDefault(){
			return {
				text : this.$t("general.all"),
				item :	this.$t("general.all")
			}
		},
		dropdownOptions(){
			let options = this.organization.participants.map(worker => {
				let t = this.GetCurrentUserStatusText(worker.email_confirmed, worker.is_active);
				return {
					text : t,
					item :	t,
				}
			});
			console.log([this.dropdownDefault, ...options])
			return [this.dropdownDefault, ...options]
		}
	},
	watch : {
		userOrganization(newVal){
			if(newVal)
				this.organization = newVal;
		}
	},
	created() {
		this.selectedDropOption = this.dropdownDefault;
		if(this.userOrganization)
			this.organization = this.userOrganization
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
