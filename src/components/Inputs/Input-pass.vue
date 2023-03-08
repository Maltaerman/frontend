<template>
  <div>
    <div
      class="border font-normal flex items-center rounded-lg outline-none text-h3 hover:border-blue-c-400 focus:border-blue-c-500 disabled:bg-gray-c-100 disabled:hover:border-gray-c-300 disabled:text-gray-c-500 flex overflow-hidden relative"
      :class="{
        'border-blue-c-500': isInputFocused,
        'border-gray-c-300': !isInputFocused && isValidStyle,
        'border-red-c-500': !isInputFocused && !isValidStyle,
      }"
      @focusin="OnDivFocus(true)"
      @focusout="OnDivFocus(false)"
    >
      <input
        :id="inpId"
        ref="pass"
        class="w-full outline-none px-4 pr-10 py-2 bg-transparent"
        :type="inputType"
        :placeholder="placeholderC"
        :disabled="disabled"
        @focusin="OnInputFocus(true)"
        @focusout="OnInputFocus(false)"
        @input="OnValueChange"
      />
      <button
        class="w-[40px] h-full cursor-pointer rounded-lg px-1 absolute right-0 top-0"
        @click="toggleInputType"
      >
        <svg
          id="viewPass"
          class="block h-full w-full"
          viewBox="0 0 24 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="{
            'fill-black': inputType === 'password',
            'fill-blue-c-500': inputType === 'text',
          }"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.39949 6.6329C3.30488 6.76913 3.2238 6.89261 3.156 7C3.2238 7.10739 3.30488 7.23087 3.39949 7.3671C3.75797 7.88332 4.30522 8.57469 5.05327 9.2652C6.5442 10.6414 8.81273 12 12 12C15.1873 12 17.4558 10.6414 18.9467 9.2652C19.6948 8.57469 20.242 7.88332 20.6005 7.3671C20.6951 7.23087 20.7762 7.10739 20.844 7C20.7762 6.89261 20.6951 6.76913 20.6005 6.6329C20.242 6.11668 19.6948 5.42531 18.9467 4.7348C17.4558 3.35856 15.1873 2 12 2C8.81273 2 6.5442 3.35856 5.05327 4.7348C4.30522 5.42531 3.75797 6.11668 3.39949 6.6329ZM22.894 6.5519C22.8942 6.55236 22.8944 6.55279 22 7C22.8944 7.44721 22.8942 7.44764 22.894 7.4481L22.8935 7.44912L22.8922 7.45158L22.8889 7.45815L22.8788 7.47774C22.8706 7.49362 22.8593 7.51509 22.8449 7.54177C22.8162 7.59514 22.775 7.66944 22.7212 7.76168C22.6136 7.94605 22.4551 8.20285 22.2432 8.5079C21.8205 9.11668 21.1802 9.92531 20.3033 10.7348C18.5442 12.3586 15.8127 14 12 14C8.18726 14 5.45578 12.3586 3.69671 10.7348C2.81976 9.92531 2.17952 9.11668 1.75675 8.5079C1.54491 8.20285 1.38634 7.94605 1.27879 7.76168C1.22498 7.66944 1.18383 7.59514 1.15508 7.54177C1.1407 7.51509 1.1294 7.49362 1.12117 7.47774L1.11109 7.45815L1.10776 7.45158L1.10652 7.44912L1.10601 7.4481C1.10578 7.44764 1.10556 7.44721 1.99999 7C1.10556 6.55279 1.10578 6.55236 1.10601 6.5519L1.10652 6.55088L1.10776 6.54842L1.11109 6.54185L1.12117 6.52226C1.1294 6.50638 1.1407 6.48491 1.15508 6.45823C1.18383 6.40486 1.22498 6.33056 1.27879 6.23832C1.38634 6.05395 1.54491 5.79715 1.75675 5.4921C2.17952 4.88332 2.81976 4.07469 3.69671 3.2652C5.45578 1.64144 8.18726 0 12 0C15.8127 0 18.5442 1.64144 20.3033 3.2652C21.1802 4.07469 21.8205 4.88332 22.2432 5.4921C22.4551 5.79715 22.6136 6.05395 22.7212 6.23832C22.775 6.33056 22.8162 6.40486 22.8449 6.45823C22.8593 6.48491 22.8706 6.50638 22.8788 6.52226L22.8889 6.54185L22.8922 6.54842L22.8935 6.55088L22.894 6.5519ZM22 7L22.8944 6.55279L23.118 7L22.8944 7.44721L22 7ZM1.10556 6.55279L1.99999 7L1.10556 7.44721L0.881958 7L1.10556 6.55279ZM9.99999 7C9.99999 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7C14 8.10457 13.1046 9 12 9C10.8954 9 9.99999 8.10457 9.99999 7ZM12 3C9.79085 3 7.99999 4.79086 7.99999 7C7.99999 9.20914 9.79085 11 12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3Z"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="!isValidStyle && validationMessage"
      id="invalid-feedback"
      class="text-red-c-500 text-b3 mt-1 text-left px-2"
    >
      {{ validationMessageC }}
    </div>
  </div>
</template>

<script>
import regex from '../mixins/regex.js'

export default {
  name: 'InputPass',
  mixins: [regex],
  props: {
    modelValue: String,
    placeholder: String,
    inpId: String,
    validationMessage: String,
    validationFunc: {
      type: Function,
      default: function () {
        return this.isPass(this.modelValue)
      },
    },
    disabled: false,
  },
  emits: ['validation', 'update:modelValue'],
  data() {
    return {
      isInputFocused: false,
      inputType: 'password',
      isValidStyle: true,
    }
  },
  computed: {
    placeholderC() {
      return this.placeholder
        ? this.placeholder
        : this.$t('userSettings.password')
    },
    validationMessageC() {
      return this.validationMessage
        ? this.validationMessage
        : this.$t('validations.default')
    },
  },
  methods: {
    toggleInputType() {
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
      this.$refs.pass.focus()
    },
    OnInputFocus(arg) {
      this.isInputFocused = arg
      if (!arg) this.isValidStyle = this.validation('')
    },
    OnDivFocus(arg) {
      this.isInputFocused = arg
      if (arg) this.$refs.pass.focus()
    },
    OnValueChange(event) {
      this.validation(event.target.value)
      this.$emit('update:modelValue', event.target.value)
    },
    validation(value) {
      let isPassValid = this.validationFunc()
      this.$emit('validation', isPassValid)
      if (isPassValid) this.isValidStyle = true
      return isPassValid
    },
  },
}
</script>
