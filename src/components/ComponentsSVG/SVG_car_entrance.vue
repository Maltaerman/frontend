<template>
  <svg
    class="h-full w-full block"
    :class="this.class"
    :width="c_width"
    :height="c_height"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.87043 18L8.77812 2H11V3H13V2L15.2219 2L21.1296 18H2.87043ZM7.14327 0.653627C7.2883 0.260846 7.66267 0 8.08137 0H15.9186C16.3373 0 16.7117 0.260845 16.8567 0.653626L23.5029 18.6536C23.744 19.3066 23.2608 20 22.5648 20H1.43521C0.739157 20 0.25602 19.3066 0.497115 18.6536L7.14327 0.653627ZM11 8V5H13V8H11ZM11 10V14H13V10H11Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'SVGCarEntrance',
  props: {
    class: String,
    width: Number,
    height: Number,
  },
  data: function () {
    return {
      defaultData: {
        width: 24,
        height: 20,
      },
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.c_width} ${this.c_height}`
    },
    c_width() {
      return this.width > 0 ? this.width : this.defaultData.width
    },
    c_height() {
      return this.height > 0 ? this.width : this.defaultData.height
    },
  },
}
</script>

<style scoped></style>
