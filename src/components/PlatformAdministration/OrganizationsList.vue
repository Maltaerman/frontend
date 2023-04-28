<template>
  <div class="h-full overflow-y-auto p-9 mobile:py-6 mobile:px-4">
    <div class="row flex flex-wrap justify-between">
      <h1 class="text-h1 font-semibold text-gray-c-800 mobile:text-h1-m">
        {{ $t('dashboard.organizations') }}
      </h1>
      <button-1
        class="block flex h-[46px] items-center justify-center mobile:w-full"
        @click="showAddOrgModal"
      >
        <img
          class="mr-2.5 inline-block mobile:mt-0.5"
          src="/src/assets/plus.svg"
        />
        <p>{{ $t('dashboard.addOrganization') }}</p>
      </button-1>
    </div>
    <div v-if="organizationsList.length <= 0" class="mt-[215px]">
      <img
        class="mx-auto h-[234px] w-[205px] mobile:h-[179px] mobile:w-[157px]"
        src="/src/assets/Organizations/Picture.png"
      />
      <p class="text-body-1 mt-5 mb-6 text-center">
        {{ $t('dashboard.organizationListEmpty') }}
      </p>
      <button-1
        class="mx-auto block flex items-center"
        @click="showAddOrgModal"
      >
        <img class="mr-2.5 inline-block" src="/src/assets/plus.svg" />
        <p>{{ $t('dashboard.addOrganization') }}</p>
      </button-1>
    </div>
    <div v-else class="mt-9">
      <div class="mb-6 flex flex-wrap justify-start gap-3">
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
            v-model="searchController.SearchedOrgName"
            class="w-full bg-transparent px-4 py-2 text-h3 outline-none"
            :placeholder="$t('dashboard.organizationSearchPlaceholder')"
            @click.stop
            @focusin="OnInputFocus(true)"
            @focusout="OnInputFocus(false)"
          />
        </div>
      </div>
      <div
        v-if="searchController.isSearchedOrgResult"
        class="flex flex-wrap gap-4 py-6"
      >
        <div class="flex w-full items-center gap-4">
          <div
            v-if="searchController.SearchedOrganizationsList.length <= 0"
            class="h-min"
          >
            {{ $t('dashboard.forRequest') }} "{{
              searchController.SearchedOrgName
            }}" {{ $t('dashboard.noMatches') }}
          </div>
          <div
            v-if="searchController.SearchedOrganizationsList.length > 0"
            class="h-min"
          >
            {{ $t('dashboard.requestResult') }} "{{
              searchController.SearchedOrgName
            }}".
          </div>
          <button-1 class="block w-min mobile:grow" @click="ResetSearchResult">
            {{ $t('general.refresh') }}
          </button-1>
        </div>
      </div>
      <OrganizationListTable
        :organizations-list="visibleOrganizationsList"
        @remove="onRemoveClick"
      />
    </div>

    <div v-if="pageMax < 0" ref="scrollObserver" class="relative h-[80px]">
      <Loader v-show="isLoaderVisible" />
    </div>

    <OrgInviteModal
      :close-create-org-modal="closeCreateOrgModal"
      :is-loader-visible="modals.createOrgModalLoaderVisible"
      :is-visible="modals.createOrgModalVisible"
    />

    <RemoveOrgModal
      :close-func="closeRemoveModal"
      :is-visible="modals.removeOrgModalVisible"
      :on-remove-success="onRemoveSuccess"
      :organization="removedOrganization"
    />

    <user-invite-modal
      :close-func="CloseUserInviteModal"
      :is-hide-on-click="true"
      :is-modal-visible="modals.userInvite"
    />
  </div>
</template>

<script>
import axios from 'axios'

import Button1 from '@/components/Buttons/Button_1.vue'
import Loader from '@/components/Loader.vue'
import UserInviteModal from '@/components/Modals/UserInviteModal.vue'
import OrgInviteModal from '@/components/PlatformAdministration/OrgInviteModal.vue'
import OrganizationListTable from '@/components/PlatformAdministration/OrganizationListTable/OrganizationListTable.vue'
import RemoveOrgModal from '@/components/PlatformAdministration/RemoveOrgModal.vue'
import StringFormatter from '@/components/mixins/StringFormatter.js'
import api from '@/http_client/index.js'

export default {
  name: 'OrganizationsList',
  components: {
    OrgInviteModal,
    UserInviteModal,
    RemoveOrgModal,
    Button1,
    Loader,
    OrganizationListTable,
  },
  mixins: [StringFormatter],
  data() {
    return {
      modals: {
        userInvite: false,
        removeOrgModalVisible: false,
        createOrgModalVisible: false,
        createOrgModalLoaderVisible: false,
      },
      organizationsList: [],
      organizationsListMapped: [],
      isInputFocused: false,
      limit: 20,
      currentLastPage: 1,
      pageMax: -1,
      isAutoPaginationOn: true,
      createOrgSite: '',
      createOrgName: '',
      isLoaderVisible: false,
      removedOrganization: null,
      status: ['active', 'pending', 'disabled'],
      searchController: {
        SearchedOrgName: '',
        SearchedOrganizationsList: [],
        isSearchedOrgResult: false,
        cancelController: null,
      },
    }
  },
  computed: {
    isOrgCreateButtDisabled() {
      return this.TrimTurbo(this.createOrgName).length < 3
    },
    visibleOrganizationsList() {
      return this.searchController.isSearchedOrgResult
        ? this.searchController.SearchedOrganizationsList
        : this.organizationsList
    },
  },
  watch: {
    'searchController.SearchedOrgName': {
      immediate: true,
      handler(newVal) {
        if (!newVal) this.ResetSearchResult()
        this.OrganizationAutoSearch()
      },
    },
  },
  mounted() {
    let options = {
      threshold: 0,
    }
    let callback = (entries) => {
      if (
        entries[0].isIntersecting &&
        !this.isLoaderVisible &&
        this.pageMax < 0 &&
        this.isAutoPaginationOn
      ) {
        this.GetOrganizationList(++this.currentLastPage)
      }
    }
    let observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.scrollObserver)

    this.GetOrganizationList(this.currentLastPage)
  },
  methods: {
    OnInputFocus(value) {
      this.isInputFocused = value
    },
    OnDivFocus(arg) {
      this.isInputFocused = arg
      if (arg) this?.$refs?.inp?.focus()
    },
    ActivateInput() {
      this.$refs.inp.select()
    },
    showAddOrgModal() {
      this.modals.createOrgModalVisible = true
    },
    closeCreateOrgModal() {
      this.createOrgName = ''
      this.createOrgSite = ''
      this.modals.createOrgModalVisible = false
    },
    ResetSearchResult() {
      this.searchController.SearchedOrgName = ''
      this.searchController.SearchedOrganizationsList = []
      this.searchController.isSearchedOrgResult = false
      this.isAutoPaginationOn = true
    },
    onRemoveClick(org) {
      this.removedOrganization = org
      this.modals.removeOrgModalVisible = true
    },
    closeRemoveModal() {
      this.modals.removeOrgModalVisible = false
    },
    onRemoveSuccess() {
      this.organizationsList = this.organizationsList.filter(
        (x) => x.id !== this.removedOrganization.id,
      )
    },
    async GetOrganizationList(page) {
      this.isLoaderVisible = true
      //await new Promise(resolve => setTimeout(resolve, 5000))
      await api.organizations
        .getOrganizationList(page, this.limit)
        .then((res) => {
          if (res.data.length === 0) {
            this.pageMax = --this.currentLastPage
          } else if (res.data.length < this.limit) {
            this.pageMax = this.currentLastPage
          }
          this.organizationsList = [...this.organizationsList, ...res.data].map(
            (org, idx) => ({ ...org, status: this.status[idx % 3] }),
          )
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.isLoaderVisible = false
        })
    },
    onAddOrganization({ createOrgName, createOrgSite }) {
      this.createOrgName = createOrgName
      this.createOrgSite = createOrgSite
      this.addOrganizations()
    },
    async addOrganizations() {
      console.log('wiisz mje?')
      console.log(this.TrimTurbo(this.createOrgName).length < 3)
      if (this.TrimTurbo(this.createOrgName).length < 3) {
        return
      }
      this.createOrgName = this.TrimTurbo(this.createOrgName)
      this.modals.createOrgModalLoaderVisible = true
      await api.organizations
        .createOrganization(this.createOrgName, this.createOrgSite)
        .then((res) => {
          this.organizationsList = [res.data, ...this.organizationsList]
          this.closeCreateOrgModal()
          this.$toast.success(
            this.$t('dashboard.organizationAddSuccess', {
              orgName: this.createOrgName,
            }),
          )
        })
        .catch((err) => {
          let errMess = this.$t('general.errorMessage')
          if (err.response.status == 400)
            errMess = this.$t('dashboard.organizationExist', {
              orgName: this.createOrgName,
            })
          this.closeCreateOrgModal()
          this.$toast.error(errMess)
        })
        .finally(() => {
          this.modals.createOrgModalLoaderVisible = false
        })
    },
    async GetOrganizationByName() {
      if (this.searchController.SearchedOrgName.length < 3) {
        this.$toast.error(this.$t('validations.minLength', { amount: 3 }))
        return
      }
      /*await http_client.organizations.getOrganizationByName(this.searchController.SearchedOrgName,
				{signal : this.searchController.cancelController.signal}
			)*/
      await api.organizations
        .getOrganizationByName(this.searchController.SearchedOrgName, {
          cancelToken: this.searchController.cancelController.token,
        })
        .then((res) => {
          this.isAutoPaginationOn = false
          this.searchController.isSearchedOrgResult = true
          this.searchController.SearchedOrganizationsList = res.data
          console.log(this.searchController.SearchedOrganizationsList)
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('Canceled')
            return
          }
          this.ResetSearchResult()
          this.$toast.error(this.$t('general.errorMessage'))
          throw err
        })
    },
    OrganizationAutoSearch() {
      if (this.searchController.SearchedOrgName.length < 3) return
      if (this.searchController.cancelController) {
        this.searchController.cancelController.cancel('Request updated')
      }
      this.searchController.cancelController = axios.CancelToken.source()
      this.GetOrganizationByName()
    },
    ShowUserInviteModal() {
      this.modals.userInvite = true
    },
    CloseUserInviteModal() {
      this.modals.userInvite = false
    },
  },
}
</script>

<style scoped></style>
