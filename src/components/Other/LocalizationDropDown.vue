<template>
  <div
    @mouseleave="ToggleDrop(false)"
    class="relative font-semibold text-gray-c-500"
  >
    <button
      id="dropButton"
      class="flex h-full w-full items-center justify-end gap-3 text-h3 mobile:justify-between"
      @click.stop="isDropped = !isDropped"
      :class="{
        'text-gray-c-600 mobile:bg-blue-c-100': isDropped,
      }"
    >
      <div class="flex items-center gap-2 mobile:gap-4">
        <img :src="lang.flag" class="h-4 w-6" />
        <div id="current-language">{{ lang.value }}</div>
      </div>
      <img
        src="/src/assets/dropdown-arrow.svg"
        class="h-2 w-3.5 transition-all duration-300"
        :class="{
          'rotate-0': !isDropped,
          'rotate-180': isDropped,
        }"
      />
    </button>
    <div
      id="langList"
      class="static top-[58px] z-[100] w-full overflow-hidden rounded-lg bg-white shadow-cs4 transition-all duration-300 mobile:rounded-none mobile:shadow-none"
      :class="{
        'h-0': !isDropped,
        //FIXME opened height = available lang amount * list item height, in this case 58px
        'h-[116px]': isDropped,
      }"
    >
      <button
        v-for="langItem in availableLang"
        class="flex h-[58px] w-full cursor-pointer items-center gap-2 p-2 text-h3 hover:bg-blue-c-200 mobile:gap-4 mobile:p-0"
        :class="{
          'text-blue-c-400 comp:bg-blue-c-100': langItem.code == lang.code,
        }"
        @click.stop="setLang(langItem)"
      >
        <img :src="langItem.flag" class="h-4 w-6" />
        <div class="w-full text-left">{{ langItem.value }}</div>
      </button>
    </div>
  </div>
</template>

<script>
//FIXME opened height = available lang amount multiple list item height, in this case 58px
import { mapMutations } from 'vuex'

export default {
  name: 'LocalizationDropDown',
  data() {
    return {
      lang: { code: 'ua', value: 'Українська', flag: '/Flags/UA_flag.svg' },
      availableLang: [
        { code: 'ua', value: 'Українська', flag: '/Flags/UA_flag.svg' },
        { code: 'en', value: 'English', flag: '/Flags/USA_flag.svg' },
      ],
      isDropped: false,
    }
  },
  methods: {
    ...mapMutations(['setLocalization']),
    ToggleDrop(bool) {
      this.isDropped = bool
    },
    setLang(item) {
      this.lang = item
      this.$i18n.locale = item.code
      this.setLocalization(item.code)
      this.isDropped = false
    },
  },
  mounted() {
    this.lang = this.availableLang.find((x) => x.code === this.$i18n.locale)
  },
}
</script>

<style scoped></style>
