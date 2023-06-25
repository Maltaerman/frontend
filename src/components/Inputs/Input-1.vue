<template>
  <label
    class="relative inline-block w-full"
    @focusin="onFocus"
    @focusout="onLeave"
  >
    <div
      v-if="label"
      class="mb-2 text-left text-h4 font-normal text-gray-c-500"
    >
      {{ label }}
    </div>
    <input
      :id="inpId"
      ref="inp"
      class="input-1 outline-none"
      :class="validationStyle"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="updateInput"
    >
    <div
      v-if="!isValidStyle && validationMessage"
      class="mt-1 px-2 text-left text-b3 text-red-c-500"
    >
      {{ validationMessage }}
    </div>
  </label>
</template>

<script>
import regex from '../mixins/regex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Input1',
  mixins: [regex],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    modelValue: String,
    // eslint-disable-next-line vue/require-default-prop
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
      default: () => true,
    },
    // eslint-disable-next-line vue/require-default-prop
    placeholder: String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text',
    },
    // eslint-disable-next-line vue/require-default-prop
    inpId: String,
    // eslint-disable-next-line vue/require-default-prop
    label: String,
  },
  emits: ['validation', 'update:modelValue'],
  data() {
    return {
      isValidStyle: true,
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
  watch: {
    /* modelValue(){
    this.validate();
  } */
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    onFocus() {
      // console.log("focus")
      this.isValidStyle = true
    },
    onLeave() {
      // console.log("Leave")
      const res = this.validate()
      this.isValidStyle = res
    },
    validate() {
      let isValueValid = true
      switch (this.validationType) {
        case 'mail':
          isValueValid = this.isMail(this.modelValue)
          // console.log("mail validation " + isValueValid)
          break
        case 'name':
          isValueValid = this.isName(this.modelValue)
          break
        default:
          isValueValid = this.validationFunc(this.modelValue)
          break
      }
      if (isValueValid || this.value === '') this.isValidStyle = true
      this.$emit('validation', isValueValid)
      return isValueValid
    },
  },
}
</script>
