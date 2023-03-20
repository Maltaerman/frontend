<template>
  <ModalTemplate
    :isModalVisible="isVisible"
    class-list="grid place-items-center mobile:px-6"
    :closeFunc="closeFunc"
    :isHideOnClick="false"
  >
    <div class="w-[480px] rounded-lg bg-white p-6 mobile:w-full" @click.stop>
      <img src="/src/assets/Loader.svg" class="mx-auto animate-spin" />
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
    message: String,
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
