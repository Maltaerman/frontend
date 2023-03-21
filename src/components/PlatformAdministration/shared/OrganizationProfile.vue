<template>
  <div
    v-if="organization"
    class="h-full overflow-y-auto p-9 mobile:py-6 mobile:px-4"
  >
    <div class="row flex flex-wrap justify-between gap-4">
      <div class="text-body-2 h-min font-semibold mobile:grow">
        {{ $t('organizationProfile.aidWorkers') }}
      </div>
      <button-1
        class="block flex h-[46px] items-center justify-center mobile:w-full"
        @click.stop="ShowUserInviteModal"
      >
        <img
          alt=""
          class="mb-0.5 mr-1.5 inline-block"
          src="/src/assets/Organizations/addUser.svg"
        />
        <span>{{ $t('organizationProfile.newInvitation') }}</span>
      </button-1>
    </div>
    <div class="row my-4 mb-4 flex flex-wrap justify-start gap-4">
      <!-- Need to be reusable becasue its gonna be used in table roles -->
      <OrganizationDropdown
        :active-filter-value="activeStatusFilterValue.text"
        :filter-list="statusesList"
        @filterChange="onStatusFilterChange"
      />
      <div class="min-w-screen flex flex-wrap justify-start">
        <div
          class="flex flex min-w-[400px] items-center overflow-hidden rounded-lg border px-5 text-h3 font-normal outline-none hover:border-blue-c-400 focus:border-blue-c-500 disabled:bg-gray-c-100 disabled:text-gray-c-500 disabled:hover:border-gray-c-300 mobile:min-w-full"
          :class="{
            'border-blue-c-500': isInputFocused,
            'border-gray-c-300': !isInputFocused,
          }"
          @click="ActivateInput"
          @focusin="OnDivFocus(true)"
          @focusout="OnDivFocus(false)"
        >
          <svg
            class="fill-gray-c-500"
            height="18"
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0ZM2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7Z"
              fill-rule="evenodd"
            />
            <path
              clip-rule="evenodd"
              d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57234 14 10.0236 13.4816 11.1922 12.6064L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L12.6064 11.1922C13.4816 10.0236 14 8.57234 14 7C14 3.13401 10.866 0 7 0ZM2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7Z"
              fill-opacity="0.2"
              fill-rule="evenodd"
            />
          </svg>

          <input
            id="inpOrgSearch"
            ref="inp"
            v-model="searchedParticipantValue"
            class="w-full bg-transparent px-4 py-2 text-h3 outline-none"
            :placeholder="$t('dashboard.organizationSearchPlaceholder')"
            @click.stop
            @focusin="OnInputFocus(true)"
            @focusout="OnInputFocus(false)"
            @input="updateParticipantsVisibleList"
          />
        </div>
      </div>
    </div>

    <!-- Table of organizations -->
    <div
      v-if="organization.participants.length > 0"
      class="mt-4 mr-4 overflow-x-scroll mobile:w-auto"
    >
      <table class="w-full min-w-[799px] table-auto">
        <thead>
          <tr class="h-[58px] bg-gray-c-100 text-h3 text-gray-c-400">
            <th class="table-col-head w-12">No</th>
            <th class="table-col-head w-1/5">
              {{ $t('organizationProfile.name') }}
            </th>
            <th class="table-col-head w-1/5">
              {{ $t('organizationProfile.role') }}
            </th>
            <th class="w-32 px-4 py-[17px] text-center font-semibold">
              {{ $t('organizationProfile.status') }}
            </th>
            <th class="table-col-head">
              {{ $t('organizationProfile.lastActivity') }}
            </th>
            <th class="min-w-16"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(worker, index) in organizationParticipantsVisibleList"
            :key="index"
            class="h-[58px] shadow-cs2"
          >
            <td class="table-col-row-item">{{ worker.id + 1 }}</td>
            <td class="table-col-row-item">
              <!-- <span v-if="worker.username">{{ worker.username }}</span>

							<span v-else>-</span> -->
              <div
                class="overflow-hidden truncate text-ellipsis text-base font-semibold text-gray-c-800"
              >
                {{ worker.username }}
              </div>
              <div class="font-text-xs text-subtitle text-gray-c-600">
                {{ worker.email }}
              </div>
            </td>

            <td class="table-col-row-item">
              <OrganizationDropdown
                :active-filter-value="getRoleTextToDisplay(worker.role)"
                :filter-list="rolesList"
                :is-table-view="true"
                @filterChange="onWorkerRoleChange($event, worker)"
              />
            </td>
            <td>
              <button-tag
                :button-state="
                  GetCurrentUserStatusStyle(
                    worker.email_confirmed,
                    worker.is_active,
                  )
                "
                class="mx-auto block cursor-default hover:bg-white"
              >
                {{
                  GetCurrentUserStatusText(
                    worker.email_confirmed,
                    worker.is_active,
                  )
                }}
              </button-tag>
            </td>

            <td class="table-col-row-item min-w-[120px]">
              <span v-if="worker.last_activity">{{
                GetDateTime(worker.last_activity)
              }}</span>
              <span v-else>-</span>
            </td>
            <td class="min-w-[20px]">
              <button
                class="mx-auto block"
                @click="showRemoveUserConfirm(worker)"
              >
                <img src="/src/assets/delete.svg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!--	Edit organization modal-->
  <ModalTemplate
    class-list="grid place-items-center px-4"
    :close-func="CloseEditModal"
    :is-hide-on-click="true"
    :is-modal-visible="isEditModalVisible"
  >
    <div
      class="veve relative mx-auto max-h-screen w-[480px] overflow-y-auto rounded-lg bg-white p-6 mobile:w-full"
      @click.stop
    >
      <button
        class="absolute top-6 right-6 cursor-pointer"
        @click="CloseEditModal"
      >
        <img src="/src/assets/close.svg" />
      </button>
      <div class="text-center text-h2 font-semibold">Редагування</div>
      <div class="mt-4 mb-6 flex flex-col gap-4">
        <div>
          <p class="text-h4 text-gray-c-500">
            {{ $t('dashboard.organizationName') }}
          </p>
          <input1
            v-model="editingOrgName"
            class="mt-1 w-full outline-none"
            :placeholder="$t('dashboard.namePlaceholder')"
          />
        </div>
        <div>
          <p class="text-h4 text-gray-c-500">{{ $t('dashboard.website') }}</p>
          <input1
            v-model="editingOrgSite"
            class="mt-1 w-full outline-none"
            placeholder="organization.com"
          />
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
  <ModalTemplate
    class-list="grid place-items-center px-4"
    :close-func="CloseUserInviteModal"
    :is-hide-on-click="true"
    :is-modal-visible="isUserInviteModalVisible"
  >
    <div
      class="relative relative mx-auto max-h-screen w-[480px] overflow-y-auto rounded-lg bg-white p-6 mobile:w-full"
      @click.stop
    >
      <button
        class="absolute top-6 right-6 cursor-pointer"
        @click="CloseUserInviteModal"
      >
        <img src="/src/assets/close.svg" />
      </button>
      <div class="text-center text-h2 font-semibold">
        {{ $t('organizationProfile.addEmployee') }}
      </div>
      <div class="mt-2 mb-4 text-h3 text-gray-c-600">
        {{ $t('organizationProfile.employeeEnvelope') }}
      </div>
      <div class="mt-4 mb-2 flex flex-col gap-4">
        <input1
          v-model="organization.name"
          class="w-full"
          disabled
          placeholder="Назва"
        />
        <input1
          v-for="(item, index) in invitedUsersList"
          :key="index"
          v-model="invitedUsersList[index]"
          class="outline-none"
          placeholder="Email"
        />
      </div>

      <div>
        <button-text-1
          v-if="isAddInviteButtVisible"
          class="group p-2 font-medium"
          @click="AddUserInvite"
        >
          <svg
            class="mr-2 inline-block"
            fill="#2E60B2"
            height="14"
            viewBox="0 0 14 14"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44771 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55229 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6H8V1Z"
              fill-rule="evenodd"
            />
          </svg>
          {{ $t('organizationProfile.addMore') }}
        </button-text-1>
      </div>

      <button-1
        class="mt-6 w-full"
        :disabled="!isSendInviteButtEnable"
        @click.stop="SendUserInvites"
      >
        {{ $t('organizationProfile.sendInvite') }}
      </button-1>
      <Loader v-if="isUserInviteModalLoaderVisible" class="rounded-lg" />
    </div>
  </ModalTemplate>
  <!---->
  <!--Remove organization modal-->
  <RemoveOrgModal
    :close-func="closeRemoveModal"
    :is-visible="isRemovedModalVisible"
    :on-remove-success="onRemoveSuccess"
    :organization="organization"
  />
  <!---->
  <ConfirmModal
    :accept-button-func="ConfirmModal.accept"
    :cancel-button-func="ConfirmModal.decline"
    :close-func="ConfirmModal.decline"
    :is-visible="ConfirmModal.visible"
    :question="ConfirmModal.question"
    :title="ConfirmModal.title"
  />
  <Loader v-if="isLoaderVisible" />
</template>

<script>
import api from '../../../http_client/index.js'
import ButtonTag from '../../Buttons/ButtonTag.vue'
import Button2 from '../../Buttons/Button_2.vue'
import ButtonText1 from '../../Buttons/Button_text_1.vue'
import { default as input1 } from '../../Inputs/Input-1.vue'
import Loader from '../../Loader.vue'
import ConfirmModal from '../../Modals/ConfirmModal.vue'
import ModalTemplate from '../../Modals/ModalTemplate.vue'
import dateFormatter from '../../mixins/dateFormatter.js'
import userRoles from '../../mixins/userRoles'
import RemoveOrgModal from '../RemoveOrgModal.vue'
import { PARTICIPANT_STATUSES } from '../constants'

import OrganizationDropdown from './OrganizationDropdown.vue'

export default {
  name: 'OrganizationProfile',
  components: {
    ConfirmModal,
    Button2,
    ModalTemplate,
    ButtonTag,
    ButtonText1,
    input1,
    Loader,
    RemoveOrgModal,
    OrganizationDropdown,
  },
  mixins: [dateFormatter, userRoles],
  data() {
    return {
      organization: null,
      participants: [],
      isEditModalVisible: false,
      isEditModalLoaderVisible: false,
      editingOrgName: '',
      organizationStatusFilters: [],
      organizationParticipantsVisibleList: [],
      activeStatusFilterValue: { value: 'all', text: this.$t(`general.all`) },
      defaultStatusFilterValue: { value: 'all', text: this.$t(`general.all`) },
      searchedParticipantValue: '',
      isInputFocused: false,
      editingOrgSite: '',
      invitedUsersList: [''],
      isUserInviteModalVisible: false,
      isUserInviteModalLoaderVisible: false,
      isRemovedModalVisible: false,
      isLoaderVisible: true,
      isDropped: false,
      onErrorMessageClose: () => {},
      ConfirmModal: {
        question: '',
        title: '',
        accept: () => {},
        decline: () => {},
        visible: false,
      },
    }
  },
  computed: {
    rolesList() {
      return Object.keys(this.userRoles).map((role) => ({
        value: role,
        text: this.$t(`roles.${role}`),
      }))
    },
    statusesList() {
      const { participants } = this.organization
      const uniqueStatuses = participants
        .map(({ email_confirmed, is_active }) => ({
          value: this.GetCurrentUserStatus(email_confirmed, is_active),
          text: this.GetCurrentUserStatusText(email_confirmed, is_active),
        }))
        .filter(
          (status, index, self) =>
            index ===
            self.findIndex(
              (s) => s.value === status.value && s.text === status.text,
            ),
        )

      return [this.defaultStatusFilterValue, ...new Set(uniqueStatuses)]
    },
    isAddInviteButtVisible() {
      return this.invitedUsersList.length < 5
    },
    isSendInviteButtEnable() {
      return this.invitedUsersList.some((x) => x.length > 6)
    },
  },
  async created() {
    await this.getOrganization()
    this.organizationParticipantsVisibleList = this.organization.participants
  },
  methods: {
    GetOrgJoinDate() {
      return this.GetDateString(this.organization.created_at)
    },
    ActivateInput() {
      this.$refs.inp.select()
    },

    OnInputFocus(value) {
      this.isInputFocused = value
    },
    OnDivFocus(arg) {
      this.isInputFocused = arg
      if (arg) this?.$refs?.inp?.focus()
    },
    GetCurrentUserStatusStyle(mailConf, isActive) {
      if (mailConf && isActive) return 'positive'
      else if (mailConf && !isActive) return 'negative'
      else if (!mailConf && !isActive) return 'inactive'
      else return 'negative'
    },

    GetCurrentUserStatusText(mailConf, isActive) {
      if (mailConf && isActive) return this.$t('general.active')
      else if (mailConf && !isActive) return this.$t('general.banned')
      else if (!mailConf && !isActive) return this.$t('general.pending')
      else return this.$t('general.error')
    },
    GetCurrentUserStatus(mailConf, isActive) {
      if (mailConf && isActive) return PARTICIPANT_STATUSES.ACTIVE
      else if (mailConf && !isActive) return PARTICIPANT_STATUSES.BANNED
      else if (!mailConf && !isActive) return PARTICIPANT_STATUSES.PENDING
      else return PARTICIPANT_STATUSES.ERROR
    },
    ShowEditModal() {
      this.editingOrgName = this.organization.name
      this.editingOrgSite = this.organization.website
      this.isEditModalVisible = true
    },
    CloseEditModal() {
      this.isEditModalVisible = false
      this.isEditModalLoaderVisible = false
      this.editingOrgName = ''
      this.editingOrgSite = ''
    },
    AddUserInvite() {
      if (this.invitedUsersList.length < 5) this.invitedUsersList.push('')
      else this.$toast.info(this.$t('organizationProfile.maxInviteMess'))
    },
    ShowUserInviteModal() {
      if (!this.invitedUsersList || this.invitedUsersList.length <= 0)
        this.invitedUsersList = ['']
      this.isUserInviteModalVisible = true
    },
    CloseUserInviteModal() {
      this.isUserInviteModalVisible = false
      this.isUserInviteModalLoaderVisible = false
    },
    async EditOrg() {
      this.isEditModalLoaderVisible = true

      //TODO add desc and address
      let payload = {
        name: this.editingOrgName,
        website: this.editingOrgSite,
        /*description : "",
				address : ""*/
      }

      await api.organizations
        .editOrganization(this.organization.id, payload)
        .then((res) => {
          this.organization = res.data
          this.CloseEditModal()
          this.$toast.success(
            this.$t('organizationProfile.orgUpdateSuccess', {
              orgNane: this.organization.name,
            }),
          )
        })
        .catch((err) => {
          let ErrorMessage = this.$t('general.errorMessage')
          if (err.response.status == 400)
            ErrorMessage = this.$t('dashboard.organizationExist', {
              orgName: this.createOrgName,
            })
          this.CloseEditModal()
          this.$toast.error(ErrorMessage)
        })
    },
    async SendUserInvites() {
      this.isUserInviteModalLoaderVisible = true
      await api.organizations
        .sendUserInvite(this.organization.id, this.invitedUsersList)
        .then((res) => {
          this.organization = res.data
          this.CloseUserInviteModal()
          this.invitedUsersList = ['']
          this.$toast.success(this.$t('organizationProfile.successInvite'))
        })
        .catch(() => {
          this.CloseUserInviteModal()
          this.$toast.error(this.$t('general.errorMessage'))
          //throw err
        })
    },
    RemoveClick() {
      this.isRemovedModalVisible = true
    },
    closeRemoveModal() {
      this.isRemovedModalVisible = false
    },
    onRemoveSuccess() {
      this.$router.push('/admin/organizations')
    },
    showRemoveUserConfirm(worker) {
      this.ConfirmModal.question = this.$t(
        'organizationProfile.deleteUserQuestion',
        { userName: worker.username },
      )
      this.ConfirmModal.title = this.$t('organizationProfile.deleteUserTitle')
      this.ConfirmModal.accept = () => this.removeWorker(worker)
      this.ConfirmModal.decline = () => (this.ConfirmModal.visible = false)
      this.ConfirmModal.visible = true
    },
    async getOrganization() {
      this.isLoaderVisible = true
      await api.organizations
        .getOrganizationsById(this.$route.params.id)
        .then((res) => {
          this.organization = res.data
          this.isLoaderVisible = false
        })
        .catch(() => {
          this.isLoaderVisible = false
          this.$toast.error(this.$t('general.errorMessage'), {
            duration: false,
            onClose: () => this.$router.push('/admin/organizations'),
          })
        })
    },
    onStatusFilterChange(selectedFilter) {
      this.activeStatusFilterValue = selectedFilter
      this.updateParticipantsVisibleList()
    },
    async onWorkerRoleChange(selectedFilter, workerData) {
      const { value: newRole } = selectedFilter
      const workerId = this.organization.participants.findIndex(
        (worker) => worker.full_name === workerData.full_name,
      )
      const worker = this.organization.participants[workerId]
      worker.role = newRole
      await api.user
        .changeRole(worker)
        .then((res) => {
          console.log(res)
          const updatedWorkerData = res.data
          this.organization.participants.splice(workerId, 1, updatedWorkerData)
        })
        .catch(() => {
          this.$toast.error(this.$t('general.errorMessage'), {
            duration: false,
            onClose: () => this.$router.push('/admin/organizations'),
          })
        })
      this.updateParticipantsVisibleList()
    },
    ToggleDrop(boolean) {
      this.isDropped = boolean
    },
    async removeWorker(worker) {
      this.ConfirmModal.visible = false
      this.isLoaderVisible = true
      await api.organizations
        .removeOrganizationMember(this.organization.id, worker.id)
        .then((res) => {
          this.organization.participants = res.data.participants
          this.isLoaderVisible = false
          this.$toast.success(
            this.$t('organizationProfile.userRemovedSuccess', {
              userName: worker.username,
            }),
          )
        })
        .catch(() => {
          this.isLoaderVisible = false
          this.$toast.error(
            this.$t('organizationProfile.userRemovedError', {
              userName: worker.username,
            }),
          )
        })
    },
    filterParticipants(participants) {
      return participants.filter(
        (worker) =>
          this.GetCurrentUserStatus(
            worker.email_confirmed,
            worker.is_active,
          ) === this.activeStatusFilterValue.value,
      )
    },
    searchParticipants(participants) {
      const searchedParticipants = participants.filter(
        ({ username, email, full_name }) => {
          const valuesToSearchIn = Object.values({ username, email, full_name })
          return valuesToSearchIn.find((value) =>
            value
              .toLowerCase()
              .includes(this.searchedParticipantValue.toLowerCase()),
          )
        },
      )
      return searchedParticipants
    },
    updateParticipantsVisibleList() {
      const {
        searchParticipants,
        filterParticipants,
        organization,
        activeStatusFilterValue,
        defaultStatusFilterValue,
      } = this
      switch (activeStatusFilterValue) {
        case defaultStatusFilterValue:
          this.organizationParticipantsVisibleList = searchParticipants(
            organization.participants,
          )
          break
        default:
          this.organizationParticipantsVisibleList = searchParticipants(
            filterParticipants(organization.participants),
          )
          break
      }
    },
  },
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.table-col-head {
  @apply px-2 py-[17px] text-left font-semibold;
}

.table-col-row-item {
  @apply px-2 py-[17px] text-h3 text-gray-c-800;
}
</style>
