<template>
  <button
    class="text-center align-middle rounded-lg text-h3 font-medium mobile:text-h4 tablet:text-h4 bg-transparent disabled:bg-gray-c-100 disabled:text-gray-c-400 cursor-pointer p-2"
    :class="buttonColor"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonText1',
  props: {
    color: {
      type: String,
      default: 'blue',
      validator(value) {
        return ['blue', 'red'].some((x) => x === value)
      },
    },
  },
  data() {
    return {
      buttonColor: {
        'text-blue-c-500 hover:bg-blue-c-100 active:bg-blue-c-200':
          this.color == 'blue',
        'text-red-c-500 hover:bg-red-c-100 active:bg-red-c-200':
          this.color == 'red',
      },
    }
  },
}
</script>

<style scoped></style>
