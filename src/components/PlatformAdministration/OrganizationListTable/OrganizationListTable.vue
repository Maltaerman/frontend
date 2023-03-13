<template>
  <div class="overflow-x-auto mobile:w-auto">
    <table class="table-auto w-full overflow-x-scroll min-w-[599px]">
      <thead>
        <tr
          class="text-left text-base font-medium text-gray-c-400 bg-gray-50 h-[58px]"
        >
          <th
            class="w-1/4 min-w-[280px] mobile:w-1/4 text-base font-medium pl-4"
          >
            Organization
          </th>
          <th class="w-24 text-center text-base font-medium">Aid Workers</th>
          <th class="text-base font-medium pl-4" colspan="2">Status</th>
        </tr>
      </thead>
      <tbody class="text-sm divide-y divide-gray-100">
        <OrganizationListTableItem
          v-for="(organization, index) in organizationsList"
          :key="`org${index}`"
          :organization="{
            ...organization,
            place: 'Kyiv, Ukraine',
            avatar,
          }"
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
      default: [],
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
