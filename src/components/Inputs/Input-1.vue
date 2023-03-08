<template>
  <label
    class="inline-block w-full relative"
    @focusin="onFocus"
    @focusout="onLeave"
  >
    <input
      :id="inpId"
      ref="inp"
      :type="type"
      class="input-1 outline-none"
      :value="modelValue"
      :placeholder="placeholder"
      :class="validationStyle"
      :disabled="disabled"
      @input="updateInput"
      @keyup="keyAction"
    />

    <div
      v-if="suggestionsVisible && suggestions && suggestions.length > 1"
      class="absolute top-11 bg-white z-[100] w-full border rounded-xl overflow-hidden py-2"
    >
      <div
        v-for="(item, i) in suggestions"
        :key="`sg${i}`"
        class="block focus:bg-blue-c-300 w-full px-1 bg-yellow-300"
        :class="{ 'bg-blue-c-200': i === suggestionIndex }"
        @click.stop="suggestionClick(i)"
      >
        <span>
          {{ item }}
        </span>
      </div>
    </div>

    <div
      v-if="!isValidStyle && validationMessage"
      class="text-red-c-500 text-b3 mt-1 text-left px-2"
    >
      {{ validationMessage }}
    </div>
  </label>
</template>

<script>
import regex from '../mixins/regex.js'

export default {
  name: 'Input1',
  mixins: [regex],
  props: {
    modelValue: [String, Number],
    validationType: {
      type: String,
      validator(value) {
        return ['mail', 'name', 'custom'].includes(value)
      },
    },
    validationMessage: {
      type: String,
      default: 'Поле не валідне',
    },
    validationFunc: {
      type: Function,
      default: (val) => true,
    },
    placeholder: String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text',
    },
    inpId: String,
    suggestions: Array,
  },
  emits: ['validation', 'update:modelValue'],
  data() {
    return {
      isValidStyle: true,
      suggestionsVisible: false,
      suggestionIndex: -1,
    }
  },
  computed: {
    validationStyle() {
      return {
        'border-gray-c-300': this.isValidStyle,
        'border-red-c-500': !this.isValidStyle,
      }
    },
  },
  methods: {
    updateInput(event) {
      this.suggestionIndex = -1
      this.suggestionsVisible = true
      this.$emit('update:modelValue', event.target.value)
    },
    onFocus() {
      //console.log("focus")
      this.isValidStyle = true
      this.suggestionsVisible = true
    },
    onLeave() {
      //console.log("Leave")
      this.isValidStyle = this.validate()
      this.suggestionsVisible = false
    },
    validate() {
      let isValueValid = true
      switch (this.validationType) {
        case 'mail':
          isValueValid = this.isMail(this.modelValue)
          break
        case 'name':
          isValueValid = this.isName(this.modelValue)
          break
        default:
          isValueValid = this.validationFunc(this.modelValue)
          break
      }
      if (isValueValid) this.isValidStyle = true
      this.$emit('validation', isValueValid)
      return isValueValid
    },
    keyAction(e) {
      if (!e.keyCode) return
      if (e.keyCode === 40) {
        if (
          this.suggestionIndex + 1 < this.suggestions.length &&
          this.suggestionIndex >= 0
        )
          this.suggestionIndex++
        else this.suggestionIndex = 0
        this.$emit('update:modelValue', this.suggestions[this.suggestionIndex])
      }
      if (e.keyCode === 38) {
        if (this.suggestionIndex <= 0)
          this.suggestionIndex = this.suggestions.length - 1
        else this.suggestionIndex--
        this.$emit('update:modelValue', this.suggestions[this.suggestionIndex])
      }
    },
    suggestionClick(index) {
      console.log(index)
      this.suggestionIndex = index
      this.$emit('update:modelValue', this.suggestions[this.suggestionIndex])
    },
  },
}
</script>
