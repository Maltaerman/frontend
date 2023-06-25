<template>
  <div
    v-show="isAct"
    class="
      fixed top-0 left-0 right-0 bottom-0 z-[9000]
      flex h-full w-full items-center justify-center
      overflow-hidden bg-black/30 mobile:px-2
    "
    @click.stop="bgClose"
  >
    <div
      class="relative w-[480px] rounded-lg bg-white p-6 mobile:w-full"
      @click.stop
    >
      <img
        v-if="type !== types.wait"
        class="absolute top-6 right-6 cursor-pointer"
        src="/src/assets/close.svg"
        @click="close"
      >
      <div>
        <img
          v-if="isType(types.success)"
          class="mx-auto"
          src="/src/assets/Completed.svg"
        >
        <img
          v-if="isType(types.error)"
          class="mx-auto"
          src="/src/assets/Error.svg"
        >
        <img
          v-if="isType(types.wait)"
          class="mx-auto animate-spin"
          src="/src/assets/Loader.svg"
        >
        <p
          class="mt-5 text-center text-h2 font-semibold"
          :class="textStyle"
        >
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import eventSystem from './event-system'
import messageTypes from './messageTypes'
import removeElement from './remove-helper'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Toaster',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    message: String,
    isCloseOnBg: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      required: true,
      default: messageTypes.info,
      validator(value) {
        return Object.keys(messageTypes).includes(value)
      },
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    duration: {
      type: [Number, Boolean],
      default: 3000,
    },
  },
  data() {
    return {
      isAct: true,
      timeoutID: 0,
    }
  },
  computed: {
    textStyle() {
      return {
        'text-green-c-500': this.type === messageTypes.success,
        'text-red-c-500': this.type === messageTypes.error,
        'text-blue-c-500': this.type === messageTypes.info,
        'text-red-c-300': this.type === messageTypes.warning,
      }
    },
    types() {
      return messageTypes
    },
  },
  mounted() {
    eventSystem.$on('toast-close', this.close)
    if (typeof this.duration === 'number' && this.duration > 0) {
      this.timeoutID = setTimeout(this.close, this.duration)
    }
  },
  updated() {
    // beforeUnmount hook don't call. I don't know why
    if (!this.isAct) eventSystem.$off('toast-close', this.close)
  },
  beforeUnmount() {
    eventSystem.$off('toast-close', this.close)
  },
  methods: {
    bgClose() {
      if (this.isCloseOnBg) {
        clearTimeout(this.timeoutID)
        this.close()
      }
    },
    close() {
      this.isAct = false
      this.onClose()
      removeElement(this.$el)
    },
    isType(type) {
      return type === this.type
    },
  },
}
</script>

<style scoped></style>
