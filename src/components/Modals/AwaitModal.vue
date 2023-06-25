<template>
  <ModalTemplate
    class-list="grid place-items-center mobile:px-6"
    :close-func="closeFunc"
    :is-hide-on-click="false"
    :is-modal-visible="isVisible"
  >
    <div
      class="w-[480px] rounded-lg bg-white p-6 mobile:w-full"
      @click.stop
    >
      <img
        class="mx-auto animate-spin"
        src="/src/assets/Loader.svg"
      >
      <p class="mt-4 text-center text-h2 font-semibold">
        {{ message }}
      </p>
    </div>
  </ModalTemplate>
</template>

<script>
export default {
  name: 'AwaitModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    message: String,
    // eslint-disable-next-line vue/require-default-prop
    closeFunc: {
      type: Function,
    },
    closeTimeout: {
      type: Number,
      default: 0,
    },
  },
  updated() {
    if (this.closeTimeout > 0) {
      setTimeout(this.closeFunc, this.closeTimeout)
    }
  },
}
</script>

<style scoped></style>
