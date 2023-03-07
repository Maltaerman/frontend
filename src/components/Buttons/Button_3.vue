<template>
  <button
    class="text-gray-c-600 p-2 text-center align-middle rounded-lg text-h3 font-medium mobile:text-h4 tablet:text-h4 bg-gray-c-200 hover:text-gray-c-500 disabled:text-gray-c-400 active:text-gray-c-600 active:bg-gray-c-300"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button3",
};
</script>

<style scoped></style>
