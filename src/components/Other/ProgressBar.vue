<template>
  <div class="h-2 overflow-hidden rounded-xl bg-blue-c-100">
    <div class="progress h-full rounded-xl bg-blue-c-500 duration-300" />
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    progressW() {
      if (this.progress < 0) return '0%'
      if (this.progress > 100) return '100%'
      return `${this.progress}%`
    },
  },
}
</script>

<style scoped>
.progress {
  width: v-bind(progressW);
}
</style>
