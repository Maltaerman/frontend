<!-- eslint-disable max-len -->
<template>
  <button
    class="rounded-lg bg-gray-c-200 p-2 text-center align-middle text-h3 font-medium text-gray-c-600 hover:text-gray-c-500 active:bg-gray-c-300 active:text-gray-c-600 disabled:text-gray-c-400 tablet:text-h4 mobile:text-h4"
  >
    <slot />
  </button>
</template>

<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'Button3',
}
</script>

<style scoped></style>
