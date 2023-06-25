<template>
  <div class="min-w-screen max-h-[42px]">
    <div
      class="flex-none"
      @focusout="ToggleDrop(false)"
      @mouseleave="ToggleDrop(false)"
    >
      <button
        class="
          border-1 flex h-[42px] w-48 flex-row
          items-center justify-between rounded-md border
          border-gray-c-300 bg-white px-2 text-gray-700 shadow
          focus:border-blue-500 focus:outline-none mobile:w-full
        "
        :class="{
          tableView: isTableView,
        }"
        @click.stop="isDropped = !isDropped"
      >
        <span class="select-none"><img
          v-if="isTableView"
          alt=""
          class="mb-0.5 mr-1.5 inline-block h-4 w-4 text-gray-c-800"
          :src="getUserRoleIcon(activeFilterValue)"
        >{{ activeFilterValue }}</span>

        <img
          class="h-2 w-3.5 transition-all duration-300"
          :class="{
            'rotate-0': !isDropped,
            'rotate-180': isDropped,
          }"
          src="/src/assets/dropdown-arrow.svg"
        >
      </button>

      <ul
        id="options"
        class="
          absolute w-48 cursor-pointer overflow-hidden rounded-lg
          bg-white shadow-xl transition-all duration-300
          "
        :class="{ 'tableView w-[278px': isTableView }"
        :style="{ height: dropdownHeight }"
      >
        <li
          v-for="(filter, index) in filterList"
          :key="index"
          class="
            block px-4 py-2 text-gray-c-800 hover:bg-blue-c-100 hover:text-blue-c-500
            "
          @click="selectFilter(filter)"
          @click.stop="ToggleDrop(false)"
        >
          <img
            v-if="isTableView"
            alt=""
            class="mb-0.5 mr-1.5 inline-block h-4 w-4 text-gray-c-800"
            :src="getUserRoleIcon(filter)"
          >
          {{ filter.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import OrgLeaderIcon from '../../../assets/Org-leader.svg'
import User from '../../../assets/User.svg'
import userRoles from '../../mixins/userRoles'

export default {
  name: 'OrganizationDropdown',
  mixins: [userRoles],
  props: {
    filterList: {
      type: Array,
      default: () => [],
    },
    // eslint-disable-next-line vue/require-default-prop
    activeFilterValue: {
      type: String,
    },
    isTableView: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['filterChange'],
  data() {
    return {
      isDropped: false,
    }
  },
  computed: {
    dropdownHeight() {
      return this.isDropped ? `${42 * this.filterList.length}px` : '0px'
    },
  },
  methods: {
    getUserRoleIcon(role) {
      const mappedRole = this.mapRoleDisplayTextToValue(role)
      switch (mappedRole) {
        case this.rolesDisplayText['Organization leader']:
          return OrgLeaderIcon
        default:
          return User
      }
    },
    ToggleDrop(boolean) {
      this.isDropped = boolean
    },
    selectFilter(selectedFilter) {
      this.isDropped = !this.isDropped
      this.$emit('filterChange', selectedFilter)
    },
  },
}
</script>

<style>
.tableView {
  width: 300px;
}
</style>
