<!-- eslint-disable max-len -->
<template>
  <button
    class="rounded-lg border border-blue-c-500 bg-white px-2 py-2 text-center align-middle text-h3 font-medium text-blue-c-500 hover:border-blue-c-400 hover:text-blue-c-400 active:border-blue-c-600 active:text-blue-c-600 disabled:border-gray-c-300 disabled:text-gray-c-300 tablet:text-h4 mobile:text-h4"
  >
    <slot />
  </button>
</template>

<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'Button2',
}
</script>

<style scoped></style>
