<!-- eslint-disable vue/no-mutating-props -->
<template>
  <label
    class="input-1 flex flex-nowrap gap-2 border"
    :class="{
      'border-blue-c-500': isFocused,
      'border-gray-c-300': !isFocused,
    }"
  >
    <div class="h-full w-5">
      <SVG_search
        class="mt-0.5 h-auto w-full"
        :class="{
          'fill-blue-c-500': isFocused,
          'fill-gray-c-500': !isFocused,
        }"
      />
    </div>
    <input
      v-model="modelValue"
      class="w-full outline-none"
      :placeholder="placeholder"
      type="text"
      @focusin="OnFocus(true)"
      @focusout="OnFocus(false)"
    >
  </label>
</template>

<!-- eslint-disable camelcase -->
<script>
import SVG_search from '../ComponentsSVG/Icons/SVG_search.vue'

export default {
  name: 'InputSearch',
  components: { SVG_search },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    modelValue: String,
    // eslint-disable-next-line vue/require-default-prop
    placeholder: String,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isFocused: false,
    }
  },
  watch: {
    modelValue(val) {
      this.$emit('update:modelValue', val)
    },
  },
  methods: {
    OnFocus(value) {
      this.isFocused = value
    },
  },
}
</script>

<style scoped></style>
