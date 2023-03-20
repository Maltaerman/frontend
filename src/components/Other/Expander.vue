<template>
  <div
    class="relative mt-2 w-full overflow-hidden text-ellipsis break-words rounded-sm bg-gray-c-200 p-2 leading-[26px] text-gray-c-500"
    :class="{
      'h-10 text-ellipsis': !isExpanded && isMinimizeEl,
      'h-full': isExpanded,
    }"
    ref="desc"
  >
    <button
      class="float-right ml-1 mb-1 font-medium text-blue-500"
      @click="Expand"
      v-if="isMinimizeEl"
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
  name: 'Expander',
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
  methods: {
    Expand() {
      this.isExpanded = !this.isExpanded
    },
  },
  mounted() {
    if (!this.$refs.desc) this.isMinimizeEl = true
    else this.isMinimizeEl = this.getLineCount(this.$refs.desc) > 5
  },
}
</script>

<style scoped></style>
