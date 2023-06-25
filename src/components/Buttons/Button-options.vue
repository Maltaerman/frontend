<template>
  <button
    class="label rounded-lg p-2 text-center align-middle font-semibold"
    :class="{
      'text-blue-c-500 hover:text-blue-c-300':
        !isChecked && buttonColor == 'blue',
      'bg-blue-c-100 text-blue-c-500 hover:text-blue-c-300':
        isChecked && buttonColor == 'blue',
      'text-red-c-500 hover:text-red-c-300': !isChecked && buttonColor == 'red',
      'bg-red-c-200 text-red-c-500 hover:text-red-c-300':
        isChecked && buttonColor == 'red',
    }"
    @click="toggleValue"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonOptions',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    buttonColor: {
      type: String,
      validator(value) {
        return ['red', 'blue'].includes(value)
      },
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['valueChange'],
  data() {
    return {
      isChecked: false,
    }
  },
  mounted() {
    this.isChecked = this.checked
  },
  updated() {
    this.isChecked = this.checked
  },
  methods: {
    toggleValue() {
      this.isChecked = !this.isChecked
      this.$emit('valueChange', this.isChecked)
    },
  },
}
</script>

<style scoped></style>
