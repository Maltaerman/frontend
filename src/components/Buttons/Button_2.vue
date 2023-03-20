<template>
  <button class="border
    border-blue-c-500 bg-white
    text-blue-c-500 px-2 py-2
    text-center align-middle rounded-lg
    text-h3 font-medium
    mobile:text-h4
    tablet:text-h4
    hover:text-blue-c-400
    hover:border-blue-c-400
    disabled:text-gray-c-300
    disabled:border-gray-c-300
    active:text-blue-c-600
    active:border-blue-c-600
    ">
		<slot></slot>
  </button>
</template>

<script>
export default {
  name : "button-2",
}
</script>

<style scoped>

</style>
