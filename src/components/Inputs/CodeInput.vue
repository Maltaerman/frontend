<template>
  <div class="flex flex-nowrap justify-center mobile:gap-2 gap-4">
    <input
      v-for="n in digitAmount"
      :ref="`inp${n - 1}`"
      class="input-1 text-center max-w-[62px]"
      placeholder="X"
      @focusin="onFocusGet(n - 1)"
      @input="OnInput(n - 1)"
      @keyup="keyAction"
    />
  </div>
</template>

<script>
export default {
  name: 'CodeInput',
  props: {
    digitAmount: {
      type: Number,
      required: true,
    },
  },
  emits: ['enter-click'],
  data() {
    return {
      code: [],
      selectedInputIndex: 0,
    }
  },
  mounted() {
    if (this.$refs['inp0'] && this.$refs['inp0'][0])
      this.$refs['inp0'][0].focus()
  },
  methods: {
    OnInput(inputIndex) {
      let r = `inp${inputIndex}`
      let inp = this.$refs[r][0]

      inp.value =
        inp.value.length > 0 && /\d/.test(inp.value)
          ? inp.value[inp.value.length - 1]
          : ''

      if (inp.value.length === 0 || /\d/.test(inp.value))
        this.code[inputIndex] = inp.value
      else inp.value = this.code[inputIndex]
      this.$emit('update:modelValue', this.code.join(''))

      if (inp.value.length > 0) this.moveToNextInp(inputIndex)
      else this.moveToPrevInp(inputIndex)
    },
    moveToNextInp(inputIndex) {
      let r = `inp${inputIndex + 1}`
      let inp = this.$refs[r] ? this.$refs[r][0] : undefined
      if (inp) inp.focus()
    },
    moveToPrevInp(inputIndex) {
      let r = `inp${inputIndex - 1}`
      let inp = this.$refs[r] ? this.$refs[r][0] : undefined
      if (inp) inp.focus()
    },
    onFocusGet(inputIndex) {
      for (let i = 0; i < this.digitAmount; i++) {
        let r = `inp${i}`
        let inp = this.$refs[r] ? this.$refs[r][0] : undefined
        if (!inp) return
        if (!this.code[i] || this.code === '' || i === inputIndex) {
          this.selectedInputIndex = i
          let caretIndex = inp.value.length
          inp.setSelectionRange(caretIndex, caretIndex)
          inp.focus()
          return
        }
      }
    },
    keyAction(e) {
      if (!e.keyCode) return
      if (e.keyCode === 37) this.moveToPrevInp(this.selectedInputIndex)
      else if (e.keyCode === 39) this.moveToNextInp(this.selectedInputIndex)
      else if (e.keyCode === 13) this.$emit('enter-click')
    },
  },
}
</script>

<style scoped></style>
