<template>
  <label
    class="inline-block w-full relative"
    @focusin="onFocus"
    @focusout="onLeave"
  >
    <div
      v-if="label"
      class="text-h4 text-gray-c-500 text-left font-normal mb-2"
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
    />
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
    /*modelValue(){
			this.validate();
		}*/
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
}
</script>
