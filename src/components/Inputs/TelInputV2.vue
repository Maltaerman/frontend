<template>
  <div class="flex flex-col gap-6">
    <SearchDropDown v-model="code" :options="availableCode" />
    <input ref="tel" v-model="inp" class="input-1" @keyup="keyAction" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import regex from '../mixins/regex.js'

import DropDownOption from './SearchDropDown/DropDownOption'
import SearchDropDown from './SearchDropDown/SearchDropDown.vue'

export default {
  name: 'TelInputV2',
  components: { SearchDropDown },
  mixins: [regex],
  props: {
    modelValue: String,
  },
  emits: ['validation', 'update:modelValue', 'enter-click'],
  data() {
    return {
      code: undefined,
      isDropped: false,
      inp: '',
      number: '',
    }
  },
  computed : {
    ...mapGetters({
      getPhoneCodes : 'getPhoneCodes'
    }),
    availableCode(){
      let op = []
      this.getPhoneCodes.forEach(el=>{
        op.push(DropDownOption(`${el.verbose_name} ${el.phone_code}`, el))
      })
      return op
    }
  },
  watch: {
    inp(newVal) {
      if (this.onlyDigitsRegex.test(newVal) || newVal === '') {
        this.number = newVal
        this.$emit('update:modelValue', `${this.code.phone_code}${this.number}`)
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
  created() {
    this.code = this.availableCode[0].value
  },
  methods: {
    setCode(code) {
      this.code = this.availableCode.find((x) => x.code === code)
    },
    numValidation() {
      let isValid =
        this.onlyDigitsRegex.test(this.number) &&
        this.number.length >= this.code.min_length &&
        this.number.length <= this.code.max_length
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
