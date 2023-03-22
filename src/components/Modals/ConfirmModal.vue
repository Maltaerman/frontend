<template>
  <ModalTemplate
    class-list="grid items-center px-6"
    :closeFunc="cancelButtonClick"
    :is-modal-visible="isVisible"
    :isHideOnClick="isBgClickClose"
  >
    <div
      class="relative mx-auto w-[480px] rounded-lg bg-white p-6 mobile:w-full"
    >
      <img
        class="absolute top-6 right-6 cursor-pointer"
        src="/src/assets/close.svg"
        @click="cancelButtonClick"
      />
      <div class="text-center text-h2 font-semibold">{{ title }}</div>
      <div class="mt-2 mb-6 text-center text-gray-c-500">
        {{ question }}
      </div>
      <div class="flex flex-nowrap gap-4">
        <button-2 class="w-full" @click="cancelButtonClick">
          {{ cancelButtonTextC }}
        </button-2>
        <button-1 class="w-full" @click="acceptButtonClick">
          {{ acceptButtonTextC }}
        </button-1>
      </div>
    </div>
  </ModalTemplate>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    isVisible: {
      default: false,
      type: Boolean,
    },
    isBgClickClose: {
      type: Boolean,
      default: true,
    },
    closeFunc: {
      required: true,
      type: Function,
    },
    title: {
      type: String,
      default: '',
    },
    question: {
      type: String,
      required: true,
    },
    acceptButtonText: String,
    cancelButtonText: String,
    acceptButtonFunc: {
      required: true,
      type: Function,
    },
    cancelButtonFunc: {
      required: true,
      type: Function,
    },
  },
  computed: {
    acceptButtonTextC() {
      return this.acceptButtonText
        ? this.acceptButtonText
        : this.$t('general.confirm')
    },
    cancelButtonTextC() {
      return this.cancelButtonText
        ? this.cancelButtonText
        : this.$t('general.cancel')
    },
  },
  methods: {
    cancelButtonClick() {
      this.cancelButtonFunc()
      this.closeFunc()
    },
    acceptButtonClick() {
      this.acceptButtonFunc()
      this.closeFunc()
    },
  },
}
</script>

<style scoped></style>
