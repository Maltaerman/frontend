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
      :value="modelValue"
      :type="type"
      class="input-1 outline-none"
      @input="updateInput"
      :placeholder="placeholder"
      :class="validationStyle"
      :disabled="disabled"
      :id="inpId"
      ref="inp"
    />
    <div
      v-if="!isValidStyle && validationMessage"
      class="mt-1 px-2 text-left text-b3 text-red-c-500"
    >
      {{ validationMessage }}
    </div>
  </label>
</template>

<script>
import regex from '../mixins/regex.js'

export default {
  name: 'Input-1',
  mixins: [regex],
  emits: ['validation', 'update:modelValue'],
  props: {
    modelValue: String,
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
    label: String,
  },
  data() {
    return {
      isValidStyle: true,
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    onFocus() {
      //console.log("focus")
      this.isValidStyle = true
    },
    onLeave() {
      //console.log("Leave")
      let res = this.validate()
      this.isValidStyle = res
    },
    validate() {
      let isValueValid = true
      switch (this.validationType) {
        case 'mail':
          isValueValid = this.isMail(this.modelValue)
          //console.log("mail validation " + isValueValid)
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
  watch: {
    /*modelValue(){
			this.validate();
		}*/
  },
  computed: {
    validationStyle() {
      return {
        'border-gray-c-300': this.isValidStyle,
        'border-red-c-500': !this.isValidStyle,
      }
    },
  },
}
</script>
