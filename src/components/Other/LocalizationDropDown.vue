<template>
  <div
    @mouseleave="ToggleDrop(false)"
    class="relative text-gray-c-500 font-semibold"
  >
    <button
      id="dropButton"
      class="w-full h-full flex text-h3 items-center justify-end mobile:justify-between gap-3"
      @click.stop="isDropped = !isDropped"
      :class="{
        'mobile:bg-blue-c-100 text-gray-c-600': isDropped,
      }"
    >
      <div class="flex items-center gap-2 mobile:gap-4">
        <img :src="lang.flag" class="w-6 h-4" />
        <div id="current-language">{{ lang.value }}</div>
      </div>
      <img
        src="/src/assets/dropdown-arrow.svg"
        class="w-3.5 h-2 transition-all duration-300"
        :class="{
          'rotate-0': !isDropped,
          'rotate-180': isDropped,
        }"
      />
    </button>
    <div
      id="langList"
      class="bg-white overflow-hidden transition-all duration-300 static top-[58px] w-full shadow-cs4 rounded-lg z-[100] mobile:rounded-none mobile:shadow-none"
      :class="{
        'h-0': !isDropped,
        //FIXME opened height = available lang amount * list item height, in this case 58px
        'h-[116px]': isDropped,
      }"
    >
      <button
        v-for="langItem in availableLang"
        class="w-full h-[58px] flex text-h3 items-center p-2 gap-2 mobile:gap-4 hover:bg-blue-c-200 mobile:p-0 cursor-pointer"
        :class="{
          'comp:bg-blue-c-100 text-blue-c-400': langItem.code == lang.code,
        }"
        @click.stop="setLang(langItem)"
      >
        <img :src="langItem.flag" class="w-6 h-4" />
        <div class="w-full text-left">{{ langItem.value }}</div>
      </button>
    </div>
  </div>
</template>

<script>
//FIXME opened height = available lang amount multiple list item height, in this case 58px
import { mapMutations } from "vuex";

export default {
  name: "LocalizationDropDown",
  data() {
    return {
      lang: { code: "ua", value: "Українська", flag: "/Flags/UA_flag.svg" },
      availableLang: [
        { code: "ua", value: "Українська", flag: "/Flags/UA_flag.svg" },
        { code: "en", value: "English", flag: "/Flags/USA_flag.svg" },
      ],
      isDropped: false,
    };
  },
  methods: {
    ...mapMutations(["setLocalization"]),
    ToggleDrop(bool) {
      this.isDropped = bool;
    },
    setLang(item) {
      this.lang = item;
      this.$i18n.locale = item.code;
      this.setLocalization(item.code);
      this.isDropped = false;
    },
  },
  mounted() {
    this.lang = this.availableLang.find((x) => x.code === this.$i18n.locale);
  },
};
</script>

<style scoped></style>
