<template>
  <div class="flex flex-nowrap gap-2">
    <div
      class="relative w-[140px]"
      @focusout="ToggleDrop(false)"
      @mouseleave="ToggleDrop(false)"
    >
      <button
        id="dropButton"
        class="flex h-full items-center justify-end gap-2 text-h3 font-semibold text-gray-c-500 mobile:justify-start"
        @click="ToggleDrop(!isDropped)"
      >
        <img
          class="h-2 w-3.5 transition-all duration-300"
          :class="{
            'rotate-0': !isDropped,
            'rotate-180': isDropped,
          }"
          src="/src/assets/dropdown-arrow.svg"
        />
        <div class="flex items-center gap-2 pr-3">
          <img class="h-4 w-6" :src="code.flag" />
          <div id="current-code">{{ code.value }}</div>
        </div>
      </button>
      <div
        id="codeList"
        class="absolute z-[5000] w-full rounded-lg bg-white shadow-cs4 transition-all duration-300 mobile:rounded-none mobile:shadow-none"
        :class="{
          'h-0 overflow-hidden': !isDropped,
          //FIXME opened height = available lang amount * list item height, in this case 58px
          'h-[174px] overflow-y-auto overflow-x-hidden ': isDropped,
        }"
      >
        <div
          v-for="(codeItem, index) in availableCode"
          :key="index"
          class="flex h-[58px] w-full cursor-pointer items-center gap-2 p-2 text-h3 font-semibold text-gray-c-500 hover:bg-blue-c-200 mobile:shadow-cs3"
          :class="{
            'bg-blue-c-100 text-blue-c-400': codeItem.code == code.code,
          }"
          @click.stop="setCode(codeItem.code)"
        >
          <img class="h-4 w-6" :src="codeItem.flag" />
          <div>{{ codeItem.value }}</div>
        </div>
      </div>
    </div>
    <input ref="tel" v-model="inp" class="input-1" @keyup="keyAction" />
  </div>
</template>

<script>
import regex from '@/components/mixins/regex.js'
export default {
  name: 'TelInput',
  mixins: [regex],
  props: {
    modelValue: String,
  },
  emits: ['validation', 'update:modelValue', 'enter-click'],
  data() {
    return {
      code: {
        code: 'ua',
        value: '+380',
        flag: '/Flags/UA_flag.svg',
        numLength: 9,
      },
      availableCode: [
        { code: 'ua', value: '+380', flag: '/Flags/UA_flag.svg', numLength: 9 },
        { code: 'pl', value: '+48', flag: '/Flags/PL_flag.svg', numLength: 9 },
        { code: 'uk', value: '+44', flag: '/Flags/UK_flag.svg', numLength: 10 },
        { code: 'us', value: '+1', flag: '/Flags/USA_flag.svg', numLength: 10 },
      ],
      isDropped: false,
      inp: '',
      number: '',
    }
  },
  watch: {
    inp(newVal) {
      if (this.onlyDigitsRegex.test(newVal) || newVal === '') {
        this.number = newVal
        this.$emit('update:modelValue', `${this.code.value}${this.number}`)
      } else this.inp = this.number
      this.numValidation()
    },
    code() {
      this.numValidation()
    },
  },
  mounted() {
    this.$refs.tel.focus()
  },
  methods: {
    ToggleDrop(bool) {
      this.isDropped = bool
    },
    setCode(code) {
      this.code = this.availableCode.find((x) => x.code === code)
    },
    numValidation() {
      //let regex = new RegExp(`[0-9]{${this.code.numLength}}`);
      let isValid =
        this.onlyDigitsRegex.test(this.number) &&
        this.number.length === this.code.numLength
      this.$emit('validation', isValid)
    },
    keyAction(e) {
      if (!e.keyCode) return
      if (e.keyCode === 13) this.$emit('enter-click')
    },
  },
}
</script>

<style scoped></style>
