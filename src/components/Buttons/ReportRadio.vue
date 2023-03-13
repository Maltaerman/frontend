<template>
  <label v-for="option in label.options" class="cursor-pointer">
    <input
      :checked="checkedOp === option.value"
      class="peer sr-only"
      :name="label.name"
      type="radio"
      @change="updateModel(option.value)"
    />
    <div
      class="py-1 px-2 text-center align-middle rounded-lg text-h3 font-medium mobile:text-h4 tablet:text-h4 border bg-transparent hover:bg-gray-c-10 disabled:border-gray-c-200 disabled:text-gray-c-400"
      :class="option.class"
    >
      {{ $t(`reportTools.${option.i18n}`) }}
    </div>
  </label>
</template>

<script>
export default {
  name: 'ReportRadio',
  props: {
    label: Object,
    checkedOp: String,
  },
  methods: {
    updateModel(option) {
      this.$emit('update:modelValue', option)
    },
  },
}
</script>

<style scoped></style>
