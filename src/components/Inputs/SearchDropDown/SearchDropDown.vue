<template>
  <div class="relative z-10">
    <div
      class="flex flex-nowrap gap-2.5 rounded-lg border border-gray-c-300 px-4 py-2"
      data-input
    >
      <input
        v-model="inputValue"
        class="w-full text-h3 outline-none"
        type="text"
      />
      <button @click.stop="isDropped = !isDropped">
        <img
          class="h-2 w-3.5 transition-all duration-300"
          :class="{
            'rotate-0': !isDropped,
            'rotate-180': isDropped,
          }"
          src="/src/assets/dropdown-arrow.svg"
        />
      </button>
    </div>
    <div
      v-if="isDropped"
      class="absolute max-h-[208px] w-full overflow-hidden rounded-lg bg-white py-1 pr-1.5 shadow-cs3"
      data-drop-container
    >
      <div class="overflow-y-auto-custom h-full max-h-[200px] snap-y">
        <div
          v-for="(op, index) in visibleOptions"
          :key="index"
          class="cursor-pointer snap-start px-4 py-2 text-h3"
          :class="{
            'hover:bg-blue-c-100 hover:text-blue-c-500': !isOptionIsModelValue(
              op.value,
            ),
            'bg-blue-c-200 text-blue-c-500': isOptionIsModelValue(op.value),
          }"
          @click="setValue(op.value)"
        >
          {{ op.text }}
        </div>
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
      //array of DropDownOption
      type: Array,
      default: [],
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isDropped: false,
      preselectedValue: undefined,
      inputValue: '',
    }
  },
  computed: {
    visibleOptions() {
      if (this.inputValue) {
        return this.options.filter((x) =>
          x.text.toLowerCase().includes(this.inputValue.toLowerCase()),
        )
      } else return this.options
    },
  },
  methods: {
    setValue(value) {
      this.$emit('update:modelValue', value)
    },
    isOptionIsModelValue(optionValue) {
      if (typeof optionValue == 'object') {
        return JSON.stringify(this.modelValue) === JSON.stringify(optionValue)
      } else return optionValue === this.modelValue
    },
  },
}
</script>

<style scoped></style>
