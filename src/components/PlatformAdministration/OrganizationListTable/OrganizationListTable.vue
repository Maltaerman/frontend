<template>
  <div class="overflow-x-auto mobile:w-auto">
    <table class="w-full min-w-[599px] table-auto overflow-x-scroll">
      <thead>
        <tr
          class="h-[58px] bg-gray-50 text-left text-base font-medium text-gray-c-400"
        >
          <th
            class="w-1/4 min-w-[280px] pl-4 text-base font-medium mobile:w-1/4"
          >
            {{ $t('dashboard.organizations') }}
          </th>
          <th class="w-24 text-center text-base font-medium">
            {{ $t('organizationProfile.employees') }}
          </th>
          <th
            class="pl-4 text-base font-medium"
            colspan="2"
          >
            {{ $t('organizationProfile.status') }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 text-sm">
        <OrganizationListTableItem
          v-for="(organization, index) in organizationsList"
          :key="`org${index}`"
          :organization="{ ...organization, place: 'Kyiv, Ukraine', avatar }"
          @remove="onRemoveOrg"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import avatar from '../../../assets/Organizations/avatar.svg'

import OrganizationListTableItem from './OrganizationListTableItem.vue'

export default {
  name: 'OrganizationListTable',
  components: {
    OrganizationListTableItem,
  },
  props: {
    organizationsList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['remove'],
  data() {
    return {
      avatar,
    }
  },
  methods: {
    ShowMenu() {
      this.isMenuVisible = !this.isMenuVisible
    },
    HideMenu() {
      this.isMenuVisible = false
    },
    OnInputFocus(value) {
      this.isInputFocused = value
    },
    onRemoveOrg(organization) {
      this.$emit('remove', organization)
    },
  },
}
</script>
