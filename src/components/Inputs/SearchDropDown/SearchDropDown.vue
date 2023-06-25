<template>
  <div
    class="relative z-10"
    @focusout="containerFocusLost"
  >
    <div
      class="flex flex-nowrap gap-2.5 rounded-lg border border-gray-c-300 px-4 py-2"
      data-input
    >
      <input
        class="w-full text-h3 outline-none"
        type="text"
        :value="inputValue"
        @focusin.stop="isDropped = true"
        @input="(e) => updateValue(e.target.value)"
      >
      <button @click.stop="dropBehavior">
        <img
          class="h-2 w-3.5 transition-all duration-300"
          :class="{
            'rotate-0': !isDropped,
            'rotate-180': isDropped,
          }"
          src="/src/assets/dropdown-arrow.svg"
        >
      </button>
    </div>
    <div
      v-if="isDropped"
      class="
        absolute max-h-[208px] w-full overflow-hidden rounded-lg bg-white py-1 pr-1.5 shadow-cs3
      "
      data-drop-container
    >
      <div
        v-if="visibleOptions.length"
        class="overflow-y-auto-custom h-full max-h-[200px] snap-y"
      >
        <div
          v-for="(op, index) in visibleOptions"
          :key="index"
          class="cursor-pointer snap-start px-4 py-2 text-left text-h3"
          :class="{
            'hover:bg-blue-c-100 hover:text-blue-c-500': !isOptionIsModelValue(
              op.value,
            ),
            'bg-blue-c-200 text-blue-c-500': isOptionIsModelValue(op.value),
          }"
          @click="setValue(op)"
        >
          {{ op.text }}
        </div>
      </div>
      <div
        v-else
        class="py-2 text-h3"
      >
        Нічого не знайдено
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchDropDown',
  props: {
    modelValue: {
      type: Object || String || Number,
      default: undefined,
    },
    options: {
      // array of DropDownOption
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isDropped: false,
      preventDropped: true,
      preselectedValue: undefined,
      inputValue: '',
    }
  },
  computed: {
    visibleOptions() {
      if (this.inputValue) {
        const res = this.options.filter(
          (x) => x.text.toLowerCase().includes(this.inputValue.toLowerCase()),
        )
        return res.length <= 1 ? this.options : res
      } return this.options
    },
  },
  watch: {
    isDropped(newVal) {
      if (!newVal) this.updateInputText()
    },
  },
  created() {
    this.updateInputText()
  },
  methods: {
    updateInputText() {
      if (this.modelValue) {
        const selected = this.options.find(
          (x) => JSON.stringify(x.value) === JSON.stringify(this.modelValue),
        )
        if (selected) this.inputValue = selected.text
      }
    },
    containerFocusLost() {
      setTimeout(() => {
        this.isDropped = false
        this.preventDropped = false
        // eslint-disable-next-line no-return-assign
        setTimeout(() => (this.preventDropped = true), 50)
      }, 100)
    },
    dropBehavior() {
      if (this.preventDropped) this.isDropped = !this.isDropped
    },
    setValue(option) {
      this.inputValue = option.text
      this.$emit('update:modelValue', option.value)
    },
    isOptionIsModelValue(optionValue) {
      if (typeof optionValue === 'object') {
        return JSON.stringify(this.modelValue) === JSON.stringify(optionValue)
      } return optionValue === this.modelValue
    },
    updateValue(val) {
      this.inputValue = val
      this.isDropped = true
      window.console.log(this.inputValue)
    },
  },
}
</script>

<style scoped></style>
