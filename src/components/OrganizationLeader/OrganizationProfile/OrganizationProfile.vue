<template>
  <div v-if="organization" class="h-full overflow-y-auto py-6 px-4 comp:p-9">
    <div
      class="row flex flex-wrap items-center justify-between gap-4 pb-6 comp:pb-9"
    >
      <div class="title h-min mobile:grow">
        {{ $t('organizationProfile.employees') }}
      </div>
      <button-1
        class="block flex h-min items-center justify-center gap-1.5 mobile:w-full"
        @click.stop="ShowUserInviteModal"
      >
        <img
          alt=""
          class="mb-0.5 block"
          src="/src/assets/Organizations/addUser.svg"
        />
        <p class="">{{ $t('organizationProfile.newInvitation') }}</p>
      </button-1>
    </div>
    <div class="row mb-4 flex flex-wrap justify-start gap-4">
      <!-- Need to be reusable becasue its gonna be used in table roles -->
      <DropDownSelect
        v-model="selectedDropOption"
        class="max-h-[42px] min-w-[150px]"
        :options="dropdownOptions"
      />
      <InputSearch
        v-model="query"
        class="comp:max-w-[400px]"
        :placeholder="$t('dashboard.organizationSearchPlaceholder')"
      />
    </div>

    <!-- Table of organizations -->
    <div
      v-if="organization.participants.length > 0"
      class="mt-4 overflow-x-auto"
    >
      <table class="w-full mobile:w-[720px]">
        <thead>
          <tr class="bg-gray-c-100 text-h3 text-gray-c-400">
            <th class="table-col-head">
              {{ $t('organizationProfile.name') }}
            </th>
            <th class="table-col-head">
              {{ $t('organizationProfile.email') }}
            </th>
            <th class="table-col-head">
              {{ $t('Roles.Role') }}
            </th>
            <th class="px-2 py-[17px] text-center font-semibold">
              {{ $t('organizationProfile.status') }}
            </th>
            <th class="table-col-head">
              {{ $t('organizationProfile.lastActivity') }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(worker, index) in visibleParitcipantsList"
            :key="index"
            class="shadow-cs2"
          >
            <td class="table-col-row-item">
              <span v-if="worker.username">{{ worker.username ?? '-' }}</span>
            </td>
            <td class="table-col-row-item">
              <span>{{ worker.email || '-' }}</span>
            </td>
            <td class="table-col-row-item">
              <span>{{ worker.organizationRole ?? 'Role here' }}</span>
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

            <td class="table-col-row-item">
              <span v-if="worker.last_activity">{{
                GetDateTime(worker.last_activity)
              }}</span>
              <span v-else>-</span>
            </td>
            <td>
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
import { mapGetters } from 'vuex'

import Loader from '../../Loader.vue'

import ButtonTag from '@/components/Buttons/ButtonTag.vue'
import ButtonText1 from '@/components/Buttons/Button_text_1.vue'
import DropDownSelect from '@/components/Inputs/DropDownSelect.vue'
import {
  default as input1,
  default as Input1,
} from '@/components/Inputs/Input-1.vue'
import InputSearch from '@/components/Inputs/InputSearch.vue'
import ConfirmModal from '@/components/Modals/ConfirmModal.vue'
import ModalTemplate from '@/components/Modals/ModalTemplate.vue'
import dateFormatter from '@/components/mixins/dateFormatter.js'
import regex from '@/components/mixins/regex.js'
import api from '@/http_client/index.js'

export default {
  name: 'OrganizationProfile',
  components: {
    DropDownSelect,
    InputSearch,
    ConfirmModal,
    ModalTemplate,
    ButtonTag,
    ButtonText1,
    input1,
    Loader,
    Input1,
  },
  mixins: [dateFormatter, regex],
  data() {
    return {
      organization: null,
      query: '',
      organizationStatusFilters: [],
      organizationParticipantsVisibleList: [],
      activeStatusFilterValue: 'All statuses',
      defaultStatusFilterValue: 'All statuses',
      invitedUsersList: [''],
      isUserInviteModalVisible: false,
      isUserInviteModalLoaderVisible: false,
      isLoaderVisible: false,
      onErrorMessageClose: () => {},
      ConfirmModal: {
        question: '',
        title: '',
        accept: () => {},
        decline: () => {},
        visible: false,
      },
      selectedDropOption: null,
    }
  },

  computed: {
    ...mapGetters({
      userOrganization: 'getUserOrganization',
    }),
    visibleParitcipantsList() {
      switch (this.activeStatusFilterValue) {
        case this.defaultStatusFilterValue:
          return this.organization.participants

        default:
          return this.organization.participants.filter(
            (worker) =>
              this.GetCurrentUserStatusText(
                worker.email_confirmed,
                worker.is_active,
              ) === this.activeStatusFilterValue,
          )
      }
    },
    statusesList() {
      const roles = this.organization.participants.map((worker) =>
        this.GetCurrentUserStatusText(worker.email_confirmed, worker.is_active),
      )

      return [this.defaultStatusFilterValue, ...new Set(roles)]
    },
    isAddInviteButtVisible() {
      return this.invitedUsersList.length < 5
    },
    isSendInviteButtEnable() {
      return this.invitedUsersList.every((x) => this.isMail(x))
    },
    dropdownDefault() {
      return {
        text: this.$t('general.all'),
        item: this.$t('general.all'),
      }
    },
    dropdownOptions() {
      let options = this.organization.participants.map((worker) => {
        let t = this.GetCurrentUserStatusText(
          worker.email_confirmed,
          worker.is_active,
        )
        return {
          text: t,
          item: t,
        }
      })
      console.log([this.dropdownDefault, ...options])
      return [this.dropdownDefault, ...options]
    },
  },
  watch: {
    userOrganization(newVal) {
      if (newVal) this.organization = newVal
    },
  },
  created() {
    this.selectedDropOption = this.dropdownDefault
    if (this.userOrganization) this.organization = this.userOrganization
  },
  methods: {
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
    onStatusFilterChange({ selectedStatus }) {
      this.activeStatusFilterValue = selectedStatus
    },

    async SendUserInvites() {
      this.isUserInviteModalLoaderVisible = true
      await api.organizations
        .sendUserInvite(this.organization.id, this.invitedUsersList)
        .then((res) => {
          console.log(res)
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
