<template>
  <button
    class="text-white p-2 text-center align-middle rounded-lg text-h3 font-medium mobile:text-h3 tablet:text-h4 bg-blue-c-500 border border-blue-c-500 hover:bg-blue-c-400 hover:border-blue-c-400 disabled:border-gray-c-200 disabled:bg-gray-c-200 disabled:text-gray-c-400 active:bg-blue-c-600"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton1',
}
</script>

<style scoped></style>
