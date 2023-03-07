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
      d="M11 0.654663L21.669 10.2567C22.0795 10.6262 22.1128 11.2585 21.7433 11.669C21.3738 12.0795 20.7416 12.1128 20.331 11.7433L19 10.5454V21H3.00001V10.5454L1.66897 11.7433C1.25846 12.1128 0.626173 12.0795 0.256714 11.669C-0.112745 11.2585 -0.079466 10.6262 0.331044 10.2567L11 0.654663ZM5.00001 8.74539V19H17V8.74538L11 3.34539L5.00001 8.74539Z"
    />
  </svg>
</template>

<script>
export default {
  name: "SVGBuildingCondition",
  props: {
    class: String,
    width: Number,
    height: Number,
  },
  data: function () {
    return {
      defaultData: {
        width: 22,
        height: 20,
      },
    };
  },
  computed: {
    viewBox() {
      return `0 0 ${this.c_width} ${this.c_height}`;
    },
    c_width() {
      return this.width > 0 ? this.width : this.defaultData.width;
    },
    c_height() {
      return this.height > 0 ? this.width : this.defaultData.height;
    },
  },
};
</script>
