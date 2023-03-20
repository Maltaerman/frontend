<template>
  <teleport to="body">
    <div
      v-if="isModalVisible"
      class="absolute top-0 z-[1500] h-full w-full overflow-hidden bg-black/30"
      :class="classList"
      @click="hide"
    >
      <slot></slot>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'ModalTemplate',
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
    closeFunc: {
      type: Function,
      required: true,
    },
    classList: {
      type: String,
    },
    isHideOnClick: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    hide() {
      if (this.isHideOnClick) this.closeFunc()
    },
  },
}
</script>

<style scoped></style>
