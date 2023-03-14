<template>
  <tr class="h-[56px]" @mouseleave="HideMenu">
    <td class="flex max-content row pl-4 items-end pt-1">
      <div
        class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-5"
      >
        <svg
          class="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="flex-col">
        <div
          class="font-semibold text-base text-gray-c-800 truncate text-ellipsis overflow-hidden"
        >
          {{ organization.name }}
        </div>
        <div class="font-text-xs text-subtitle text-gray-c-600">
          {{ organization.place }}
        </div>
      </div>
    </td>
    <td class="text-right pr-4">{{ organization.workers || 64 }}</td>
    <td class="pl-4">
      <OrganizationListStatus :status="organization.status" />
    </td>
    <td class="p-2 relative">
      <div
        class="w-[25px] top-2 right-4 cursor-pointer px-1 py-3 rounded-full absolute hover:bg-blue-c-200"
        @click.stop="ShowMenu"
      >
        <img src="/src/assets/dots.svg" />
      </div>
      <div
        ref="menu"
        class="p-2 rounded-lg shadow-cs3 absolute top-1 right-6 w-[230px] h-[84px] font-semibold bg-white"
        :class="{
          hidden: !isMenuVisible,
          absolute: isMenuVisible,
        }"
        @click.stop
      >
        <button
          class="p-1 text-h3 text-blue-c-500 cursor-pointer hover:bg-blue-c-100 w-full text-left"
          @click.stop="goToOrgProfile"
        >
          {{ $t('general.details') }}
        </button>
        <button
          class="p-1 text-h3 text-red-c-500 cursor-pointer hover:bg-blue-c-100 w-full text-left"
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
export default {
  name: 'OrganizationListTableItem',
  components: {
    OrganizationListStatus,
  },
  props: {
    organization: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['remove'],
  data() {
    return {
      isMenuVisible: false,
      organizationStatuses: {
        ACTIVE: 'active',
        PENDING: 'pending',
        DISABLED: 'disabled',
      },
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
  },
}
</script>

<style lang="scss" scoped></style>
