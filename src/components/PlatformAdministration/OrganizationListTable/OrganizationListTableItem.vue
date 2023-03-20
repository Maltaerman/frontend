<template>
  <tr class="h-[56px]" @mouseleave="HideMenu">
    <td class="max-content flex flex-nowrap items-center gap-5 pl-4 pt-1">
      <div
        class="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600"
      >
        <svg
          class="absolute -left-1 h-12 w-12 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="h-full flex-col">
        <div
          class="overflow-hidden truncate text-ellipsis text-base font-semibold text-gray-c-800"
        >
          {{ organization.name }}
        </div>
        <div class="font-text-xs text-subtitle text-gray-c-600">
          {{ organization.address }}
        </div>
      </div>
    </td>
    <td class="pr-4 text-right">
      {{ organization.participants.length || -1 }}
    </td>
    <td class="pl-4">
      <OrganizationListStatus :status="getOrganizationStatus(organization)" />
    </td>
    <td class="relative p-2">
      <div
        @click.stop="ShowMenu"
        class="absolute top-2 right-4 w-[25px] cursor-pointer rounded-full px-1 py-3 hover:bg-blue-c-200"
      >
        <img src="/src/assets/dots.svg" />
      </div>
      <div
        @click.stop
        ref="menu"
        class="absolute top-1 right-6 h-[84px] w-[230px] rounded-lg bg-white p-2 font-semibold shadow-cs3"
        :class="{
          hidden: !isMenuVisible,
          absolute: isMenuVisible,
        }"
      >
        <button
          class="w-full cursor-pointer p-1 text-left text-h3 text-blue-c-500 hover:bg-blue-c-100"
          @click.stop="goToOrgProfile"
        >
          {{ $t('general.details') }}
        </button>
        <button
          class="w-full cursor-pointer p-1 text-left text-h3 text-red-c-500 hover:bg-blue-c-100"
          @click="removeOrg"
        >
          {{ $t('general.delete') }}
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex'
import OrganizationListStatus from './OrganizationItemStatus.vue'
import { ORGANIZATION_STATUSES } from '../constants.js'

export default {
  name: 'OrganizationListTableItem',
  components: {
    OrganizationListStatus,
  },
  props: {
    organization: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      isMenuVisible: false,
    }
  },
  methods: {
    ...mapActions(['setSelectedOrganization']),
    ShowMenu() {
      this.isMenuVisible = !this.isMenuVisible
    },
    HideMenu() {
      this.isMenuVisible = false
    },
    goToOrgProfile() {
      this.setSelectedOrganization(this.organization)
      this.$router.push(`/admin/organization-profile/${this.organization.id}`)
    },
    removeOrg() {
      this.$emit('remove', this.organization)
    },
    getOrganizationStatus(org) {
      if (org.disabled) return ORGANIZATION_STATUSES.DISABLED
      else
        return org.activated
          ? ORGANIZATION_STATUSES.ACTIVE
          : ORGANIZATION_STATUSES.PENDING
    },
  },
}
</script>

<style lang="scss" scoped></style>
