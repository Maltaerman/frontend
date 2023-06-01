<template>
	<div
		class="text-gray-c-500 font-semibold h-[58px] px-6 py-1"
		:class="{
        'bg-blue-c-100 text-gray-c-500': isDropped,
      }"
	>
		<button
			id="dropButton"
			class="w-full h-full flex text-h3 items-center justify-between gap-3"
			@click.stop="isDropped = !isDropped"

		>
			<div class="flex items-center gap-2 mobile:gap-4">
				<img class="w-6 h-4" :src="lang.flag"/>
				<div id="current-language">{{ lang.value }}</div>
			</div>
			<img
				class="w-3.5 h-2 transition-all duration-300"
				:class="{
          'rotate-0': !isDropped,
          'rotate-180': isDropped,
        }"
				src="/src/assets/dropdown-arrow.svg"
			/>
		</button>
		<div
			id="langList"
			class="transition-all duration-1000 w-full overflow-hidden"
			:class="{
        'h-0 hidden': !isDropped,
        //FIXME opened height = available lang amount * list item height, in this case 58px
        'h-[116px] block': isDropped,
      }"
		>
			<button
				v-for="langItem in availableLang"
        :key="langItem.code"
				class="w-full h-[58px] flex text-h3 items-center gap-2 mobile:gap-4 hover:bg-blue-c-200"
				:class="{
          'comp:bg-blue-c-100 text-blue-c-400': langItem.code == lang.code,
        }"
				@click.stop="setLang(langItem)"
			>
				<img class="w-6 h-4" :src="langItem.flag"/>
				<div class="w-full text-left">{{ langItem.value }}</div>
			</button>
		</div>
	</div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
	name: 'SideBarMenuLocalizationDpDown',
	data() {
		return {
			lang: {code: 'ua', value: 'Українська', flag: '/Flags/UA_flag.svg'},
			availableLang: [
				{code: 'ua', value: 'Українська', flag: '/Flags/UA_flag.svg'},
				{code: 'en', value: 'English', flag: '/Flags/USA_flag.svg'},
			],
			isDropped: false,
		}
	},
	methods: {
		...mapMutations(['setLocalization']),
		setLang(item) {
			this.lang = item
			this.$i18n.locale = item.code
			this.setLocalization(item.code)
			this.isDropped = false
			this.$emit('lang-update')
		},
	},
	mounted() {
		this.lang = this.availableLang.find((x) => x.code === this.$i18n.locale)
	},
}
</script>

<style scoped>

</style>