<template>
	<div class="max-h-[42px] min-w-screen">
		<div class="flex-none" @mouseleave="ToggleDrop(false)" @focusout="ToggleDrop(false)">
			<button @click.stop="isDropped = !isDropped"
				class="flex flex-row justify-between  w-[168px] h-[42px] mobile:w-full  items-center  w-48 px-2 text-gray-700 bg-white border-1  
				
				border border-gray-c-300 rounded-md shadow focus:outline-none focus:border-blue-500"
				:class="{
					'tableView': isTableView}"
				>
			
				<span class="select-none">{{ activeFilterValue }}</span>

				<img src="/src/assets/dropdown-arrow.svg" class="w-3.5 h-2   transition-all duration-300" :class="{
					'rotate-0': !isDropped,
					'rotate-180': isDropped
				}">
			</button>

			<ul id="options"
				class="w-48 bg-white  absolute rounded-lg shadow-xl fixed  w-[278px] overflow-hidden cursor-pointer transition-all duration-300"
				:class="{
					'h-0': !isDropped,
					'h-[206px]': isDropped & !isTableView,
					'tableView': isTableView,
					'h-[166px]': isDropped & isTableView
					
				}">
				<li v-for="status in statusesList" @click="selectStatusesFilter(status)" @click.stop="ToggleDrop(false)"
					class="
										block px-4 py-2 text-gray-c-800 hover:text-blue-c-500 hover:bg-blue-c-100 hover:text-blue-c-500">

					{{ status }}
				</li>
			</ul>

		</div>
	</div>
</template>

<script>
export default {
	name: 'OrganizationDropdown',
	props: {
		statusesList: {
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
	data() {
		return {
			isDropped: false,

		}
	},
	methods: {
		ToggleDrop(boolean) {
			this.isDropped = boolean
		},
		selectStatusesFilter(selectedStatus) {
			this.isDropped = !this.isDropped
			this.$emit('filterChange', { selectedStatus })
		},
	},

}
</script>

<style>

.tableView{
	width: 300px;
}
</style>