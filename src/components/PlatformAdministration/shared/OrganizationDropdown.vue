<template>
	<div class="max-h-[42px] min-w-screen">
		<div class="flex-none" @mouseleave="ToggleDrop(false)" @focusout="ToggleDrop(false)">
			<button @click.stop="isDropped = !isDropped" class="flex flex-row justify-between  w-[168px] h-[42px] mobile:w-full  items-center  w-48 px-2 text-gray-700 bg-white border-1  
							border border-gray-c-300 rounded-md shadow focus:outline-none focus:border-blue-500" :class="{
								'tableView': isTableView
							}">

				<span class="select-none"><img v-if="isTableView" class="inline-block w-4 h-4 mb-0.5 mr-1.5 text-gray-c-800"
						:src=getUserRoleIcon(activeFilterValue) alt="">{{ activeFilterValue }}</span>

				<img src="/src/assets/dropdown-arrow.svg" class="w-3.5 h-2   transition-all duration-300" :class="{
					'rotate-0': !isDropped,
					'rotate-180': isDropped,
				}">
			</button>

			<ul id="options"
				class="w-48 bg-white  absolute rounded-lg shadow-xl fixed  ] overflow-hidden cursor-pointer transition-all duration-300"
				:class="{ 'tableView w-[278px': isTableView }"
				:style="{ height: dropdownHeight }">
				<li v-for="filter in filterList" @click="selectFilter(filter)" @click.stop="ToggleDrop(false)"
					class="block px-4 py-2 text-gray-c-800 hover:text-blue-c-500 hover:bg-blue-c-100 hover:text-blue-c-500">
					<img v-if="isTableView" class="inline-block w-4 h-4 mb-0.5 mr-1.5 text-gray-c-800"
						:src=getUserRoleIcon(filter) alt="">
					{{ filter.text }}
				</li>
			</ul>

		</div>
	</div>
</template>

<script>
import userRoles from '../../mixins/userRoles'
import OrgLeaderIcon from '../../../assets/Org-leader.svg?url'
import User from '../../../assets/User.svg?url'
export default {
	name: 'OrganizationDropdown',
	props: {
		filterList: {
			type: Array,

		},
		activeFilterValue: {
			type: String
		},
		isTableView: {
			type: Boolean,
			default: false
		}
	},
	mixins: [userRoles],
	data() {
		return {
			isDropped: false,
		}
	},
	computed: {
      dropdownHeight() {
        return this.isDropped ? `${42 * this.filterList.length}px` : '0px';
      }
	},
	methods: {
		 getUserRoleIcon(role){

			const mappedRole = this.mapRoleDisplayTextToValue(role)
			switch (mappedRole) {
				case this.rolesDisplayText["Organization leader"]:
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
			this.$emit('filterChange',  selectedFilter )
		},
	},

}
</script>

<style>
.tableView {
	width: 300px;
}
</style>