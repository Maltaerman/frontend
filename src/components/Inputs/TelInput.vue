<template>
  <div class="flex flex-nowrap gap-2">
    <div
      @mouseleave="ToggleDrop(false)"
      @focusout="ToggleDrop(false)"
      class="relative w-[140px]"
    >
      <button
        id="dropButton"
        class="h-full flex text-h3 items-center text-gray-c-500 font-semibold justify-end gap-2 mobile:justify-start"
        @click="ToggleDrop(!isDropped)"
      >
        <img
          src="/src/assets/dropdown-arrow.svg"
          class="w-3.5 h-2 transition-all duration-300"
          :class="{
            'rotate-0': !isDropped,
            'rotate-180': isDropped,
          }"
        />
        <div class="flex items-center gap-2 pr-3">
          <img :src="code.flag" class="w-6 h-4" />
          <div id="current-code">{{ code.value }}</div>
        </div>
      </button>
      <div
        id="codeList"
        class="bg-white transition-all duration-300 absolute w-full shadow-cs4 rounded-lg z-[5000] mobile:rounded-none mobile:shadow-none"
        :class="{
          'h-0 overflow-hidden': !isDropped,
          //FIXME opened height = available lang amount * list item height, in this case 58px
          'h-[174px] overflow-x-hidden overflow-y-auto ': isDropped,
        }"
      >
        <div
          v-for="codeItem in availableCode"
          class="w-full h-[58px] flex text-h3 items-center text-gray-c-500 font-semibold p-2 gap-2 hover:bg-blue-c-200 mobile:shadow-cs3 cursor-pointer"
          :class="{
            'bg-blue-c-100 text-blue-c-400': codeItem.code == code.code,
          }"
          @click.stop="setCode(codeItem.code)"
        >
          <img :src="codeItem.flag" class="w-6 h-4" />
          <div>{{ codeItem.value }}</div>
        </div>
      </div>
    </div>
    <input ref="tel" class="input-1" v-model="inp" @keyup="keyAction" />
  </div>
</template>

<script>
import regex from '../mixins/regex.js'
export default {
  name: 'TelInput',
  emits: ['validation', 'update:modelValue', 'enter-click'],
  mixins: [regex],
  props: {
    modelValue: String,
  },
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
  watch: {
    inp(newVal) {
      if (this.onlyDigitsRegex.test(newVal) || newVal === '') {
        this.number = newVal
        this.$emit('update:modelValue', `${this.code.value}${this.number}`)
      } else this.inp = this.number
      this.numValidation()
    },
    code(newVal) {
      this.numValidation()
    },
  },
  mounted() {
    this.$refs.tel.focus()
  },
}
</script>

<style scoped></style>
