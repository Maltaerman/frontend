<template>
  <div
    ref="desc"
    class="bg-gray-c-200 text-gray-c-500 p-2 rounded-sm mt-2 text-ellipsis overflow-hidden relative leading-[26px] w-full break-words"
    :class="{
      'h-10 text-ellipsis': !isExpanded && isMinimizeEl,
      'h-full': isExpanded,
    }"
  >
    <button
      v-if="isMinimizeEl"
      class="float-right text-blue-500 font-medium ml-1 mb-1"
      @click="Expand"
    >
      <span v-if="!isExpanded">{{ $t('general.details') }}</span>
      <span v-else>{{ $t('general.close') }}</span>
    </button>
    <slot></slot>
  </div>
</template>

<script>
import helper from '../mixins/helper.js'

export default {
  name: 'BaseExpander',
  mixins: [helper],
  props: {
    defaultHeight: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      isExpanded: false,
      isMinimizeEl: false,
    }
  },
  mounted() {
    if (!this.$refs.desc) this.isMinimizeEl = true
    else this.isMinimizeEl = this.getLineCount(this.$refs.desc) > 5
  },
  methods: {
    Expand() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<style scoped></style>
