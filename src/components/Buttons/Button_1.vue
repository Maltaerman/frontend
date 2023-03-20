<template>
  <button
    class="rounded-lg border border-blue-c-500 bg-blue-c-500 p-2 text-center align-middle text-h3 font-medium text-white hover:border-blue-c-400 hover:bg-blue-c-400 active:bg-blue-c-600 disabled:border-gray-c-200 disabled:bg-gray-c-200 disabled:text-gray-c-400 tablet:text-h4 mobile:text-h3"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'button-1',
}
</script>

<style scoped></style>
