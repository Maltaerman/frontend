<template>
  <label
    :class="[
      'input-1 flex flex-nowrap gap-2 border',
      isFocused ? 'border-blue-c-500' : 'border-gray-c-300',
    ]"
  >
    <div class="h-full w-5">
      <SVGSearch
        :class="[
          'mt-0.5 h-auto w-full',
          isFocused ? 'fill-blue-c-500' : 'fill-gray-c-500',
        ]"
      />
    </div>
    <input
      v-model="model"
      class="w-full outline-none"
      type="text"
      v-bind="{ placeholder }"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
    >
  </label>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

import SVGSearch from '../ComponentsSVG/Icons/SVG_search.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
})

const isFocused = ref(false)

const model = ref('')

const emits = defineEmits(['update:modelValue'])

watchEffect(() => {
  emits('update:modelValue', model.value)
})

watchEffect(() => {
  model.value = props.modelValue
})
</script>
