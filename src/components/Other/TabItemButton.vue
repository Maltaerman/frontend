<template>
  <button
    class="box-border cursor-pointer pb-2.5 hover:border-blue-c-400 hover:text-blue-c-400"
    :class="styles"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'TabItemButton',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    targetTabValue: String,
    // eslint-disable-next-line vue/require-default-prop
    currentTabValue: String,
  },
  computed: {
    styles() {
      return {
        'text-blue-c-500 border-blue-c-500 border-b-2':
          this.targetTabValue === this.currentTabValue,
        'text-gray-c-500 border-gray-c-500 border-b':
          this.targetTabValue !== this.currentTabValue,
      }
    },
  },
}
</script>

<style scoped></style>
