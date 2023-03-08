<template>
  <ModalTemplate
    class-list="grid place-items-center mobile:px-6"
    :close-func="closeFunc"
    :is-hide-on-click="false"
    :is-modal-visible="isVisible"
  >
    <div
class="bg-white rounded-lg p-6 w-[480px] mobile:w-full"
@click.stop>
      <img
class="animate-spin mx-auto"
src="/src/assets/Loader.svg" />
      <p class="text-h2 text-center mt-4 font-semibold">
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
