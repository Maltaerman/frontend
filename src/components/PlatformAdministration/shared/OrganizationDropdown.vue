<template>
	<div class="flex flex-row justify-center overflow-visible max-h-[42px] min-w-screen z-50">
		<div class="flex-none" @mouseleave="ToggleDrop(false)" @focusout="ToggleDrop(false)">
			<button @click.stop="isDropped = !isDropped"
				class="flex flex-row justify-between mobile:w-full  items-center  w-48 px-2 py-2 text-gray-700 bg-white border-1  border border-gray-c-300 rounded-md shadow focus:outline-none focus:border-blue-500">
				<span class="select-none">{{ activeStatusFilterValue }}</span>

				<img src="/src/assets/dropdown-arrow.svg" class="w-3.5 h-2  transition-all duration-300" :class="{
					'rotate-0': !isDropped,
					'rotate-180': isDropped
				}">
			</button>

			<ul id="options"
				class="w-48 bg-white  rounded-lg shadow-xl  overflow-hidden cursor-pointer transition-all duration-300"
				:class="{
					'h-0': !isDropped,
					'h-[206px]': isDropped
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
		activeStatusFilterValue: {
			type: String
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
			// this.activeStatusFilterValue = selectedStatus
			this.isDropped = !this.isDropped
			this.$emit('statusFilterChange', { selectedStatus })
		},
	},

}
</script>
