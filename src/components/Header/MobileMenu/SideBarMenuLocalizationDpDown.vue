<template>
  <div
    class="h-[58px] px-6 py-1 font-semibold text-gray-c-500"
    :class="{
      'bg-blue-c-100 text-gray-c-500': isDropped,
    }"
  >
    <button
      id="dropButton"
      class="flex h-full w-full items-center justify-between gap-3 text-h3"
      @click.stop="isDropped = !isDropped"
    >
      <div class="flex items-center gap-2 mobile:gap-4">
        <img
          class="h-4 w-6"
          :src="lang.flag"
        >
        <div id="current-language">
          {{ lang.value }}
        </div>
      </div>
      <img
        class="h-2 w-3.5 transition-all duration-300"
        :class="{
          'rotate-0': !isDropped,
          'rotate-180': isDropped,
        }"
        src="/src/assets/dropdown-arrow.svg"
      >
    </button>
    <div
      id="langList"
      class="w-full overflow-hidden transition-all duration-1000"
      :class="{
        'hidden h-0': !isDropped,
        //FIXME opened height = available lang amount * list item height, in this case 58px
        'block h-[116px]': isDropped,
      }"
    >
      <button
        v-for="langItem in availableLang"
        :key="langItem.code"
        class="flex h-[58px] w-full items-center gap-2 text-h3 hover:bg-blue-c-200 mobile:gap-4"
        :class="{
          'text-blue-c-400 comp:bg-blue-c-100': langItem.code == lang.code,
        }"
        @click.stop="setLang(langItem)"
      >
        <img
          class="h-4 w-6"
          :src="langItem.flag"
        >
        <div class="w-full text-left">
          {{ langItem.value }}
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SideBarMenuLocalizationDpDown',
  emits: ['lang-update'],
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
  mounted() {
    this.lang = this.availableLang.find((x) => x.code === this.$i18n.locale)
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
}
</script>

<style scoped></style>
